# 이메일 설정 가이드

## Gmail 설정 방법 (권장)

1. **Google 계정 2단계 인증 활성화**
   - https://myaccount.google.com/security 접속
   - "2단계 인증" 활성화

2. **앱 비밀번호 생성**
   - https://myaccount.google.com/apppasswords 접속
   - "앱 선택" → "기타(맞춤 이름)"
   - "MOADESIGN" 입력 후 생성
   - 16자리 비밀번호 복사

3. **.env 파일 수정**
   ```
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=생성한-16자리-앱비밀번호
   EMAIL_TO=hdopen@moacoms.com
   ```

## 네이버 메일 설정

1. **네이버 메일 설정**
   - 네이버 메일 → 환경설정 → POP3/IMAP 설정
   - "POP3/SMTP 사용함" 체크

2. **.env 파일 수정**
   ```
   EMAIL_HOST=smtp.naver.com
   EMAIL_PORT=587
   EMAIL_USER=your-id@naver.com
   EMAIL_PASS=네이버-비밀번호
   EMAIL_TO=hdopen@moacoms.com
   ```

## 테스트 방법

1. 서버 재시작:
   ```bash
   cd server
   # Ctrl+C로 기존 서버 종료
   npm start
   ```

2. "Email server is ready to send messages" 메시지 확인

3. 프론트엔드에서 문의 폼 작성 후 전송

## 오류 해결

- "Invalid login" 오류: 이메일/비밀번호 확인
- "Self signed certificate" 오류: tls.rejectUnauthorized: false 설정 확인
- 타임아웃 오류: 방화벽/안티바이러스 설정 확인