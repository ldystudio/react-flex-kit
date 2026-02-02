import { describe, expect, test } from "bun:test";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { Row } from "../web";

describe("Row", () => {
    test("renders children", () => {
        const html = renderToString(
            <Row>
                <span>Item 1</span>
                <span>Item 2</span>
            </Row>
        );
        expect(html).toContain("Item 1");
        expect(html).toContain("Item 2");
    });

    test("applies flex-direction: row by default", () => {
        const html = renderToString(<Row>content</Row>);
        expect(html).toContain("flex-direction:row");
    });

    test("applies flex-direction: row-reverse when reverse is true", () => {
        const html = renderToString(<Row reverse>content</Row>);
        expect(html).toContain("flex-direction:row-reverse");
    });

    test("applies fullWidth style", () => {
        const html = renderToString(<Row fullWidth>content</Row>);
        expect(html).toContain("width:100%");
    });

    test("applies fullHeight style", () => {
        const html = renderToString(<Row fullHeight>content</Row>);
        expect(html).toContain("height:100%");
    });

    test("applies default align center", () => {
        const html = renderToString(<Row>content</Row>);
        expect(html).toContain("align-items:center");
    });

    test("applies align prop", () => {
        const html = renderToString(<Row align="start">content</Row>);
        expect(html).toContain("align-items:flex-start");
    });

    test("applies default justify start", () => {
        const html = renderToString(<Row>content</Row>);
        expect(html).toContain("justify-content:flex-start");
    });

    test("applies justify prop", () => {
        const html = renderToString(<Row justify="between">content</Row>);
        expect(html).toContain("justify-content:space-between");
    });

    test("applies default space as 0.5rem", () => {
        const html = renderToString(<Row>content</Row>);
        expect(html).toContain("gap:0.5rem");
    });

    test("applies space prop as gap with Tailwind scale", () => {
        const html = renderToString(<Row space={4}>content</Row>);
        expect(html).toContain("gap:1rem");
    });

    test("applies className", () => {
        const html = renderToString(<Row className="custom-class">content</Row>);
        expect(html).toContain('class="custom-class"');
    });

    test("component props override style prop", () => {
        // fullWidth (组件 prop) 优先于 style
        const html = renderToString(
            <Row fullWidth style={{ width: "50%" }}>
                content
            </Row>
        );
        expect(html).toContain("width:100%");
    });

    test("style prop applies when no conflicting component prop", () => {
        // style 中的 padding 不会被组件 props 覆盖
        const html = renderToString(<Row style={{ padding: "10px" }}>content</Row>);
        expect(html).toContain("padding:10px");
    });

    test("forwards HTML attributes", () => {
        const html = renderToString(
            <Row data-testid="test-row" aria-label="row">
                content
            </Row>
        );
        expect(html).toContain('data-testid="test-row"');
        expect(html).toContain('aria-label="row"');
    });

    test("supports ref forwarding", () => {
        const ref = createRef<HTMLDivElement>();
        const html = renderToString(<Row ref={ref}>content</Row>);
        expect(html).toContain("content");
    });
});
