export const BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.NODE_ENV === "production" ? "/caninelotus" : "");

export function withBasePath(src: string) {
  if (!src.startsWith("/")) return src;
  return `${BASE_PATH}${src}`;
}
