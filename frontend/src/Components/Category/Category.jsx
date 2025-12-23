import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Category = () => {
  const { data } = useSelector((state) => state.fetchReducer);

  if (!data) {
    return (
      <div className=" h-[55vh] flex justify-center items-center text-4xl">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap gap-4 sm:gap-6">
            {data.map((item) => {
              return (
                <div
                  key={item._id}
                  className="border rounded lg:w-[23%] md:w-[48%] w-full px-4 py-6 shadow-sm bg-white"
                >
                  <Link to={`/category/${item.CategoryName}`}>
                    <div className="flex flex-col justify-center items-center gap-3">
                      <div className="w-20">
                        <img
                          className="h-18"
                          src={item.img}
                          alt={item.CategoryName}
                        />
                      </div>
                      <h2 className="text-gray-900 title-font text-lg font-medium text-center">
                        {item.CategoryName}
                      </h2>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Category;
