import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3333";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${SERVER_URL}/api/contact/submit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success) {
                toast.success("Message sent successfully!");
                setFormData({ name: "", email: "", subject: "", message: "" });
            } else {
                toast.error(data.message || "Failed to send message");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-app-bg text-text-main py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl sm:text-5xl font-black text-text-main uppercase tracking-tight">
                        Get in <span className="text-brand-primary">Touch</span>
                    </h1>
                    <p className="text-text-sub max-w-2xl mx-auto text-lg font-medium">
                        Have a question or just want to say hi? We'd love to hear from you.
                        Our team is always here to help you with your cravings!
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-md p-8 border border-border-thin shadow-lg hover:shadow-xl transition-all duration-300">
                            <h2 className="text-2xl font-black mb-8 text-text-main">Contact Information</h2>
                            <div className="space-y-8">
                                <div className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 rounded-md bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform duration-300">
                                        <Phone size={28} />
                                    </div>
                                    <div>
                                        <p className="text-text-dim text-xs uppercase font-black tracking-widest mb-1">Phone</p>
                                        <p className="text-lg font-bold text-text-main group-hover:text-brand-primary transition-colors">+1 (234) 567-890</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 rounded-md bg-brand-secondary/10 flex items-center justify-center text-brand-secondary group-hover:scale-110 transition-transform duration-300">
                                        <Mail size={28} />
                                    </div>
                                    <div>
                                        <p className="text-text-dim text-xs uppercase font-black tracking-widest mb-1">Email</p>
                                        <p className="text-lg font-bold text-text-main group-hover:text-brand-secondary transition-colors">hello@dinehub.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 rounded-md bg-brand-accent/10 flex items-center justify-center text-brand-accent group-hover:scale-110 transition-transform duration-300">
                                        <MapPin size={28} />
                                    </div>
                                    <div>
                                        <p className="text-text-dim text-xs uppercase font-black tracking-widest mb-1">Location</p>
                                        <p className="text-lg font-bold text-text-main group-hover:text-brand-accent transition-colors">123 Foodie Street, Gourmet City</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="rounded-md overflow-hidden h-64 border border-border-thin relative group shadow-lg">
                            <img
                                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000"
                                alt="Map"
                                className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500 flex items-center justify-center pointer-events-none">
                                <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full border border-white/50 shadow-2xl transform group-hover:scale-110 transition-transform duration-500">
                                    <p className="font-black text-sm text-text-main flex items-center gap-2">
                                        <MapPin size={16} className="text-brand-primary" />
                                        Find us on Google Maps
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-md p-8 border border-border-thin shadow-xl">
                        <h2 className="text-2xl font-black mb-8 text-text-main">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-text-sub uppercase tracking-wider">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        required
                                        className="w-full bg-surface-bg border border-border-strong rounded-md px-4 py-3 outline-none focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all font-medium text-text-main placeholder-text-dim"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-text-sub uppercase tracking-wider">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        required
                                        className="w-full bg-surface-bg border border-border-strong rounded-md px-4 py-3 outline-none focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all font-medium text-text-main placeholder-text-dim"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-text-sub uppercase tracking-wider">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Inquiry about..."
                                    required
                                    className="w-full bg-surface-bg border border-border-strong rounded-md px-4 py-3 outline-none focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all font-medium text-text-main placeholder-text-dim"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-text-sub uppercase tracking-wider">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="How can we help you?"
                                    required
                                    rows={5}
                                    className="w-full bg-surface-bg border border-border-strong rounded-md px-4 py-3 outline-none focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all font-medium text-text-main placeholder-text-dim resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-brand-primary text-white py-4 rounded-md font-black uppercase tracking-widest shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                Send Message
                                <Send size={20} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer position="bottom-right" theme="light" />
        </div>
    );
};

export default Contact;
