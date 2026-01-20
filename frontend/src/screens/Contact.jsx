import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background-dark text-text-primary py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-linear-to-r from-(--color-primary-cyan) to-(--color-primary-blue) bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Have a question or just want to say hi? We'd love to hear from you.
            Our team is always here to help you with your cravings!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-background-card rounded-3xl p-8 border border-white/10 hover:border-(--color-accent-cyan)/50 transition-all duration-300">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-(--color-accent-cyan)/10 flex items-center justify-center text-(--color-accent-cyan)">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-text-muted text-sm uppercase font-bold tracking-wider">Phone</p>
                    <p className="text-lg font-medium">+1 (234) 567-890</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-(--color-primary-blue)/10 flex items-center justify-center text-(--color-primary-blue)">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-text-muted text-sm uppercase font-bold tracking-wider">Email</p>
                    <p className="text-lg font-medium">hello@dinehub.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-text-muted text-sm uppercase font-bold tracking-wider">Location</p>
                    <p className="text-lg font-medium">123 Foodie Street, Gourmet City</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Simple Map Placeholder */}
            <div className="rounded-3xl overflow-hidden h-64 border border-white/10 relative group">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000"
                alt="Map"
                className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-background-dark/40 flex items-center justify-center">
                <div className="bg-background-card px-6 py-3 rounded-full border border-white/20 shadow-2xl">
                  <p className="font-bold text-sm">Find us on Google Maps</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-background-card rounded-3xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-(--color-accent-cyan) transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-(--color-accent-cyan) transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Inquiry about..."
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-(--color-accent-cyan) transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  required
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-(--color-accent-cyan) transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-linear-to-r from-(--color-primary-cyan) to-(--color-primary-blue) py-4 rounded-xl font-bold text-black hover:shadow-[0_0_30px_rgba(0,217,192,0.4)] transition-all duration-300 flex items-center justify-center gap-2"
              >
                Send Message
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" theme="dark" />
    </div>
  );
};

export default Contact;
