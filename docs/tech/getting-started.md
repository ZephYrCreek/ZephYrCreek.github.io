---
title: 开始写第一篇技术笔记
description: VitePress 技术文章示例
---

# 开始写第一篇技术笔记

在 `docs/tech/` 中新建 Markdown 文件，然后把它加入侧边栏即可。

## 文章信息

每篇文章可以在顶部填写 Frontmatter：

```yaml
---
title: 文章标题
description: 一句话介绍文章内容
---
```

## 代码示例

```ts
function greet(name: string) {
  return `你好，${name}`
}

console.log(greet('VitePress'))
```

::: tip 写作建议
一篇技术笔记最好包含问题背景、解决过程、最终方案和踩坑记录。
:::
