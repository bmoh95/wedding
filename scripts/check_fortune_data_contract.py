#!/usr/bin/env python3
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HTML_PATH = ROOT / 'fortune-history.html'
JS_PATH = ROOT / 'assets' / 'daily-fortunes.js'
DATA_PATH = ROOT / 'data' / 'daily_fortunes.json'


def fail(message: str) -> None:
    print(f'FAIL: {message}', file=sys.stderr)


def main() -> int:
    errors: list[str] = []

    html = HTML_PATH.read_text(encoding='utf-8')
    js = JS_PATH.read_text(encoding='utf-8')
    data = json.loads(DATA_PATH.read_text(encoding='utf-8'))

    if 'data-source="data/daily_fortunes.json"' not in html:
        errors.append('fortune-history.html must point the reusable renderer at data/daily_fortunes.json')

    inline_card = re.search(r'<(?:details|article|section)\b[^>]*(?:fortune-entry|fortune-card)', html, re.I)
    if inline_card:
        errors.append('fortune-history.html must not contain inline fortune record cards')

    if 'fetch(`${dataSource}?ts=${Date.now()}`)' not in js:
        errors.append('daily-fortunes.js must fetch the JSON data source instead of embedding records')

    if 'entries.map((entry, index) => renderEntry(entry, index)).join' not in js:
        errors.append('daily-fortunes.js must render records by looping over data.entries')

    entries = data.get('entries')
    if not isinstance(entries, list):
        errors.append('daily_fortunes.json must contain an entries array')
        entries = []

    if data.get('count') != len(entries):
        errors.append(f'daily_fortunes.json count mismatch: count={data.get("count")} entries={len(entries)}')

    html_block_re = re.compile(r'<(?:article|details|section|div|main|script|style)\b', re.I)
    for index, entry in enumerate(entries):
        if not isinstance(entry, dict):
            errors.append(f'entries[{index}] must be an object')
            continue
        for key in ('date', 'title', 'content'):
            if key not in entry:
                errors.append(f'entries[{index}] missing {key!r}')
        content = str(entry.get('content', ''))
        if html_block_re.search(content):
            errors.append(f'entries[{index}] content appears to contain an HTML block; keep records as JSON/Markdown data')

    if errors:
        for message in errors:
            fail(message)
        return 1

    print(f'OK: {len(entries)} fortune records stored in JSON and rendered by reusable JS view')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
