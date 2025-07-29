import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, email, phone, subject, message } = req.body;

    // Gmail SMTP 설정 (환경 변수 사용)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail 앱 비밀번호
      },
    });

    // 이메일 내용 구성
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: 'hdopen@moacoms.com',
      subject: `[MOADESIGN 문의] ${subject}`,
      html: `
        <h2>새로운 문의가 접수되었습니다</h2>
        <hr/>
        <p><strong>이름:</strong> ${name}</p>
        <p><strong>이메일:</strong> ${email}</p>
        <p><strong>연락처:</strong> ${phone || '미입력'}</p>
        <p><strong>제목:</strong> ${subject}</p>
        <hr/>
        <h3>문의 내용:</h3>
        <p style="white-space: pre-wrap;">${message}</p>
        <hr/>
        <p style="color: #666; font-size: 12px;">
          이 메일은 MOADESIGN 웹사이트 문의 폼에서 자동으로 발송되었습니다.
        </p>
      `,
      text: `
        새로운 문의가 접수되었습니다

        이름: ${name}
        이메일: ${email}
        연락처: ${phone || '미입력'}
        제목: ${subject}

        문의 내용:
        ${message}
      `,
    };

    // 이메일 전송
    await transporter.sendMail(mailOptions);

    // 자동 응답 메일 전송 (선택사항)
    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'MOADESIGN - 문의 접수 확인',
      html: `
        <h2>문의해 주셔서 감사합니다</h2>
        <p>안녕하세요, ${name}님</p>
        <p>고객님의 문의가 정상적으로 접수되었습니다.</p>
        <p>빠른 시일 내에 답변 드리도록 하겠습니다.</p>
        <br/>
        <p>감사합니다.</p>
        <p>MOADESIGN 드림</p>
        <hr/>
        <p style="color: #666; font-size: 12px;">
          본 메일은 발신 전용이므로 회신하실 수 없습니다.<br/>
          추가 문의사항은 hdopen@moacoms.com으로 연락 주시기 바랍니다.
        </p>
      `,
    };

    await transporter.sendMail(autoReplyOptions);

    return res.status(200).json({ success: true, message: '문의가 성공적으로 전송되었습니다.' });
  } catch (error) {
    console.error('이메일 전송 오류:', error);
    return res.status(500).json({ success: false, message: '전송 중 오류가 발생했습니다.' });
  }
}