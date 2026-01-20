import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cards from "../Components/Cards/Cards";
import Categories from "../Components/Categories/Categories";
import HeroSection from "../Components/Hero/HeroSection";
import { fetchData } from "../helpers/fetchData";
import {
  failedFetch,
  startFetch,
  successFetch,
} from "../redux/actions/actionsCreator";

const Home = () => {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state) => state.filterReducer);

  //useEffect function for fetching data
  useEffect(() => {
    dispatch(startFetch());

    fetchData()
      .then((data) => {
        dispatch(successFetch(data));
      })
      .catch(() => dispatch(failedFetch()));
  }, []);

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
