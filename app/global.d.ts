import { StaticImageData } from "next/image"

export {}

declare global {
    type FixArray<T, L extends number> = readonly T[] & { length: L };
}






