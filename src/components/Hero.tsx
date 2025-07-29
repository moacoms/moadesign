import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'

const Hero = () => {
  return (
    <section className="pt-24 pb-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center mb-6">
              <img 
                src="/images/logo.png" 
                alt="MOADESIGN" 
                className="h-28 w-auto mr-4"
              />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              고도몰 전문 개발 파트너
              <span className="block text-blue-600 mt-2">MOADESIGN</span>
            </h2>
            
            <p className="text-xl text-gray-700 mb-8">
              2012년부터 시작된 고도몰 개발 전문성
              <br />
              <span className="font-semibold">1,000개 이상</span>의 성공적인 프로젝트 경험
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="#contact"
                  className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
                >
                  무료 상담 신청
                  <FiArrowRight className="ml-2" />
                </a>
              </motion.div>
              
              <a
                href="#services"
                className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                서비스 알아보기
              </a>
            </div>

            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">12+</div>
                <div className="text-gray-600">년 경력</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">1,000+</div>
                <div className="text-gray-600">완료 프로젝트</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">100%</div>
                <div className="text-gray-600">고객 만족도</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero