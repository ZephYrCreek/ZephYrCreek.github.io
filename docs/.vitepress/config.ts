import { readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'

const docsRoot = fileURLToPath(new URL('../', import.meta.url))
const collator = new Intl.Collator('zh-CN', { numeric: true, sensitivity: 'base' })

function buildSidebar(directory: string, routeBase: string): DefaultTheme.SidebarItem[] {
  const entries = readdirSync(directory, { withFileTypes: true })
    .filter((entry) => !entry.name.startsWith('.') && entry.name !== 'index.md')
    .sort((left, right) => {
      if (left.isDirectory() !== right.isDirectory()) return left.isDirectory() ? -1 : 1
      return collator.compare(left.name, right.name)
    })

  return entries.flatMap((entry): DefaultTheme.SidebarItem[] => {
    if (entry.isDirectory()) {
      const items = buildSidebar(path.join(directory, entry.name), `${routeBase}${entry.name}/`)
      if (!items.length) return []

      return [{
        text: entry.name,
        collapsed: true,
        items
      }]
    }

    if (!entry.isFile() || !entry.name.toLowerCase().endsWith('.md')) return []

    const filename = entry.name.slice(0, -3)
    return [{
      text: filename,
      link: `${routeBase}${filename}`
    }]
  })
}

const dataStructuresSidebar = buildSidebar(
  path.join(docsRoot, 'tech', 'data-structures'),
  '/tech/data-structures/'
)

const mathSidebar = buildSidebar(
  path.join(docsRoot, 'tech', 'math'),
  '/tech/math/'
)

export default defineConfig({
  lang: 'zh-CN',
  title: '拾光笔记',
  description: '技术、思考与生活的个人记录',
  cleanUrls: true,
  lastUpdated: true,

  markdown: {
    math: true
  },

  head: [
    ['meta', { name: 'theme-color', content: '#3b82f6' }],
    ['meta', { name: 'author', content: '博客作者' }]
  ],

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '技术笔记', link: '/tech/' },
      { text: '日记总结', link: '/diary/' },
      { text: '生活记录', link: '/life/' },
      { text: '关于我', link: '/about' }
    ],

    sidebar: {
      '/tech/': [
        {
          text: '技术笔记',
          items: [
            { text: '栏目介绍', link: '/tech/' },
            { text: '开始写第一篇笔记', link: '/tech/getting-started' },
            {
              text: '数据结构',
              link: '/tech/data-structures/',
              collapsed: false,
              items: dataStructuresSidebar
            },
            {
              text: '数学',
              link: '/tech/math/',
              collapsed: false,
              items: mathSidebar
            }
          ]
        }
      ],
      '/diary/': [
        {
          text: '日记总结',
          items: [{ text: '全部记录', link: '/diary/' }]
        }
      ],
      '/life/': [
        {
          text: '生活记录',
          items: [{ text: '全部记录', link: '/life/' }]
        }
      ]
    },

    outline: {
      level: [2, 4],
      label: '本页目录'
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索'
          },
          modal: {
            noResultsText: '没有找到相关内容',
            resetButtonTitle: '清除查询',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    },

    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    footer: {
      message: '记录值得被记住的内容',
      copyright: 'Copyright © 2026 拾光笔记'
    }
  }
})
