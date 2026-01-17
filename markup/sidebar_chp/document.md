<!-- =========================================================
  document.md
  - Markdown から HTML に変換してそのまま表示できる形式
  - CSS は Markdown 内で参照する
========================================================= -->

<link rel="stylesheet" href="./styles.css" />

<div class="layout">

<aside class="sidebar" aria-label="目次">
  <div class="sidebar__inner">
    <div class="brand">
      <div class="brand__title">Document</div>
      <div class="brand__meta">更新: 2026-01-17</div>
    </div>
    <nav class="toc" aria-label="Table of contents">
      <a class="toc__item" href="#intro">はじめに</a>
      <a class="toc__item" href="#setup">セットアップ</a>
      <a class="toc__item toc__item--sub" href="#setup-req">要件</a>
      <a class="toc__item toc__item--sub" href="#setup-install">インストール</a>
      <a class="toc__item" href="#usage">使い方</a>
      <a class="toc__item" href="#faq">FAQ</a>
    </nav>
    <div class="sidebar__footer">
      <a href="#top" class="muted">▲ Top</a>
    </div>

  </div>
</aside>

<main id="top" class="content" aria-label="本文">
  <article class="prose">

# はじめに {#intro}

この Markdown は、**HTML と Markdown を混在**させています。  
CSS は `<link>` タグで外部参照しています。

---

## セットアップ {#setup}

### 要件 {#setup-req}

- Markdown → HTML 変換環境（例: `marked`, `pandoc`, `remark` など）
- Markdown 内の HTML を許可する設定

### インストール {#setup-install}

```bash
npm i -D marked
```

## 重要な補足（互換性）

{#intro} のような 見出しID付与記法は Markdown エンジン依存です

- Pandoc: OK
- Markdown-it: プラグイン次第
- Marked: デフォルトは NG（JS で id を後付けするなど）

必要であれば、あなたの変換方法（例：marked / pandoc / remark / VSCode / GitHub Pages 等）に合わせて **「確実に動く Markdown 方言」**に調整したテンプレも作れます。
