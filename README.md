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

## V10 — 设计深化、四方案比较与浏览器漫游（2026-10）

统一入口仍然是根目录 `index.html`，未新增第二份任务书。进入 **08 建筑单元与任务书** 后在下方使用 V10，或点击网站右上角 **「深化设计 / 四方案 / 3D 漫游」** 进行演示。

- **01 数据与案例**：粘贴 MD、CSV、JSON 或导入本地文件、GeoJSON 边界及原始结构底图参照；记录来源、待核实项与相关案例。
- **02 平面推敲**：A 集中热核心、B 线性温度梯度、C 人员设备分离、D 可变共享核心；每组有响应前/响应后的家具、手动隔断和功能分区；公开的五维 Crit 假设评分；可试验 9/25/100/500㎡不同比例。
- **03 3D 漫游**：从推荐方案生成第一人称、带墙段碰撞的浏览器空间，W/S、A/D、Q/E 操作，小地图定位；切换日常/应急状态。
- **04 建构与细部**：冷区门斗、移动隔断轨道、坐卧收纳家具，材料及装配路径的课堂假设。
- **输出**：统一设计任务书、四组 A3 SVG、R12 DXF、独立对象 COLLADA 1.4.1 `.dae`（可导入 SketchUp，非原生 SKP）、V10 JSON。项目历史备份包含本轮深化数据。

**重要限制：** 目前仅有用户提交的任务书，没有原始承重结构 DWG/SVG。图片型结构图只能作为锁定参照，**系统没有自动识别或保证保留承重墙、窗、外围尺寸**；四套平面为课堂概念方案。没有现场温度、使用人数或用地法规依据时不应宣称已经完成专业性能或合规评估。断网时核心工作流仍可运行；外部案例链接需联网。
