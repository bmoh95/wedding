# BMO Hermes Dashboard

공유용 Hermes 운영 대시보드입니다.

## 화면

- 메인: `index.html`
- 리니지2M 매물 감시: `l2m-market.html`
- PDF to JPG: `pdf-to-jpg.html` — 브라우저 로컬 변환, PDF 업로드 없음, JPG ZIP 다운로드
- 모바일 청첩장: `wedding-invitation.html` — 박용태 · 나수진 결혼식 초대장

## 데이터 갱신

로컬 Hermes 환경에서 아래 명령으로 현재 안타라스 매물 감시 데이터를 갱신합니다.

```bash
python3 scripts/update_l2m_market.py
```

생성 파일:

```text
data/l2m_market.json
```
