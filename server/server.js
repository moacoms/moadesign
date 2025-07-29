const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|xls|xlsx|ppt|pptx|txt|zip|rar/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify transporter configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Contact form endpoint
app.post('/api/contact', upload.array('files', 10), async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const files = req.files || [];

    // Prepare email content
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `[MOADESIGN 문의] ${subject}`,
      html: `
        <h2>새로운 문의가 도착했습니다</h2>
        <h3>문의자 정보</h3>
        <ul>
          <li><strong>이름:</strong> ${name}</li>
          <li><strong>이메일:</strong> ${email}</li>
          <li><strong>연락처:</strong> ${phone || '미입력'}</li>
        </ul>
        <h3>문의 내용</h3>
        <p><strong>제목:</strong> ${subject}</p>
        <p><strong>내용:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
        ${files.length > 0 ? `<p><strong>첨부파일:</strong> ${files.length}개</p>` : ''}
      `,
      attachments: files.map(file => ({
        filename: file.originalname,
        path: file.path
      }))
    };

    // Send email
    if (process.env.MOCK_EMAIL === 'true') {
      // 테스트 모드: 실제 이메일을 보내지 않고 콘솔에 로그만 출력
      console.log('=== MOCK EMAIL SENT ===');
      console.log('From:', mailOptions.from);
      console.log('To:', mailOptions.to);
      console.log('Subject:', mailOptions.subject);
      console.log('Files:', files.length);
      console.log('Content:', mailOptions.html);
      console.log('========================');
    } else {
      await transporter.sendMail(mailOptions);
    }

    // Clean up uploaded files after sending
    files.forEach(file => {
      fs.unlink(file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    });

    res.json({ success: true, message: '문의가 성공적으로 전송되었습니다.' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ 
      success: false, 
      message: '전송 중 오류가 발생했습니다.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});