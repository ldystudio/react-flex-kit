import { describe, expect, test } from "bun:test";
import { renderToString } from "react-dom/server";
import { createFlexComponents, Flex } from "../web";

describe("Flex", () => {
    test("renders with default direction row", () => {
        const html = renderToString(<Flex>content</Flex>);
        expect(html).toContain("flex-direction:row");
    });

    test("renders with column direction", () => {
        const html = renderToString(<Flex direction="column">content</Flex>);
        expect(html).toContain("flex-direction:column");
    });

    test("renders with row-reverse direction", () => {
        const html = renderToString(<Flex direction="row-reverse">content</Flex>);
        expect(html).toContain("flex-direction:row-reverse");
    });

    test("renders with column-reverse direction", () => {
        const html = renderToString(<Flex direction="column-reverse">content</Flex>);
        expect(html).toContain("flex-direction:column-reverse");
    });

    test("applies all flex props", () => {
        const html = renderToString(
            <Flex direction="row" fullWidth fullHeight align="end" justify="between" space={4}>
                content
            </Flex>
        );
        expect(html).toContain("flex-direction:row");
        expect(html).toContain("width:100%");
        expect(html).toContain("height:100%");
        expect(html).toContain("align-items:flex-end");
        expect(html).toContain("justify-content:space-between");
        expect(html).toContain("gap:1rem");
    });
});

describe("createFlexComponents", () => {
    test("creates components with custom gap calculator", () => {
        const { Row } = createFlexComponents({
            gapCalculator: (space) => `${space * 4}px`,
        });

        const html = renderToString(<Row space={4}>content</Row>);
        expect(html).toContain("gap:16px");
    });

    test("creates components with custom defaults", () => {
        const { Row } = createFlexComponents({
            defaultSpace: 4,
            defaultAlign: "start",
            defaultJustify: "between",
        });

        const html = renderToString(<Row>content</Row>);
        expect(html).toContain("gap:1rem"); // 4 * 0.25rem
        expect(html).toContain("align-items:flex-start");
        expect(html).toContain("justify-content:space-between");
    });

    test("creates all three components", () => {
        const { Row, Col, Flex } = createFlexComponents();

        const rowHtml = renderToString(<Row>row</Row>);
        const colHtml = renderToString(<Col>col</Col>);
        const flexHtml = renderToString(<Flex>flex</Flex>);

        expect(rowHtml).toContain("flex-direction:row");
        expect(colHtml).toContain("flex-direction:column");
        expect(flexHtml).toContain("flex-direction:row");
    });
});
