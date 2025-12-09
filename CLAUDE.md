# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 작업할 때 필요한 가이드를 제공합니다.

## 프로젝트 개요

MOADESIGN의 React 기반 회사 홈페이지입니다. 고도몰(NHN커머스) 전문 개발 업체로, 비즈니스 포트폴리오와 고객 문의 플랫폼 역할을 합니다.

## 기술 스택

- **프론트엔드**: React 19 + TypeScript
- **빌드 도구**: Vite 7
- **스타일링**: Tailwind CSS 3.4
- **애니메이션**: Framer Motion
- **폼 처리**: React Hook Form
- **아이콘**: React Icons (Feather Icons + Simple Icons)
- **라우팅**: React Router DOM 7
- **HTTP 클라이언트**: Axios
- **상태 관리**: Zustand (설치됨, 현재 미사용)

## 개발 명령어

```bash
# 개발 서버 시작 (보통 3000번 포트, 사용 중이면 3001번)
npm run dev

# 프로덕션 빌드 (TypeScript 검사 후 빌드)
npm run build

# 프로덕션 빌드 미리보기
npm run preview

# ESLint 실행
npm run lint
```

## 아키텍처

### 컴포넌트 구조
단일 페이지 레이아웃의 섹션 기반 컴포넌트:

```
src/
├── components/        # 재사용 가능한 UI 컴포넌트
│   ├── Header.tsx    # 로고가 포함된 고정 네비게이션
│   ├── Hero.tsx      # 회사 브랜딩이 포함된 랜딩 섹션
│   ├── Services.tsx  # 개발 서비스 소개
│   ├── Portfolio.tsx # 필터링 기능이 있는 프로젝트 포트폴리오
│   ├── Contact.tsx   # 파일 업로드 기능이 있는 문의 폼
│   └── Footer.tsx    # 회사 정보 및 링크
├── pages/
│   └── Home.tsx      # 메인 페이지 레이아웃
└── App.tsx           # 라우터 설정
```

### 주요 기능

1. **포트폴리오 시스템**: 기술 카테고리별 동적 필터링 (고도몰, React, PHP, Python, 앱)
2. **문의 폼**: 파일 첨부 지원하는 다중 필드 폼 (파일당 최대 10MB)
3. **반응형 디자인**: Tailwind 브레이크포인트를 사용한 모바일 우선 접근법
4. **애니메이션**: 스크롤 트리거 애니메이션 및 인터랙션용 Framer Motion

### 비즈니스 정보

- **주력 서비스**: 2012년부터 고도몰(NHN커머스) 개발
- **포트폴리오**: 1,000개 이상 완료 프로젝트, 주로 한국 이커머스 사이트
- **연락처 정보**: 
  - 이메일: hdopen@moacoms.com
  - 전화: 010-6779-0789
  - 주소: 경기도 고양시 덕양구 무원로 24, 4층(골드프라자)
  - 도메인: moadesign.info

### 에셋

- **로고**: `/images/logo.png` (회사 로고, 헤더/히어로/푸터에서 사용)
- **포트폴리오 이미지**: `/portfolio/*.png` (실제 클라이언트 프로젝트 스크린샷)

### 폼 처리

문의 폼 포함 사항:
- 기본 필드 (이름, 이메일, 전화번호, 제목, 내용)
- 유효성 검사가 있는 파일 첨부 (10MB 제한, 특정 파일 형식)
- 시뮬레이션 제출 (현재 백엔드 통합 없음)
- 성공/오류 상태 관리

### 개발 참고사항

- 콘텐츠와 UI 텍스트에 한국어 사용
- 포트폴리오 데이터는 실제 클라이언트 프로젝트 정보로 하드코딩됨
- 현재 테스트 프레임워크 구성 없음
- 코드 품질을 위한 ESLint + Prettier 구성
- Vite 개발 서버는 3000번 포트에서 자동으로 브라우저 열기 설정 (3001번+ 대체)

## Vercel 배포

### 자동 배포
GitHub 연결 완료 시 `git push`할 때마다 자동 배포됩니다.

### 수동 배포 방법
1. **Vercel 대시보드**: https://vercel.com/dashboard
2. **프로젝트 선택**: `moadesign`
3. **Deployments 탭** → 우측 상단 **"Create Deployment"** 또는 **"Redeploy"** 버튼
4. **또는**: Overview 페이지 → **점 3개(⋮)** 메뉴 → **"Redeploy"**

### Vercel 설정
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **GitHub 저장소**: `moacoms/moadesign`

## 완료 상태 (2025-07-29)
프로젝트가 성공적으로 배포되어 운영 중입니다:
- **사이트**: https://moadesign.vercel.app
- **도메인**: https://moadesign.info (연결 완료)
- **문의 폼**: 파일 첨부 기능 포함하여 정상 작동
- **이메일**: hdopen@moacoms.com으로 자동 전송
- **GitHub**: https://github.com/moacoms/moadesign

상세한 관리 정보는 `PROJECT_DOCUMENTATION.md` 참조