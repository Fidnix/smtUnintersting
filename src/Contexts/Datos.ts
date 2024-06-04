import { atom } from "nanostores";
import type { ITablaRecord } from "../types/ITablaRecord";

export const defaultTablaRecord: ITablaRecord = [
    {
        equipo: '-',
        entidad: '-',
        ppp: '-'
    }
];
export const datosTablaStore = atom<ITablaRecord>(defaultTablaRecord);