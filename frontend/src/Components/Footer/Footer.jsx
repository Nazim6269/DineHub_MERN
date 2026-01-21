import React, { useState } from 'react';
import { Github, Linkedin, Globe, Mail, Send, Heart } from 'lucide-react';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            alert('Thank you for subscribing!');
            setEmail('');
        }
    };

    const socialLinks = [
        { icon: Globe, href: 'https://portfolio-nextjs-one-tau.vercel.app/', label: 'Portfolio', color: 'hover:text-blue-400' },
        { icon: Linkedin, href: 'https://www.linkedin.com/in/nazim-uddin-23a93a216/', label: 'LinkedIn', color: 'hover:text-blue-500' },
        { icon: Github, href: 'https://github.com/Nazim6269', label: 'GitHub', color: 'hover:text-gray-300' }
    ];

    const companyLinks = [
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Careers', href: '/careers' }
    ];

    const communityLinks = [
        { name: 'Facebook', href: '#' },
        { name: 'Instagram', href: '#' },
        { name: 'Twitter', href: '#' },
        { name: 'YouTube', href: '#' }
    ];

    return (
        <footer className="relative  overflow-hidden">

            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-1 " />

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <div className="inline-block">
                            <h2 className="text-3xl font-black tracking-tight">
                                Dine
                                <span className="text-brand-primary">Hub</span>
                            </h2>
                            <div className="h-1 w-12 bg-brand-primary  rounded-full mt-2" />
                        </div>
                        <p className="text-slate-300 leading-relaxed text-sm">
                            Savor every flavor with our curated culinary delights. Join us to explore a world of exquisite tastes and unforgettable experiences.
                        </p>

                        {/* Social Links with Icons */}
                        <div className="flex gap-4 pt-2">
                            {socialLinks.map(({ icon: Icon, href, label, color }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`group relative p-3  rounded-md border transition-all duration-300 hover:scale-110 hover:bg-slate-700 ${color}`}
                                    aria-label={label}
                                >
                                    <Icon className="w-5 h-5 transition-transform group-hover:rotate-12" />
                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-700 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        {label}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Company Links */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-white relative inline-block">
                            Company
                            <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-brand-primary" />
                        </h3>
                        <ul className="space-y-3">
                            {companyLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-slate-400 hover:text-brand-primary transition-colors duration-300 text-sm flex items-center group"
                                    >
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-brand-primary mr-0 group-hover:mr-2 transition-all duration-300" />
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Community Links */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-white relative inline-block">
                            Community
                            <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-brand-primary" />
                        </h3>
                        <ul className="space-y-3">
                            {communityLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-slate-400 hover:text-brand-primary transition-colors duration-300 text-sm flex items-center group"
                                    >
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-brand-primary mr-0 group-hover:mr-2 transition-all duration-300" />
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter Section */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-white relative inline-block">
                            Stay Updated
                            <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-brand-primary" />
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Get exclusive updates about new menus, special offers, and culinary events.
                        </p>

                        <form onSubmit={handleSubscribe} className="space-y-3">
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-brand-primary transition-colors" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full  border border-slate-700 rounded-lg pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-primary focus:bg-slate-750 transition-all duration-300"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                className="w-full  font-semibold py-3 px-6 rounded-md transition-all duration-300 flex items-center justify-center gap-2 group shadow-md  hover:scale-105 active:scale-95"
                            >
                                Subscribe Now
                                <Send className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="relative border-t border-slate-700/50 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-slate-400 text-sm flex items-center gap-2">
                            © {new Date().getFullYear()} DineHub. Made with
                            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                            by Nazim Uddin
                        </p>

                        <div className="flex gap-6 text-sm">
                            <a href="/privacy" className="text-slate-400 hover:text-brand-primary transition-colors">
                                Privacy Policy
                            </a>
                            <a href="/terms" className="text-slate-400 hover:text-brand-primary transition-colors">
                                Terms of Service
                            </a>
                            <a href="/sitemap" className="text-slate-400 hover:text-brand-primary transition-colors">
                                Sitemap
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative bottom accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
        </footer>
    );
};

export default Footer;