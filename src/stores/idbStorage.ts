/* eslint-disable @typescript-eslint/no-explicit-any */
import { get, set } from "idb-keyval";

export class IDBStorage {
  public static setItem(key: string, val: any) {
    Promise.resolve(set(key, val));
  }
  public static getItem(key: string): any {
    return Promise.resolve(get(key));
  }
}
