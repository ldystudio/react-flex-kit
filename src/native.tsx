import { type Ref, forwardRef, memo } from "react";
import { View, type ViewStyle } from "react-native";
import type {
    FlexAlign,
    FlexConfig,
    FlexJustify,
    GapCalculator,
    NativeFlexLayoutProps,
    NativeFlexProps,
} from "./types";
import { alignMap, justifyMap } from "./utils";

/** Default gap calculator: space * 4 (Tailwind scale) */
const defaultGapCalculator: GapCalculator = (space) => space * 4;

const createNativeStyleCache = (gapCalculator: GapCalculator, maxSize = 100) => {
    const cache = new Map<string, ViewStyle>();

    return (
        direction: ViewStyle["flexDirection"],
        fullWidth: boolean,
        fullHeight: boolean,
        align: FlexAlign,
        justify: FlexJustify,
        space: number
    ): ViewStyle => {
        const key = `${direction}|${fullWidth}|${fullHeight}|${align}|${justify}|${space}`;

        let style = cache.get(key);

        if (!style) {
            style = {
                display: "flex",
                flexDirection: direction,
                alignItems: alignMap[align] as ViewStyle["alignItems"],
                justifyContent: justifyMap[justify] as ViewStyle["justifyContent"],
                gap: gapCalculator(space),
                ...(fullWidth && { width: "100%" }),
                ...(fullHeight && { height: "100%" }),
            };

            if (cache.size >= maxSize) {
                const firstKey = cache.keys().next().value;
                if (firstKey) cache.delete(firstKey);
            }

            cache.set(key, style);
        }

        return style;
    };
};

/**
 * Create customized Row, Col, and Flex components with custom gap calculation
 *
 * @example
 * ```tsx
 * import { scale } from '@flickering/nativewind-scale';
 * import { createFlexComponents } from 'react-flexlayout/native';
 *
 * // Use nativewind-scale for responsive gap
 * export const { Row, Col, Flex } = createFlexComponents({
 *   gapCalculator: (space) => scale(space),
 *   defaultSpace: 8,
 * });
 * ```
 */
export function createFlexComponents(config: FlexConfig = {}) {
    const {
        gapCalculator = defaultGapCalculator,
        defaultSpace = 2,
        defaultAlign = "center",
        defaultJustify = "start",
    } = config;

    const getStyles = createNativeStyleCache(gapCalculator);

    const Row = memo(
        forwardRef(function Row(
            {
                children,
                reverse = false,
                fullWidth = false,
                fullHeight = false,
                align = defaultAlign,
                justify = defaultJustify,
                space = defaultSpace,
                style,
                ...rest
            }: NativeFlexLayoutProps,
            ref: Ref<View>
        ) {
            const baseStyle = getStyles(
                reverse ? "row-reverse" : "row",
                fullWidth,
                fullHeight,
                align,
                justify,
                space
            );

            return (
                <View ref={ref} style={style ? [baseStyle, style] : baseStyle} {...rest}>
                    {children}
                </View>
            );
        })
    );

    const Col = memo(
        forwardRef(function Col(
            {
                children,
                reverse = false,
                fullWidth = false,
                fullHeight = false,
                align = defaultAlign,
                justify = defaultJustify,
                space = defaultSpace,
                style,
                ...rest
            }: NativeFlexLayoutProps,
            ref: Ref<View>
        ) {
            const baseStyle = getStyles(
                reverse ? "column-reverse" : "column",
                fullWidth,
                fullHeight,
                align,
                justify,
                space
            );

            return (
                <View ref={ref} style={style ? [baseStyle, style] : baseStyle} {...rest}>
                    {children}
                </View>
            );
        })
    );

    const Flex = memo(
        forwardRef(function Flex(
            {
                children,
                direction = "row",
                fullWidth = false,
                fullHeight = false,
                align = defaultAlign,
                justify = defaultJustify,
                space = defaultSpace,
                style,
                ...rest
            }: NativeFlexProps,
            ref: Ref<View>
        ) {
            const baseStyle = getStyles(direction, fullWidth, fullHeight, align, justify, space);

            return (
                <View ref={ref} style={style ? [baseStyle, style] : baseStyle} {...rest}>
                    {children}
                </View>
            );
        })
    );

    return { Row, Col, Flex };
}

// Export default components with standard configuration
const defaultComponents = createFlexComponents();

export const Row = defaultComponents.Row;
export const Col = defaultComponents.Col;
export const Flex = defaultComponents.Flex;
