import {
  GET_INVOICEDATA,
  GET_INVOICEDATA_SUCCESS,
  ADD_INVOICE,
} from "../Actions/InvoiceActions";
import axios from "axios";
import { call, all, takeEvery, put } from "redux-saga/effects";

function* getInvoiceData() {
  const invoiceData = yield axios
    .get("https://invoice-management-backend-brijesh.onrender.com/invoice")
    .then((response) => {
      return response?.data;
    })
    .catch(function (error) {
      console.log(error.response);
      return error.response;
    });

  yield put({
    type: GET_INVOICEDATA_SUCCESS,
    invoiceData,
  });
}

function* addInvoice(invoiceToBeAdd) {
  const { payload } = invoiceToBeAdd;
  console.log(payload, "payload from saga");
  const addeddata = yield axios
    .post("https://invoice-management-backend-brijesh.onrender.com/invoice", payload)
    .then(function (response) {
      console.log(response, "add invoice responce");
      return response;
    })
    .catch(function (error) {
      console.log(error.response, "add invoice responce");
      return error.response;
    });

  return addeddata;
}

function* invoiceSaga() {
  yield all([takeEvery(GET_INVOICEDATA, getInvoiceData)]);
  yield all([takeEvery(ADD_INVOICE, addInvoice)]);
}

export default invoiceSaga;
