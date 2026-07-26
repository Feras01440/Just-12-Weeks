# Contributing and Version-Control Policy

This repository is professionally maintained by its owner. All contributions — documentation, design artefacts, and eventually code — follow the conventions below. They exist to keep the history readable, the authorship clear, and the repository presentable to any collaborator, reviewer or partner at any time.

## Authorship

- Every commit is authored and committed under a clear, human Git identity linked to the contributor's GitHub account (real name or established GitHub username, with a GitHub-recognised email).
- Commits must not carry tool, vendor, bot or assistant identities in the author or committer fields.
- Co-author trailers (`Co-Authored-By:`) are used only for genuine human co-contributors.

## Commit messages

- Concise, purpose-based subjects in the imperative mood (≤72 characters where practical): say what the change accomplishes, not how it was produced.
- Bodies, where needed, explain intent and consequences — not process.
- No generated-by statements, no tool footers, no development-session URLs or identifiers, no marketing language.
- Group related changes into logical commits; avoid both monolithic dump-commits and noise-commits ("fix", "wip").

## Branches

- Neutral, descriptive branch names: `area/short-purpose` (e.g. `product-foundation/v1`, `research/stage1-pack`, `fix/paywall-copy`).
- No personal names, tool names, or auto-generated identifiers in branch names.
- `main` is protected in practice: never rewritten, never force-pushed. Feature branches may be tidied with `--force-with-lease` only, and only before review begins.

## Pull requests

- Professional titles stating the change's purpose.
- Descriptions cover: purpose, scope, major deliverables, verification performed, decisions recorded (where applicable), deliberate exclusions, and review instructions.
- No generator footers, attribution badges, or session links.
- Pull requests merge only with the owner's explicit approval; work-in-review stays open and unmerged until then.

## Repository hygiene

- No secrets, credentials, tokens, or private conversation links anywhere in history — including in documentation examples.
- No personal data of research participants or users in the repository (see `docs/08-security/` for the project's data-handling standards).
- Documentation follows the project's labelling conventions (`docs/00-foundation/decision-log.md`): claims are sourced, decisions are logged, and recommendations are marked as such.

## Scope note

Substantive documentation may discuss technologies — including AI — where genuinely relevant to product requirements, risks or governance. This policy governs *authorship and attribution presentation*, not technical content.
