/// <reference types="bun" />
import { expect, test } from "bun:test";
import { preprocess } from "../node_modules/astro-iconify/lib/utils.ts";

test("the patched icon optimizer preserves real icon geometry", () => {
  const icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" d="M3 12h18"/><circle cx="12" cy="8" r="2"/></svg>';
  const result = preprocess(icon, "regression:geometry", { optimize: true });

  expect(result.innerHTML).toMatch(/<path\b[^>]*\bd="[^"]+"/);
  expect(result.innerHTML).not.toContain("Failed to load");
  expect(result.innerHTML).not.toMatch(/^<rect\b/);
});

test("the patched icon optimizer removes executable SVG content", () => {
  const icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onload="alert(1)"><script>alert(2)</script><path onclick="alert(3)" fill="none" stroke="currentColor" d="M4 8h16"/><a href="javascript:alert(4)"><circle cx="12" cy="14" r="2"/></a></svg>';
  const result = preprocess(icon, "regression:sanitization", { optimize: true });

  expect(result.innerHTML).toMatch(/<(path|circle)\b/);
  expect(result.innerHTML).not.toMatch(/<script\b|\bon(?:click|load)\s*=|javascript:/i);
  expect(result.defaultProps).not.toHaveProperty("onload");
});
