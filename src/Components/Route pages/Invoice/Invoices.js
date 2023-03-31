import React, { useContext, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DescriptionIcon from "@mui/icons-material/Description";
import TablePagination from "@mui/material/TablePagination";
import { useDispatch, useSelector } from "react-redux";
import InvoiceModal from "../../InvoiceStructure/InvoiceModal";
import { getProjects } from "../../../Redux/Actions/ProjectAction";
import { getVendors } from "../../../Redux/Actions/Action";
import { ThemeContext } from "../../utils/ThemeContext";
import "./index.scss";
import { Button, TextField } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import InvoiceStructure from "../../NewInvoiceStructure/InvoiceStructure";
import {
  getInvoiceData,
  deleteInvoiceRowData,
} from "../../../Redux/Actions/InvoiceActions";

const columns = [
  { id: "invoiceNo", label: "Invoice No", width: "10%" },
  { id: "date", label: "Invoice Date", align: "right", width: "10%" },
  {
    id: "vendor",
    label: "Invoice To",
    width: "10%",
    align: "right",
  },
  {
    id: "projects",
    label: "Projects",
    width: "10%",
    align: "right",
  },
  {
    id: "invoiceAmounts",
    label: "Sub Amounts",
    width: "10%",
    align: "center",
  },
  {
    id: "totalAmount",
    label: "Total Amount (Excluding GST)",
    width: "10%",
    align: "center",
  },
];

function Invoices() {
  const dispatch = useDispatch();
  const [generateInvoice, setGenerateInvoice] = useState(false);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);

  // const [addState, setIsAddState] = useState({
  //   add: false,
  //   select: 0,
  // });

  const { theme } = useContext(ThemeContext);

  // const handleOpen = () => setOpen(true);

  // const [invoiceData, setInvoiceData] = useState({
  //   amount: 0,
  //   project: "",
  //   paidAmount: 0,
  //   outstanding: 0,
  //   invoiceNo: 0,
  // });

  // const [vendorInvoiceData, setVendorInvoiceData] = useState([]);

  const projects = useSelector(
    (state) => state?.ProjectReducer?.projectList?.data
  );
  // const vendors = useSelector((state) => state?.VendorReducer?.vendorData);
  const invoices = useSelector(
    (state) => state?.InvoiceReducer?.invoiceList?.data
  );

  useEffect(() => {
    dispatch(getProjects());
    dispatch(getVendors());
  }, []);

  useEffect(() => {
    dispatch(getInvoiceData());
  }, [open, page]);

  let length = invoices?.length === undefined ? 0 : invoices?.length;

  const handleChangePage = (e, newPage) => {
    e.preventDefault();
    setPage(newPage);
  };
  // const handleClick = (index) => {
  //   setIsAddState({ add: true, select: index });
  // };

  return (
    <div>
      <Button
        sx={{
          margin: "0 0 2rem 0rem",
          backgroundColor: "#0F3460",
          color: "white",
          border: theme === "light" && "1px solid black",
          boxShadow: "#9b9090 0px 0px 20px",
          fontWeight: "600",
          "&:hover": {
            backgroundColor: "white",
            color: "#0F3460",
          },
        }}
        onClick={() => {
          setGenerateInvoice(true);
        }}
      >
        {"Create Invoice"}
        <DescriptionIcon sx={{ marginLeft: "1rem" }} />
      </Button>
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          boxShadow: "#9b9090 0px 1px 15px",
          borderRadius: "10px",
          marginBottom: "4rem",
        }}
      >
        <TableContainer sx={{ height: "fit-content" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, i) => (
                  <TableCell
                    key={i}
                    align={column.align}
                    style={{
                      width: column.width,
                      backgroundColor: "#21263c",
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices &&
                invoices?.slice(page * 5, page * 5 + 5)?.map((invoice, idx) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={idx}
                      sx={{ cursor: "pointer" }}
                    >
                      {columns.map((column, index) => {
                        let value = invoice[column.id];
                        if (
                          column.id === "projects" ||
                          column.id === "invoiceAmounts"
                        ) {
                          value = invoice[column.id].toString();
                        }

                        return (
                          <TableCell
                            className={theme === "dark" ? "cellDark" : "cell"}
                            key={index}
                            align={column.align}
                          >
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={length}
          rowsPerPage={5}
          page={page}
          onPageChange={handleChangePage}
          labelRowsPerPage={false}
          rowsPerPageOptions={[]}
          sx={
            theme === "dark"
              ? { backgroundColor: "#183b4f", color: "#cecaca" }
              : { backgroundColor: "#464e523d" }
          }
        />
      </Paper>

      {generateInvoice && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Button
            sx={{
              maxWidth: "5rem",
              margin: "0 0 2rem 0rem",
              backgroundColor: "#0F3460",
              color: "white",
              border: theme === "light" && "1px solid black",
              boxShadow: "#9b9090 0px 0px 20px",
              fontWeight: "600",
              "&:hover": {
                backgroundColor: "white",
                color: "#0F3460",
              },
            }}
            onClick={() => {
              setGenerateInvoice(false);
              dispatch(deleteInvoiceRowData());
            }}
          >
            Cancel
          </Button>
          <InvoiceStructure
            setOpen={setOpen}
            open={open}
            setGenerateInvoice={setGenerateInvoice}
          />
          <Button
            sx={{
              maxWidth: "15rem",
              margin: "2rem 0 2rem 0",
              float: "right",
              backgroundColor: "#0F3460",
              color: "white",
              // border: theme === "light" && "1px solid black",
              boxShadow: "#9b9090 0px 0px 20px",
              fontWeight: "600",
              "&:hover": {
                backgroundColor: "white",
                color: "#0F3460",
              },
            }}
            onClick={() => setOpen(true)}
          >
            GENERATE ABOVE INVOICE
          </Button>
        </div>
      )}
    </div>
  );
}

export default Invoices;
