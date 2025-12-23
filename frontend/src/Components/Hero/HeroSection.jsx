//import ExampleCarouselImage from "components/ExampleCarouselImage";

const HeroSection = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-col md:flex-row items-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 gap-10">
        <div className="lg:flex-grow md:w-1/2 lg:pr-16 md:pr-8 flex flex-col md:items-start md:text-left text-center gap-4">
          <h1 className="title-font text-3xl sm:text-4xl mb-2 sm:mb-4 font-medium text-gray-900">
            Savor Every Flavor, Indulge in Culinary Delights
          </h1>
          <p className="leading-7 text-base sm:text-lg">
            Welcome to here, where passion meets plate. Immerse yourself in a
            world of exquisite tastes, curated with love and served with flair.
            Our culinary journey is a celebration of flavors, creating memorable
            experiences with every bite.
          </p>
          <div className="flex justify-center md:justify-start">
            <button className="inline-flex text-white bg-pink-600 border-0 py-2 px-6 focus:outline-none  rounded text-lg">
              Get Started
            </button>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-full flex justify-center">
          <img className="w-full max-w-md rounded-xl shadow-sm" alt="hero" src="./foodpanda_hero.webp" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
