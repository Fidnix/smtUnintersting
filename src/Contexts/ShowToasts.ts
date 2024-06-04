import { atom } from "nanostores";
import type { Error } from "../types/Error";

export const showToastsStore = atom<Array<Error>>([]);