import { getCollection } from "astro:content";
import { readFile } from "node:fs/promises";
import type { APIRoute } from "astro";
import path from "node:path";
import sharp from "sharp";

export const prerender = true;

const width = 1200;
const height = 630;
const blogContentDir = path.join(process.cwd(), "src/content/blog");

const responseFromImage = (image: Buffer) =>
  new Response(new Uint8Array(image), {
    headers: { "Content-Type": "image/png" },
  });

const unquote = (value: string) => value.trim().replace(/^['"]|['"]$/g, "");

const markdownPathForPost = async (id: string) => {
  const candidates = [".md", ".mdx"].map((extension) =>
    path.join(blogContentDir, `${id}${extension}`),
  );

  for (const candidate of candidates) {
    try {
      await readFile(candidate);
      return candidate;
    } catch {
      // Try the next supported content extension.
    }
  }

  return undefined;
};

const imagePathForPost = async (id: string) => {
  const markdownPath = await markdownPathForPost(id);
  if (!markdownPath) return undefined;

  const markdown = await readFile(markdownPath, "utf8");
  const imageMatch = new RegExp(/^image:\s*(.+)$/m).exec(markdown);
  if (!imageMatch) return undefined;

  const imagePath = unquote(imageMatch[1]);
  if (/^https?:\/\//i.test(imagePath)) return undefined;

  return path.resolve(path.dirname(markdownPath), imagePath);
};

const fallbackImage = async () =>
  sharp({
    create: {
      width,
      height,
      channels: 4,
      background: "#0f1720",
    },
  })
    .composite([
      {
        input: Buffer.from(`
          <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <rect width="1200" height="630" fill="#0f1720"/>
            <text x="80" y="330" font-family="Arial, sans-serif" font-size="92" font-weight="700" fill="#e8feff">ShadowNine Blog</text>
          </svg>
        `),
        left: 0,
        top: 0,
      },
    ])
    .png()
    .toBuffer();

export const GET: APIRoute = async () => {
  const posts = (await getCollection("blog", ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .filter((post) => post.data.image)
    .slice(0, 3);

  const images = posts
    .map((post) => post.data.image)
    .filter((image): image is ImageMetadata => Boolean(image));

  if (images.length === 0) {
    return responseFromImage(await fallbackImage());
  }

  const imagePaths = (
    await Promise.all(posts.map((post) => imagePathForPost(post.id)))
  ).filter((imagePath): imagePath is string => Boolean(imagePath));

  if (imagePaths.length === 0) {
    return responseFromImage(await fallbackImage());
  }

  const columnWidth = Math.floor(width / imagePaths.length);
  const columns = await Promise.all(
    imagePaths.map(async (imagePath, index) => {
      const left = index * columnWidth;
      const tileWidth =
        index === imagePaths.length - 1 ? width - left : columnWidth;

      const input = await sharp(imagePath)
        .resize(tileWidth, height, { fit: "cover", position: "center" })
        .png()
        .toBuffer();

      return { input, left, top: 0 };
    }),
  );

  const image = await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: "#0f1720",
    },
  })
    .composite(columns)
    .png()
    .toBuffer();

  return responseFromImage(image);
};
