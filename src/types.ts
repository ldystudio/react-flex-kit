import type { HTMLAttributes, ReactNode } from "react";
import type { ViewProps, ViewStyle } from "react-native";

export type FlexAlign = "start" | "center" | "end" | "stretch" | "baseline";

export type FlexJustify = "start" | "center" | "end" | "between" | "around" | "evenly";

export type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";

/** Gap calculator function type */
export type GapCalculator = (space: number) => number;

/** Web flex layout props */
export interface FlexLayoutProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    children?: ReactNode;
    /** Reverse the order of children */
    reverse?: boolean;
    /** Take full width of parent */
    fullWidth?: boolean;
    /** Take full height of parent */
    fullHeight?: boolean;
    /** Align items on the cross axis (default: "center") */
    align?: FlexAlign;
    /** Justify content on the main axis (default: "start") */
    justify?: FlexJustify;
    /** Gap between children using Tailwind scale (default: 2 = 0.5rem) */
    space?: number | string;
}

/** Web Flex component props with direction */
export interface FlexProps extends FlexLayoutProps {
    /** Flex direction */
    direction?: FlexDirection;
}

/** React Native flex layout props */
export interface NativeFlexLayoutProps extends Omit<ViewProps, "children" | "style"> {
    children?: ReactNode;
    /** Reverse the order of children */
    reverse?: boolean;
    /** Take full width of parent */
    fullWidth?: boolean;
    /** Take full height of parent */
    fullHeight?: boolean;
    /** Align items on the cross axis (default: "center") */
    align?: FlexAlign;
    /** Justify content on the main axis (default: "start") */
    justify?: FlexJustify;
    /** Gap between children (default: 2) */
    space?: number;
    /** Additional styles for React Native */
    style?: ViewStyle;
}

/** React Native Flex component props with direction */
export interface NativeFlexProps extends NativeFlexLayoutProps {
    /** Flex direction */
    direction?: FlexDirection;
}

/** Configuration for creating flex components */
export interface FlexConfig {
    /** Custom gap calculator function (default: space * 4 for RN, space * 0.25rem for web) */
    gapCalculator?: GapCalculator;
    /** Default space value (default: 2) */
    defaultSpace?: number;
    /** Default align value (default: "center") */
    defaultAlign?: FlexAlign;
    /** Default justify value (default: "start") */
    defaultJustify?: FlexJustify;
}
