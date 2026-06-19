// Utilities for external course resources (covers, PDFs, videos) hosted on
// Google Drive / YouTube. The app only consumes links — it never downloads,
// duplicates, or writes to Drive, and never stores heavy media in the repo.
//
// Everything here is defensive: invalid or empty URLs resolve to "no resource"
// so callers render a premium fallback or omit a control instead of a broken
// embed. No private IDs are assumed to be public; we only transform link shape.

export type ResourceProvider = "google-drive" | "youtube" | "external";

export type ResourceStatus = "definitive" | "provisional" | "pending" | "invalid";

export type ExternalCourseResource = {
  url?: string;
  provider: ResourceProvider;
  status: ResourceStatus;
  updatedAt?: string;
};

const PLACEHOLDER_PATTERNS = [
  /1_[A-Z]\d{5}/,
  /\.placeholder(?:\/|$)/i,
  /example\.(?:com|org|net)/i,
];

const LOCAL_OR_PRIVATE_HOSTS = new Set(["localhost", "127.0.0.1", "0.0.0.0", "::1"]);

/** True for a syntactically valid http(s) URL. */
export function isValidHttpUrl(url?: string): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url.trim());
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

function getHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export function isKnownPlaceholderUrl(url?: string): boolean {
  if (!url) return false;
  return PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(url));
}

/**
 * Reject resource URLs that are clearly local, placeholders, Drive folders, or
 * Drive admin surfaces. This is not a public-permission check; it only prevents
 * links that are obviously not renderable course assets from reaching the UI.
 */
export function isClearlyPrivateOrAdminResourceUrl(url?: string): boolean {
  if (!isValidHttpUrl(url)) return true;
  if (isKnownPlaceholderUrl(url)) return true;

  const parsed = new URL(url!.trim());
  const host = parsed.hostname.replace(/^www\./, "");
  if (LOCAL_OR_PRIVATE_HOSTS.has(host) || host.endsWith(".local")) return true;

  if (!isGoogleDriveUrl(url)) return false;

  const path = parsed.pathname.toLowerCase();
  return (
    path.startsWith("/drive/") ||
    path.includes("/drive/folders/") ||
    path.includes("/drive/shared-drives/") ||
    path.includes("/drive/my-drive/") ||
    path.includes("/forms/")
  );
}

export function isGoogleDriveUrl(url?: string): boolean {
  if (!isValidHttpUrl(url)) return false;
  const host = getHost(url!.trim());
  return host === "drive.google.com" || host === "docs.google.com" || host.endsWith(".googleusercontent.com");
}

/** Extract a Google Drive file id from the common link shapes. */
export function getDriveFileId(url?: string): string | null {
  if (!isGoogleDriveUrl(url)) return null;
  if (isClearlyPrivateOrAdminResourceUrl(url)) return null;
  const value = url!.trim();
  // .../file/d/<id>/view  |  ...?id=<id>  |  .../d/<id>/...
  const byPath = value.match(/\/(?:file\/)?d\/([a-zA-Z0-9_-]{10,})/);
  if (byPath) return byPath[1];
  try {
    const id = new URL(value).searchParams.get("id");
    if (id && /^[a-zA-Z0-9_-]{10,}$/.test(id)) return id;
  } catch {
    /* ignore */
  }
  return null;
}

/**
 * Convert a Drive sharing link to a direct-view image URL usable in <img>.
 * Returns the original URL when it isn't a recognizable Drive file link, and
 * null when the input is not a valid URL at all. Does NOT grant permissions —
 * the file must already be shared publicly for this to render.
 */
export function toDriveDirectImageUrl(url?: string): string | null {
  if (!isValidHttpUrl(url)) return null;
  if (isClearlyPrivateOrAdminResourceUrl(url)) return null;
  const id = getDriveFileId(url);
  if (id) return `https://drive.google.com/uc?export=view&id=${id}`;
  return url!.trim();
}

/** Open-in-new-tab document link for a Drive PDF (preview, not auto-download). */
export function toDrivePreviewUrl(url?: string): string | null {
  if (!isValidHttpUrl(url)) return null;
  if (isClearlyPrivateOrAdminResourceUrl(url)) return null;
  const id = getDriveFileId(url);
  if (id) return `https://drive.google.com/file/d/${id}/view`;
  return url!.trim();
}

/** Detect provider from a URL for tagging/diagnostics. */
export function detectProvider(url?: string): ResourceProvider {
  if (isGoogleDriveUrl(url)) return "google-drive";
  const host = isValidHttpUrl(url) ? getHost(url!.trim()) : "";
  if (host === "youtu.be" || host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
    return "youtube";
  }
  return "external";
}

/**
 * Resolve a course cover from its visual-identity links. Prefers the explicit
 * full/thumbnail Drive links; falls back to a local repo image when provided;
 * otherwise signals that the editorial fallback should render.
 */
export type ResolvedCover =
  | { kind: "remote"; src: string; alt: string }
  | { kind: "local"; src: string; alt: string }
  | { kind: "fallback"; alt: string };

export function resolveCover(opts: {
  remoteUrl?: string;
  localSrc?: string;
  alt: string;
  preferThumb?: boolean;
}): ResolvedCover {
  const remote = toDriveDirectImageUrl(opts.remoteUrl);
  if (remote && isValidHttpUrl(opts.remoteUrl)) {
    return { kind: "remote", src: remote, alt: opts.alt };
  }
  if (opts.localSrc) {
    return { kind: "local", src: opts.localSrc, alt: opts.alt };
  }
  return { kind: "fallback", alt: opts.alt };
}
