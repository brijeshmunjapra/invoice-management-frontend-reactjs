import {
  LOGIN_CLICK_SUCCESS,
  LOGOUT_CLICK,
  LOGIN_CLICK_FAIL,
  FETCH_VENDORS_SUCCESS,
  FETCH_VENDORS_FAIL,
  FETCH_VENDORS,
  REGISTRATION_CLICK_SUCCESS,
  REGISTRATION_CLICK_FAIL,
  ADD_VENDOR_FAIL,
  ADD_VENDOR_SUCCESS,
  DELETE_VENDOR_SUCCESS,
  EDIT_VENDOR_DETAIL_SUCCESS,
  GET_VENDOR_BYID_SUCCESS,
  USER_DATA_STATE,
} from "../Actions/Action";

const initialState = {
  respData: localStorage.getItem("token"),
  user: null,
  errData: null,
  vendorData: null,
  regData: null,
  regErrData: null,
  vendorbyID: null,
  addedvendorData: null,
  addedvendorErrData: null,
  deleteVendorData: null,
  updateVendorData: null,
  status: "pending",
};

const VendorReducer = (state = initialState, action) => {
  if (action.type === LOGIN_CLICK_SUCCESS) {
    return { ...state, respData: action?.respData };
  } else if (action.type === LOGIN_CLICK_FAIL) {
    return { ...state, errData: action?.errData };
  } else if (action.type === LOGOUT_CLICK) {
    return { ...state, respData: null };
  } else if (action.type === REGISTRATION_CLICK_SUCCESS) {
    return { ...state, regData: action?.regData };
  } else if (action.type === REGISTRATION_CLICK_FAIL) {
    return { ...state, regErrData: action?.regErrData };
  } else if (action.type === FETCH_VENDORS) {
    return { ...state, vendorData: null, status: "pending" };
  } else if (action.type === FETCH_VENDORS_SUCCESS) {
    return { ...state, vendorData: action?.vendorData, status: "success" };
  } else if (action.type === FETCH_VENDORS_FAIL) {
    return { ...state, vendorData: null, status: "fail" };
  } else if (action.type === ADD_VENDOR_SUCCESS) {
    return { ...state, addedvendorData: action?.addedvendorData };
  } else if (action.type === ADD_VENDOR_FAIL) {
    return { ...state, addedvendorErrData: action?.addedvendorErrData };
  } else if (action.type === DELETE_VENDOR_SUCCESS) {
    return { ...state, deleteVendorData: action?.deleteVendorData };
  } else if (action.type === EDIT_VENDOR_DETAIL_SUCCESS) {
    return { ...state, updateVendorData: action?.updateVendorData };
  } else if (action.type === GET_VENDOR_BYID_SUCCESS) {
    return { ...state, vendorbyID: action?.vendorbyID };
  } else if (action.type === USER_DATA_STATE) {
    return { ...state, user: action?.user };
  } else {
    return state;
  }
};

export default VendorReducer;
