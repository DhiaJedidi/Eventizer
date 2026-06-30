# skills

Drop Claude skills here — one folder per skill, each containing a `SKILL.md`.

```
skills/
└── <skill-name>/
    └── SKILL.md        # required: frontmatter (name, description) + instructions
    └── ...             # optional: scripts, references, assets the skill uses
```

A `SKILL.md` starts with YAML frontmatter, e.g.:

```markdown
---
name: my-skill
description: One line on what it does and when to use it.
---

Instructions for the skill go here.
```

To make these usable by Claude Code in this project, reference the folder via the
`--skills` flag or your Claude settings (e.g. a `skills` path in `.claude/settings.json`).
