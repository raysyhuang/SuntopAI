---
name: clinical-regulatory-i18n
description: Enforces clinical augmentation-only, regulatory-safe, multilingual-consistent language for a deployed hemodialysis AI & IoT medical system. Use when editing medical/clinical copy, i18n dictionaries (src/i18n/dictionaries/*.json), or translating between zh-CN/en/ja/zh-TW.
---

# Clinical + Regulatory-Safe i18n (Hemodialysis AI & IoT)

This skill enforces **clinical augmentation-only** language, **regulatory-safe** claims, and **multilingual semantic consistency** for a real, deployed hemodialysis AI & IoT medical system.

## When to apply (always)

Apply this skill whenever you:
- Edit any medical/clinical-facing text (web pages, marketing copy, UI strings, docs).
- Edit translation dictionaries under `src/i18n/dictionaries/*.json`.
- Translate or rewrite claims about AI, dialysis care, monitoring, alerts, quality control, or workflow automation.

## Non-negotiable rules

### 1) Clinical augmentation only (never autonomous)

The system **supports** clinicians; it does not act as a clinician.

- Prefer: “clinical decision support”, “assist clinical judgment”, “risk explanation”, “early warning”, “treatment suggestion”, “workflow guidance”.
- Avoid any wording implying autonomy, execution, control, or replacement.

Hard bans (rewrite if present):
- “diagnose/diagnosis (autonomously)”, “treat/treatment (autonomously)”, “prescribe”, “order”, “execute medical orders”
- “AI decides”, “AI determines the regimen”, “AI controls dialysis”, “automatic treatment”, “fully replaces physicians/nurses”
- “guarantees outcomes”, “zero risk”, “eliminates errors”

### 2) Regulatory-safe medical language (conservative, explainable)

Use conservative, clinically accepted phrasing:
- No autonomous diagnosis or treatment claims.
- No black-box or “unknown but works” framing.
- No exaggerated or marketing-driven claims.
- If describing AI: frame as **models/rules supporting risk stratification, explanation, and early warning**, with clinician confirmation.

### 3) `zh-CN.json` is the semantic source of truth

For i18n content:
- `src/i18n/dictionaries/zh-CN.json` defines the **canonical meaning and intent**.
- All other languages must match that meaning exactly.
- Never introduce new concepts in `en.json`, `ja.json`, or `zh-TW.json` that do not exist in `zh-CN.json`.

### 4) Preserve file structure (keys are immutable)

For i18n JSON edits:
- Never rename, remove, add, re-order, or restructure JSON keys.
- Only modify **string values**.
- Output must always remain **valid JSON**.

### 5) Terminology consistency (stable concept mapping)

Use consistent concept mapping across languages. Start from the glossary and do not invent new mappings:
- 临床决策支持 → Clinical Decision Support
- 辅助判断 → Assist clinical judgment
- 质控模块 → Quality Control Module
- 风险预警 → Early risk warning

See `GLOSSARY.md` for the project’s canonical mappings and “do/don’t” variants.

### 6) External-facing professional language only

Audience: nephrologists, hospital directors, regulators, medical investors.

- Remove internal jargon, shorthand, or engineering slang.
- Rewrite into clear, expert-level medical language.
- Prioritize: **safety > clarity > elegance**

## Editing workflow (required for dictionaries)

### Step A — Edit meaning in `zh-CN.json` first

Even if asked to “change the English”, treat `zh-CN.json` as the semantic master:
- Update `zh-CN.json` value(s) to the correct regulatory-safe meaning.
- Keep the same key(s) and structure.

### Step B — Propagate the same meaning to other languages

For each affected key, align:
- `en.json`: professional medical English, no autonomy claims.
- `ja.json`: same intent; avoid overstating capabilities.
- `zh-TW.json`: same Chinese meaning (繁體), consistent terminology.

### Step C — Consistency and safety QA

Run the checklist in `QA_CHECKLIST.md` on every change set, especially:
- Autonomy language
- Regulatory exaggeration
- Added/removed concepts across languages
- Units, numbers, and clinical terms

## Rewrite patterns (safe defaults)

Use these safe patterns when rewriting claims:

- “The system provides **clinical decision support** for …”
- “The system **assists clinicians** in reviewing … and **explains risk factors** …”
- “The system provides **early risk warning** signals based on …; **final decisions remain with clinicians**.”
- “Suggested actions are **for reference** and require clinician confirmation.”

Avoid “fully automated”, “AI-driven treatment”, “autonomous”, “self-learning black box”, “guaranteed”.

## Output expectations while coding

When implementing changes in code or JSON:
- Keep diffs minimal and surgical.
- Change only the specific strings required.
- Do not refactor structure as part of content edits.

## Additional resources

- Canonical terminology mapping: `GLOSSARY.md`
- QA checklist for safe, aligned translations: `QA_CHECKLIST.md`
