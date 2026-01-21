import { combineReducers } from "redux";
import {
 cartReducer,
 fetchReducer,
 filterReducer,
 profileReducer,
 selectedProductReducer,
} from "./cardReducer";

export const rootReducer = combineReducers({
 fetchReducer,
 cartReducer,
 profileReducer,
 selectedProductReducer,
 filterReducer,
});
