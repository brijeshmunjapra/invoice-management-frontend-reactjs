import React, { useEffect, useRef, useState } from "react";
import Logo from "../utils/Ivorylogo.jpeg";
import { Button, Divider, TextField, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { getVendors } from "../../Redux/Actions/Action";
import { getProjects } from "../../Redux/Actions/ProjectAction";
import InvoiceModal from "../../Components/InvoiceStructure/InvoiceModal";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import {
  invoiceRowData,
  deleteDataRow,
  deleteInvoiceRowData,
} from "../../Redux/Actions/InvoiceActions";
import DeleteIcon from "@mui/icons-material/Delete";
import QRCode from "react-qr-code";

function InvoiceStructure({ setOpen, open, setGenerateInvoice }) {
  const [subVendor, setSubVendor] = useState("");
  const [subProject, setSubProject] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [rowNo, setRowNo] = useState(1);
  const dispatch = useDispatch();
  const vendors = useSelector((state) => state?.VendorReducer?.vendorData);
  const projects = useSelector(
    (state) => state?.ProjectReducer?.projectList?.data
  );
  const myUser = useSelector((state) => state?.VendorReducer?.user);
  const currData = useSelector(
    (state) => state?.InvoiceReducer?.currInvoiceData
  );
  const invoices = useSelector(
    (state) => state?.InvoiceReducer?.invoiceList?.data
  );

  const handleClose = () => setOpen(false);

  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;
  // const wrapper = useRef();
  // useEffect(() => {
  // setState(wrapper);
  // }, [wrapper]);

  useEffect(() => {
    dispatch(getVendors());
    dispatch(getProjects());
    dispatch(deleteInvoiceRowData());
  }, []);

  const vendor =
    vendors && vendors.filter((vendor) => vendor.name === subVendor);

  const selectedProjects =
    projects && projects.filter((project) => project.subVendor === subVendor);

  let sum = 0;

  currData.map((row) => {
    sum += row?.billlAmount;
  });
  const array =
    selectedProjects &&
    selectedProjects.filter((proj) => proj.name === subProject);

  // console.log(
  //   subProject,
  //   "subProject",
  //   rowNo,
  //   "rowNo",
  // );

  // console.log(invoices, "invoices");
  // console.log(subProject, "subProject");

  // console.log(sum, "sum");
  const generateInvoiceNo = () => {
    const no = invoices && invoices[invoices.length - 1]?.invoiceNo;
    const arr = no?.split("/");
    arr && (arr[1] = Number(arr[1]) + 1);
    const newno = arr && arr.join("/");
    return newno;
  };

  return (
    <div>
      <div className="page2">
        <div className="header2">
          <img src={Logo} alt="logo2" style={{ width: "12rem" }}></img>
          <div className="ivoryData2">
            <Typography>{myUser?.name}</Typography>
            <Typography sx={{ fontSize: "0.9rem", textAlign: "right" }}>
              {myUser?.address}
            </Typography>
            <Typography sx={{ fontSize: "0.9rem", fontWeight: "800" }}>
              +91 923747XXXX
            </Typography>

            <Typography sx={{ fontSize: "0.9rem" }}>
              sales@ivorytechnolab.com
            </Typography>
            <Typography sx={{ fontSize: "0.9rem", fontWeight: "800" }}>
              GST No. : GSTXXVGVXXHJGDH
            </Typography>
          </div>
        </div>
        <Divider sx={{ backgroundColor: "#90cced" }} />
        <div className="title2">
          <Typography className="taxInvoice2" sx={{ fontSize: "0.9rem" }}>
            TAX-INVOICE
          </Typography>
        </div>
        <div className="companyWrapper2">
          <div className="companyData2">
            <Typography>To,</Typography>
            <FormControl fullWidth>
              <Select
                size="small"
                value={subVendor}
                onChange={(e) => {
                  setSubVendor(e.target.value);
                }}
                sx={{
                  padding: 0,
                  maxHeight: "30px",
                  boxShadow: "none",
                  ".MuiOutlinedInput-notchedOutline": { border: 0 },
                }}
              >
                {vendors &&
                  vendors?.map((vendor, idx) => (
                    <MenuItem key={idx} value={vendor?.name}>
                      {vendor?.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Typography sx={{ fontSize: "0.9rem" }}>
              {vendors && vendor[0]?.address}
            </Typography>

            <Typography sx={{ fontSize: "0.9rem", fontWeight: "800" }}>
              {vendors && vendor[0]?.phoneNumber} /{" "}
              {vendors && vendor[0]?.additionalPhoneNumber}
            </Typography>
            <Typography sx={{ fontSize: "0.9rem" }}>
              {vendors && vendor[0]?.email}
            </Typography>
            <Typography sx={{ fontSize: "0.9rem", fontWeight: "800" }}>
              GST No. : {vendors && vendor[0]?.gstNumber}
            </Typography>
          </div>
          <div className="ivoryData2">
            <Typography sx={{ fontSize: "0.9rem" }}>
              Invoice no : {generateInvoiceNo()}
            </Typography>
            <Typography sx={{ fontSize: "0.9rem" }}>
              Date : {formattedToday}
            </Typography>
          </div>
        </div>
        <div style={{ display: "flex", marginTop: "4rem" }}>
          <table className="tablecal2">
            <tbody>
              <tr className="trcal2">
                <th className="thcal2">No</th>
                <th className="thcal2">Project/Service</th>
                <th className="thcal2">Price ₹</th>
                <th className="thcal2">Paid Amount ₹</th>
                <th className="thcal2">Bill Amount ₹</th>
                <th className="thcal2"></th>
              </tr>
              <tr className="trcal2">
                <td className="tdcal2"></td>
                <td className="tdDesc2">
                  <FormControl fullWidth>
                    <Select
                      size="small"
                      value={subProject}
                      onChange={(e) => {
                        setSubProject(e.target.value);
                      }}
                      sx={{
                        maxHeight: "30px",
                        boxShadow: "none",
                        ".MuiOutlinedInput-notchedOutline": { border: 0 },
                      }}
                    >
                      {selectedProjects &&
                        selectedProjects?.map((vendor, idx) => (
                          <MenuItem key={idx} value={vendor?.name}>
                            {vendor?.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </td>
                <td className="tdcal2"></td>
                <td className="tdcal2"></td>
                <td className="tdlast2">
                  <TextField
                    placeholder="Enter Amount"
                    size="small"
                    sx={{
                      ".MuiInputBase-root": {
                        maxHeight: "30px",
                        alignItems: "center",
                      },
                    }}
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(Number(e.target.value));
                    }}
                  />
                </td>
                <td className="tdcal2">
                  <AddCircleOutlineIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      setRowNo(rowNo + 1);
                      setInputValue("");
                      setSubProject("");
                      const data = {
                        rowno: rowNo,
                        projectName: subProject,
                        projectPrice: array[0].amount,
                        paidAmount: array[0].paidAmount,
                        billlAmount: inputValue,
                      };
                      dispatch(invoiceRowData(data));
                    }}
                  />
                </td>
              </tr>

              {currData.map((row, idx) => (
                <tr className="trcal2">
                  <td className="tdcal2">{idx + 1}</td>
                  <td className="tdDesc2">{row.projectName}</td>
                  <td className="tdcal2">{row.projectPrice}</td>
                  <td className="tdcal2">{row.paidAmount}</td>
                  <td className="tdcal2">{row.billlAmount} ₹</td>
                  <td className="tdcal2">
                    <DeleteIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        console.log(row.rowno, "row.rowno");
                        dispatch(deleteDataRow(row.rowno));
                      }}
                    />
                  </td>
                </tr>
              ))}

              <tr className="trcal2">
                <td></td>
                <td></td>
                <td></td>
                <td className="subtotal2">Sub Total</td>
                <td className="tdcal2">{sum} ₹</td>
              </tr>
              <tr className="trcal2">
                <td></td>
                <td></td>
                <td></td>
                <td className="subtotal2">CGST {myUser?.cgstValue}%</td>
                <td className="tdcal2">
                  {(sum * (myUser?.cgstValue / 100)).toFixed(2)} ₹
                </td>
              </tr>
              <tr className="trcal2">
                <td></td>
                <td></td>
                <td></td>
                <td className="subtotal2">SGST {myUser?.sgstValue}%</td>
                <td className="tdcal2">
                  {(sum * (myUser?.sgstValue / 100)).toFixed(2)} ₹
                </td>
              </tr>
              <tr className="trcal2">
                <td></td>
                <td></td>
                <td></td>
                <td className="subtotal2">TOTAL</td>
                <td
                  className="tdcal2"
                  style={
                    sum *
                      (myUser?.cgstValue / 100 + myUser?.sgstValue / 100) ===
                    0
                      ? { color: "green", fontWeight: "800" }
                      : { color: "black", fontWeight: "800" }
                  }
                >
                  {(
                    sum * (myUser?.cgstValue / 100 + myUser?.sgstValue / 100) +
                    sum
                  ).toFixed(2)}{" "}
                  ₹
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="dividersign2">
          <Divider
            sx={{
              backgroundColor: "#6cb6df",
              marginTop: "10rem",
              width: "15rem",
            }}
          />
        </div>
        <div className="signature2">
          <Typography
            sx={{
              marginRight: "0.5rem",
            }}
          >
            Signature
          </Typography>
        </div>
        <div>
          <Typography>Term & Conditions</Typography>
        </div>

        <Divider
          sx={{
            backgroundColor: "#6cb6df",
            width: "8.5rem",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="termConditions2">
            <Typography sx={{ fontSize: "0.9rem" }}>
              hgfhgf wfjbbkopwbnb uyrhewnwen kuwegwekur
            </Typography>
            <Typography sx={{ fontSize: "0.9rem" }}>
              ewrfyuyuer uyrhewnwen kuwegwekur
            </Typography>
            <Typography sx={{ fontSize: "0.9rem" }}>
              ewwerwrwfjbbkopwbnb uyrhewnwen kuwegwekur
            </Typography>
            <Typography sx={{ fontSize: "0.9rem" }}>
              hgfhgf wfjbbkopwbnb wer
            </Typography>
          </div>

          <QRCode
            size={100}
            style={{ height: "auto", maxWidth: "30%" }}
            value={"gst : hjghghggk , amount : 4554455"}
            viewBox={`0 0 256 256`}
          />
        </div>
        <div
          style={{
            backgroundColor: "#6cb6df",
            marginTop: "3rem",
            height: "3rem",
          }}
        ></div>
      </div>
      <InvoiceModal
        open={open}
        handleClose={handleClose}
        vendor={subVendor}
        sum={sum}
        setGenerateInvoice={setGenerateInvoice}
        InvoiceNo={generateInvoiceNo()}
      />
    </div>
  );
}

export default InvoiceStructure;
