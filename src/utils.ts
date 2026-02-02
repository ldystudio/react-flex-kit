import type { FlexAlign, FlexJustify } from "./types";

export const alignMap: Record<FlexAlign, string> = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
    stretch: "stretch",
    baseline: "baseline",
};

export const justifyMap: Record<FlexJustify, string> = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
    between: "space-between",
    around: "space-around",
    evenly: "space-evenly",
};
