import type { LoadResponse, Pair } from "./main.model";

export const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36";

export abstract class MainAPI {
  public lang = "en";
  public mainCategories: Pair[] = [];
  public orderBys: Pair[] = [];
  public tags: Pair[] = [];

  constructor(public mainUrl: string, public name: string) {}

  abstract load(url: string): Promise<LoadResponse | null>;

  abstract loadContent(url: string): Promise<string>;

  fixUrl(url: string): string {
    if (url.startsWith("http")) {
      return url;
    }
    const startsWithNoHttp = url.startsWith("//");
    if (startsWithNoHttp) {
      return `https:${url}`;
    } else {
      if (url.startsWith("/")) {
        return this.mainUrl + url;
      }
      return `${this.mainUrl}/${url}`;
    }
  }
}

export function getCorsProxyUrl(): string {
  return import.meta.env.VITE_CORS_PROXY;
}

declare global {
  interface String {
    textClean(): string;
  }
}

String.prototype.textClean = (): string => {
  return String(this)
    .replace(/\\.([A-z]|\\+)/, "$1")
    .replace(/\\+([A-z])/, "$1");
};
export {};
