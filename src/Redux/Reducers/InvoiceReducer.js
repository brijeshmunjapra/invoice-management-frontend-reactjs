import {
  GET_INVOICEDATA,
  GET_INVOICEDATA_SUCCESS,
  CURRENT_INVOICEDATA,
  DELETE_DATA_ROW,
  DELETE_INVOICE_ROW_DATA,
} from "../Actions/InvoiceActions";

const initialState = {
  invoiceList: {
    data: null,
    error: null,
    status: "idle",
    isLoading: false,
  },

  currInvoiceData: [],
};

const InvoiceReducer = (state = initialState, action) => {
  // console.log(action?.addedProjectData, "action in reducer");
  switch (action.type) {
    case GET_INVOICEDATA:
      return {
        ...state,
        invoiceList: {
          error: null,
          data: [],
          status: "loading",
          isLoading: true,
        },
      };
    case GET_INVOICEDATA_SUCCESS:
      return {
        ...state,
        invoiceList: {
          error: null,
          data: action?.invoiceData,
          status: "success",
          isLoading: false,
        },
      };

    case CURRENT_INVOICEDATA:
      return {
        ...state,
        currInvoiceData: [...state.currInvoiceData, action?.currInvoiceData],
      };

    case DELETE_DATA_ROW:
      return {
        ...state,
        currInvoiceData: state.currInvoiceData.filter(
          (obj) => obj.rowno !== action?.no
        ),
      };

    case DELETE_INVOICE_ROW_DATA:
      return {
        ...state,
        currInvoiceData: [],
      };

    default:
      return state;
  }
};

export default InvoiceReducer;
