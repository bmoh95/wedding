#!/usr/bin/env bash
set -euo pipefail
cd /Users/beemo/bmo_hermes_dashboard
python3 scripts/update_l2m_market.py >/dev/null
python3 scripts/update_daily_fortunes.py >/dev/null
python3 scripts/check_fortune_data_contract.py >/dev/null
paths=(
  data/l2m_market.json
  data/daily_fortunes.json
  index.html
  fortune-history.html
  today-workout.html
  assets/daily-fortunes.js
  assets/today-fitness.js
  assets/styles.css
  scripts/update_daily_fortunes.py
  scripts/check_fortune_data_contract.py
  scripts/publish_l2m_market.sh
)
if [[ -z "$(git status --porcelain -- "${paths[@]}")" ]]; then
  exit 0
fi
git add "${paths[@]}"
git commit -m "Update dashboard snapshots" >/dev/null
git push origin main >/dev/null
