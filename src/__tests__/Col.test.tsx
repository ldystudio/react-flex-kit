import { describe, expect, test } from "bun:test";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { Col } from "../web";

describe("Col", () => {
    test("renders children", () => {
        const html = renderToString(
            <Col>
                <span>Line 1</span>
                <span>Line 2</span>
            </Col>
        );
        expect(html).toContain("Line 1");
        expect(html).toContain("Line 2");
    });

    test("applies flex-direction: column by default", () => {
        const html = renderToString(<Col>content</Col>);
        expect(html).toContain("flex-direction:column");
    });

    test("applies flex-direction: column-reverse when reverse is true", () => {
        const html = renderToString(<Col reverse>content</Col>);
        expect(html).toContain("flex-direction:column-reverse");
    });

    test("applies fullWidth style", () => {
        const html = renderToString(<Col fullWidth>content</Col>);
        expect(html).toContain("width:100%");
    });

    test("applies fullHeight style", () => {
        const html = renderToString(<Col fullHeight>content</Col>);
        expect(html).toContain("height:100%");
    });

    test("applies default align center", () => {
        const html = renderToString(<Col>content</Col>);
        expect(html).toContain("align-items:center");
    });

    test("applies align prop", () => {
        const html = renderToString(<Col align="start">content</Col>);
        expect(html).toContain("align-items:flex-start");
    });

    test("applies default justify start", () => {
        const html = renderToString(<Col>content</Col>);
        expect(html).toContain("justify-content:flex-start");
    });

    test("applies justify prop", () => {
        const html = renderToString(<Col justify="evenly">content</Col>);
        expect(html).toContain("justify-content:space-evenly");
    });

    test("applies default space as 0.5rem", () => {
        const html = renderToString(<Col>content</Col>);
        expect(html).toContain("gap:0.5rem");
    });

    test("applies space prop as gap with Tailwind scale", () => {
        const html = renderToString(<Col space={2}>content</Col>);
        expect(html).toContain("gap:0.5rem");
    });

    test("applies space prop as string value", () => {
        const html = renderToString(<Col space="1rem">content</Col>);
        expect(html).toContain("gap:1rem");
    });

    test("applies custom style", () => {
        const html = renderToString(<Col style={{ padding: "10px" }}>content</Col>);
        expect(html).toContain("padding:10px");
    });

    test("forwards HTML attributes", () => {
        const html = renderToString(
            <Col data-testid="test-col" aria-label="column">
                content
            </Col>
        );
        expect(html).toContain('data-testid="test-col"');
        expect(html).toContain('aria-label="column"');
    });

    test("supports ref forwarding", () => {
        const ref = createRef<HTMLDivElement>();
        const html = renderToString(<Col ref={ref}>content</Col>);
        expect(html).toContain("content");
    });
});
