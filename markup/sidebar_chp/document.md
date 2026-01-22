# サイドバー固定のテンプレート(CHP)

## はじめに

このドキュメントは、左に固定サイドバー（目次）、右が本文スクロールです。

### 目的

- 見出しから目次を自動生成
- 生成HTMLに styles.css を相対パスで含める

## セットアップ

### 要件

Node.js が入っていればOKです。

### 手順

1. `npm i`
2. `npm run build`
3. `dist/index.html` を開く

`dist/styles.css` は一つ上のディレクトリからコピーされる。

## 使い方

### 見出しを書くだけ

`#` / `##` / `###` を追加すると自動で目次に反映されます。

## FAQ

### Q. 見出しIDはどうなる？

自動でスラッグ化（例: 「セットアップ」→ `#セットアップ` のような形）されます。

---

## 詳細
### ソースファイルとディレクトリ構成

```
my-docs/
├─ document.md
├─ styles.css
├─ build.mjs
├─ package.json
└─ .vscode/
   └─ settings.json   (任意: VSCodeプレビューにもCSSを当てる)
```

### Node.js のインストール

1. [ここ](https://nodejs.org/en/download?utm_source=chatgpt.com) から LTS(推奨版)を入手。<br>
docker がなかったので、msl をダウンロードしてインストールした。
2. インストール時に Add to PATH を必ず ON にしておく。
3. VSCode を再起動する。
4. VSCode のターミナルで以下を実行してバージョンが表示されればOK。

```
node -v
npm -v
```

## スタイル

````
<body>------------------------------- // height=100%, margin=0, font-family, color(文字色), background
  <div class="layout">--------------- // height=画面全体、grid 配置, 中は2列(左は幅固定)

    // 1列目 (aside==余談)　サイドバー領域
    <aside  class="sidebar>---------- // 右境界の色、中の余白(padding)=18px、背景

      // サイドバー本体。余白分 aside=sidebar より小さくなる
      <div class="siderbar__inner">-- // 中は3行(brand,toc,footer)。item は幅いっぱい使う。
                                      // 垂直位置(top)=18px, 高さ=100vh-36px(つまり下も18px空く)
                                      // gap=14px(brandとtoc, tocとfooterの間)
                                      // スクロールさせない

        // 1行目 brand
        <div class="brand">-----------// border-radius(領域の角を丸くする),padding,boarder,background
          <div class="brand__title">  // font-weight, letter-spacing
          <div class="brand__meta">   // margin, color, font-size
        </div>------------------------// brand 終わり

        // 2行目 目次 (toc by nav)
        <nav class="toc">-------------// border-radius(領域の角を丸くする),padding,boarder,background
                                      // オーバーフローしたらスクロール(overflow:auto)
          <a class="toc__item" href="#...">
          // padding=10px,line-height=12,overflow=hidden
          // toc__item:hover(ポインタが乗った場合の挙動)
          <a class="toc__item toc__item--sub" href="#...">
          // toc__item 適用後、padding=22px, color=mutec
        </nav>-------------------------// 目次終わり

        // 3行目 footer
        <div class="sidebar__footer">--// padding, border, border-radius, background
          <a href="#top" class="muted">
        </div>-------------------------// footer 就労

       </div>
    </aside>
  </div>
</body>
````

----
#### body

```
<body>
  <div class="layout"> ... </div>
</body>
```

|属性|設定値|説明|
|:---:|:---|:---|
|height|100%|高さは画面いっぱい|
|margin|0|外側の余白なし|
|font-family|`var(--font)`|文書全体のフォントファミリーの設定|
|color|`var(--text)`|文書本体の文字の色のデフォルト|
|background|`radial-gradient(), radial-gradient(), var(--bg)`|背景|

- radial-gradient は二つ以上の色の連続的な推移が原点から放射状に広がる画像を生成する。
  - 中心の位置：省略時は center
  - 図形：circle, ellipse(楕円)
  - 大きさ

----
#### div class=layout

```
<body>
  <div class="layout"> 
    <aside class="sidebar" aria-label="目次"> ... </aside>
    <main id="top" class="content" aria-label="本文"> ... </main>
  </div>
</body>
```

class layout

|属性|設定値|説明|
|:---:|:---|:---|
|height|100vh|vh は view port の 1% が単位。100 ということはウィンドウ全体の高さ|
|display|grid|グリッド上に置く|
|grid-template-columns|`var(--sidebar-w) 1fr`|グリッド列。サイドバーは `--sidebar-w` の値固定。残りはフレックス |

- View port とはコンピュータの画面で見えているウィンドウの範囲
  
----
#### aside class=sidebar

```
  <div class="layout">
    <aside class="sidebar" aria-label="目次">
      <div class="sidebar__inner"> ... </div>
    </aside>
    <main id="top" class="content" aria-label="本文"> ... </main>
  </div>
```

class sidebar

|属性|設定値|説明|
|:---:|:---|:---|
|border-right|1px sold `var(--border)`|サイドバーの右側の線|
|background|`rgba(,,,)`||
|backdrop-filter|`blur(10px)`||
|padding|18px|内部の余白|

----
#### div class=sidebar__inner

```
    <aside class="sidebar" aria-label="目次">
      <div class="sidebar__inner">
        <div class="brand"> ... </div>
        <nav class="toc" aria-label="Table of contents"> ... </nav>
        <div class="sidebar__footer"> ... </div>
      </div>
    </aside>
```

class sidebar__inner

|属性|設定値|説明|
|:---:|:---|:---|
|position|sticky|見える範囲に固定|
|top|18px|垂直位置|
|height|`calc(100vh - 36px)`||
|display|grid|グリッド上に置かれる|
|grid-template-rows|auto 1fr auto|中は3列。brand, item, footer|
|gap|14px|行と列の間のすき間|
|overflow|hidden|サイドバー自体をスクロールさせない|


----
#### div class=brand, class=brand__title, class=brand__meta

```
      <div class="sidebar__inner">
        <div class="brand">
          <div class="brand__title">Document</div>
          <div class="brand__meta">Generated from Markdown</div>
        </div>
      </div>
```

class brand

|属性|設定値|説明|
|:---:|:---|:---|
|padding|14px 14px 10px||
|border|1px solid `var(--border)`||
|border-radius|`var(--radius)`||
|background|`rgba(255,255,255,.03)`||

class brand__title

|属性|設定値|説明|
|:---:|:---|:---|
|font-weight|700||
|letter-spacing|.2px|文字間のスペース|

class brand__meta

|属性|設定値|説明|
|:---:|:---|:---|
|margin-top|6px||
|color|`var(--muted)`||
|font-size|12px||


----
#### nav class=toc

```
      <div class="sidebar__inner">
        <nav class="toc" aria-label="Table of contents"> 
          // 自動生成された目次がここに書き出される
          <a class="toc__item${subClass}" href="#id"> ... </a>
          ........
        </nav>
      </div>
```

class toc

|属性|設定値|説明|
|:---:|:---|:---|
|padding|10px||
|border|1px solid `var(--border)`||
|border-radius|`var(--radius)`||
|background|`rgba()`||
|overflow|hidden|スクロールさせない|

----
#### a class=toc__item

class toc__item

|属性|設定値|説明|
|:---:|:---|:---|
|display|block|ブロックボックスとなる。ボックスの前後で改行が入る|
|padding|10px||
|border-radius|10px||
|color|`var(--text)`||
|text-decoration|none||
|line-height|1.2||
|white-space|nowrap|空白文字で折り返さない|
|overflow|hidden|あふれた部分は表示しない|
|text-overflow|ellipsis|テキストがあふれたときは ... と表示|

- text-overflow を使う場面にするには、overflow hidden であふれされること。
  - clip(あふれたテキストは切り取る), ellipsis(あふれた分は...と表記)

class toc__item:hover

|属性|設定値|説明|
|:---:|:---|:---|
|background|`rgba(130,180,255,.14)`||

class toc__item--sub

|属性|設定値|説明|
|:---:|:---|:---|
|padding-left|22px|左側の余白|
|color|`var(--muted)`||


#### div class=sidebar__footer

```
      <div class="sidebar__inner">
        <div class="sidebar__footer"> 
          <a href="#top" class="muted">▲ Top</a>
        </div>
      </div>
```

class slidebar__footer

|属性|設定値|説明|
|:---:|:---|:---|
|padding|10px 12px||
|border|1px solid `var(--border)`||
|border-radius|`var(--radius)`|角の丸み|
|background|`rgba(,,,)`||


----
#### main class=content

```
  <div class="layout">
    <aside class="sidebar" aria-label="目次"> ... </aside>
    <main id="top" class="content" aria-label="本文"> 
      <article class="prose">
${bodyHtml}
      </article>
    </main>
  </div>
```

class content

|属性|設定値|説明|
|:---:|:---|:---|
|overflow|auto|本文はスクロールする|
|padding|28px `var(--gutter)`|内側の余白。上下と左右|

- overflow: visible(あふれたものはそのまま表示), hidden(あふれたものは見えない), scroll(スクロールバー使用), auto(あふれたときのみスクロールバー)
  

----
#### article class=prose

```
    <main id="top" class="content" aria-label="本文"> 
      <article class="prose">
${bodyHtml}
      </article>
    </main>
```

class prose

|属性|設定値|説明|
|:---:|:---|:---|
|max-width|`var(--maxw)`|ボックスの最大幅|
|margin|0 auto|他とのすき間。二つの場合は上下と左右。auto はブラウザが自動設定|
|padding|22px|内側の余白|
|border|1px solid `var(--border)`|境界の幅、スタイル（実線）、色を指定。|
|border-radius|`var(--radius)`|枠の角の丸み（半径）を指定。上左、上右、下右、下左、の順。一つなら四隅|
|background|`rgba(,,,)`|背景の色|
|backdrop-filter|`blur(8px)`|要素の背後にグラフィックス効果を適用する。article の後ろに何かがあったらぼかして表示させる。|

- border-style の値：none, hidden, dotted(丸の破線), dashed(四角の破線), solid, double(二重線), groove(溝のような線), ridge(盛り上がった線), inset(要素が埋め込まれて見える線), outset(要素が出っ張って見える線)

----
#### typography

prose の中の h1, h2, h3

|属性|prose h1|prose h2|prose h3|説明|
|:---:|:---|:---|:---|:---|
|scroll-margin-top|18px|||スクロールスナップ領域の上側のマージン|
|font-size|30px|22px|18px|フォントのサイズをピクセル値で指定|
|margin|0 0 18ps|20px 0 12px|18px 0 8px|上、左右、下の間隔。h1 は下を大きく開ける。|

pose の中の p, li

|属性|設定値|説明|
|:---:|:---|:---|
|line-height|1.75|行ボックスの高さ。この場合 font-size の 1.75倍|
|color|`rgba()`|テキストの色の指定。|

- line-height のデフォルトは normal。これはフォントの約 1.2 倍。単位なしの数値はフォントサイズのその数値を掛けたもの。単位ありはその数値が高さ。パーセントはフォントサイズにその値を掛けたものになるが、予期しない結果を生む可能性がある。
- rgba は古いらしい。最新のは `rgp(A B C [/ D])`。コンマは要らないし、最後の透明度は `/` の後。
  - 例：`rgb(198 85 218 / 0.25)`

pose の中の a (`color: var(--link);`)

pose の中の pre, code : 省略




