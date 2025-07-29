import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiExternalLink, FiShoppingCart } from 'react-icons/fi'
import { SiPhp, SiReact, SiPython } from 'react-icons/si'

interface PortfolioItem {
  id: number
  title: string
  category: string
  description: string
  technologies: string[]
  image: string
  link?: string
  featured?: boolean
}

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      title: '티르티르',
      category: '고도몰',
      description: '글로벌 뷰티 브랜드 쇼핑몰 구축 및 최적화',
      technologies: ['고도몰5', 'PHP', 'MySQL', '다국어'],
      image: '/portfolio/티르티르.png',
    },
    {
      id: 2,
      title: '마녀공장',
      category: '고도몰',
      description: '화장품 전문몰 리뉴얼 및 모바일 최적화',
      technologies: ['고도몰5', 'PHP', 'API 연동'],
      image: '/portfolio/마녀공장.png',
    },
    {
      id: 3,
      title: '닥터지',
      category: '고도몰',
      description: '스킨케어 브랜드 쇼핑몰 구축 및 CRM 연동',
      technologies: ['고도몰5', 'PHP', 'CRM 시스템'],
      image: '/portfolio/닥터지.png',
    },
    {
      id: 4,
      title: '셀더마',
      category: '고도몰',
      description: '더마 코스메틱 쇼핑몰 구축 및 재고 관리 시스템',
      technologies: ['고도몰5', 'PHP', 'ERP 연동'],
      image: '/portfolio/셀더마.png',
    },
    {
      id: 5,
      title: '솔랩',
      category: '고도몰',
      description: '헬스케어 제품 쇼핑몰 및 정기구독 시스템 구축',
      technologies: ['고도몰5', 'PHP', '정기배송'],
      image: '/portfolio/솔랩.png',
    },
    {
      id: 6,
      title: '인어시그널',
      category: '고도몰',
      description: '뷰티 디바이스 쇼핑몰 구축 및 AS 시스템 연동',
      technologies: ['고도몰5', 'PHP', 'AS 관리'],
      image: '/portfolio/인어시그널.png',
    },
    {
      id: 7,
      title: '빅커피',
      category: '고도몰',
      description: '커피 전문몰 구축 및 B2B 주문 시스템 개발',
      technologies: ['고도몰5', 'PHP', 'B2B 시스템'],
      image: '/portfolio/빅커피.png',
    },
    {
      id: 8,
      title: '프린트카페',
      category: '고도몰',
      description: '인쇄 주문 제작 시스템 및 견적 자동화 구축',
      technologies: ['고도몰5', 'PHP', '견적 시스템'],
      image: '/portfolio/프린트카페.png',
    },
  ]

  const categories = [
    { id: 'all', name: '전체', icon: null },
    { id: '고도몰', name: '고도몰', icon: <FiShoppingCart /> },
    { id: 'React', name: 'React', icon: <SiReact /> },
    { id: 'PHP', name: 'PHP', icon: <SiPhp /> },
    { id: '앱', name: '앱', icon: <FiExternalLink /> },
    { id: 'Python', name: 'Python', icon: <SiPython /> },
  ]

  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory)

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">포트폴리오</h2>
          <p className="text-xl text-gray-600">
            1,000개 이상의 성공적인 프로젝트 경험
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.icon && <span className="text-lg">{category.icon}</span>}
              {category.name}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              
              <div className="aspect-w-16 aspect-h-12 bg-gray-200 relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-48 object-contain bg-white"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button className="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium transform -translate-y-2 group-hover:translate-y-0 transition-transform">
                    자세히 보기
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-600">{item.category}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-lg text-gray-600 mb-6">
            더 많은 프로젝트가 궁금하신가요?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
          >
            프로젝트 문의하기
            <FiExternalLink className="ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Portfolio