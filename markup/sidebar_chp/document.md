# はじめに

このドキュメントは、左に固定サイドバー（目次）、右が本文スクロールです。

## 目的

- 見出しから目次を自動生成
- 生成HTMLに styles.css を相対パスで含める

# セットアップ

## 要件

Node.js が入っていればOKです。

## 手順

1. `npm i`
2. `npm run build`
3. `dist/index.html` を開く

`dist/styles.css` は一つ上のディレクトリからコピーされる。

# 使い方

## 見出しを書くだけ

`#` / `##` / `###` を追加すると自動で目次に反映されます。

# FAQ

## Q. 見出しIDはどうなる？

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

[ここ](https://nodejs.org/en/download?utm_source=chatgpt.com) から LTS(推奨版)を入手。

docker がなかったので、msl をダウンロードしてインストールした。

インストール時に Add to PATH を必ず ON にしておく。

VSCode を再起動する。

VSCode のターミナルで以下を実行してバージョンが表示されればOK。

```
node -v
npm -v
```


