import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-amber-500">🛍️ MyStore</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex gap-8">
            <Link to="/" className="text-gray-300 hover:text-amber-500 font-medium transition duration-300">
              Home
            </Link>
            <Link to="/login" className="text-gray-300 hover:text-amber-500 font-medium transition duration-300">
              Login
            </Link>
          </nav>

          {/* Mobile Menu */}
          {/* <div className="md:hidden flex gap-4">
            <Link to="/" className="text-gray-300 hover:text-amber-500">Home</Link>
            <Link to="/login" className="text-gray-300 hover:text-amber-500">Login</Link>
          </div> */}
        </div>
      </div>
    </header>
  );
}

export default Header;