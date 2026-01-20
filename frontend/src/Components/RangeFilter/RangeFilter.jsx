import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slider";
import { setRangeValue } from "../../redux/actions/actionsCreator";

const MIN = 0;
const MAX = 1000;

const RangeFilter = () => {
  const { filteredRange } = useSelector((state) => state.filterReducer);
  const [values, setValues] = useState([filteredRange.minValue, filteredRange.maxValue]);
  const dispatch = useDispatch();

  const handleChange = (vals) => {
    setValues(vals);
    dispatch(setRangeValue(vals));
  };

  return (
    <div className="w-full">
      <h1 className="text-lg sm:text-xl font-semibold mb-3 text-text-primary">
        Price Range
      </h1>

      <Slider
        value={values}
        min={MIN}
        max={MAX}
        onChange={handleChange}
        className="w-full h-2 rounded bg-background-card my-4"
        thumbClassName="h-5 w-5 bg-[var(--color-accent-pink)] rounded-full cursor-pointer shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-pink-light)]"
        trackClassName="h-2 rounded bg-(--color-accent-cyan)"
      />

      <div className="flex justify-between mt-2 gap-3">
        <div className="flex-1 border border-white/20 rounded text-center py-1 text-text-primary">
          Tk-{values[0]}
        </div>
        <div className="flex-1 border border-white/20 rounded text-center py-1 text-text-primary">
          Tk-{values[1]}
        </div>
      </div>
    </div>
  );
};

export default RangeFilter;
