export class LoadResponse {
  constructor(
    public url: string,
    public name: string,
    public data: ChapterData[],
    public author?: string,
    public posterUrl?: string,
    public synopsis?: string,
    public tags?: string[],
    public status: Status = Status.NULL
  ) {}
}

export enum Status {
  NULL = 0,
  ONGOING = 1,
  COMPLETE = 2,
  PAUSE = 3,
  DROPPED = 4,
}

export class ChapterData {
  constructor(
    public name: string,
    public url: string,
    public dateOfRelease?: string
  ) {}
}

export declare type Pair = { [key: string]: string };
