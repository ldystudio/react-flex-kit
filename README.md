# react-flex-kit

轻量级的 Flexbox 布局组件库，同时支持 React (Web) 和 React Native。

## 特性

- 🚀 **轻量** - 压缩后仅 ~4KB
- 📱 **跨平台** - 同时支持 React Web 和 React Native
- 🎨 **Tailwind 风格** - gap 间距系统与 Tailwind CSS 一致
- ⚡ **高性能** - 内置样式缓存和 React.memo 优化
- 🔧 **可定制** - 支持自定义 gap 计算函数和默认值
- 📦 **Tree-shaking** - ESM 支持，按需打包

## 安装

```bash
# npm
npm install react-flex-kit

# yarn
yarn add react-flex-kit

# pnpm
pnpm add react-flex-kit

# bun
bun add react-flex-kit
```

## 基本使用

### Web

```tsx
import { Row, Col, Flex } from 'react-flex-kit';

function App() {
  return (
    <Col space={4} fullWidth>
      <Row space={2} justify="between">
        <span>Left</span>
        <span>Right</span>
      </Row>
      <Row space={2}>
        <button>Button 1</button>
        <button>Button 2</button>
        <button>Button 3</button>
      </Row>
    </Col>
  );
}
```

### React Native

```tsx
import { Row, Col, Flex } from 'react-flex-kit/native';

function App() {
  return (
    <Col space={4} fullWidth>
      <Row space={2} justify="between">
        <Text>Left</Text>
        <Text>Right</Text>
      </Row>
      <Row space={2}>
        <Button title="Button 1" />
        <Button title="Button 2" />
      </Row>
    </Col>
  );
}
```

## 组件

### Row

水平方向的 Flex 容器。

```tsx
<Row space={4} align="center" justify="between">
  {children}
</Row>
```

### Col

垂直方向的 Flex 容器。

```tsx
<Col space={4} align="center" justify="start">
  {children}
</Col>
```

### Flex

通用 Flex 容器，可指定方向。

```tsx
<Flex direction="row" space={4}>
  {children}
</Flex>
```

## Props

| 属性         | 类型                         | 默认值     | 说明                |
| ------------ | ---------------------------- | ---------- | ------------------- |
| `children`   | `ReactNode`                  | -          | 子元素              |
| `reverse`    | `boolean`                    | `false`    | 反转子元素顺序      |
| `fullWidth`  | `boolean`                    | `false`    | 宽度 100%           |
| `fullHeight` | `boolean`                    | `false`    | 高度 100%           |
| `align`      | `FlexAlign`                  | `"center"` | 交叉轴对齐          |
| `justify`    | `FlexJustify`                | `"start"`  | 主轴对齐            |
| `space`      | `number \| string`           | `2`        | 子元素间距          |
| `className`  | `string`                     | -          | CSS 类名 (仅 Web)   |
| `style`      | `CSSProperties \| ViewStyle` | -          | 内联样式            |
| `direction`  | `FlexDirection`              | `"row"`    | 方向 (仅 Flex 组件) |
| `ref`        | `Ref`                        | -          | 元素引用            |

### FlexAlign

```ts
type FlexAlign = "start" | "center" | "end" | "stretch" | "baseline";
```

### FlexJustify

```ts
type FlexJustify = "start" | "center" | "end" | "between" | "around" | "evenly";
```

### FlexDirection

```ts
type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";
```

## 间距系统

`space` 属性遵循 Tailwind CSS 的间距系统：

| space    | Web     | React Native |
| -------- | ------- | ------------ |
| `1`      | 0.25rem | 4px          |
| `2`      | 0.5rem  | 8px          |
| `4`      | 1rem    | 16px         |
| `8`      | 2rem    | 32px         |
| `"20px"` | 20px    | -            |

## 自定义配置

使用 `createFlexComponents` 创建自定义配置的组件：

### Web

```tsx
import { createFlexComponents } from 'react-flex-kit';

export const { Row, Col, Flex } = createFlexComponents({
  // 自定义 gap 计算函数
  gapCalculator: (space) => `${space * 4}px`,
  // 默认间距
  defaultSpace: 4,
  // 默认对齐
  defaultAlign: "start",
  // 默认主轴对齐
  defaultJustify: "start",
});
```

### React Native (使用 nativewind-scale)

```tsx
import { scale } from '@flickering/nativewind-scale';
import { createFlexComponents } from 'react-flex-kit/native';

export const { Row, Col, Flex } = createFlexComponents({
  // 使用响应式缩放
  gapCalculator: (space) => scale(space),
  defaultSpace: 8,
});
```

### React Native + NativeWind

配合 NativeWind 使用时，通过 `cssInterop` 启用 `className` 支持：

```tsx
// components/Flex.tsx
import { scale } from '@flickering/nativewind-scale';
import { cssInterop } from 'nativewind';
import { createFlexComponents } from 'react-flex-kit/native';

const { Row, Col, Flex } = createFlexComponents({
  gapCalculator: (space) => scale(space),
  defaultSpace: 8,
});

for (const component of [Row, Col, Flex]) {
  cssInterop(component, { className: { target: 'style' } });
}

export { Row, Col, Flex };
```

然后就可以直接使用 Tailwind 类名了：

```tsx
import { Row } from '@/components/Flex';

<Row className="justify-center bg-red-200">
  <Text>Hello</Text>
</Row>
```

## 样式优先级

组件 props > 内联 `style` > `className` (Tailwind)

```tsx
// fullWidth 会覆盖 style 的 width
<Row fullWidth style={{ width: "50%" }}>
  {/* width: 100% (fullWidth 优先) */}
</Row>

// style 中不冲突的属性会保留
<Row fullWidth style={{ padding: "10px" }}>
  {/* width: 100%, padding: 10px */}
</Row>

// 组件 props 生成的内联样式会覆盖 Tailwind 类
<Row className="gap-2" space={4}>
  {/* gap: 1rem (space={4}) 覆盖 gap-2 */}
</Row>
```

## HTML 属性透传

组件支持所有原生 HTML/View 属性：

```tsx
// Web
<Row
  data-testid="my-row"
  aria-label="Row container"
  onClick={() => console.log('clicked')}
>
  {children}
</Row>

// React Native
<Row
  testID="my-row"
  accessibilityLabel="Row container"
  onLayout={(e) => console.log(e)}
>
  {children}
</Row>
```

## TypeScript

完整的类型支持：

```tsx
import type {
  FlexLayoutProps,
  FlexProps,
  FlexAlign,
  FlexJustify,
  FlexDirection,
  FlexConfig,
} from 'react-flex-kit';

// React Native
import type {
  NativeFlexLayoutProps,
  NativeFlexProps,
} from 'react-flex-kit/native';
```

## 兼容性

- React 17+
- React Native 0.60+
- TypeScript 4.7+

## License

MIT
