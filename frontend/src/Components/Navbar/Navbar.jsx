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
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background-dark/90 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between gap-8">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="block text-text-secondary hover:text-primary-cyan lg:hidden"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-1 text-2xl font-black italic tracking-tighter text-text-primary uppercase"
          >
            Dine<span className="text-primary-cyan">Hub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-xs font-black uppercase tracking-widest text-text-secondary transition-all hover:text-primary-cyan active:scale-95"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden flex-1 max-w-md relative lg:block group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted transition-colors group-focus-within:text-primary-cyan"
              size={18}
            />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full rounded-2xl border border-white/5 bg-white/5 py-3 pl-12 pr-6 text-sm text-text-primary outline-none transition-all focus:border-primary-cyan/50 focus:bg-white/10 placeholder:text-text-muted/50 font-bold"
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2.5 rounded-2xl bg-white/5 border border-white/5 text-text-secondary transition-all hover:text-primary-cyan hover:bg-white/10 active:scale-90"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary-cyan text-[11px] font-black text-black">
                  {cartCount}
                </span>
              )}
            </Link>

            {profile && profile.email ? (
              <div className="relative">
                {/* Profile Button */}
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 p-1.5 transition-all hover:bg-white/10"
                >
                  <img
                    src={profile.picture || "https://avatar.iran.liara.run/public"}
                    alt="profile"
                    className="h-8 w-8 rounded-xl object-cover"
                  />
                  <span className="hidden text-sm font-black text-text-primary lg:block pr-2">
                    {profile.name.split(' ')[0]}
                  </span>
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-64 origin-top-right rounded-[2rem] border border-white/5 bg-background-card p-3 shadow-2xl ring-1 ring-black/5">
                    <div className="mb-2 px-4 py-3 border-b border-white/5">
                      <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">
                        Authenticated as
                      </p>
                      <p className="truncate text-sm font-bold text-text-primary mt-1">
                        {profile.email}
                      </p>
                    </div>

                    <div className="space-y-1">
                      {profile.role === "admin" && (
                        <Link
                          to="/admin/dashboard"
                          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-text-secondary transition-all hover:bg-white/5 hover:text-primary-cyan"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <LayoutDashboardIcon size={18} />
                          Admin Console
                        </Link>
                      )}

                      <Link
                        to="/profile"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-text-secondary transition-all hover:bg-white/5 hover:text-primary-cyan"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User size={18} />
                        Account Settings
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-red-400 transition-all hover:bg-red-500/10"
                      >
                        <LogOut size={18} />
                        Secure Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="rounded-2xl bg-primary-cyan px-8 py-3 text-xs font-black uppercase tracking-widest text-black transition-all hover:scale-105 active:scale-95"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="border-t border-white/5 py-6 lg:hidden fade-in">
            <div className="flex flex-col gap-6">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Find your favorite dish..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full rounded-2xl border border-white/5 bg-white/5 py-3.5 pl-12 pr-6 text-sm text-text-primary font-bold"
                />
              </div>
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="px-4 py-3 text-sm font-black uppercase tracking-widest text-text-secondary hover:text-primary-cyan hover:bg-white/5 rounded-xl transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
