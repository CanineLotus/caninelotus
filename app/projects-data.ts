import fs from "fs";
import path from "path";
import { withBasePath } from "./site-paths";

export type ProjectCategory = "uiux" | "art" | "music" | "video";

export type Track = {
  name: string;
  src: string;
};

export type Project = {
  id: string;
  category: ProjectCategory;
  categoryLabel: string;
  slug: string;
  title: string;
  subtitle: string;
  footer: string;
  description: string;
  folder: string;
  cover: string | null;
  gallery: string[];
  playlist: Track[];
  video: string | null;
  tags: string[];
};

const CATEGORIES: ProjectCategory[] = ["uiux", "art", "music", "video"];

const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  uiux: "UI/UX",
  art: "Art & Design",
  music: "Music",
  video: "Video Editing",
};

const IMAGE_EXTENSIONS = [".png", ".gif", ".jpg", ".jpeg", ".webp"];
const AUDIO_EXTENSIONS = [".mp3", ".wav", ".ogg"];
const VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov"];

function hasExtension(file: string, extensions: string[]) {
  return extensions.includes(path.extname(file).toLowerCase());
}

function readDirSafe(folderPath: string) {
  if (!fs.existsSync(folderPath)) return [];
  return fs.readdirSync(folderPath);
}

function readMetadata(metadataPath: string, fallbackTitle: string) {
  if (!fs.existsSync(metadataPath)) {
    return {
      title: fallbackTitle,
      description: "No description provided.",
    };
  }

  const raw = fs.readFileSync(metadataPath, "utf-8");
  const lines = raw.split(/\r?\n/);

  return {
    title: lines[0]?.trim() || fallbackTitle,
    description:
      lines.slice(1).join("\n").trim() || "No description provided.",
  };
}

export function getProjects() {
  const projectsRoot = path.join(process.cwd(), "public", "projects");

  return CATEGORIES.flatMap((category) => {
    const categoryPath = path.join(projectsRoot, category);

    return readDirSafe(categoryPath)
      .filter((folderName) => {
        const folderPath = path.join(categoryPath, folderName);
        return fs.statSync(folderPath).isDirectory();
      })
      .map<Project>((folderName) => {
        const folderPath = path.join(categoryPath, folderName);
        const publicFolder = `/projects/${category}/${folderName}`;
        const files = readDirSafe(folderPath);

        const metadata = readMetadata(
          path.join(folderPath, "metadata.txt"),
          folderName
        );

        const images = files
          .filter((file) => hasExtension(file, IMAGE_EXTENSIONS))
          .map((file) => withBasePath(`${publicFolder}/${file}`));

        const videos = files
          .filter((file) => hasExtension(file, VIDEO_EXTENSIONS))
          .map((file) => withBasePath(`${publicFolder}/${file}`));

        // Covers stay image-first so the portfolio grid remains quick to scan.
        const cover =
          images.find((file) =>
            /\/thumb\.(png|gif|jpg|jpeg|webp)$/i.test(file)
          ) ||
          images[0] ||
          null;

        const gallery = images.filter(
          (file) => !/\/thumb\.(png|gif|jpg|jpeg|webp)$/i.test(file)
        );

        const playlist = files
          .filter((file) => hasExtension(file, AUDIO_EXTENSIONS))
          .map((file) => ({
            name: path.basename(file, path.extname(file)),
            src: withBasePath(`${publicFolder}/${file}`),
          }));

        // Detail galleries are mixed media: images and videos share one carousel.
        return {
          id: `${category}-${folderName}`,
          category,
          categoryLabel: CATEGORY_LABELS[category],
          slug: folderName,
          title: metadata.title,
          subtitle: CATEGORY_LABELS[category],
          footer: folderName.replace(/-/g, " "),
          description: metadata.description,
          folder: withBasePath(publicFolder),
          cover,
          gallery: [...gallery, ...videos],
          playlist,
          video: videos[0] || null,
          tags: [CATEGORY_LABELS[category]],
        };
      });
  });
}
