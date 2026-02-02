import { type CSSProperties, type Ref, forwardRef, memo } from "react";
import type { FlexAlign, FlexConfig, FlexJustify, FlexLayoutProps, FlexProps } from "./types";
import { alignMap, justifyMap } from "./utils";

/** Default gap calculator for web: space * 0.25rem (Tailwind scale) */
const defaultWebGapCalculator = (space: number): string => `${space * 0.25}rem`;

const createWebStyleCache = (gapCalculator: (space: number) => string, maxSize = 100) => {
    const cache = new Map<string, CSSProperties>();

    return (
        direction: string,
        fullWidth: boolean,
        fullHeight: boolean,
        align: FlexAlign,
        justify: FlexJustify,
        space: number | string,
        userStyle?: CSSProperties
    ): CSSProperties => {
        const key = `${direction}|${fullWidth}|${fullHeight}|${align}|${justify}|${space}`;

        let baseStyle = cache.get(key);

        if (!baseStyle) {
            baseStyle = {
                display: "flex",
                flexDirection: direction as CSSProperties["flexDirection"],
                alignItems: alignMap[align],
                justifyContent: justifyMap[justify],
                gap: typeof space === "number" ? gapCalculator(space) : space,
                ...(fullWidth && { width: "100%" }),
                ...(fullHeight && { height: "100%" }),
            };

            if (cache.size >= maxSize) {
                const firstKey = cache.keys().next().value;
                if (firstKey) cache.delete(firstKey);
            }

            cache.set(key, baseStyle);
        }

        // 优先级: 组件 props > 内联 style > className
        return userStyle ? { ...userStyle, ...baseStyle } : baseStyle;
    };
};

/** Web-specific config with string gap support */
export interface WebFlexConfig extends Omit<FlexConfig, "gapCalculator"> {
    /** Custom gap calculator function (default: space * 0.25rem) */
    gapCalculator?: (space: number) => string;
}

/**
 * Create customized Row, Col, and Flex components for web with custom gap calculation
 *
 * @example
 * ```tsx
 * import { createFlexComponents } from 'react-flex-kit';
 *
 * // Use custom gap calculation
 * export const { Row, Col, Flex } = createFlexComponents({
 *   gapCalculator: (space) => `${space * 4}px`,
 *   defaultSpace: 4,
 * });
 * ```
 */
export function createFlexComponents(config: WebFlexConfig = {}) {
    const {
        gapCalculator = defaultWebGapCalculator,
        defaultSpace = 2,
        defaultAlign = "center",
        defaultJustify = "start",
    } = config;

    const getStyles = createWebStyleCache(gapCalculator);

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
                className,
                style,
                ...rest
            }: FlexLayoutProps,
            ref: Ref<HTMLDivElement>
        ) {
            const baseStyle = getStyles(
                reverse ? "row-reverse" : "row",
                fullWidth,
                fullHeight,
                align,
                justify,
                space,
                style
            );

            return (
                <div ref={ref} className={className} style={baseStyle} {...rest}>
                    {children}
                </div>
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
                className,
                style,
                ...rest
            }: FlexLayoutProps,
            ref: Ref<HTMLDivElement>
        ) {
            const baseStyle = getStyles(
                reverse ? "column-reverse" : "column",
                fullWidth,
                fullHeight,
                align,
                justify,
                space,
                style
            );

            return (
                <div ref={ref} className={className} style={baseStyle} {...rest}>
                    {children}
                </div>
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
                className,
                style,
                ...rest
            }: FlexProps,
            ref: Ref<HTMLDivElement>
        ) {
            const baseStyle = getStyles(direction, fullWidth, fullHeight, align, justify, space, style);

            return (
                <div ref={ref} className={className} style={baseStyle} {...rest}>
                    {children}
                </div>
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
