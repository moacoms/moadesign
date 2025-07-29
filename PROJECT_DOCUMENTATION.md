# MOADESIGN 프로젝트 문서

## 프로젝트 개요
- **사이트**: https://moadesign.vercel.app (https://moadesign.info 연결 예정)
- **목적**: 고도몰 전문 개발 업체 MOADESIGN의 회사 홈페이지
- **GitHub**: https://github.com/moacoms/moadesign

## 기술 스택
- **프론트엔드**: React 19 + TypeScript + Vite
- **스타일링**: Tailwind CSS
- **배포**: Vercel
- **이메일**: Nodemailer (Gmail SMTP)
- **파일 업로드**: Formidable

## 주요 기능
1. **회사 소개 페이지**
   - Hero 섹션
   - 서비스 소개
   - 포트폴리오 (필터링 기능)
   - 문의하기 폼

2. **문의 폼 기능**
   - 이메일 전송 (hdopen@moacoms.com)
   - 파일 첨부 (최대 10MB)
   - 자동 응답 메일
   - 유효성 검사

## 환경 설정

### 1. 로컬 개발
```bash
# 의존성 설치
npm install

# 개발 서버 실행 (포트 3000)
npm run dev

# 프로덕션 빌드
npm run build
```

### 2. Vercel 환경 변수
Vercel 대시보드 (https://vercel.com/hdopens-projects/moadesign/settings/environment-variables) 에서 설정:
- `EMAIL_USER`: Gmail 이메일 주소
- `EMAIL_PASS`: Gmail 앱 비밀번호

### 3. Gmail 앱 비밀번호 생성
1. https://myaccount.google.com/ 접속
2. 보안 → 2단계 인증 활성화
3. 앱 비밀번호 생성
4. 16자리 비밀번호를 `EMAIL_PASS`에 설정

## 파일 구조
```
moadesign/
├── api/                    # Vercel 서버리스 함수
│   ├── contact.js         # 문의 폼 API (파일 첨부 지원)
│   └── hello.js          # 테스트 API
├── src/
│   ├── components/
│   │   ├── Header.tsx    # 네비게이션
│   │   ├── Hero.tsx      # 메인 배너
│   │   ├── Services.tsx  # 서비스 소개
│   │   ├── Portfolio.tsx # 포트폴리오
│   │   ├── Contact.tsx   # 문의 폼
│   │   └── Footer.tsx    # 푸터
│   └── App.tsx
├── public/
│   ├── images/          # 로고 이미지
│   └── portfolio/       # 포트폴리오 이미지
└── vercel.json          # Vercel 설정
```

## 배포 프로세스

### 1. 코드 변경 후 배포
```bash
# 변경사항 커밋
git add -A
git commit -m "커밋 메시지"
git push

# Vercel 자동 배포 또는 수동 배포
vercel --prod
```

### 2. 도메인 연결 (moadesign.info)
1. Vercel 대시보드에서 도메인 추가
2. DNS 설정 (가비아):
   - A 레코드: @ → 76.76.21.21
   - CNAME: www → cname.vercel-dns.com. (점 포함)

## 문제 해결

### 문의 폼이 작동하지 않을 때
1. Vercel 환경 변수 확인
2. Gmail 앱 비밀번호 확인
3. 브라우저 콘솔에서 에러 확인

### 파일 첨부가 안 될 때
1. 파일 크기 10MB 이하 확인
2. 지원 파일 형식 확인
3. `/api/contact` 응답 확인

## 유지보수 정보

### 회사 정보 업데이트
- 이메일: `src/components/Contact.tsx`의 `hdopen@moacoms.com`
- 전화번호: `src/components/Contact.tsx`의 `010-6779-0789`
- 주소: `src/components/Footer.tsx`

### 포트폴리오 추가
- 이미지: `/public/portfolio/` 폴더에 추가
- 데이터: `src/components/Portfolio.tsx`의 `projects` 배열 수정

### 이메일 템플릿 수정
- 파일: `api/contact.js`
- 관리자 메일: `mailOptions` 객체
- 자동 응답: `autoReplyOptions` 객체

## 보안 주의사항
1. `.env` 파일은 절대 GitHub에 올리지 않기
2. 환경 변수는 Vercel 대시보드에서만 관리
3. Gmail 앱 비밀번호는 안전하게 보관

## 추가 개발 가능 사항
1. 다국어 지원 (영어/한국어)
2. 블로그 섹션
3. 고객 후기 섹션
4. 실시간 채팅 기능
5. SEO 최적화

## 연락처
- 개발자: hdopen@moacoms.com
- 회사: MOADESIGN
- 주소: 경기도 고양시 덕양구 무원로 24, 4층(골드프라자)

---
마지막 업데이트: 2025-07-29