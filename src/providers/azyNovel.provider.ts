import { ChapterData, LoadResponse, SearchResponse } from "@/models/main.model";
import { prefixUrl, MainAPI, removeScript } from "@/models/novelAPI";

export class AzyNovelProvider extends MainAPI {
  constructor() {
    super("https://azynovel.com", "AzyNovel");
  }

  override async loadFromName(name: string): Promise<LoadResponse> {
    return this.load(`${this.mainUrl}/novel/${name}`);
  }

  override async load(url: string): Promise<LoadResponse> {
    const parser = new DOMParser();
    const res = await Promise.resolve(
      fetch(prefixUrl(url))
        .then((val) => val.text())
        .catch((e) => {
          console.error(e);
          throw new Error(e);
        })
    );
    const htmlDoc = parser.parseFromString(res, "text/html");
    const name =
      htmlDoc.querySelector("div.media-content > div > h1")?.textContent ??
      "unknown";
    const author =
      htmlDoc.querySelector("div.media-content > div > p:nth-child(2) > a")
        ?.textContent ?? "unknown";
    const posterUrl =
      htmlDoc
        .querySelector("div.media-left > figure > img")
        ?.getAttribute("data-src") ?? "";
    const synopsis =
      htmlDoc.querySelector("div.column.is-9 > div.content")?.textContent ?? "";
    const tags: string[] = [];
    htmlDoc
      .querySelectorAll("div.media-content > div > p:nth-child(4) > a")
      .forEach((e) => {
        tags.push(e.textContent ?? "");
      });
    const data: ChapterData[] = [];
    const chapters = htmlDoc.querySelectorAll("a.button.is-light.is-fullwidth");
    chapters.forEach((c) => {
      if (!c.getAttribute("href")?.includes("category")) {
        const cUrl = this.mainUrl + c.getAttribute("href") ?? "";
        const cName = c.getAttribute("title") ?? "unknown chapter";
        data.push(new ChapterData(cName, cUrl));
      }
    });
    return new LoadResponse(url, name, data, author, posterUrl, synopsis, tags);
  }

  override async loadContent(url: string): Promise<string> {
    const parser = new DOMParser();
    const res = await Promise.resolve(
      fetch(prefixUrl(url))
        .then((val) => val.text())
        .catch((e) => {
          console.error(e);
          throw new Error(e);
        })
    );
    const htmlDoc = parser.parseFromString(res, "text/html");
    const content = htmlDoc.querySelector("div.column.is-9 > div:nth-child(5)");
    content?.querySelectorAll(".adsbygoogle").forEach((e) => e.remove());
    return removeScript(content?.innerHTML) ?? "content error";
  }

  override async search(query: string): Promise<SearchResponse[]> {
    const parser = new DOMParser();
    const res = await Promise.resolve(
      fetch(prefixUrl(`${this.mainUrl}/search?q=${query}`))
        .then((val) => val.text())
        .catch((e) => {
          console.error(e);
          throw new Error(e);
        })
    );
    const document = parser.parseFromString(res, "text/html");
    const headers = document.querySelectorAll("a.box.is-shadowless");
    if (headers.length <= 0) return [];
    const ret: SearchResponse[] = [];
    headers.forEach((h) => {
      const name = h.querySelector("span")?.textContent ?? "";
      const cUrl = this.mainUrl + h.getAttribute("href");
      const nameRoute = cUrl.replace(`${this.mainUrl}/novel/`, "");
      const posterUrl =
        h
          .querySelector("div.media-left > figure > img")
          ?.getAttribute("data-src") ?? "/";
      ret.push(
        new SearchResponse(
          name,
          cUrl,
          nameRoute,
          this.name,
          null,
          this.fixUrl(posterUrl),
          null
        )
      );
    });
    return ret;
  }
}
