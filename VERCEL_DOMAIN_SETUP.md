# Vercel 커스텀 도메인 설정 가이드

Vercel에서 커스텀 도메인을 연결하는 방법입니다.

## 1. Vercel 대시보드에서 도메인 추가

1. https://vercel.com/hdopens-projects/moadesign/settings/domains 접속
2. "Add Domain" 클릭
3. 도메인 입력 (예: moadesign.info)
4. "Add" 클릭

## 2. DNS 설정

### A 레코드 설정 (루트 도메인용)
```
Type: A
Name: @ (또는 빈칸)
Value: 76.76.21.21
```

### CNAME 설정 (www 서브도메인용)
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## 3. 도메인 제공업체별 설정

### 가비아 (Gabia)
1. My가비아 → 도메인 관리
2. DNS 정보 → DNS 설정
3. 위의 A/CNAME 레코드 추가

### 카페24
1. 나의 서비스 관리 → 도메인
2. DNS 관리 → 레코드 추가
3. 위의 설정 입력

### 후이즈 (Whois)
1. 도메인 관리 → DNS 관리
2. DNS 레코드 추가
3. 위의 설정 입력

## 4. SSL 인증서

- Vercel이 자동으로 Let's Encrypt SSL 인증서 발급
- DNS 전파 후 자동 활성화 (최대 48시간)

## 5. 확인 사항

1. DNS 전파 확인: https://dnschecker.org
2. Vercel 대시보드에서 도메인 상태 확인
3. 초록색 체크 표시가 나타나면 완료

## 6. 추가 설정 (선택사항)

### www 리다이렉트
- Vercel 대시보드에서 자동 설정 가능
- www.moadesign.info → moadesign.info 리다이렉트

### 기존 도메인 연결
moadesign.info가 이미 등록되어 있다면:
1. 현재 DNS 제공업체에서 위의 레코드 추가
2. 기존 웹호스팅과 충돌하지 않도록 주의

## 문제 해결

### "Invalid Configuration" 오류
- DNS 레코드가 올바르게 설정되었는지 확인
- TTL 값을 300(5분)으로 설정

### SSL 인증서 오류
- DNS 전파 대기 (최대 48시간)
- Vercel 대시보드에서 "Refresh" 클릭

### 도메인이 작동하지 않음
- DNS 캐시 삭제: `ipconfig /flushdns` (Windows)
- 다른 브라우저나 시크릿 모드로 테스트