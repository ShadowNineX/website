import { getImage } from "astro:assets";

interface SeoImageOptions {
  image?: ImageMetadata;
  requestUrl: URL;
  site?: URL;
  width?: number;
  height?: number;
}

const imageTypeByExtension: Record<string, string> = {
  avif: "image/avif",
  gif: "image/gif",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  svg: "image/svg+xml",
  webp: "image/webp",
};

const getImageType = (src: string) => {
  const pathname = new URL(src, "https://example.com").pathname;
  const extension = pathname.split(".").pop()?.toLowerCase();

  return extension ? imageTypeByExtension[extension] : undefined;
};

export async function getSeoImage({
  image,
  requestUrl,
  site,
  width,
  height,
}: SeoImageOptions) {
  if (!image) return undefined;

  const optimized = await getImage({
    src: image,
    width: width ?? image.width,
    height: height ?? image.height,
  });
  const origin = import.meta.env.DEV
    ? requestUrl.origin
    : (site?.origin ?? requestUrl.origin);

  return {
    url: new URL(optimized.src, origin).href,
    type: getImageType(optimized.src),
    width: Number(optimized.attributes.width ?? width ?? image.width),
    height: Number(optimized.attributes.height ?? height ?? image.height),
  };
}
