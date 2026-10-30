<script setup lang="ts">
import HomeMusic from './HomeMusic.vue'

const categories = [
  {
    number: '01',
    eyebrow: 'TECH NOTES',
    title: '技术笔记',
    description: '从数据结构到开发实践，把零散知识整理成可以反复查阅的路径。',
    meta: '9 篇数据结构笔记',
    link: '/tech/',
    className: 'category-tech'
  },
  {
    number: '02',
    eyebrow: 'JOURNAL',
    title: '日记总结',
    description: '记录阶段性的复盘与思考，让走过的路留下清晰的坐标。',
    meta: '持续书写中',
    link: '/diary/',
    className: 'category-journal'
  },
  {
    number: '03',
    eyebrow: 'LIFE LOG',
    title: '生活记录',
    description: '收藏阅读、旅行与寻常日子里，那些值得被记住的小事。',
    meta: '慢慢更新',
    link: '/life/',
    className: 'category-life'
  }
]

const focusItems = [
  { label: '数据结构', value: '图 · 查找 · 队列' },
  { label: '泛函分析', value: '度量空间 · 赋范空间' },
  { label: '多元统计', value: '多元正态分布' }
]
</script>

<template>
  <main class="landing">
    <section class="hero-section">
      <div class="hero-orb hero-orb-one" />
      <div class="hero-orb hero-orb-two" />

      <div class="hero-grid">
        <div class="hero-copy">
          <p class="eyebrow"><span /> PERSONAL KNOWLEDGE GARDEN</p>
          <h1>
            把复杂的知识，
            <strong>写成清晰的路。</strong>
          </h1>
          <p class="hero-description">
            这里收录技术学习、个人思考与生活切片。<br class="desktop-break" />
            不追逐信息流，只沉淀真正理解过的东西。
          </p>

          <div class="hero-actions">
            <a class="primary-action" href="/tech/">
              开始阅读
              <span aria-hidden="true">↗</span>
            </a>
            <a class="text-action" href="/about">
              了解这个博客
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <dl class="hero-stats" aria-label="站点内容统计">
            <div>
              <dt>27</dt>
              <dd>篇学习笔记</dd>
            </div>
            <div>
              <dt>03</dt>
              <dd>个内容分类</dd>
            </div>
            <div>
              <dt>∞</dt>
              <dd>持续生长</dd>
            </div>
          </dl>
        </div>

        <div class="hero-visual" aria-hidden="true">
          <div class="visual-shell">
            <div class="visual-topbar">
              <div class="window-dots"><i /><i /><i /></div>
              <span>NOTE / 027</span>
            </div>

            <article class="note-paper">
              <div class="paper-index">当前学习轨迹</div>
              <h2>从图的遍历<br />到完备空间</h2>
              <p>在具体问题与抽象结构之间，寻找可以迁移的理解。</p>
              <div class="paper-rule" />
              <ul>
                <li><span>01</span> 广度优先与深度优先</li>
                <li><span>02</span> 度量、收敛与完备性</li>
                <li><span>03</span> 多元正态分布</li>
              </ul>
            </article>

            <div class="floating-card floating-card-left">
              <span class="floating-mark">⌘</span>
              <div><b>DATA STRUCTURE</b><small>9 篇笔记</small></div>
            </div>
            <div class="floating-card floating-card-right">
              <span class="floating-mark">∑</span>
              <div><b>MATHEMATICS</b><small>18 篇笔记</small></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section categories-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow"><span /> EXPLORE THE GARDEN</p>
          <h2>从你感兴趣的地方开始</h2>
        </div>
        <p>知识不必按顺序抵达。选择一个入口，沿着链接慢慢走。</p>
      </div>

      <div class="category-grid">
        <a
          v-for="category in categories"
          :key="category.title"
          :href="category.link"
          class="category-card"
          :class="category.className"
        >
          <div class="category-topline">
            <span>{{ category.number }}</span>
            <i aria-hidden="true">↗</i>
          </div>
          <div class="category-symbol" aria-hidden="true"><span /></div>
          <p>{{ category.eyebrow }}</p>
          <h3>{{ category.title }}</h3>
          <div class="category-footer">
            <span>{{ category.description }}</span>
            <small>{{ category.meta }}</small>
          </div>
        </a>
      </div>
    </section>

    <section class="section focus-section">
      <div class="focus-title">
        <p class="eyebrow"><span /> CURRENTLY LEARNING</p>
        <h2>最近在研究</h2>
      </div>
      <div class="focus-list">
        <a v-for="(item, index) in focusItems" :key="item.label" href="/tech/">
          <span class="focus-index">0{{ index + 1 }}</span>
          <span class="focus-label">{{ item.label }}</span>
          <strong>{{ item.value }}</strong>
          <i aria-hidden="true">→</i>
        </a>
      </div>
    </section>

    <section class="section music-section">
      <div class="music-copy">
        <p class="eyebrow eyebrow-light"><span /> LISTEN & READ</p>
        <h2>给阅读留一点<br />背景音乐。</h2>
        <p>有些文字适合安静地读，有些思路会在旋律里慢慢展开。</p>
        <div class="music-wave" aria-hidden="true">
          <i v-for="height in [18, 34, 24, 46, 30, 56, 38, 26, 42, 20, 32, 16]" :key="height" :style="{ height: `${height}px` }" />
        </div>
      </div>
      <HomeMusic />
    </section>

    <section class="closing-note">
      <span>“</span>
      <p>记录不是为了囤积信息，<br />而是为了看见自己如何一步步理解世界。</p>
      <a href="/about">关于拾光笔记 →</a>
    </section>
  </main>
</template>

<style scoped>
.landing {
  --ink: #172033;
  --muted: #687086;
  --paper: #f7f8fb;
  --line: rgba(23, 32, 51, 0.11);
  max-width: 1440px;
  margin: 0 auto;
  color: var(--ink);
}

:global(.dark) .landing {
  --ink: #edf1f8;
  --muted: #9da7ba;
  --paper: #151922;
  --line: rgba(255, 255, 255, 0.11);
}

.hero-section {
  position: relative;
  min-height: 680px;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 30px;
  background:
    linear-gradient(var(--line) 1px, transparent 1px),
    linear-gradient(90deg, var(--line) 1px, transparent 1px),
    var(--paper);
  background-size: 48px 48px;
  box-shadow: 0 30px 90px rgba(25, 32, 49, 0.08);
}

.hero-section::after {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, var(--paper) 0%, rgba(247, 248, 251, 0.92) 42%, transparent 72%);
  content: '';
  pointer-events: none;
}

:global(.dark) .hero-section::after {
  background: linear-gradient(90deg, var(--paper) 0%, rgba(21, 25, 34, 0.92) 42%, transparent 72%);
}

.hero-orb {
  position: absolute;
  z-index: 0;
  border-radius: 999px;
  filter: blur(1px);
  opacity: 0.8;
}

.hero-orb-one {
  top: -170px;
  right: -90px;
  width: 470px;
  height: 470px;
  background: radial-gradient(circle at 35% 35%, #b9a7ff, #7560da 55%, #45398c);
}

.hero-orb-two {
  right: 24%;
  bottom: -250px;
  width: 420px;
  height: 420px;
  background: radial-gradient(circle at 40% 35%, #96ead0, #35a981 60%, #1c6e56);
}

.hero-grid {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(0, 1.02fr) minmax(420px, 0.98fr);
  min-height: 680px;
}

.hero-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 78px 38px 64px 72px;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 24px;
  color: var(--muted);
  font-size: 11px;
  font-weight: 750;
  letter-spacing: 0.19em;
}

.eyebrow > span {
  width: 22px;
  height: 2px;
  background: #6d5bd0;
}

.hero-copy h1 {
  max-width: 650px;
  margin: 0;
  color: var(--ink);
  font-size: clamp(48px, 5.1vw, 76px);
  font-weight: 760;
  letter-spacing: -0.065em;
  line-height: 1.08;
}

.hero-copy h1 strong {
  display: block;
  color: #6d5bd0;
  font-weight: inherit;
}

.hero-description {
  margin: 28px 0 0;
  color: var(--muted);
  font-size: 17px;
  line-height: 1.85;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 28px;
  margin-top: 34px;
}

.primary-action,
.text-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  text-decoration: none;
  transition: transform 0.25s ease, box-shadow 0.25s ease, color 0.25s ease;
}

.primary-action {
  min-height: 52px;
  border-radius: 999px;
  padding: 0 24px;
  color: #fff;
  background: #1c2435;
  box-shadow: 0 12px 30px rgba(23, 32, 51, 0.2);
  font-weight: 650;
}

:global(.dark) .primary-action {
  color: #172033;
  background: #f4f6fb;
  box-shadow: none;
}

.primary-action:hover {
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 16px 36px rgba(23, 32, 51, 0.28);
}

:global(.dark) .primary-action:hover { color: #172033; }

.text-action {
  color: var(--ink);
  font-size: 14px;
  font-weight: 650;
}

.text-action:hover { color: #6d5bd0; }
.text-action:hover span { transform: translateX(3px); }
.text-action span { transition: transform 0.2s ease; }

.hero-stats {
  display: flex;
  gap: 36px;
  margin: 54px 0 0;
}

.hero-stats div {
  min-width: 82px;
}

.hero-stats dt {
  color: var(--ink);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 23px;
  font-weight: 700;
}

.hero-stats dd {
  margin: 4px 0 0;
  color: var(--muted);
  font-size: 12px;
}

.hero-visual {
  display: grid;
  place-items: center;
  padding: 60px 72px 60px 30px;
}

.visual-shell {
  position: relative;
  width: min(100%, 470px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 26px;
  padding: 14px;
  background: rgba(245, 246, 251, 0.68);
  box-shadow: 0 36px 80px rgba(36, 31, 68, 0.3);
  backdrop-filter: blur(20px);
  transform: rotate(2deg);
}

:global(.dark) .visual-shell {
  border-color: rgba(255, 255, 255, 0.12);
  background: rgba(25, 29, 39, 0.7);
}

.visual-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 4px 12px;
  color: rgba(23, 32, 51, 0.52);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 9px;
  letter-spacing: 0.12em;
}

:global(.dark) .visual-topbar { color: rgba(255, 255, 255, 0.55); }

.window-dots { display: flex; gap: 5px; }
.window-dots i { width: 7px; height: 7px; border-radius: 50%; background: #bbc1cc; }
.window-dots i:first-child { background: #ff8e7b; }
.window-dots i:nth-child(2) { background: #ffd36e; }
.window-dots i:last-child { background: #7dd9b6; }

.note-paper {
  min-height: 460px;
  border-radius: 18px;
  padding: 44px 42px;
  color: #1c2435;
  background: #fffdf8;
  box-shadow: 0 12px 38px rgba(26, 28, 40, 0.13);
}

.paper-index {
  color: #8e8069;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
}

.note-paper h2 {
  margin: 24px 0 18px;
  font-family: Georgia, 'Noto Serif SC', serif;
  font-size: clamp(34px, 3vw, 46px);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1.2;
}

.note-paper p {
  margin: 0;
  color: #736f68;
  font-size: 13px;
  line-height: 1.8;
}

.paper-rule {
  height: 1px;
  margin: 30px 0 12px;
  background: #e7e1d7;
}

.note-paper ul { margin: 0; padding: 0; list-style: none; }
.note-paper li {
  display: flex;
  gap: 14px;
  border-bottom: 1px solid #eee9df;
  padding: 14px 0;
  font-size: 12px;
}
.note-paper li span { color: #a69b8a; font-family: ui-monospace, monospace; }

.floating-card {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 158px;
  border: 1px solid rgba(255, 255, 255, 0.65);
  border-radius: 14px;
  padding: 11px 14px;
  color: #263044;
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 14px 35px rgba(34, 31, 55, 0.2);
  backdrop-filter: blur(12px);
}

.floating-card-left { top: 28%; left: -68px; transform: rotate(-4deg); }
.floating-card-right { right: -52px; bottom: 15%; transform: rotate(3deg); }
.floating-mark { display: grid; width: 34px; height: 34px; place-items: center; border-radius: 9px; color: #fff; background: #6d5bd0; font-size: 17px; }
.floating-card-right .floating-mark { background: #278c70; }
.floating-card div { display: flex; flex-direction: column; gap: 1px; }
.floating-card b { font-size: 9px; letter-spacing: 0.1em; }
.floating-card small { color: #768096; font-size: 10px; }

.section { padding: 112px 42px; }

.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 40px;
  margin-bottom: 42px;
}

.section-heading .eyebrow { margin-bottom: 14px; }
.section-heading h2,
.focus-title h2,
.music-copy h2 {
  margin: 0;
  color: var(--ink);
  font-size: clamp(34px, 4vw, 52px);
  font-weight: 700;
  letter-spacing: -0.045em;
  line-height: 1.15;
}

.section-heading > p {
  max-width: 390px;
  margin: 0 0 4px;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.8;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.category-card {
  position: relative;
  display: flex;
  min-height: 430px;
  overflow: hidden;
  flex-direction: column;
  border: 1px solid var(--line);
  border-radius: 22px;
  padding: 24px;
  color: var(--ink);
  background: var(--vp-c-bg-soft);
  text-decoration: none;
  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
}

.category-card:hover {
  color: var(--ink);
  border-color: transparent;
  box-shadow: 0 25px 60px rgba(30, 37, 54, 0.13);
  transform: translateY(-7px);
}

.category-topline { display: flex; align-items: center; justify-content: space-between; font-family: ui-monospace, monospace; font-size: 11px; }
.category-topline i { display: grid; width: 34px; height: 34px; place-items: center; border: 1px solid currentColor; border-radius: 50%; font-style: normal; transition: transform 0.3s ease; }
.category-card:hover .category-topline i { transform: rotate(45deg); }

.category-symbol { position: relative; height: 150px; margin: 20px 0 14px; }
.category-symbol::before,
.category-symbol::after,
.category-symbol span { position: absolute; border-radius: 999px; content: ''; }
.category-symbol::before { inset: 17px 27% 17px; border: 1px solid currentColor; opacity: 0.3; }
.category-symbol::after { top: 50%; left: 50%; width: 68px; height: 68px; background: currentColor; opacity: 0.78; transform: translate(-50%, -50%); }
.category-symbol span { top: 23px; left: calc(50% - 52px); width: 104px; height: 104px; border: 1px dashed currentColor; opacity: 0.5; transform: rotate(25deg); }

.category-tech { color: #2c5850; background: #d9eee7; }
.category-journal { color: #514177; background: #e9e2f5; }
.category-life { color: #774c32; background: #f4e5d7; }
:global(.dark) .category-tech { color: #c2eadc; background: #18372f; }
:global(.dark) .category-journal { color: #e1d6f8; background: #2d2541; }
:global(.dark) .category-life { color: #f3d7bd; background: #402d24; }

.category-card > p { margin: 0 0 4px; font-size: 10px; font-weight: 700; letter-spacing: 0.15em; opacity: 0.65; }
.category-card h3 { margin: 0; font-size: 30px; letter-spacing: -0.04em; }
.category-footer { display: flex; flex-direction: column; gap: 16px; margin-top: auto; }
.category-footer > span { max-width: 290px; font-size: 13px; line-height: 1.7; opacity: 0.75; }
.category-footer small { border-top: 1px solid currentColor; padding-top: 12px; font-size: 10px; font-weight: 650; opacity: 0.55; }

.focus-section {
  display: grid;
  grid-template-columns: minmax(230px, 0.65fr) 1.35fr;
  gap: 70px;
  border-top: 1px solid var(--line);
}

.focus-title .eyebrow { margin-bottom: 14px; }
.focus-title h2 { font-size: 38px; }
.focus-list { border-top: 1px solid var(--line); }
.focus-list a {
  display: grid;
  grid-template-columns: 44px 120px 1fr 24px;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid var(--line);
  padding: 22px 4px;
  color: var(--ink);
  text-decoration: none;
  transition: padding 0.25s ease, color 0.25s ease;
}
.focus-list a:hover { padding-right: 10px; padding-left: 10px; color: #6d5bd0; }
.focus-index { color: var(--muted); font-family: ui-monospace, monospace; font-size: 11px; }
.focus-label { font-size: 14px; font-weight: 700; }
.focus-list strong { color: var(--muted); font-size: 13px; font-weight: 450; }
.focus-list i { font-style: normal; }

.music-section {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 60px;
  align-items: center;
  margin: 0 42px;
  border-radius: 28px;
  padding: 64px;
  color: #f3f2f8;
  background:
    radial-gradient(circle at 8% 0%, rgba(123, 99, 220, 0.7), transparent 35%),
    linear-gradient(135deg, #171a27, #23243a 58%, #142b2c);
  box-shadow: 0 30px 80px rgba(20, 24, 40, 0.2);
}
.eyebrow-light { color: rgba(255, 255, 255, 0.58); }
.eyebrow-light > span { background: #ab98ff; }
.music-copy h2 { color: #fff; }
.music-copy > p:not(.eyebrow) { max-width: 390px; margin: 20px 0 0; color: rgba(255, 255, 255, 0.56); font-size: 14px; line-height: 1.8; }
.music-wave { display: flex; align-items: center; gap: 5px; height: 58px; margin-top: 26px; }
.music-wave i { width: 3px; border-radius: 99px; background: linear-gradient(#af9cff, #68c6a5); animation: wave 2.4s ease-in-out infinite alternate; }
.music-wave i:nth-child(2n) { animation-delay: -0.7s; }
.music-wave i:nth-child(3n) { animation-delay: -1.3s; }

.closing-note { padding: 130px 32px 116px; text-align: center; }
.closing-note > span { display: block; height: 42px; color: #6d5bd0; font-family: Georgia, serif; font-size: 76px; line-height: 1; }
.closing-note p { margin: 14px auto 28px; color: var(--ink); font-family: Georgia, 'Noto Serif SC', serif; font-size: clamp(24px, 3vw, 38px); line-height: 1.65; }
.closing-note a { color: var(--muted); font-size: 13px; text-decoration: none; }
.closing-note a:hover { color: #6d5bd0; }

@keyframes wave { from { transform: scaleY(0.55); } to { transform: scaleY(1); } }

@media (max-width: 1100px) {
  .hero-grid { grid-template-columns: 1fr 0.85fr; }
  .hero-copy { padding-left: 48px; }
  .hero-visual { padding-right: 44px; }
  .floating-card-left { left: -30px; }
  .floating-card-right { right: -25px; }
  .music-section { padding: 48px; }
}

@media (max-width: 860px) {
  .hero-section { min-height: auto; }
  .hero-grid { grid-template-columns: 1fr; }
  .hero-copy { padding: 70px 42px 40px; }
  .hero-visual { padding: 10px 60px 70px; }
  .visual-shell { transform: rotate(1deg); }
  .hero-section::after { background: linear-gradient(180deg, var(--paper) 0%, rgba(247, 248, 251, 0.8) 55%, transparent 100%); }
  :global(.dark) .hero-section::after { background: linear-gradient(180deg, var(--paper) 0%, rgba(21, 25, 34, 0.8) 55%, transparent 100%); }
  .section { padding: 86px 18px; }
  .section-heading { align-items: start; flex-direction: column; }
  .category-grid { grid-template-columns: 1fr; }
  .category-card { min-height: 330px; }
  .category-symbol { position: absolute; top: 64px; right: 18px; width: 42%; opacity: 0.8; }
  .focus-section { grid-template-columns: 1fr; gap: 36px; }
  .music-section { grid-template-columns: 1fr; margin: 0 18px; }
}

@media (max-width: 640px) {
  .hero-section { border-right: 0; border-left: 0; border-radius: 0; }
  .hero-copy { padding: 62px 22px 32px; }
  .hero-copy h1 { font-size: 44px; }
  .desktop-break { display: none; }
  .hero-description { font-size: 15px; }
  .hero-actions { align-items: flex-start; flex-direction: column; gap: 20px; }
  .hero-stats { gap: 20px; justify-content: space-between; }
  .hero-stats div { min-width: 0; }
  .hero-visual { padding: 10px 28px 58px; }
  .note-paper { min-height: 390px; padding: 36px 28px; }
  .floating-card { display: none; }
  .section-heading h2 { font-size: 36px; }
  .category-card { min-height: 360px; }
  .focus-list a { grid-template-columns: 32px 90px 1fr 18px; gap: 8px; }
  .focus-list strong { font-size: 11px; }
  .music-section { margin: 0; border-radius: 0; padding: 50px 22px; }
  .closing-note { padding: 100px 22px; }
}

@media (prefers-reduced-motion: reduce) {
  .music-wave i { animation: none; }
  .category-card,
  .primary-action { transition: none; }
}
</style>
