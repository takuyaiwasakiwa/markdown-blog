const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { marked } = require("marked");

const POSTS_DIR = path.join(__dirname, "..", "posts");
const DIST_DIR = path.join(__dirname, "..", "dist");
const TEMPLATES_DIR = path.join(__dirname, "..", "templates");

function loadTemplate(name) {
  return fs.readFileSync(path.join(TEMPLATES_DIR, name), "utf-8");
}

function render(template, vars) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] ?? "");
}

function buildPosts() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.error("posts/ ディレクトリが見つかりません");
    process.exit(1);
  }

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .reverse();

  if (files.length === 0) {
    console.log("記事がありません。npm run new -- \"タイトル\" で作成してください。");
    process.exit(0);
  }

  // Clean and create dist
  if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true });
  }
  fs.mkdirSync(DIST_DIR, { recursive: true });
  fs.mkdirSync(path.join(DIST_DIR, "posts"), { recursive: true });

  const postTemplate = loadTemplate("post.html");
  const indexTemplate = loadTemplate("index.html");

  // Copy CSS
  const cssSource = path.join(TEMPLATES_DIR, "style.css");
  if (fs.existsSync(cssSource)) {
    fs.copyFileSync(cssSource, path.join(DIST_DIR, "style.css"));
  }

  const posts = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    const html = marked(content);
    const slug = file.replace(/\.md$/, "");

    const post = {
      title: data.title || slug,
      date: data.date || "",
      description: data.description || "",
      slug,
      html,
    };
    posts.push(post);

    const page = render(postTemplate, {
      title: post.title,
      date: post.date,
      content: post.html,
    });
    fs.writeFileSync(path.join(DIST_DIR, "posts", `${slug}.html`), page);
    console.log(`  生成: posts/${slug}.html`);
  }

  // Build index
  const postListHtml = posts
    .map(
      (p) =>
        `<article class="post-card">
  <a href="posts/${p.slug}.html">
    <h2>${p.title}</h2>
    <time>${p.date}</time>
    <p>${p.description}</p>
  </a>
</article>`
    )
    .join("\n");

  const indexPage = render(indexTemplate, { posts: postListHtml });
  fs.writeFileSync(path.join(DIST_DIR, "index.html"), indexPage);
  console.log(`  生成: index.html`);

  console.log(`\n完了! ${posts.length} 件の記事を dist/ に出力しました。`);
}

buildPosts();
