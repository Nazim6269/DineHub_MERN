import { useSelector } from "react-redux";
import Cards from "../Components/Cards/Cards";
import Categories from "../Components/Categories/Categories";
import HeroSection from "../Components/Hero/HeroSection";

const Home = () => {
  const { searchTerm } = useSelector((state) => state.filterReducer);

  return (
    <div>
      {searchTerm ? (
        <Cards />
      ) : (
        <>
          <HeroSection />
          <Categories />
          <Cards />
        </>
      )}
    </div>
  );
};

export default Home;
