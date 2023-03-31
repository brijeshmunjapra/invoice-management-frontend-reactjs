import { combineReducers } from "redux";
import VendorReducer from "./Reducers/VendorReducer";
import ProjectReducer from "./Reducers/ProjectReducer";
import InvoiceReducer from "./Reducers/InvoiceReducer";

const rootReducer = combineReducers({
  VendorReducer,
  ProjectReducer,
  InvoiceReducer,
});

export default rootReducer;
