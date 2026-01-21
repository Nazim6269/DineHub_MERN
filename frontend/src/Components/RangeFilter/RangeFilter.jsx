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
 <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-text-dim">
 Adjust Price Range
 </h3>

 <Slider
 value={values}
 min={MIN}
 max={MAX}
 onChange={handleChange}
 className="w-full h-2 rounded-full bg-border-strong my-6"
 thumbClassName="h-6 w-6 bg-brand-primary rounded-full cursor-pointer shadow-lg shadow-brand-primary/20 focus:outline-none ring-4 ring-app-bg"
 trackClassName="h-2 rounded-full bg-brand-primary"
 />

 <div className="flex justify-between mt-8 gap-4">
 <div className="flex-1 bg-app-bg border border-border-thin rounded-2xl text-center py-3 text-sm font-black text-text-main shadow-sm uppercase tracking-tighter">
 Tk {values[0]}
 </div>
 <div className="flex flex-col justify-center text-text-dim font-black">-</div>
 <div className="flex-1 bg-app-bg border border-border-thin rounded-2xl text-center py-3 text-sm font-black text-text-main shadow-sm uppercase tracking-tighter">
 Tk {values[1]}
 </div>
 </div>
 </div>
 );
};

export default RangeFilter;
