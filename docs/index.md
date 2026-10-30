---
layout: home

hero:
  name: 拾光笔记
  text: 技术、思考与生活
  tagline: 在这里记录学到的知识，也保存认真生活过的痕迹。
  actions:
    - theme: brand
      text: 阅读技术笔记
      link: /tech/
    - theme: alt
      text: 最近的日记
      link: /diary/

features:
  - icon: 💻
    title: 技术笔记
    details: 记录编程知识、开发实践、工具使用和问题复盘。
    link: /tech/
    linkText: 开始阅读
  - icon: ✍️
    title: 日记总结
    details: 保存阶段总结、个人思考和一路走来的成长变化。
    link: /diary/
    linkText: 查看日记
  - icon: 🌿
    title: 生活记录
    details: 分享阅读、旅行、摄影，以及平凡日子里的小事。
    link: /life/
    linkText: 看看生活
---

<script setup>
import HomeMusic from './.vitepress/theme/components/HomeMusic.vue'
</script>

<div class="home-music-wrap">
  <HomeMusic />
</div>
