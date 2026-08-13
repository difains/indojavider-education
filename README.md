# 인도자 교육 아카이브

> **무대 위의 가수가 아니라, 하나님과 회중을 잇는 다리.**

고등부 찬양 인도자를 위한 **4주 과정 교육 홈페이지**입니다. 첨부 교육 자료의 주차별 본문, 성경 구절, 실천 과제와 원문 PDF를 반응형 웹 경험으로 재구성했습니다.

**공개 홈페이지:** [https://difains.github.io/indojavider-education/](https://difains.github.io/indojavider-education/)

![인도자 교육 아카이브 화면](https://files.manuscdn.com/user_upload_by_module/session_file/91985099/QbCxbarSCTSsBucp.jpg)

## 교육 목적

이 아카이브는 찬양 인도자를 단순한 무대 진행자가 아닌 **회중을 하나님께 연결하는 예배의 청지기**로 훈련하기 위해 설계되었습니다. 각 주차는 신학적 정체성, 찬양의 분별, 예배 서사 설계, 언어의 청지기 직분이라는 흐름으로 연결됩니다.

| 주차 | 주제 | 핵심 질문 |
| --- | --- | --- |
| 1주차 | **정체성 · Identity** | “진짜 주인공은 네가 아니야.” 인도자는 누구를 드러내는가? |
| 2주차 | **분별 · Discernment** | “네 감정에 속지 마.” 우리가 부르는 가사는 무엇을 고백하는가? |
| 3주차 | **예배 서사 · Liturgy** | “예배의 서사를 써라.” 곡의 나열을 어떻게 구속사의 흐름으로 엮는가? |
| 4주차 | **언어의 청지기 · Stewardship** | “마이크 뒤의 칼날.” 인도자의 말은 회중을 어디로 향하게 하는가? |

## 주요 기능

홈페이지는 PC의 좌측 고정 커리큘럼과 모바일 상단 주차 탭을 통해 1~4주차를 빠르게 전환할 수 있습니다. 질문형 카드, 예배 서사 타임라인, 송폼 선택, 금기 아코디언, 디보션 체크리스트 등 교육 내용을 직접 탐색하는 인터랙션을 포함합니다.

각 주차 하단의 **“첨부 원문 전체 보기”**에서 해당 PDF의 모든 페이지를 펼쳐 보거나 새 창으로 열 수 있어, 웹 요약과 원문 교육 자료를 함께 대조할 수 있습니다.

## 기술 구성

| 구분 | 사용 기술 |
| --- | --- |
| 프론트엔드 | React 19, TypeScript, Vite |
| 스타일 | Tailwind CSS 4, 커스텀 CSS 디자인 시스템 |
| 아이콘 | Lucide React |
| 글꼴 | Pretendard Variable |
| 배포 | GitHub Actions + GitHub Pages |

## 로컬 실행

Node.js 22와 pnpm이 준비된 환경에서 아래 명령을 실행합니다.

```bash
pnpm install
pnpm dev
```

개발 서버가 실행되면 터미널에 표시되는 로컬 주소에서 사이트를 확인할 수 있습니다.

## GitHub Pages 배포

이 저장소에는 `.github/workflows/deploy-pages.yml` 워크플로가 포함되어 있습니다. `main` 브랜치로 변경 사항을 푸시하면 정적 사이트가 빌드되고 GitHub Pages에 배포됩니다.

1. 저장소의 **Settings → Pages**에서 Source를 **GitHub Actions**로 설정합니다.
2. `main` 브랜치에 코드를 푸시합니다.
3. **Actions** 탭의 `Deploy to GitHub Pages` 워크플로가 성공했는지 확인합니다.
4. [공개 홈페이지](https://difains.github.io/indojavider-education/)에서 결과를 확인합니다.

GitHub Pages 배포 방식은 [공식 GitHub Pages 문서][1]를 참고할 수 있습니다.

## 프로젝트 구조

```text
.
├── client/
│   ├── src/
│   │   ├── pages/Home.tsx       # 1~4주차 교육 콘텐츠와 상호작용
│   │   ├── App.tsx              # 단일 교육 아카이브 진입점
│   │   └── index.css            # 신학적 청사진 디자인 시스템
│   └── index.html
├── .github/workflows/
│   └── deploy-pages.yml         # GitHub Pages 자동 배포
├── GITHUB_UPLOAD_GUIDE.md       # GitHub 직접 업로드 안내
└── package.json
```

## 콘텐츠 수정 안내

주차별 교육 문안은 `client/src/pages/Home.tsx`의 `WeekOne`부터 `WeekFour` 컴포넌트에서 관리합니다. 시각 시스템과 반응형 규칙은 `client/src/index.css`에서 수정할 수 있습니다. 원문 PDF와 주요 이미지 URL은 외부 정적 자산 주소를 사용하므로, GitHub Pages에서도 별도의 대용량 파일 업로드 없이 표시됩니다.

---

모든 영광을 하나님께. **Soli Deo Gloria.**

[1]: https://docs.github.com/pages "GitHub Pages 공식 문서"
