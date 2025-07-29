import { motion } from 'framer-motion'
import { FiShoppingCart, FiSmartphone, FiDatabase } from 'react-icons/fi'
import { SiPhp, SiReact, SiPython } from 'react-icons/si'

const Services = () => {
  const services = [
    {
      icon: <FiShoppingCart className="w-12 h-12" />,
      title: '고도몰 개발',
      description: 'NHN커머스 고도몰 전문 개발 및 커스터마이징',
      features: ['쇼핑몰 구축', '기능 커스터마이징', '유지보수'],
      highlight: true,
    },
    {
      icon: <SiPhp className="w-12 h-12" />,
      title: 'PHP 개발',
      description: '안정적이고 확장 가능한 백엔드 솔루션',
      features: ['웹 애플리케이션', 'API 개발', '레거시 시스템 개선'],
    },
    {
      icon: <SiReact className="w-12 h-12" />,
      title: 'React 개발',
      description: '모던하고 반응성 높은 웹 프론트엔드',
      features: ['SPA 개발', 'UI/UX 구현', '성능 최적화'],
    },
    {
      icon: <FiSmartphone className="w-12 h-12" />,
      title: '앱 개발',
      description: '크로스 플랫폼 모바일 애플리케이션',
      features: ['React Native', '하이브리드 앱', '네이티브 연동'],
    },
    {
      icon: <SiPython className="w-12 h-12" />,
      title: 'Python 개발',
      description: '데이터 처리 및 자동화 솔루션',
      features: ['웹 스크래핑', '데이터 분석', 'API 서버'],
    },
    {
      icon: <FiDatabase className="w-12 h-12" />,
      title: '기타 개발',
      description: '다양한 기술 스택을 활용한 맞춤 개발',
      features: ['DB 설계', '시스템 통합', '맞춤 솔루션'],
    },
  ]

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">개발 서비스</h2>
          <p className="text-xl text-gray-600">
            다양한 기술 스택으로 최적의 솔루션을 제공합니다
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow ${
                service.highlight ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {service.highlight && (
                <span className="inline-block px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full mb-4">
                  주력 서비스
                </span>
              )}
              <div className="text-blue-600 mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services