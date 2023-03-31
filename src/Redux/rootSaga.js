import { all } from "redux-saga/effects";

import mySaga from "./Middleware/Saga";
import projectSaga from "./Middleware/ProjectSaga";
import invoiceSaga from "./Middleware/InvoiceSaga";

export default function* rootSaga() {
  yield all([mySaga(), projectSaga(), invoiceSaga()]);
}
