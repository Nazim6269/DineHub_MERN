import {
  LayoutDashboardIcon,
  LogOut,
  Menu,
  Search,
  Settings,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../helpers/logout";
import { setSearchTerm } from "../../redux/actions/actionsCreator";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { profile } = useSelector((state) => state.profileReducer);
  const { cart } = useSelector((state) => state.cartReducer);
  const { searchTerm } = useSelector((state) => state.filterReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartCount = cart.reduce((total, item) => total + (item.quantity || 0), 0);

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleLogout = () => {
    logout(profile);
    setIsProfileOpen(false);
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background-dark/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="block text-text-secondary hover:text-(--color-accent-cyan) lg:hidden"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold italic tracking-tighter text-text-primary sm:text-2xl"
          >
            Dine<span className="text-(--color-primary-cyan)">Hub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden gap-6 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium text-text-secondary transition-colors hover:text-(--color-accent-cyan)"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden flex-1 max-w-md relative lg:block">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
              size={18}
            />
            <input
              type="text"
              placeholder="Search for delicious food..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full rounded-full border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-text-primary outline-none transition-all focus:border-(--color-accent-cyan) focus:bg-white/10"
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Toggle - Mobile */}
            <button className="text-text-secondary hover:text-(--color-accent-cyan) lg:hidden">
              <Search size={22} />
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-text-secondary transition-colors hover:text-(--color-accent-cyan)"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-(--color-accent-cyan) text-[10px] font-bold text-black shadow-lg">
                  {cartCount}
                </span>
              )}
            </Link>

            {profile && profile.email ? (
              <div className="relative">
                {/* Profile Button */}
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 transition-all hover:bg-white/10 sm:pr-3"
                >
                  <img
                    src={profile.picture || "https://avatar.iran.liara.run/public"}
                    alt="profile"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="hidden text-sm font-medium text-text-primary sm:block">
                    {profile.name}
                  </span>
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-white/10 bg-background-card p-2 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="mb-2 px-3 py-2 border-b border-white/5">
                      <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                        Account
                      </p>
                      <p className="truncate text-sm font-medium text-text-primary">
                        {profile.email}
                      </p>
                    </div>

                    {profile.role === "admin" && (
                      <Link
                        to="/admin/dashboard"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-white/5 hover:text-(--color-accent-cyan)"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <LayoutDashboardIcon size={18} />
                        Dashboard
                      </Link>
                    )}

                    <Link
                      to="/profile"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-white/5 hover:text-(--color-accent-cyan)"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <User size={18} />
                      My Profile
                    </Link>

                    <Link
                      to="/settings"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-white/5 hover:text-(--color-accent-cyan)"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Settings size={18} />
                      Settings
                    </Link>

                    <div className="my-1 border-t border-white/5" />

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/10"
                    >
                      <LogOut size={18} />
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="rounded-full bg-(--color-accent-cyan) px-6 py-2 text-sm font-bold text-black transition-all hover:bg-accent-cyan-light hover:shadow-[0_0_20px_rgba(0,217,192,0.4)]"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="border-t border-white/10 py-4 lg:hidden">
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-text-primary"
                />
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-base font-medium text-text-secondary hover:text-(--color-accent-cyan)"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
