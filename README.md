# 인도자 교육 아카이브 (INDOJAVIDER)

> **“무대 위의 가수가 아니라, 하나님과 회중을 잇는 다리(Bridge).”**

고등부 찬양 인도자, 싱어 및 찬양팀원을 위한 **4주 과정 성경적 찬양 인도자 양성 교육 아카이브**입니다.  
첨부된 최신 4주차 교육 원문 자료(총 40장 고화질 슬라이드), 성경 요절, 신학적 분별 기준, 실천 과제 및 인터랙티브 학습 도구를 반응형 웹 경험으로 제공합니다.

- **공개 웹사이트:** [https://difains.github.io/indojavider-education/](https://difains.github.io/indojavider-education/)

---

## 📖 4주간의 교육 커리큘럼 개요

| 주차 | 핵심 주제 | 신학적 본질 및 핵심 질문 | 주요 성경 요절 |
|:---:|:---|:---|:---|
| **1주차** | **정체성 (Identity)**<br>*“진짜 주인공은 네가 아니야”* | • 창조와 타락: 자기 영광을 가로채려는 죄성의 극복<br>• 존 칼빈 『기독교 강요』의 우상 공장 메커니즘<br>• 무대 위의 퍼포머가 아닌 ‘다리(Bridge)’의 직분<br>• 다리가 스스로 빛나려 할 때 일어나는 다리 붕괴 경고 | 요한복음 3:30<br>골로새서 3:16 |
| **2주차** | **분별 (Discernment)**<br>*“네 감정에 속지 마: 참된 위로는 어디서 오는가?”* | • 예배의 규범적 원리(RPW, 레위기 10장 ‘다른 불’ 경고)<br>• 개별 가사 분별 기준: 골로새서 3:16<br>• 위로의 뿌리 비교: 십자가(수직적·영속적) vs 감정 자체(수평적·일시적)<br>• 위로 중심 CCM 가사 신학적 분석 & 시편 121편을 통한 목회적 보완 대안 | 요한복음 4:23~24<br>갈라디아서 1:10<br>시편 121:1~2 |
| **3주차** | **예배 서사 (Liturgy)**<br>*“예배의 서사를 써라”* | • 멜론 플레이리스트(단절) vs 구속사적 콘티(서사적 기획)<br>• 이사야 6장에 기초한 4단계 예배 서사 여정 (부름→참회→구속→헌신)<br>• 곡의 해부학: 송폼(Verse-Chorus-Bridge)과 영적 다이내믹스<br>• 은혜의 흐름을 지키는 3대 전환 사운드 테크닉 (키 변조/허밍, 패드, 킥 펄스) | 이사야 6:1~8<br>골로새서 3:16 |
| **4주차** | **언어의 청지기 (Stewardship)**<br>*“마이크 뒤의 칼날”* | • 마이크의 양면성: 생명의 통로 vs 사람을 치는 칼날<br>• 느헤미야 8장 ‘에스라의 원리’에 기초한 성경 말씀 중심 선포<br>• 3대 절대 금기와 대안 (타인 비방·감정적 선동·자기 자랑 금지)<br>• 리허설 전 필수 10분 디보션 (모임→디보션→영적 연합→합주) | 잠언 10:19<br>에베소서 4:29<br>느헤미야 8:5~8 |

---

## ✨ 핵심 기능 및 인터랙션

1. **주차별 내장 슬라이드 갤러리 뷰어 (Slide Gallery)**
   - 외부 CDN 의존 없이 1~4주차 총 40장의 고화질 슬라이드 원본을 웹에서 바로 페이지네이션 및 확대/축소하여 열람 가능
2. **신학적 청사진(Blueprint) 비주얼 인포그래픽**
   - 1주차: 칼빈의 우상 공장 플로우, 퍼포머 대 다리 비교 매트릭스, 다리 붕괴 경고 다이어그램
   - 2주차: RPW 원리 비교, 십자가 대 감정 위로의 뿌리 비교표, 위로 중심 가사 신학적 인스펙터(Lyric Inspector)
   - 3주차: 창조-타락-구속-완성 스택, 이사야 6장 4단계 타임라인, 3대 전환 사운드 테크닉 가이드
   - 4주차: 에스라의 원리 대조, 3대 금기 비교 아코디언, 리허설 전 10분 디보션 프로세스, 1분 멘트 실전 체크리스트
3. **모바일 최적화 및 드로어 네비게이션**
   - 모바일 환경에서 상단 가로 탭 및 슬라이드아웃 사이드바 드로어를 통한 원활한 주차 이동 지원

---

## 🛠️ 기술 스택

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** CSS Design System (신학적 청사진 — Bridge Amber `#D69B2B`, Ink Navy `#0D1E33`, Paper Ivory `#F7F5EE`)
- **Icons:** Lucide React
- **Typography:** Pretendard Variable, Noto Serif KR, DM Mono
- **Deployment:** GitHub Actions + GitHub Pages

---

## 💻 로컬 개발 환경 실행

```bash
# 의존성 패키지 설치
pnpm install

# 로컬 개발 서버 실행
pnpm dev

# 정적 타입 검사 및 빌드 검증
pnpm check
pnpm build
```

---

## 🚀 GitHub Pages 배포 안내

이 저장소는 `main` 브랜치에 코드가 푸시되면 `.github/workflows/deploy-pages.yml` 액션이 자동으로 실행되어 정적 사이트를 빌드하고 GitHub Pages로 배포합니다.

1. 저장소의 **Settings → Pages**에서 Build and deployment Source를 **GitHub Actions**로 설정합니다.
2. `main` 브랜치에 커밋을 푸시합니다.
3. 배포 URL: [https://difains.github.io/indojavider-education/](https://difains.github.io/indojavider-education/)

---

모든 영광을 오직 하나님께. **Soli Deo Gloria.**
