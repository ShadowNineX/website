import { getImage } from "astro:assets";

interface SeoImageOptions {
  image?: ImageMetadata;
  requestUrl: URL;
  site?: URL;
  width?: number;
  height?: number;
}

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
    width: Number(optimized.attributes.width ?? width ?? image.width),
    height: Number(optimized.attributes.height ?? height ?? image.height),
  };
}
