import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BiPaperPlane, BiCloudDownload } from "react-icons/bi";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const InvoiceModal = ({ showModal, dateOfIssue, closeModal, InvoiceItems, total, subTotal, billTo,billToEmail,billToAddress,billFrom,billFromEmail,billFromAddress,notes,invoiceNumber,taxRate,discountRate, currency}) => {
  const generateInvoice = () => {
    html2canvas(document.getElementById("invoice-modal")).then((canvas)=>{
      const imageData=canvas.toDataURL("image/png",1.0);
const pdf=new jsPDF({
  orientation:"portrait",
  unit:"pt",
  format:[612,792]
});  
pdf.internal.scaleFactor=1;
const imgProp=pdf.getImageProperties(imageData);
const pdfWidth=pdf.internal.pageSize.getWidth();
const pdfHeight=(imgProp.height*pdfWidth)/imgProp.width;
pdf.addImage(imageData, "PNG", 0, 0, pdfWidth, pdfHeight);
pdf.save("invoice-001.pdf");
    })
  };
  return (
    <Modal
      show={showModal}
      onHide={closeModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div id="invoice-modal">
        <div className="d-flex justify-content-between align-items-center bg-light p-4">
          <div className="w-100">
            <h4 className="fw-bold my-2">{billFrom}</h4>
            <h6 className="fw-bold text-secondary mb-1">Invoice #:{invoiceNumber}</h6>
          </div>
          <div className="justify-content-end">
            <h6 className="fw-bold mt-1 mb-2">Amount Due</h6>
            <h5 className="fw-bold text-secondary">{currency}{total}</h5>
          </div>
        </div>
        <div className="p-4">
          <Row className="mb-4">
            <Col md={4}>
              <div className="fw-bold">Billed to:</div>
              <div>{billTo}</div>
              <div>{billToAddress}</div>
              <div>{billToEmail}</div>
            </Col>
            <Col md={4}>
              <div className="fw-bold">Billed from:</div>
              <div>{billFrom}</div>
              <div>{billFromAddress}</div>
              <div>{billFromEmail}</div>
            </Col>
            <Col md={4}>
            <div className="fw-bold">Date of Issue:</div>
            <div>{dateOfIssue}</div>
            </Col>
          </Row>
          <Table className="mb-0">
            <thead>
                <tr>
                    <th>QTY</th>
                    <th>DESCRIPTION</th>
                    <th className="text-end">RATE</th>
                    <th className="text-end">AMOUNT</th>
                </tr>
            </thead>
            <tbody>
               {InvoiceItems?.map((item, i) => (
                <tr key={i}>
                    <td>{item.quantity}</td>
                    <td>{item.description}</td>
                    <td className="text-end" style={{width:'100px'}}>{currency}{item.price}</td>
                    <td className="text-end" style={{width:'100px'}}>{currency}{item.price * item.quantity}</td>
                </tr>
               ))}
            </tbody>
          </Table>
          <Table className="mb-0">
            <tbody>
                <tr>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                </tr>
                <tr className="text-end">
                    <td></td>
                    <td className="fw-bold" style={{width:"100px"}}>SUBTOTAL</td>
                    <td className="text-end" style={{width:"100px"}}>{currency}{subTotal}</td>
                </tr>
                <tr className="text-end">
                    <td></td>
                    <td className="fw-bold" style={{width:"100px"}}>TAX</td>
                    <td className="text-end" style={{width:"100px"}}>{currency}{taxRate}</td>
                </tr>
                <tr className="text-end">
                    <td></td>
                    <td className="fw-bold" style={{width:"100px"}}>DISCOUNT</td>
                    <td className="text-end" style={{width:"100px"}}>{currency}{discountRate}</td>
                </tr>
                <tr className="text-end">
                    <td></td>
                    <td className="fw-bold" style={{width:"100px"}}>TOTAL</td>
                    <td className="text-end" style={{width:"100px"}}>{currency}{total}</td>
                </tr>
            </tbody>
          </Table>
          {notes && (
            <div className="bg-light py-3 px-4  rounded">
              {notes}
            </div>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center bg-light p-4">
        <div>
          <Button variant="light" onClick={generateInvoice} className="d-flex align-items-center gap-2">
            <BiPaperPlane /> Send Invoice
          </Button>
        </div>
        <div>
          <Button variant="light" onClick={generateInvoice} className="d-flex align-items-center gap-2">
            <BiCloudDownload /> Download Copy
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default InvoiceModal;
