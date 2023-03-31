import { call, all, takeEvery, put } from "redux-saga/effects";
import {
  REGISTRATION_CLICK,
  REGISTRATION_CLICK_SUCCESS,
  REGISTRATION_CLICK_FAIL,
  LOGIN_CLICK,
  LOGIN_CLICK_SUCCESS,
  LOGIN_CLICK_FAIL,
  FETCH_VENDORS,
  FETCH_VENDORS_SUCCESS,
  EDIT_VENDOR_DETAIL,
  ADD_VENDOR,
  ADD_VENDOR_FAIL,
  ADD_VENDOR_SUCCESS,
  DELETE_VENDOR,
  DELETE_VENDOR_SUCCESS,
  EDIT_VENDOR_DETAIL_SUCCESS,
  GET_VENDOR_BYID,
  GET_VENDOR_BYID_SUCCESS,
  EDIT_USER_DETAIL,
  EDIT_USER_PASSWORD,
  USER_DATA_STATE,
} from "../Actions/Action";
import axios from "axios";

function* registrationClick(registratedData) {
  const registration = yield axios
    .post("https://invoice-management-backend-brijesh.onrender.com/register", registratedData)
    .then(function (response) {
      console.log(response, "Registration data responce");
      return response;
    })
    .catch(function (error) {
      console.log(error, "Registration data responce");

      return error.response;
    });

  return registration;
}

function* loginClick(loggedData) {
  const login = yield axios
    .post("https://invoice-management-backend-brijesh.onrender.com/login", loggedData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });

  return login;
}

function* addVendor(vendorToBeAdd) {
  const addedVendor = yield axios
    .post("https://invoice-management-backend-brijesh.onrender.com/vendor", vendorToBeAdd)
    .then(function (response) {
      // console.log(response, "add vendor responce");
      return response;
    })
    .catch(function (error) {
      console.log(error.response, "add vendor responce");
      return error.response;
    });

  return addedVendor;
}

function* getVendors() {
  const vendors = yield axios
    .get("https://invoice-management-backend-brijesh.onrender.com/vendor")
    .then((response) => {
      return response?.data;
    });

  yield put({
    type: FETCH_VENDORS_SUCCESS,
    vendorData: vendors,
  });

  return vendors;
}

function* getVendorById(payload) {
  const { vendorID } = payload;
  const vendor = yield axios
    .get(`https://invoice-management-backend-brijesh.onrender.com/vendor/${vendorID}`)
    .then((response) => {
      // console.log(response, "single vendor data recieved");
      return response?.data;
    })
    .catch(function (error) {
      // console.log(error.response, "single vendor data recieved");
      return error.response;
    });

  yield put({
    type: GET_VENDOR_BYID_SUCCESS,
    vendorbyID: vendor,
  });

  return vendor;
}

function* editVendorDetail(vendorID, editedDetail) {
  const editedVendor = yield axios
    .put(`https://invoice-management-backend-brijesh.onrender.com/vendor/${vendorID}`, editedDetail)
    .then(function (response) {
      console.log("updated in DB from saga");
      return response;
    })
    .catch(function (error) {
      console.log(error.response);
      return error.response;
    });

  return editedVendor;
}

function* changeUserPassword(userID, editedDetail) {
  // console.log(userID, editedDetail);
  const changedUser = yield axios
    .put(`https://invoice-management-backend-brijesh.onrender.com/changepassword/${userID}`, editedDetail)
    .then(function (response) {
      console.log(response, "updated in DB from saga");
      return response;
    })
    .catch(function (error) {
      console.log(error.response, "updated in DB from saga");
      return error.response;
    });

  return changedUser;
}

function* changeUserData(userID, editedDetail) {
  // console.log(userID, editedDetail);
  const changedUser = yield axios
    .put(`https://invoice-management-backend-brijesh.onrender.com/updateuser/${userID}`, editedDetail)
    .then(function (response) {
      console.log(response, "updated in DB from saga");
      return response;
    })
    .catch(function (error) {
      console.log(error.response, "updated in DB from saga");
      return error.response;
    });

  return changedUser;
}

function* deleteVendor(vendorID) {
  const deletedVendor = yield axios
    .delete(`https://invoice-management-backend-brijesh.onrender.com/vendor/${vendorID}`)
    .then(function (response) {
      console.log(response, "Delete vendor responce");
      return response;
    })
    .catch(function (error) {
      console.log(error.response);
      return error.response;
    });

  return deletedVendor;
}

function* updateVendor(payload) {
  const { vendorID, editedDetail } = payload;
  const updateVendorData = yield call(editVendorDetail, vendorID, editedDetail);
  if (updateVendorData?.status === 200) {
    yield put({
      type: EDIT_VENDOR_DETAIL_SUCCESS,
      updateVendorData,
    });
  }
}
function* updateUser(payload) {
  const { userID, editedDetail } = payload;
  yield call(changeUserData, userID, editedDetail);
}

// function* userDataState(payload) {
//   const { user } = payload;
//   yield put({
//     type: FETCH_VENDORS_SUCCESS,
//     vendorData: vendors,
//   });
// }
function* removeVendor(payload) {
  const { vendorID } = payload;
  const deleteVendorData = yield call(deleteVendor, vendorID);
  if (deleteVendorData?.status === 200) {
    yield put({
      type: DELETE_VENDOR_SUCCESS,
      deleteVendorData,
    });
  }
}

function* addVendorCall(payload) {
  const { vendorToBeAdd } = payload;
  const addedvendorData = yield call(addVendor, vendorToBeAdd);

  if (addedvendorData?.status === 201) {
    yield put({
      type: ADD_VENDOR_SUCCESS,
      addedvendorData,
    });
  }

  if (addedvendorData?.status === 409) {
    yield put({
      type: ADD_VENDOR_FAIL,
      addedvendorErrData: addedvendorData,
    });
  }
}

function* userRegistration(payload) {
  const { registratedData } = payload;
  const regData = yield call(registrationClick, registratedData);
  if (regData?.status === 201) {
    yield put({
      type: REGISTRATION_CLICK_SUCCESS,
      regData,
    });
  } else {
    yield put({
      type: REGISTRATION_CLICK_FAIL,
      regErrData: regData,
    });
  }
}
function* userLogin(payload) {
  const { loggedData } = payload;
  const respData = yield call(loginClick, loggedData);
  if (respData?.status === 200) {
    yield put({
      type: LOGIN_CLICK_SUCCESS,
      respData,
      user: respData,
    });
  } else {
    yield put({
      type: LOGIN_CLICK_FAIL,
      errData: respData,
    });
  }
}

function* mySaga() {
  yield all([
    takeEvery(REGISTRATION_CLICK, userRegistration),
    takeEvery(LOGIN_CLICK, userLogin),
    takeEvery(FETCH_VENDORS, getVendors),
    takeEvery(GET_VENDOR_BYID, getVendorById),
    takeEvery(ADD_VENDOR, addVendorCall),
    takeEvery(EDIT_VENDOR_DETAIL, updateVendor),
    takeEvery(DELETE_VENDOR, removeVendor),
    takeEvery(EDIT_USER_DETAIL, updateUser),
    takeEvery(EDIT_USER_PASSWORD, changeUserPassword),
  ]);
}
export default mySaga;
