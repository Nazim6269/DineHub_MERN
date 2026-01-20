const HeroSection = () => {
  return (
    <section
      className="
        relative overflow-hidden
        bg-background-dark
        text-text-primary
      "
    >
      {/* Simple Background */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-background-dark/50
        "
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row items-center gap-14">
          {/* Text content */}
          <div className="flex flex-col text-center md:text-left md:w-1/2 gap-6">
            <h1
              className="
                text-3xl sm:text-4xl md:text-5xl lg:text-7xl
                font-black leading-tight
                text-primary-cyan uppercase tracking-tighter
              "
            >
              Savor Every Flavor,
              <br />
              Accelerate Your Taste.
            </h1>

            <p
              className="
                max-w-xl mx-auto md:mx-0
                text-base sm:text-lg
                text-text-secondary
              "
            >
              Welcome to a place where passion meets plate. Immerse yourself in
              a world of exquisite tastes, curated with love and served with
              flair. Every bite is crafted to feel unforgettable.
            </p>

            <div className="flex justify-center md:justify-start gap-4 mt-6">
              <button
                className="
                  rounded-2xl px-8 py-4
                  font-black text-black
                  bg-primary-cyan uppercase
                  hover:scale-105 active:scale-95
                  transition-all
                "
              >
                Get Started
              </button>

              <button
                className="
                  rounded-2xl px-8 py-4
                  font-black
                  text-text-primary
                  border-2 border-white/10
                  hover:border-primary-cyan
                  transition-all uppercase
                "
              >
                Watch Demo
              </button>
            </div>
          </div>

          {/* Image content */}
          <div className="md:w-1/2 w-full flex justify-center">
            <div
              className="
                relative rounded-3xl overflow-hidden
                bg-background-card
                border border-white/5 shadow-2xl
              "
            >
              <img
                src="./h11.png"
                alt="hero"
                className="w-full max-w-md sm:max-w-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
