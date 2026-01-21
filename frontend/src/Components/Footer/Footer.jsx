const Footer = () => {
 return (
 <footer
 className="
 relative
 bg-background-dark
 text-text-primary
 overflow-hidden
 "
 >
 {/* Background glow */}
 <div
 className="
 pointer-events-none absolute inset-0
 bg-(--background-image-gradient-mesh)
 opacity-30
 "
 />

 <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row gap-10">
 {/* Brand / About */}
 <div className="md:w-1/3 flex flex-col gap-4">
 <h2 className="text-2xl sm:text-3xl font-bold">
 Dine
 <span className="text-brand-primary">Hub</span>
 </h2>
 <p className="text-text-secondary leading-relaxed">
 Savor every flavor with our curated culinary delights. Join us to
 explore a world of exquisite tastes and unforgettable experiences.
 </p>
 </div>

 {/* Links */}
 <div className="md:w-1/3 flex flex-col sm:flex-row gap-10">
 <div className="flex flex-col gap-3">
 <h3 className="font-semibold text-lg text-text-primary">Company</h3>
 {["About", "Contact", "FAQ"].map((item) => (
 <a
 key={item}
 href={`/${item.toLowerCase()}`}
 className="
 text-sm
 text-text-secondary
 hover:text-(--color-accent-cyan)
 transition
 "
 >
 {item}
 </a>
 ))}
 </div>

 <div className="flex flex-col gap-3">
 <h3 className="font-semibold text-lg text-text-primary">
 Follow Us
 </h3>
 {["Facebook", "Instagram", "Twitter"].map((item) => (
 <a
 key={item}
 href="#"
 className="
 text-sm
 text-text-secondary
 hover:text-(--color-accent-cyan)
 transition
 "
 >
 {item}
 </a>
 ))}
 </div>
 </div>

 {/* Newsletter / CTA */}
 <div className="md:w-1/3 flex flex-col gap-4">
 <h3 className="font-semibold text-lg text-text-primary">Subscribe</h3>
 <p className="text-sm text-text-secondary">
 Get updates about new menus and special offers.
 </p>

 <div className="flex">
 <input
 type="email"
 placeholder="Your email"
 className="
 flex-1 rounded-l-md
 bg-background-card
 px-4 py-2 text-sm
 text-text-primary
 placeholder:text-text-muted
 border border-white/10
 focus:outline-none
 focus:border-[var(--color-accent-cyan)]
 "
 />
 <button
 className="
 rounded-r-md px-5 py-2
 text-sm font-semibold text-black
 border
 transition
 "
 >
 Subscribe
 </button>
 </div>
 </div>
 </div>

 {/* Footer bottom */}
 <div
 className="
 relative border-t border-white/5
 py-4 text-center text-sm
 text-text-muted
 "
 >
 © {new Date().getFullYear()} DineHub — All rights reserved
 </div>
 </footer>
 );
};

export default Footer;
