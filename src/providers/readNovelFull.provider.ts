import type { LoadResponse } from "@/models/main.model";
import { MainAPI } from "@/models/novelAPI";

export class ReadNovelFullProvider extends MainAPI {
  constructor() {
    super("https://readnovelfull.com", "ReadNovelFull");
  }
  override load(_url: string): LoadResponse | null {
    throw Error("Not Implemented");
  }
  override loadContent(_url: string): string {
    throw Error("Not Implemented");
  }
}
