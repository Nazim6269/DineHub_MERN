import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";
import { fetchData } from "../helpers/fetchData";
import {
  failedFetch,
  startFetch,
  successFetch,
} from "../redux/actions/actionsCreator";

const MainLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startFetch());
    fetchData()
      .then((data) => {
        dispatch(successFetch(data));
      })
      .catch(() => dispatch(failedFetch()));
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-160px)] bg-app-bg text-text-main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
