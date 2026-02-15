# CLAUDE.md

This file provides guidance for AI assistants working on the **markdown-blog** project.

## Project Overview

上鶴間内科クリニック（神奈川県相模原市南区）のSEO対策プロジェクトです。
マークダウンベースのブログを通じて、検索経由の集患を最大化します。

## クリニック情報

- **名称**: 上鶴間内科クリニック
- **所在地**: 神奈川県相模原市南区上鶴間
- **業態**: 内科クリニック（医師1名体制）
- **得意分野**: 生活習慣病、呼吸器内科、予防医療
- **2026年4月〜**: 超音波検査を導入予定
- **電子カルテ**: WEMEX使用

## エージェント構成

3つの専門エージェントがSEO施策を分担します。

| 役割 | プロンプトファイル | 担当領域 |
|------|-------------------|----------|
| マーケティング戦略 | `/prompts/marketing-strategist.md` | キーワード選定、記事テーマ決定、全体戦略 |
| コンテンツ作成 | `/prompts/content-writer.md` | 記事執筆、SEOライティング、構造化データ |
| ローカルSEO | `/prompts/local-seo.md` | GBP管理、口コミ対応、地域キーワード最適化 |

## ワークフロー

1. **マーケティング戦略担当**がキーワード選定・記事テーマを決定
2. **コンテンツ担当**が記事を作成
3. **ローカルSEO担当**がGBP投稿・地域最適化を実施
4. **医師（Takuya）**が医学的内容を最終確認

## タスク実行例

```bash
# 戦略立案を依頼
claude "マーケティング戦略担当として、来月の記事テーマを3つ提案して"

# 記事作成を依頼
claude "コンテンツ担当として、『咳が止まらない 2週間』の記事を作成して"

# ローカルSEO施策を依頼
claude "ローカルSEO担当として、今週のGBP投稿を作成して"
```

## Repository Structure

```
markdown-blog/
├── CLAUDE.md                          # このファイル — AI assistant guidance
├── README.md                          # Project readme
└── prompts/
    ├── marketing-strategist.md        # マーケティング戦略家プロンプト
    ├── content-writer.md              # コンテンツライタープロンプト
    └── local-seo.md                   # ローカルSEO担当プロンプト
```

## Current State

- **Status**: SEOエージェント構成が完了、ブログ記事作成の準備段階
- **Language/Framework**: Not yet chosen
- **Dependencies**: None installed
- **Tests**: No test framework configured
- **CI/CD**: No pipelines configured
- **Linting/Formatting**: No tools configured

## Git Conventions

- **Default branch:** `main`
- **Remote:** `origin` (GitHub, user `takuyaiwasakiwa`)

## Development Guidelines

### General

- Keep the project simple and focused on rendering markdown content as blog posts
- Prefer well-established, minimal dependencies over heavy frameworks
- Write clear commit messages that describe the "why" behind changes

### 医療広告ガイドライン（全エージェント共通）

- 「最高」「最先端」「日本一」等の比較優良広告の禁止
- 患者の体験談（口コミ）をホームページに掲載しない
- 治療効果を保証する表現の禁止
- 自由診療には治療内容・費用・リスク・副作用を必ず併記
- ビフォーアフター写真を使用しない

### Code Style

- Follow the conventions of whichever language/framework is chosen
- Configure a linter and formatter early in the project setup
- Add a `.gitignore` appropriate for the chosen stack

### Testing

- Set up a test framework as part of the initial project scaffolding
- Write tests for core functionality (markdown parsing, routing, etc.)

### Documentation

- Keep this CLAUDE.md updated as the project evolves
- Update README.md with setup instructions once a framework is chosen

## Commands

No build, test, or lint commands are available yet. Update this section as tooling is added.

<!--
Example (update when applicable):
```
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Production build
npm test             # Run tests
npm run lint         # Run linter
```
-->
