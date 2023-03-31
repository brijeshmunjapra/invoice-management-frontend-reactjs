import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import InvoiceStructure from "../InvoiceStructure/InvoiceStructure";
import ReactToPrint from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";
import "./index.scss";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch, useSelector } from "react-redux";
import { addInvoice, getInvoiceData } from "../../Redux/Actions/InvoiceActions";

function InvoiceModal({
  open,
  handleClose,
  vendor,
  sum,
  setGenerateInvoice,
  InvoiceNo,
}) {
  const dispatch = useDispatch();
  const [state, setState] = useState(null);
  const currData = useSelector(
    (state) => state?.InvoiceReducer?.currInvoiceData
  );
  const invoices = useSelector(
    (state) => state?.InvoiceReducer?.invoiceList?.data
  );

  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;

  const projects = [];
  const invoiceAmounts = [];
  currData.map((obj) => {
    projects.push(obj.projectName);
    invoiceAmounts.push(obj.billlAmount);
  });

  const data = {
    invoiceNo: InvoiceNo,
    date: formattedToday,
    vendor: vendor,
    projects: projects,
    invoiceAmounts: invoiceAmounts,
    totalAmount: sum,
  };

  // console.log(data, "data to be post");

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          overflowY: "scroll",
        }}
      >
        <ReactToPrint
          trigger={() => {
            return (
              <PrintIcon
                className="print"
                sx={{
                  marginLeft: "1rem",
                  marginRight: "0.5rem",
                  cursor: "pointer",
                }}
              />
            );
          }}
          onBeforePrint={() => {
            dispatch(addInvoice(data));
            dispatch(getInvoiceData());
            handleClose();
            setGenerateInvoice(false);
          }}
          content={() => state.current}
        />
        <CancelIcon onClick={handleClose} sx={{ cursor: "pointer" }} />
        <InvoiceStructure
          setState={setState}
          vendorName={vendor}
          sum={sum}
          InvoiceNo={InvoiceNo}
        />
      </Box>
    </Modal>
  );
}

export default InvoiceModal;
