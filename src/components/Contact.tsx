import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { FiMail, FiPhone, FiMapPin, FiSend, FiPaperclip, FiX } from 'react-icons/fi'

interface ContactForm {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  files: FileList | null
}

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)
  const [attachedFiles, setAttachedFiles] = useState<File[]>([])
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const fileArray = Array.from(files)
      const validFiles = fileArray.filter(file => {
        const maxSize = 10 * 1024 * 1024 // 10MB
        return file.size <= maxSize
      })
      
      if (validFiles.length !== fileArray.length) {
        alert('일부 파일이 10MB를 초과하여 제외되었습니다.')
      }
      
      setAttachedFiles(prev => [...prev, ...validFiles])
    }
  }

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // FormData 사용으로 변경 (파일 전송을 위해)
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('email', data.email)
      formData.append('phone', data.phone || '')
      formData.append('subject', data.subject)
      formData.append('message', data.message)
      
      // 첨부 파일 추가
      attachedFiles.forEach((file, index) => {
        formData.append(`file${index}`, file)
      })

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        reset()
        setAttachedFiles([])
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">문의하기</h2>
          <p className="text-xl text-gray-600">
            프로젝트에 대해 상담하고 싶으신가요? 언제든 연락주세요!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">연락처 정보</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <FiMail className="w-6 h-6 text-blue-600 mr-4" />
                <div>
                  <p className="font-semibold">이메일</p>
                  <a href="mailto:hdopen@moacoms.com" className="text-gray-600 hover:text-blue-600">
                    hdopen@moacoms.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center">
                <FiPhone className="w-6 h-6 text-blue-600 mr-4" />
                <div>
                  <p className="font-semibold">전화</p>
                  <a href="tel:01067790789" className="text-gray-600 hover:text-blue-600">
                    010-6779-0789
                  </a>
                </div>
              </div>
              
              <div className="flex items-center">
                <FiMapPin className="w-6 h-6 text-blue-600 mr-4" />
                <div>
                  <p className="font-semibold">위치</p>
                  <p className="text-gray-600">경기도 고양시 덕양구 무원로 24, 4층(골드프라자)</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-semibold text-lg mb-2">상담 가능 시간</h4>
              <p className="text-gray-700">평일 09:00 - 18:00</p>
              <p className="text-gray-600 text-sm mt-2">
                * 주말 및 공휴일은 이메일로 문의 주시면 순차적으로 답변드립니다.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    이름 *
                  </label>
                  <input
                    {...register('name', { required: '이름을 입력해주세요' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="홍길동"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    이메일 *
                  </label>
                  <input
                    {...register('email', {
                      required: '이메일을 입력해주세요',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: '올바른 이메일 형식이 아닙니다',
                      },
                    })}
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="example@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  연락처
                </label>
                <input
                  {...register('phone')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="010-0000-0000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  제목 *
                </label>
                <input
                  {...register('subject', { required: '제목을 입력해주세요' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="문의 제목"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  문의 내용 *
                </label>
                <textarea
                  {...register('message', { required: '문의 내용을 입력해주세요' })}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="프로젝트에 대해 자세히 설명해주세요"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  파일 첨부
                </label>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="file"
                      id="file-upload"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.gif,.zip,.rar"
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-200 cursor-pointer transition-colors"
                    >
                      <FiPaperclip className="mr-2" />
                      파일 선택
                    </label>
                    <span className="ml-3 text-sm text-gray-500">
                      최대 10MB, 여러 파일 선택 가능
                    </span>
                  </div>

                  {attachedFiles.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">첨부된 파일:</p>
                      {attachedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                        >
                          <div className="flex items-center">
                            <FiPaperclip className="text-gray-500 mr-2" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{file.name}</p>
                              <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <FiX size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-gray-500">
                    지원 형식: PDF, DOC, XLS, PPT, TXT, 이미지(JPG, PNG, GIF), 압축파일(ZIP, RAR)
                  </p>
                </div>
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-50 text-green-800 p-4 rounded-lg">
                  문의가 성공적으로 전송되었습니다. 빠른 시일 내에 답변드리겠습니다.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 text-red-800 p-4 rounded-lg">
                  전송 중 오류가 발생했습니다. 다시 시도해주세요.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  '전송 중...'
                ) : (
                  <>
                    문의 전송
                    <FiSend className="ml-2" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact