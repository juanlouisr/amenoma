import { ChapterData, LoadResponse } from "@/models/main.model";
import { prefixUrl, MainAPI, removeScript } from "@/models/novelAPI";

export class AzyNovelProvider extends MainAPI {
  constructor() {
    super("https://azynovel.com", "AzyNovel");
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

    const posterUrl = htmlDoc
      .querySelector("div.media-left > figure > img")
      ?.getAttribute("data-src");

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
}
