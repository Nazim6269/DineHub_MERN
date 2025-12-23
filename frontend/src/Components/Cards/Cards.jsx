import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setSelectProduct } from "../../redux/actions/actionsCreator";

const Cards = () => {
  const { data } = useSelector((state) => state.fetchReducer);
  const dispatch = useDispatch();

  if (!data) {
    return (
      <div className=" h-[55vh] flex justify-center items-center text-4xl">
        Loading...
      </div>
    );
  }

  const handleClick = () => {
    dispatch(setSelectProduct(data));
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-4 sm:px-6 lg:px-8 py-16 mx-auto">
        <div className="flex flex-wrap w-full mb-10 sm:mb-16 gap-4 sm:gap-0">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2">
              Food Items
            </h1>
            <div className="h-1 w-20 bg-pink-500 rounded"></div>
          </div>
          <p className="lg:w-1/2 w-full leading-relaxed ">
            A fast-food restaurant, also known as a quick-service restaurant
            (QSR) within the industry, is a specific type of restaurant that
            serves fast-food cuisine and has minimal table service.
          </p>
        </div>
        <div className="flex flex-wrap -m-4">
          {data?.map((item) => {
            const { _id, img, name, CategoryName, description } = item;
            return (
              <div key={_id} className="xl:w-1/4 md:w-1/2 p-4">
                <div className="bg-gray-100 p-6 rounded-lg">
                  <Link to={`/cardDetails/${_id}`}>
                    <img
                      className="h-40 rounded  w-full object-cover object-center mb-6"
                      onClick={handleClick}
                      src={img}
                      alt={name}
                    />
                  </Link>
                  <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                    {name}
                  </h3>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                    {CategoryName}
                  </h2>
                  <p className="leading-relaxed text-base">{description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Cards;
