# Vercel 사용 가이드

## Vercel이란?
프론트엔드 프로젝트를 위한 클라우드 플랫폼으로, 특히 Next.js, React, Vue 등을 쉽게 배포할 수 있습니다.

## 주요 특징
- **무료 플랜**: 개인/소규모 프로젝트에 충분
- **자동 배포**: Git 연동으로 푸시 시 자동 배포
- **서버리스 함수**: API 백엔드 기능
- **CDN**: 전 세계 빠른 속도
- **커스텀 도메인**: 무료 SSL 포함

## 설치 및 설정

### 1. Vercel CLI 설치
```bash
npm install -g vercel
```

### 2. 로그인
```bash
vercel login
```

### 3. 프로젝트 초기 배포
```bash
# 프로젝트 폴더에서
vercel

# 또는 바로 프로덕션 배포
vercel --prod
```

## 주요 명령어

### 배포 관련
```bash
# 개발용 배포 (미리보기)
vercel

# 프로덕션 배포
vercel --prod

# 특정 브랜치 배포
vercel --prod --target production
```

### 프로젝트 관리
```bash
# 프로젝트 목록 보기
vercel list

# 배포 목록 보기
vercel ls

# 로그 확인
vercel logs [배포URL]

# 프로젝트 정보
vercel inspect [배포URL]

# 프로젝트 삭제
vercel remove [프로젝트명]
```

### 환경 변수
```bash
# 환경 변수 추가
vercel env add [변수명]

# 환경 변수 목록
vercel env ls

# 환경 변수 삭제
vercel env rm [변수명]
```

## 프로젝트 설정 파일

### vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ],
  "functions": {
    "api/*.js": {
      "maxDuration": 10
    }
  }
}
```

### 주요 설정 옵션
- `buildCommand`: 빌드 명령어
- `outputDirectory`: 빌드 결과 폴더
- `rewrites`: URL 리라이팅 규칙
- `functions`: 서버리스 함수 설정

## 서버리스 함수 (API)

### 파일 구조
```
api/
├── hello.js          # /api/hello
├── contact.js        # /api/contact
└── users/
    └── [id].js       # /api/users/123
```

### 기본 함수 예제
```javascript
// api/hello.js
export default function handler(req, res) {
  res.status(200).json({ 
    message: 'Hello World',
    method: req.method 
  });
}
```

### 환경 변수 사용
```javascript
export default function handler(req, res) {
  const apiKey = process.env.API_KEY;
  res.json({ key: apiKey ? 'Set' : 'Not set' });
}
```

## 도메인 설정

### 1. Vercel 대시보드에서 도메인 추가
1. 프로젝트 설정 → Domains
2. "Add Domain" 클릭
3. 도메인 입력 (예: example.com)

### 2. DNS 설정
```
# A 레코드 (루트 도메인)
Type: A
Name: @
Value: 76.76.21.21

# CNAME (www 서브도메인)
Type: CNAME  
Name: www
Value: cname.vercel-dns.com.
```

## 환경별 배포

### 브랜치별 환경
- `main` 브랜치 → 프로덕션
- `develop` 브랜치 → 스테이징
- 기타 브랜치 → 미리보기

### 환경 변수 분리
- Production: 실제 서비스용
- Preview: 미리보기용  
- Development: 로컬 개발용

## 모니터링 및 분석

### 대시보드에서 확인 가능한 정보
- 배포 기록
- 트래픽 통계
- 성능 메트릭
- 에러 로그
- 함수 사용량

### 실시간 로그 확인
```bash
# 실시간 로그 보기
vercel logs --follow

# 특정 함수 로그
vercel logs /api/contact
```

## 비용 및 제한사항

### 무료 플랜 (Hobby)
- 대역폭: 100GB/월
- 서버리스 함수: 100GB-Hrs/월
- 도메인: 무제한
- 팀원: 1명

### 유료 플랜 (Pro)
- $20/월
- 대역폭: 1TB/월
- 고급 분석
- 패스워드 보호
- 팀 협업

## 문제 해결

### 배포 실패
```bash
# 상세 로그 확인
vercel --debug

# 빌드 로그 확인  
vercel inspect --logs [배포ID]
```

### 일반적인 오류
1. **빌드 실패**: package.json 스크립트 확인
2. **함수 오류**: 환경 변수 설정 확인
3. **도메인 연결**: DNS 전파 대기 (최대 48시간)

### 캐시 관리
```bash
# 캐시 무효화
vercel --force

# 전체 재빌드
vercel --prod --force
```

## 우리 프로젝트 적용 사례

### 현재 설정
- **프로젝트**: moadesign
- **URL**: https://moadesign.vercel.app
- **도메인**: https://moadesign.info
- **API**: /api/contact (문의 폼)
- **환경 변수**: EMAIL_USER, EMAIL_PASS

### 배포 워크플로우
1. 코드 변경 후 Git 푸시
2. Vercel 자동 빌드 & 배포
3. 성공 시 실제 사이트 업데이트
4. 문제 시 이전 버전으로 즉시 롤백 가능

## 추가 팁

### 성능 최적화
- 이미지 최적화: Vercel Image Optimization 사용
- 캐싱: 적절한 Cache-Control 헤더 설정
- 번들 분석: `vercel inspect` 활용

### 보안
- 환경 변수로 민감 정보 관리
- API 라우트에 인증 추가
- CORS 설정 적용

### 팀 작업
- Git 브랜치 전략 수립
- 미리보기 배포로 코드 리뷰
- 환경별 설정 분리

---
Vercel 공식 문서: https://vercel.com/docs