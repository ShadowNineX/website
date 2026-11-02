/// <reference types="bun" />
import { expect, test } from "bun:test";
import vm from "node:vm";
import { installThemeController } from "../src/scripts/theme-controller";
import { themeConfig } from "../src/config/themes";

const config = themeConfig;
const serializedBootstrap = `(${installThemeController.toString()})(${JSON.stringify(config)});`;

class Element {
  attributes = new Map<string, string>();
  value = "";
  disabled = false;

  constructor(attributes: Record<string, string> = {}) {
    for (const [name, value] of Object.entries(attributes)) this.attributes.set(name, value);
  }

  getAttribute(name: string) { return this.attributes.get(name) ?? null; }
  setAttribute(name: string, value: string) { this.attributes.set(name, value); }
  matches(selector: string) { return selector === "select[data-theme-select]" && this.attributes.has("data-theme-select"); }
}

class FakeDocument {
  listeners = new Map<string, Array<(event: any) => void>>();
  documentElement: Element;
  meta: Element;
  selects: Element[];

  constructor({ managed = true, selects = 1 } = {}) {
    this.documentElement = new Element(managed ? { "data-theme-managed": "true" } : { "data-theme-managed": "false", "data-theme": "tails" });
    this.meta = new Element({ "data-site-theme-color": "" });
    this.selects = Array.from({ length: selects }, () => {
      const select = new Element({ "data-theme-select": "" });
      select.disabled = true;
      return select;
    });
  }

  addEventListener(name: string, listener: (event: any) => void) {
    this.listeners.set(name, [...(this.listeners.get(name) ?? []), listener]);
  }
  emit(name: string, event: any = {}) { for (const listener of this.listeners.get(name) ?? []) listener(event); }
  querySelector(selector: string) { return selector === "meta[data-site-theme-color]" ? this.meta : null; }
  querySelectorAll(selector: string) { return selector === "select[data-theme-select]" ? this.selects : []; }
}

function boot(options: ConstructorParameters<typeof FakeDocument>[0] = {}, storage: Record<string, string> = {}) {
  const document = new FakeDocument(options);
  const windowListeners = new Map<string, Array<(event: any) => void>>();
  const calls = { get: 0, set: 0 };
  const window: any = {
    localStorage: {
      getItem(key: string) { calls.get++; return storage[key] ?? null; },
      setItem(key: string, value: string) { calls.set++; storage[key] = value; },
    },
    addEventListener(name: string, listener: (event: any) => void) {
      windowListeners.set(name, [...(windowListeners.get(name) ?? []), listener]);
    },
  };
  const context = vm.createContext({ window, document, JSON, Object, Array, RegExp, String, HTMLSelectElement: Element });
  vm.runInContext(serializedBootstrap, context);
  return { calls, context, document, emitStorage: (event: any) => windowListeners.get("storage")?.forEach((listener) => listener(event)), storage, window };
}

test("serialized bootstrap uses the default without writing on a first visit", () => {
  const app = boot();
  expect(app.document.documentElement.getAttribute("data-theme")).toBe("gta6");
  expect(app.document.meta.getAttribute("content")).toBe("#24112e");
  expect(app.calls.set).toBe(0);
});

test("serialized bootstrap persists registered choices and rejects an invalid choice", () => {
  const app = boot();
  const select = app.document.selects[0];
  select.value = "tails";
  app.document.emit("change", { target: select });
  expect(app.storage[config.storageKey]).toBe("tails");
  select.value = "gta6";
  app.document.emit("change", { target: select });
  expect(app.storage[config.storageKey]).toBe("gta6");
  const writes = app.calls.set;
  select.value = "not-a-theme";
  app.document.emit("change", { target: select });
  expect(app.calls.set).toBe(writes);
  expect(app.document.documentElement.getAttribute("data-theme")).toBe("gta6");
});

test("prototype property names are rejected from storage, controls, and storage events", () => {
  const app = boot({}, { [config.storageKey]: "__proto__" });
  const select = app.document.selects[0];
  expect(app.window.__shadowNineThemeController.selectedTheme).toBe("gta6");
  expect(app.document.meta.getAttribute("content")).toBe("#24112e");

  select.value = "constructor";
  app.document.emit("change", { target: select });
  app.emitStorage({ key: config.storageKey, newValue: "toString", storageArea: app.window.localStorage });

  expect(app.window.__shadowNineThemeController.selectedTheme).toBe("gta6");
  expect(app.document.documentElement.getAttribute("data-theme")).toBe("gta6");
  expect(app.document.meta.getAttribute("content")).toBe("#24112e");
  expect(app.calls.set).toBe(0);
});

test("repeated serialized execution remains singleton and synchronizes transitions", () => {
  const app = boot();
  vm.runInContext(serializedBootstrap, app.context);
  expect(app.document.listeners.get("change")).toHaveLength(1);
  const incoming = new FakeDocument({ selects: 2 });
  app.document.emit("astro:before-swap", { newDocument: incoming });
  expect(incoming.documentElement.getAttribute("data-theme")).toBe("gta6");
  expect(incoming.selects[0].value).toBe("gta6");
  expect(incoming.selects[0].disabled).toBe(false);
  (app.context as any).document = incoming;
  app.document.emit("astro:page-load");
  expect(incoming.selects.every((select) => select.value === "gta6" && !select.disabled)).toBe(true);
});

test("storage failures, cross-tab removal, and Yi's unmanaged document preserve the right boundaries", () => {
  const app = boot();
  app.emitStorage({ key: config.storageKey, newValue: "tails", storageArea: {} });
  expect(app.window.__shadowNineThemeController.selectedTheme).toBe("gta6");
  app.window.localStorage.setItem = () => { throw new Error("blocked"); };
  const select = app.document.selects[0];
  select.value = "tails";
  app.document.emit("change", { target: select });
  expect(app.window.__shadowNineThemeController.selectedTheme).toBe("tails");
  app.emitStorage({ key: config.storageKey, newValue: null, storageArea: app.window.localStorage });
  expect(app.window.__shadowNineThemeController.selectedTheme).toBe("gta6");
  app.emitStorage({ key: config.storageKey, newValue: "tails", storageArea: app.window.localStorage });
  expect(app.window.__shadowNineThemeController.selectedTheme).toBe("tails");
  app.emitStorage({ key: null, newValue: null, storageArea: app.window.localStorage });
  expect(app.window.__shadowNineThemeController.selectedTheme).toBe("gta6");
  const yi = new FakeDocument({ managed: false });
  app.document.emit("astro:before-swap", { newDocument: yi });
  expect(yi.documentElement.getAttribute("data-theme")).toBe("tails");
  expect(yi.meta.getAttribute("content")).toBeNull();
});
