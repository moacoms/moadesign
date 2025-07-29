import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { name: '홈', path: '/' },
    { name: '서비스', path: '#services' },
    { name: '포트폴리오', path: '#portfolio' },
    { name: '문의하기', path: '#contact' },
  ]

  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <img 
              src="/images/logo.png" 
              alt="MOADESIGN" 
              className="h-12 w-auto"
            />
          </Link>

          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header