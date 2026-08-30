# 아트머그용 GitHub Pages 배포 파일

## 폴더 구조

- `index.html`: 배포할 상세 페이지
- `img/banner.webp`: 상단 배너 이미지
- `avatar/manuka.webp`: 마누카 아바타 이미지
- `avatar/kaguya.webp`: 카구야 아바타 이미지
- `portfolio/bboing/01.webp` ~ `20.webp`: 뽀잉눈 샘플
- `portfolio/facial/01.webp` ~ `20.webp`: 페이셜 샘플
- `portfolio/sculpt/01.webp` ~ `20.webp`: 원화 기반 성형 샘플
- `.nojekyll`: GitHub Pages가 파일을 그대로 배포하도록 하는 설정

원본 첨부에는 HTML만 포함되어 있어 위 이미지 파일은 들어 있지 않습니다. 같은 이름과 경로로 이미지를 추가해야 기존 디자인이 완성됩니다. 파일명은 영문 소문자와 숫자를 권장합니다.

## GitHub Pages 연결

1. GitHub에서 새 저장소를 만듭니다. 무료 계정이라면 Pages 공개를 위해 `Public` 저장소가 가장 간단합니다.
2. 이 폴더 안의 파일과 이미지 폴더를 저장소 최상위에 업로드합니다. 개인 정보, 신청자 자료, 원본 작업 파일, 비밀번호나 토큰은 올리지 마세요.
3. 저장소의 `Settings` → `Pages`로 이동합니다.
4. `Build and deployment`의 Source를 `Deploy from a branch`로 선택합니다.
5. Branch는 `main`, 폴더는 `/(root)`를 선택하고 저장합니다.
6. 배포가 끝나면 `https://사용자명.github.io/저장소명/` 주소로 접속합니다.
7. Pages 설정에서 `Enforce HTTPS`가 켜져 있는지 확인합니다.

## 아트머그에 연결

아트머그는 외부 URL을 직접 넣은 iframe을 차단할 수 있습니다. 이 저장소는 아트머그에서 실제 사용 중인 것과 같은 외부 JavaScript 로더 방식을 제공합니다. `ARTMUG-PASTE.html`의 아래 두 줄을 아트머그 HTML 편집기에 붙여넣습니다.

```html
<div id="pupuCommissionMount" style="display:block;width:100%;margin:0;padding:0"></div>
<script src="https://rollll1211231.github.io/artmug-github-pages/artmug-loader.js?v=20260830-3"></script>
```

`artmug-loader.js`가 아트머그 내부에 격리된 상세페이지를 만들고 `pupu-runtime.js`가 페이지 전환과 FAQ 등 상호작용을 실행합니다.

## 보안 점검

- GitHub Pages 저장소와 배포 페이지는 공개된다고 가정합니다.
- 신청자 이름, 연락처, 결제 정보, 작업 원본 및 비공개 자료를 저장소에 넣지 않습니다.
- 외부 스크립트, 광고 코드, 추적기 및 분석 코드를 추가하지 않습니다.
- 모든 링크와 이미지 주소는 HTTPS만 사용합니다.
- 신청 링크는 새 창으로 열리며 원본 페이지 제어를 막는 `noopener noreferrer`가 적용되어 있습니다.
- `index.html`에는 불필요한 외부 통신, 플러그인 객체, 중첩 프레임 및 폼 전송을 제한하는 콘텐츠 보안 정책이 포함되어 있습니다.

## 폰트 출처

카페24 써라운드는 카페24가 제공하는 무료 폰트이며 웹폰트와 상업적 이용이 가능합니다. 글꼴 파일 자체의 유료 판매는 금지됩니다. 폰트 출처: 카페24 무료폰트.
