# ArchiFlow 2026 — Unified Architectural Technology Studio V8

**One project · one studio interface · one architectural design brief.**

- **Student website:** https://holly-zz.github.io/archiflow2026/
- **Source:** https://github.com/holly-zz/archiflow2026/blob/main/index.html
- No external CDN or framework is needed to operate the student workflow offline after saving the `index.html` file.

## Student workflow (single continuous programme stage)

1. Students select research concerns, users, environmental conditions, and a real study site.
2. Review source-linked site findings and explicit evidence gaps. Select a building/spatial intervention unit.
3. Under **08 建筑单元与任务书**, edit WHAT / WHO / WHERE / FUNCTIONS.
4. Continue **on the same page** to **05 环境响应 → 06 平面与体块 → 07 机制模拟 → 08 方案对比与交付**.
5. The architectural programme room table and the responsive plan room editor update one another; layout choices update the project model.
6. Download exactly **one** `ArchiFlow_Architectural_Design_Brief_v8.md` combining the site and user research, programme and room areas, response strategy, schematic plan, technical mechanism, failure concerns, validation and evidence status.
7. Save a complete **`ARCHIFLOW_UNIFIED_V8`** project JSON containing both project research state and geometry/technical settings. JSON can be imported in the same page.
8. Other exports: editable A3 SVG, R12-style DXF concept plan (millimetres) and OBJ concept masses (metres).

## Architecture of the release

The root `index.html` is now the **single student application**, including the previous built-in response engine. The old `response-studio/` address redirects to the root. The legacy `next-design-studio/` remains for backwards compatibility, but it is not the primary course pathway.

### Limitations and academic reliability

- `[G]`: attributable evidence with a source; `[H]`: design assumption; `[V]`: requires field/professional verification.
- Concept room area, conceptual plot and environmental slider do not imply measured site bounds, regulatory compliance, energy/CFD performance, structural safety, medical protocols or species welfare certification.
- Offline operation covers selection, cached/embedded example site research, design rule comparisons, functional planning and file export. Live model calls and live official GIS downloads require online protected services.
- This classroom prototype exports simplified rectangular room layouts, not architectural construction documents.
- Students should compare non-building alternatives and adaptive reuse before assuming construction is necessary.

## Deployment

GitHub Actions deploys `main` to Pages and checks syntax of both embedded JavaScript blocks in the unified `index.html`.

## V9 — 我的项目 / 历史恢复

- 右上角及左侧导航有「📁 我的项目 / 历史」入口。
- 支持浏览器自动保存、多个项目切换、最近 16 个历史快照、命名版本和「撤销误操作」。
- 支持导入旧版 Markdown 任务书（仅恢复可解析文字与功能面积）及 V6/V7/V8/V9 项目 JSON。
- 可备份完整项目 JSON，或备份全部本机项目与历史以便迁移设备。
- 所有操作在本机运行，不要求联网或云端账号。网页本地存储与离线 file://、不同电脑/浏览器 **不自动同步**；请定期导出 JSON。
- 学生的统一任务书和响应式设计仍在同一个 `index.html`，没有第二份正式任务书。
