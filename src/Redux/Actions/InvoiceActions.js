export const GET_INVOICEDATA = "GET_INVOICEDATA";
export const GET_INVOICEDATA_SUCCESS = "GET_INVOICEDATA_SUCCESS";
export const GET_INVOICEDATA_FAIL = "GET_INVOICEDATA_FAIL";
export const CURRENT_INVOICEDATA = "CURRENT_INVOICEDATA";
export const DELETE_DATA_ROW = "DELETE_DATA_ROW";
export const DELETE_INVOICE_ROW_DATA = "DELETE_INVOICE_ROW_DATA";
export const ADD_INVOICE = "ADD_INVOICE";

export const getInvoiceData = () => {
  return {
    type: GET_INVOICEDATA,
  };
};

export const invoiceRowData = (payload) => {
  return {
    type: CURRENT_INVOICEDATA,
    currInvoiceData: payload,
  };
};

export const deleteDataRow = (no) => {
  return {
    type: DELETE_DATA_ROW,
    no,
  };
};
export const deleteInvoiceRowData = () => {
  return {
    type: DELETE_INVOICE_ROW_DATA,
  };
};

export const addInvoice = (payload) => {
  console.log(payload, "payload from action creater");
  return {
    type: ADD_INVOICE,
    payload,
  };
};
