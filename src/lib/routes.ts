export const normalizeRoutePath = (path: string) =>
  path
    .replace(/\/index\.html$/, "/")
    .replace(/\.html$/, "")
    .replace(/\/+$/, "") || "/";

export const canonicalUrlForPath = (path: string, baseUrl: URL) => {
  const canonicalPath = normalizeRoutePath(path);

  return canonicalPath === "/"
    ? baseUrl.origin
    : new URL(canonicalPath, baseUrl).href;
};
