import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { User, Star } from "lucide-react";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3333";

const Review = ({ reviews = [], foodId }) => {
    const { profile } = useSelector((state) => state.profileReducer);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(5);

    const handleSubmit = async () => {
        if (!profile) {
            toast.error("Please login to post a review");
            return;
        }
        if (!comment.trim()) {
            toast.error("Please write a comment");
            return;
        }

        try {
            const res = await fetch(`${SERVER_URL}/food/${foodId}/review`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // "Authorization": `Bearer ${token}` // If using token header, but app relies on cookies or internal token handling? 
                    // The backend 'protect' middleware checks cookies usually. 
                    // Let's assume credentials: "include" deals with cookies.
                },
                body: JSON.stringify({
                    user_id: profile._id,
                    name: profile.name,
                    rating,
                    comment
                }),
                credentials: "include"
            });

            const data = await res.json();
            if (data.success) {
                toast.success("Review posted successfully!");
                setComment("");
                // Ideally refresh data here
                window.location.reload();
            } else {
                toast.error(data.message || "Failed to post review");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <section className="text-text-main">
            <div className="container mx-auto">
                <div className="flex flex-col gap-6">
                    <div className="w-full bg-app-bg p-8 rounded-md border border-border-thin shadow-sm">
                        <p className="text-text-dim font-bold uppercase text-[10px] tracking-[0.2em] mb-4">
                            Community Feedback ({reviews.length})
                        </p>

                        {/* List Reviews */}
                        <div className="mb-8 space-y-4 max-h-96 overflow-y-auto pr-2">
                            {reviews.length === 0 && <p className="text-sm text-text-dim italic">No reviews yet. Be the first!</p>}
                            {reviews.map((rev, idx) => (
                                <div key={idx} className="bg-surface-bg p-4 rounded-md border border-border-thin">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-text-dim/20 flex items-center justify-center">
                                                <User size={16} />
                                            </div>
                                            <span className="font-bold text-sm">{rev.name}</span>
                                        </div>
                                        <div className="flex items-center text-status-warning">
                                            <span className="font-black text-xs mr-1">{rev.rating}</span>
                                            <Star size={12} fill="currentColor" />
                                        </div>
                                    </div>
                                    <p className="text-sm text-text-sub">{rev.comment}</p>
                                    <p className="text-[10px] text-text-dim mt-2">{new Date(rev.createdAt).toLocaleDateString()}</p>
                                </div>
                            ))}
                        </div>

                        <h4 className="text-xl font-black text-text-main mb-6 uppercase tracking-tight">
                            Share your experience
                        </h4>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs font-bold uppercase">Rating:</span>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => setRating(star)}
                                        className={`${star <= rating ? "text-status-warning" : "text-text-dim"} transition-colors`}
                                    >
                                        <Star size={20} fill={star <= rating ? "currentColor" : "none"} />
                                    </button>
                                ))}
                            </div>

                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows={3}
                                className="w-full rounded-md border border-border-thin bg-card-bg px-6 py-4 text-sm text-text-main placeholder:text-text-dim/50 focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary/50 transition-all font-bold resize-none"
                                placeholder="How was the taste and service?..."
                            ></textarea>

                            <button
                                onClick={handleSubmit}
                                className="w-full sm:w-max inline-flex items-center justify-center text-text-on-brand bg-brand-primary py-4 px-10 rounded-md hover:scale-105 active:scale-95 text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-brand-primary/20"
                            >
                                Post Review
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Review;
