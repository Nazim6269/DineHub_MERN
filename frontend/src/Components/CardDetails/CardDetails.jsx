import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setLocalSeclectedProduct } from "../../helpers/setLocalStorage";
import {
  addToCart,
  setSelectProduct,
} from "../../redux/actions/actionsCreator";
import Footer from "../Footer/Footer";
import Question from "../Question/Question";
import RecentView from "../RecentView/RecentView";
import RelatedItem from "../RelatedItem/RelatedItem";
import Review from "../Review/Review";

const CardDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { selectedProduct } = useSelector(
    (state) => state.selectedProductReducer
  );

  if (!selectedProduct) {
    return <div>Loading</div>;
  }

  const arrData = selectedProduct.filter((item) => item._id === id);
  if (!arrData || arrData.length === 0) {
    return (
      <div className=" h-[55vh] flex justify-center items-center text-4xl">
        Loading...
      </div>
    );
  }

  useEffect(() => {
    dispatch(setSelectProduct(arrData));
    setLocalSeclectedProduct(arrData);
  }, []);

  //handleCart function
  const handleCart = (item) => {
    dispatch(addToCart(item));
  };

  return (
    <>
      <section className="text-black body-font overflow-hidden">
        {arrData?.map((item) => {
          let { _id, img, description, name, CategoryName } = item;
          const { full } = item.options[0];
          return (
            <div key={_id} className="container px-4 sm:px-6 lg:px-8 py-12 mx-auto">
              <div className="lg:w-4/5 mx-auto flex flex-col lg:flex-row gap-8">
                <img
                  alt="ecommerce"
                  className="lg:w-1/2 w-full h-64 sm:h-80 object-cover object-center rounded"
                  src={img}
                />
                <div className="lg:w-1/2 w-full lg:pl-6 lg:py-2">
                  <h2 className="text-md font-semibold title-font text-black tracking-widest">
                    {name}
                  </h2>
                  <h1 className="text-black text-2xl sm:text-3xl title-font font-medium mb-4">
                    {CategoryName}
                  </h1>

                  <p className="leading-relaxed mb-6">{description}</p>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <span className="title-font font-medium text-2xl">
                      Price: ${full}
                    </span>
                    <div className="flex flex-wrap gap-3 sm:ml-auto">
                      <Link
                        to={"/"}
                        className="inline-flex text-white bg-pink-600 border-0 py-2 px-5 rounded hover:bg-pink-500 transition"
                      >
                        Go to home
                      </Link>
                      <button
                        onClick={() => handleCart(item)}
                        className="inline-flex text-white bg-pink-600 border-0 py-2 px-5 rounded hover:bg-pink-500 transition"
                      >
                        Add to cart
                      </button>
                      <Link
                        to={"/cart"}
                        className="inline-flex text-white bg-pink-600 border-0 py-2 px-5 rounded hover:bg-pink-500 transition"
                      >
                        Go to cart
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
      {/* question review */}
      <div className="flex flex-col lg:flex-row gap-4 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex-1 flex flex-col gap-4">
          <Question />
          <Review />
        </div>
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <div className="bg-gray-100 rounded px-4 py-3 shadow-sm">
            <RelatedItem />
          </div>
          <div className="bg-gray-100 rounded px-4 py-3 shadow-sm">
            <RecentView />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CardDetails;
