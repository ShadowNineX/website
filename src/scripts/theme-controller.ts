import type { ThemeConfig } from "@/config/themes";

/** Serialization invariant: stringified inline, so all runtime work stays inside. */
export function installThemeController(config: ThemeConfig): void {
  "use strict";

  const themes = config.themes;
  const defaultTheme = config.defaultTheme;
  const storageKey = config.storageKey;
  type Controller = {
    storageKey: string;
    selectedTheme: string;
    applyTheme(targetDocument: Document): void;
    syncDocument(targetDocument: Document): void;
    selectTheme(value: unknown, persist: boolean): boolean;
  };
  type ThemeWindow = Window & { __shadowNineThemeController?: Controller };
  const themeWindow = window as ThemeWindow;
  const existing = themeWindow.__shadowNineThemeController;
  if (existing && existing.storageKey === storageKey) {
    existing.syncDocument(document);
    return;
  }

  const isKnownTheme = (value: unknown): value is string =>
    typeof value === "string" && Object.hasOwn(themes, value);
  const readStoredTheme = () => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      return isKnownTheme(stored) ? stored : defaultTheme;
    } catch {
      return defaultTheme;
    }
  };

  const controller: Controller = {
    storageKey,
    selectedTheme: readStoredTheme(),
    applyTheme(targetDocument) {
      const root = targetDocument?.documentElement;
      if (!root || root.getAttribute("data-theme-managed") !== "true") return;

      root.setAttribute("data-theme", this.selectedTheme);
      const themeColor = targetDocument.querySelector("meta[data-site-theme-color]");
      if (themeColor) themeColor.setAttribute("content", themes[this.selectedTheme].color);
    },
    syncDocument(targetDocument) {
      this.applyTheme(targetDocument);
      for (const select of targetDocument.querySelectorAll<HTMLSelectElement>("select[data-theme-select]")) {
        select.value = this.selectedTheme;
        select.disabled = false;
      }
    },
    selectTheme(value, persist) {
      if (!isKnownTheme(value)) return false;
      this.selectedTheme = value;
      this.syncDocument(document);
      if (persist) {
        try {
          window.localStorage.setItem(storageKey, value);
        } catch {
          // Keep the in-memory choice so navigation still preserves it.
        }
      }
      return true;
    },
  };

  themeWindow.__shadowNineThemeController = controller;
  document.addEventListener("change", (event) => {
    const target = event.target;
    if (target instanceof HTMLSelectElement && target.matches("select[data-theme-select]")) {
      controller.selectTheme(target.value, true);
    }
  });
  document.addEventListener("astro:before-swap", (event: Event) => {
    const incoming = (event as Event & { newDocument?: Document }).newDocument;
    if (incoming) controller.syncDocument(incoming);
  });
  document.addEventListener("astro:page-load", () => controller.syncDocument(document));
  document.addEventListener("DOMContentLoaded", () => controller.syncDocument(document));
  window.addEventListener("storage", (event) => {
    if (event.storageArea && event.storageArea !== window.localStorage) return;
    if (event.key !== null && event.key !== storageKey) return;
    controller.selectTheme(event.key === null || event.newValue === null ? defaultTheme : event.newValue, false);
  });

  controller.syncDocument(document);
}
