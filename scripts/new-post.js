const fs = require("fs");
const path = require("path");

const title = process.argv[2];
if (!title) {
  console.error('使い方: npm run new -- "記事のタイトル"');
  process.exit(1);
}

const date = new Date().toISOString().split("T")[0];
const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]+/g, "-")
  .replace(/^-|-$/g, "");

const filename = `${date}-${slug || "post"}.md`;
const filepath = path.join(__dirname, "..", "posts", filename);

const template = `---
title: "${title}"
date: ${date}
description: ""
---

ここに記事を書いてください。
`;

if (fs.existsSync(filepath)) {
  console.error(`既に存在します: ${filename}`);
  process.exit(1);
}

fs.writeFileSync(filepath, template, "utf-8");
console.log(`記事を作成しました: posts/${filename}`);
