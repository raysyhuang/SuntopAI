## Canonical concept mapping (do not drift)

Treat these as stable mappings unless `zh-CN.json` explicitly changes the meaning.

- 临床决策支持
  - **en**: Clinical Decision Support
  - **zh-TW**: 臨床決策支持
  - **ja**: 臨床意思決定支援
  - Notes: Avoid “clinical decision making by AI”.

- 辅助判断
  - **en**: Assist clinical judgment
  - **zh-TW**: 輔助判斷
  - **ja**: 臨床判断を補助
  - Notes: Keep clinician-in-the-loop; avoid “AI decides”.

- 质控模块
  - **en**: Quality Control Module
  - **zh-TW**: 質控模組
  - **ja**: 品質管理モジュール
  - Notes: If context is medical quality management, prefer “quality management” over vague “QC”.

- 风险预警
  - **en**: Early risk warning
  - **zh-TW**: 風險預警（早期）
  - **ja**: リスクの早期警告
  - Notes: Avoid “predicts with certainty”.

## Phrasing guidance (regulatory-safe)

### Preferred (safe)
- Clinical decision support
- Assist clinical judgment
- Provide risk explanation / risk factors
- Early warning / early risk warning
- Treatment suggestion (for reference; clinician confirmation required)
- Workflow guidance / care pathway reference

### Avoid / rewrite
- Autonomous diagnosis / autonomous treatment
- Execute medical orders / prescribe / make orders
- AI controls dialysis / AI runs treatment
- Guaranteed outcomes / eliminates errors / zero risk
- Black-box framing (“unknown logic but accurate”)
