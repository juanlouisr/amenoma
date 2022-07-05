/* eslint-disable @typescript-eslint/no-explicit-any */
import { set } from "idb-keyval";

export class IDBStorage {
  public static setItem(key: string, val: any) {
    Promise.resolve(set(key, val));
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static getItem(_key: string): any {
    return undefined;
  }
}
