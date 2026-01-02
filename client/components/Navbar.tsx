import { Link } from "react-router-dom";
import { Lock, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and App Name */}
          <Link to="/" className="flex items-center gap-2 group" onClick={closeMenu}>
            <div className="p-2 rounded-lg bg-accent/20 group-hover:bg-accent/30 transition-colors">
              <Lock className="w-5 h-5 text-accent" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
              StegoSecure
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-foreground/80 hover:text-accent transition-colors font-medium text-sm"
            >
              Home
            </Link>
            <Link
              to="/encrypt"
              className="text-foreground/80 hover:text-accent transition-colors font-medium text-sm"
            >
              Encrypt
            </Link>
            <Link
              to="/decrypt"
              className="text-foreground/80 hover:text-accent transition-colors font-medium text-sm"
            >
              Decrypt
            </Link>
            <Link
              to="/docs"
              className="text-foreground/80 hover:text-accent transition-colors font-medium text-sm"
            >
              Docs
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-accent/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/30 glass-card backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:text-accent hover:bg-accent/10 transition-colors"
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                to="/encrypt"
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:text-accent hover:bg-accent/10 transition-colors"
                onClick={closeMenu}
              >
                Encrypt
              </Link>
              <Link
                to="/decrypt"
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:text-accent hover:bg-accent/10 transition-colors"
                onClick={closeMenu}
              >
                Decrypt
              </Link>
              <Link
                to="/docs"
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:text-accent hover:bg-accent/10 transition-colors"
                onClick={closeMenu}
              >
                Docs
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
