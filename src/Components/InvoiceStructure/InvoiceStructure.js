import React, { useEffect, useRef } from "react";
import Logo from "../utils/Ivorylogo.jpeg";
import { Divider, Typography } from "@mui/material";
import "./index.scss";
import { useSelector } from "react-redux";
import QRCode from "react-qr-code";

function InvoiceStructure({ setState, vendorName, sum, InvoiceNo }) {
  const vendors = useSelector((state) => state?.VendorReducer?.vendorData);
  const user = useSelector((state) => state?.VendorReducer?.user);
  const currData = useSelector(
    (state) => state?.InvoiceReducer?.currInvoiceData
  );
  const invoices = useSelector(
    (state) => state?.InvoiceReducer?.invoiceList?.data
  );

  const vendordata = (vendors &&
    vendors.filter((vendor) => vendor.name === vendorName))[0];
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;
  const wrapper = useRef();
  useEffect(() => {
    setState(wrapper);
  }, [wrapper]);

  return (
    <div className="page" ref={wrapper}>
      <div className="header">
        <img src={Logo} alt="logo" style={{ width: "12rem" }}></img>
        <div className="userData">
          <Typography>{user && user.name}</Typography>
          <Typography sx={{ fontSize: "0.9rem", textAlign: "right" }}>
            {user && user.address}
          </Typography>

          <Typography sx={{ fontSize: "0.9rem", fontWeight: "800" }}>
            {user && user.phoneNumber}
          </Typography>

          <Typography sx={{ fontSize: "0.9rem" }}>
            {user && user.email}
          </Typography>
          <Typography sx={{ fontSize: "0.9rem", fontWeight: "800" }}>
            GST No. : {user && user.gstNumber}
          </Typography>
        </div>
      </div>
      <Divider sx={{ backgroundColor: "#90cced" }} />
      <div className="title">
        <Typography className="taxInvoice" sx={{ fontSize: "0.9rem" }}>
          TAX-INVOICE
        </Typography>
      </div>
      <div className="companyWrapper">
        <div className="companyData">
          <Typography>To,</Typography>
          <Typography sx={{ fontWeight: "800" }}>{vendordata?.name}</Typography>
          <Typography sx={{ fontSize: "0.9rem" }}>
            {vendordata?.address}
          </Typography>

          <Typography sx={{ fontSize: "0.9rem", fontWeight: "800" }}>
            {vendordata?.phoneNumber} / {vendordata?.additionalPhoneNumber}
          </Typography>
          <Typography sx={{ fontSize: "0.9rem" }}>
            {vendordata?.email}
          </Typography>
          <Typography sx={{ fontSize: "0.9rem", fontWeight: "800" }}>
            GST No. : {vendordata?.gstNumber}
          </Typography>
        </div>
        <div className="userData">
          <Typography sx={{ fontSize: "0.9rem" }}>
            Invoice no : {InvoiceNo}
          </Typography>
          <Typography sx={{ fontSize: "0.9rem" }}>
            Date : {formattedToday}
          </Typography>
        </div>
      </div>

      <table className="tablecal">
        <tbody>
          <tr className="trcal">
            <th className="thcal">No</th>
            <th className="thcal">Project/Service</th>
            <th className="thcal">Price</th>
            <th className="thcal">Paid Amount</th>
            <th className="thcal">Bill Amount</th>
          </tr>

          {currData.map((row, idx) => (
            <tr className="trcal">
              <td className="tdcal">{idx + 1}</td>
              <td className="tdDesc">{row.projectName}</td>
              <td className="tdcal">{row.projectPrice} ₹</td>
              <td className="tdcal">{row.paidAmount} ₹</td>
              <td className="tdcal">{row.billlAmount} ₹</td>
            </tr>
          ))}

          <tr className="trcal">
            <td></td>
            <td></td>
            <td></td>
            <td className="subtotal">Sub Total</td>
            <td className="tdcal">{sum} ₹</td>
          </tr>
          <tr className="trcal">
            <td></td>
            <td></td>
            <td></td>
            <td className="subtotal">CGST {user?.cgstValue}%</td>
            <td className="tdcal">
              {(sum * (user?.cgstValue / 100)).toFixed(2)} ₹
            </td>
          </tr>
          <tr className="trcal">
            <td></td>
            <td></td>
            <td></td>
            <td className="subtotal">SGST {user?.sgstValue}%</td>
            <td className="tdcal">
              {(sum * (user?.sgstValue / 100)).toFixed(2)} ₹
            </td>
          </tr>
          <tr className="trcal">
            <td></td>
            <td></td>
            <td></td>
            <td className="subtotal">TOTAL</td>
            <td
              className="tdcal"
              style={
                sum === 0
                  ? { color: "green", fontWeight: "800" }
                  : { color: "black", fontWeight: "800" }
              }
            >
              {(
                sum * (user?.cgstValue / 100 + user?.sgstValue / 100) +
                sum
              ).toFixed(2)}{" "}
              ₹
            </td>
          </tr>
        </tbody>
      </table>
      <div className="dividersign">
        <Divider
          sx={{
            backgroundColor: "#6cb6df",
            marginTop: "6rem",
            width: "15rem",
          }}
        />
      </div>
      <div className="signature">
        <Typography sx={{ marginRight: "1rem" }}>Signature</Typography>
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
        <div className="termConditions">
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
          value={JSON.stringify({
            vendor_GST: vendordata?.gstNumber,
            Bill_date: formattedToday,
            Bill_Amount:
              sum * (user?.cgstValue / 100 + user?.sgstValue / 100) + sum,
            Issued_By: user && user.name,
          })}
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
  );
}

export default InvoiceStructure;
