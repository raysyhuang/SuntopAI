## QA checklist (run on every medical/i18n edit)

### Safety / regulatory (must pass)

- [ ] No claims of autonomous diagnosis, autonomous treatment, prescribing, or executing medical orders.
- [ ] No wording that implies the AI replaces physicians or “decides” treatment independently.
- [ ] No exaggerated claims (guaranteed outcomes, zero risk, eliminates errors).
- [ ] AI capabilities described as clinical decision support: navigation, explanation, early warning, suggestions.
- [ ] Any “suggestion/recommendation” phrasing is framed as **for reference** and requires clinician confirmation.

### Multilingual semantic consistency (must pass)

- [ ] `zh-CN.json` is updated first and remains the semantic source of truth.
- [ ] `en.json`, `ja.json`, `zh-TW.json` match **exact meaning and intent** of `zh-CN.json`.
- [ ] No concept exists in other languages that is absent from `zh-CN.json`.
- [ ] Terminology aligns with `GLOSSARY.md` (no drift, no new invented mappings).

### JSON integrity (must pass)

- [ ] No key renames, removals, additions, restructuring, or re-ordering.
- [ ] Only string values changed.
- [ ] JSON remains valid (quotes/commas/escaping correct).

### Professional external-facing quality (should pass)

- [ ] Tone is professional, calm, precise (audience: nephrologists, hospital directors, regulators, investors).
- [ ] No internal jargon, shorthand, or engineering slang.
- [ ] Units, numbers, and clinical terms are consistent across languages.
