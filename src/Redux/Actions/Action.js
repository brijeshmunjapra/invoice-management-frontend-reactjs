export const REGISTRATION_CLICK = "REGISTRATION_CLICK";
export const REGISTRATION_CLICK_SUCCESS = "REGISTRATION_CLICK_SUCCESS";

export const REGISTRATION_CLICK_FAIL = "REGISTRATION_CLICK_FAIL";
export const LOGIN_CLICK = "LOGIN_CLICK";
export const LOGIN_CLICK_SUCCESS = "LOGIN_CLICK_SUCCESS";
export const LOGIN_CLICK_FAIL = "LOGIN_CLICK_FAIL";
export const LOGOUT_CLICK = "LOGOUT_CLICK";
export const FETCH_VENDORS = "FETCH_VENDORS";
export const FETCH_VENDORS_SUCCESS = "FETCH_VENDORS_SUCCESS";
export const FETCH_VENDORS_FAIL = "FETCH_VENDORS_FAIL";

export const ADD_VENDOR = "ADD_VENDOR";
export const ADD_VENDOR_SUCCESS = "ADD_VENDOR_SUCCESS";
export const ADD_VENDOR_FAIL = "ADD_VENDOR";

export const EDIT_VENDOR_DETAIL = "EDIT_VENDOR_DETAIL";
export const EDIT_VENDOR_DETAIL_SUCCESS = "EDIT_VENDOR_DETAIL_SUCCESS";

export const DELETE_VENDOR = "DELETE_VENDOR";
export const DELETE_VENDOR_SUCCESS = "DELETE_VENDOR_SUCCESS";

export const GET_VENDOR_BYID = "GET_VENDOR_BYID";
export const GET_VENDOR_BYID_SUCCESS = "GET_VENDOR_BYID_SUCCESS";

export const EDIT_USER_DETAIL = "EDIT_USER_DETAIL";
export const EDIT_USER_PASSWORD = "EDIT_USER_PASSWORD";
export const USER_DATA_STATE = "USER_DATA_STATE";

export const registrationClick = (payload) => {
  return {
    type: REGISTRATION_CLICK,
    registratedData: payload,
  };
};

export const loginClick = (payload) => {
  return {
    type: LOGIN_CLICK,
    loggedData: payload,
  };
};

export const logoutClick = () => {
  return {
    type: LOGOUT_CLICK,
  };
};

export const getVendors = () => {
  return {
    type: FETCH_VENDORS,
  };
};

export const addVendor = (payload) => {
  return {
    type: ADD_VENDOR,
    vendorToBeAdd: payload,
  };
};

export const editVendorDetail = (vendorID, editedDetail) => {
  return {
    type: EDIT_VENDOR_DETAIL,
    vendorID,
    editedDetail,
  };
};

export const deleteVendor = (vendorID) => {
  return {
    type: DELETE_VENDOR,
    vendorID,
  };
};

export const getVendorById = (vendorID) => {
  return {
    type: GET_VENDOR_BYID,
    vendorID,
  };
};

export const changeUserPassword = (userID, editedDetail) => {
  return {
    type: EDIT_USER_PASSWORD,
    userID,
    editedDetail,
  };
};

export const changeUserData = (userID, editedDetail) => {
  return {
    type: EDIT_USER_DETAIL,
    userID,
    editedDetail,
  };
};

export const userDataState = (payload) => {
  return {
    type: USER_DATA_STATE,
    user: payload,
  };
};
