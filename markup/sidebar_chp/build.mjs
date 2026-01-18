import fs from "node:fs";
import path from "node:path";
import MarkdownIt from "markdown-it";
import anchor from "markdown-it-anchor";

// ---- 入出力 ----
const INPUT_MD = "document.md";
const SRC_CSS = "styles.css";
const OUT_DIR = "dist";
const OUT_HTML = path.join(OUT_DIR, "index.html");
const OUT_CSS = path.join(OUT_DIR, "styles.css");

// ---- 出力先作成 ----
fs.mkdirSync(OUT_DIR, { recursive: true });

// ---- 見出し収集用 ----
const headings = []; // { level, title, id }

// markdown-it 初期化（Markdown内HTMLも許可したいなら html:true）
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

// slugify（日本語でも安定するよう、必要最小限の整形）
const slugify = (s) =>
  s
    .trim()
    .toLowerCase()
    // 空白→ハイフン
    .replace(/\s+/g, "-")
    // 連続ハイフン整理
    .replace(/-+/g, "-");

// 見出しに自動でid付与しつつ、見出し情報を収集
md.use(anchor, {
  slugify,
  permalink: false,
  callback: (token, { slug, title }) => {
    // token.tag は h1/h2/h3...
    const level = Number(token.tag.slice(1));
    // 目次に入れるレベルは好みで調整（ここでは h1〜h3）
    if (level >= 1 && level <= 3) {
      headings.push({ level, title, id: slug });
    }
  },
});

// ---- Markdown読み込み＆HTML化 ----
const mdText = fs.readFileSync(INPUT_MD, "utf8");
const bodyHtml = md.render(mdText);

// ---- 目次HTML生成（フラットに並べてCSSでインデント）----
const tocHtml = headings
  .map((h) => {
    const subClass = h.level >= 2 ? " toc__item--sub".repeat(h.level - 1) : "";
    return `<a class="toc__item${subClass}" href="#${h.id}">${escapeHtml(
      h.title
    )}</a>`;
  })
  .join("\n");

// ---- 完成HTMLテンプレ ----
const fullHtml = `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Document</title>
  <!-- ✅ 相対パスで styles.css を含める -->
  <link rel="stylesheet" href="./styles.css" />
</head>
<body>
  <div class="layout">
    <aside class="sidebar" aria-label="目次">
      <div class="sidebar__inner">
        <div class="brand">
          <div class="brand__title">Document</div>
          <div class="brand__meta">Generated from Markdown</div>
        </div>

        <nav class="toc" aria-label="Table of contents">
${tocHtml || `<div class="muted">見出しがありません</div>`}
        </nav>

        <div class="sidebar__footer">
          <a href="#top" class="muted">▲ Top</a>
        </div>
      </div>
    </aside>

    <main id="top" class="content" aria-label="本文">
      <article class="prose">
${bodyHtml}
      </article>
    </main>
  </div>
</body>
</html>
`;

// ---- 書き出し ----
fs.writeFileSync(OUT_HTML, fullHtml, "utf8");

// CSSをdistへコピー（相対パス ./styles.css が成立）
fs.copyFileSync(SRC_CSS, OUT_CSS);

console.log(`Built: ${OUT_HTML}`);
console.log(`CSS  : ${OUT_CSS}`);

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
