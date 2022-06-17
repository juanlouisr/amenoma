import type { LoadResponse } from "@/models/main.model";
import { MainAPI } from "@/models/novelAPI";

export class ReadNovelFullProvider extends MainAPI {
  constructor() {
    super("https://readnovelfull.com", "ReadNovelFull");
  }
  override load(_url: string): Promise<LoadResponse | null> {
    throw Error("Not Implemented");
  }
  override async loadContent(url: string): Promise<string> {
    const parser = new DOMParser();
    const res = await Promise.resolve(fetch(url).then((val) => val.text()));
    console.log(res);
    const htmlDoc = parser.parseFromString(res, "text/xml");

    return "";
  }
}
