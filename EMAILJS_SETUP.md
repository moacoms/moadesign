# EmailJS 설정 가이드

EmailJS를 사용하여 백엔드 서버 없이 이메일을 전송할 수 있습니다.

## 1. EmailJS 계정 생성

1. https://www.emailjs.com/ 접속
2. "Sign Up Free" 클릭하여 무료 계정 생성
3. 이메일 인증 완료

## 2. Email Service 추가

1. Dashboard → Email Services → "Add New Service" 클릭
2. Gmail 선택
3. Service ID 복사 (예: service_abc123)
4. "Connect Account" 클릭하여 Gmail 연동
5. "Create Service" 클릭

## 3. Email Template 생성

1. Dashboard → Email Templates → "Create New Template" 클릭
2. Template 내용 작성:

**Subject:**
```
[MOADESIGN 문의] {{subject}}
```

**Content:**
```
새로운 문의가 접수되었습니다.

이름: {{from_name}}
이메일: {{from_email}}
연락처: {{phone}}
제목: {{subject}}

문의 내용:
{{message}}

첨부 파일: {{files_count}}개
파일 정보: {{files_info}}

---
이 메일은 MOADESIGN 웹사이트에서 자동 발송되었습니다.
```

**To Email:**
```
{{to_email}}
```

**Reply To:**
```
{{from_email}}
```

3. Template ID 복사 (예: template_xyz789)

## 4. Public Key 확인

1. Dashboard → Account → API Keys
2. Public Key 복사 (예: user_qwe456)

## 5. 코드에 적용

`src/components/Contact.tsx` 파일에서 다음 값들을 교체:

```typescript
emailjs.init("YOUR_PUBLIC_KEY")  // 실제 Public Key로 교체
// ...
const response = await emailjs.send(
  'YOUR_SERVICE_ID',   // 실제 Service ID로 교체
  'YOUR_TEMPLATE_ID',  // 실제 Template ID로 교체
  templateParams
)
```

## 6. 무료 플랜 제한

- 월 200건 이메일 전송 가능
- 첨부 파일은 Base64로 인코딩하여 전송 가능 (크기 제한 있음)

## 7. 보안 주의사항

- Public Key는 프론트엔드에 노출되어도 안전합니다
- Service ID와 Template ID도 노출 가능하나, 가능하면 환경 변수로 관리 권장

## 대안: Vercel 서버리스 함수 사용

현재 프로젝트에는 `/api/contact.ts`가 구현되어 있습니다.
Vercel 환경 변수만 설정하면 더 안전하게 사용할 수 있습니다:

1. https://vercel.com/hdopens-projects/moadesign/settings/environment-variables
2. 다음 환경 변수 추가:
   - EMAIL_USER: Gmail 이메일
   - EMAIL_PASS: Gmail 앱 비밀번호