# MOADESIGN 이메일 서버 설정 가이드

## 이메일 설정 방법

### 1. Gmail을 사용하는 경우

1. Google 계정에서 2단계 인증 활성화
2. [앱 비밀번호 생성](https://myaccount.google.com/apppasswords)
3. `.env` 파일 수정:
   ```
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=생성한-앱-비밀번호
   ```

### 2. 네이버 메일을 사용하는 경우

`.env` 파일 수정:
```
EMAIL_HOST=smtp.naver.com
EMAIL_PORT=587
EMAIL_USER=your-id@naver.com
EMAIL_PASS=네이버-비밀번호
```

### 3. 다음(카카오) 메일을 사용하는 경우

`.env` 파일 수정:
```
EMAIL_HOST=smtp.daum.net
EMAIL_PORT=465
EMAIL_USER=your-id@daum.net
EMAIL_PASS=다음-비밀번호
```

## 서버 실행

```bash
# 서버 디렉토리로 이동
cd server

# 종속성 설치 (처음 한 번만)
npm install

# 서버 실행
npm start
```

## 문제 해결

- "전송 중 오류가 발생했습니다" 메시지가 나타나는 경우:
  1. 서버가 실행 중인지 확인 (http://localhost:5000/health)
  2. `.env` 파일의 이메일 설정이 올바른지 확인
  3. 이메일 계정의 보안 설정 확인 (앱 비밀번호 사용)
  4. 서버 콘솔에서 에러 메시지 확인