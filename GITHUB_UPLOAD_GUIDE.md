# 인도자 교육 홈페이지 GitHub 업로드 안내

이 ZIP 파일에는 **React/Vite 기반 홈페이지 소스**, **GitHub Pages 자동 배포 워크플로**, 그리고 현재 적용된 교육 콘텐츠가 포함되어 있습니다. 이미지와 주차별 PDF 원문은 외부 정적 주소를 사용하도록 구성되어 있어, GitHub 저장소에 대용량 원본 파일을 별도로 올리지 않아도 됩니다.

## 가장 쉬운 업로드 방법: GitHub 웹사이트

1. [GitHub](https://github.com)에 로그인한 뒤 `indojavider-education` 저장소를 엽니다.
2. 저장소의 기본 브랜치가 `main`인지 확인합니다. 기존 파일이 있다면 먼저 별도 보관하거나, 이번 파일로 교체할지 결정합니다.
3. **Add file → Upload files**를 선택합니다.
4. 이 ZIP 파일을 컴퓨터에서 압축 해제한 뒤, 압축을 푼 폴더 안의 파일과 폴더를 모두 업로드합니다. `.github` 폴더도 포함해야 자동 배포가 동작합니다.
5. 페이지 하단에서 커밋 메시지를 입력하고 **Commit changes**를 눌러 `main` 브랜치에 저장합니다.

> `node_modules`, `dist`, `.git` 폴더는 업로드하지 않아도 됩니다. ZIP 패키지에는 포함되어 있지 않습니다.

## GitHub Pages 활성화

1. 저장소에서 **Settings → Pages**로 이동합니다.
2. **Build and deployment**의 Source를 **GitHub Actions**로 선택합니다.
3. 저장소의 **Actions** 탭에서 `Deploy to GitHub Pages` 워크플로가 실행되는지 확인합니다.
4. 작업이 성공하면 일반적으로 다음 주소에서 사이트를 확인할 수 있습니다.

```text
https://difains.github.io/indojavider-education/
```

## 문제가 생기면 확인할 사항

| 확인 항목 | 조치 |
| --- | --- |
| 배포 워크플로가 보이지 않음 | `.github/workflows/deploy-pages.yml` 파일이 업로드되었는지 확인합니다. |
| Actions 권한 오류 | **Settings → Actions → General → Workflow permissions**에서 `Read and write permissions`를 선택하고 저장합니다. |
| 페이지가 404로 표시됨 | **Settings → Pages**의 Source가 `GitHub Actions`인지 확인하고, Actions 배포 완료 후 1~2분 뒤 새로고침합니다. |
| 이미지나 PDF가 열리지 않음 | 외부 네트워크 접근을 확인한 뒤 브라우저 캐시를 새로고침합니다. |

## 로컬에서 수정 후 올리는 방법

Node.js 22와 pnpm이 설치된 환경에서는 아래 명령으로 미리 확인할 수 있습니다.

```bash
pnpm install
pnpm dev
```

GitHub Pages용 정적 빌드는 다음 명령으로 생성됩니다.

```bash
GITHUB_PAGES=true pnpm build
```

자세한 GitHub Pages 설정은 [GitHub Pages 공식 문서](https://docs.github.com/pages)에서 확인할 수 있습니다.
