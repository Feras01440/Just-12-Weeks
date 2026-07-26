#!/usr/bin/env python3
"""Repeatable integrity checks for the 12 Weeks foundation documentation.

Run from the repository root:  python3 tools/verify-foundation.py
Exit code 0 = all checks pass; 1 = at least one failure (each printed).

Checks
  1. Evidence-corpus ID integrity: every data row in
     docs/02-research/public-evidence-corpus.md carries a stable EV-nnnn ID;
     IDs are unique, contiguous within their cluster, and cluster counts
     match the counts stated in the corpus preamble.
  2. No unresolved positional references: the legacy E1-nn/E2-nn/E3-nn/E4-nn
     citation style must not appear anywhere outside the corpus's own
     migration note.
  3. No dangling citations: every EV-nnnn cited in any doc resolves to a
     corpus row (ranges like EV-2018…2022 are expanded and checked).
  4. Internal link integrity: every relative .md link target in docs/
     exists on disk.
  5. Repository-attribution policy: tracked files contain none of the
     banned attribution terms (checked case-insensitively).
"""

from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CORPUS = ROOT / "docs" / "02-research" / "public-evidence-corpus.md"
DOCS = ROOT / "docs"

EXPECTED = {1: 54, 2: 63, 3: 58, 4: 52}  # cluster -> row count (declared in corpus preamble)

failures: list[str] = []


def fail(msg: str) -> None:
    failures.append(msg)


def corpus_ids() -> list[str]:
    ids: list[str] = []
    for line in CORPUS.read_text(encoding="utf-8").splitlines():
        m = re.match(r"^\| (EV-\d{4}) \|", line)
        if m:
            ids.append(m.group(1))
    return ids


def check_corpus() -> set[str]:
    ids = corpus_ids()
    seen: set[str] = set()
    for i in ids:
        if i in seen:
            fail(f"duplicate corpus ID: {i}")
        seen.add(i)
    by_cluster: dict[int, list[int]] = {c: [] for c in EXPECTED}
    for i in ids:
        n = int(i.split("-")[1])
        cluster, ordinal = divmod(n, 1000)
        if cluster not in EXPECTED:
            fail(f"ID outside known clusters: {i}")
            continue
        by_cluster[cluster].append(ordinal)
    for cluster, expected_count in EXPECTED.items():
        got = sorted(by_cluster[cluster])
        if len(got) != expected_count:
            fail(f"cluster E{cluster}: {len(got)} rows, preamble declares {expected_count}")
        missing = [f"EV-{cluster}{o:03d}" for o in range(1, (max(got) if got else 0) + 1) if o not in set(got)]
        for m in missing:
            fail(f"gap in cluster E{cluster}: {m} missing (IDs are immutable; retired rows keep their ID)")
    total = len(ids)
    declared = sum(EXPECTED.values())
    if total != declared:
        fail(f"corpus total {total} != declared {declared}")
    return seen


def md_files() -> list[Path]:
    return sorted(p for p in DOCS.rglob("*.md"))


def check_positional_refs() -> None:
    pat = re.compile(r"\bE[1-4]-\d{2}[a-z]?\b")
    for p in md_files():
        for lineno, line in enumerate(p.read_text(encoding="utf-8").splitlines(), 1):
            if p == CORPUS and "migration" in line.lower():
                continue  # the corpus preamble may describe the retired scheme
            for m in pat.finditer(line):
                # A retired ID wrapped in straight quotes is a historical description
                # (e.g. discussing the old scheme in the correction log), not a citation.
                before = line[m.start() - 1] if m.start() > 0 else ""
                after = line[m.end()] if m.end() < len(line) else ""
                if before == '"' and after == '"':
                    continue
                fail(f"unresolved positional reference {m.group()} at {p.relative_to(ROOT)}:{lineno}")


def check_citations(valid: set[str]) -> None:
    single = re.compile(r"EV-(\d{4})")
    rng = re.compile(r"EV-(\d{4})…(?:EV-)?(\d{4})")
    for p in md_files():
        if p == CORPUS:
            continue  # the corpus defines IDs; its preamble names the future EV-5001 convention
        text = p.read_text(encoding="utf-8")
        cited: set[str] = set()
        for a, b in rng.findall(text):
            lo, hi = int(a), int(b)
            if lo // 1000 != hi // 1000 or lo > hi:
                fail(f"malformed range EV-{a}…{b} in {p.relative_to(ROOT)}")
                continue
            cited.update(f"EV-{n}" for n in range(lo, hi + 1))
        cited.update(f"EV-{n}" for n in single.findall(text))
        for c in sorted(cited - valid):
            fail(f"dangling citation {c} in {p.relative_to(ROOT)}")


def check_links() -> None:
    link = re.compile(r"\]\(([^)#\s]+\.md)(?:#[^)]*)?\)")
    for p in md_files():
        for target in link.findall(p.read_text(encoding="utf-8")):
            if target.startswith("http"):
                continue
            if not (p.parent / target).resolve().exists():
                fail(f"broken link {target} in {p.relative_to(ROOT)}")


def check_attribution_policy() -> None:
    # Repository policy: no AI-assistant attribution anywhere in tracked files.
    banned = ["anthropic", "claude", "chatgpt", "openai", "co-authored-by", "generated with", "codex"]
    tracked = subprocess.run(
        ["git", "ls-files"], cwd=ROOT, capture_output=True, text=True, check=True
    ).stdout.splitlines()
    allow = {Path(__file__).name, "CONTRIBUTING.md"}  # this checker and the policy statement itself
    for rel in tracked:
        p = ROOT / rel
        if p.name in allow or p.suffix in {".png", ".jpg", ".pdf", ".zip"}:
            continue
        try:
            text = p.read_text(encoding="utf-8").lower()
        except (UnicodeDecodeError, FileNotFoundError):
            continue
        for term in banned:
            if term in text:
                fail(f"banned attribution term '{term}' in {rel}")


def main() -> int:
    check_positional_refs()
    valid = check_corpus()
    check_citations(valid)
    check_links()
    check_attribution_policy()
    if failures:
        print(f"FAIL — {len(failures)} problem(s):")
        for f in failures:
            print(f"  - {f}")
        return 1
    ids = corpus_ids()
    print(
        "OK — corpus "
        + ", ".join(f"E{c}: {EXPECTED[c]}" for c in sorted(EXPECTED))
        + f" (total {len(ids)}); no positional refs, no dangling citations, links resolve, attribution policy holds."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
