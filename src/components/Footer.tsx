const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="text-gray-400">
              고도몰 전문 개발 파트너
              <br />
              2012년부터 함께한 1,000개 이상의 성공 스토리
              <br />
              <a href="https://moadesign.info" className="text-blue-400 hover:text-blue-300 text-sm">
                moadesign.info
              </a>
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">서비스</h4>
            <ul className="space-y-2 text-gray-400">
              <li>고도몰 개발</li>
              <li>PHP 개발</li>
              <li>React 개발</li>
              <li>앱 개발</li>
              <li>Python 개발</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">연락처</h4>
            <ul className="space-y-2 text-gray-400">
              <li>이메일: hdopen@moacoms.com</li>
              <li>전화: 010-6779-0789</li>
              <li>주소: 경기도 고양시 덕양구 무원로 24, 4층</li>
              <li>운영시간: 평일 09:00 - 18:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} MOADESIGN. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer