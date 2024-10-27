import React, { useCallback, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InvoiceItems from "./InvoiceItems";
import Button from "react-bootstrap/Button";
import { InputGroup } from "react-bootstrap";
import InvoiceModal from "./InvoiceModal";
const InvoiceForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    currency: '₹',
    invoiceNumber:'',
    dateOfIssue: '',
    billTo: '',
    billToEmail: '',
    billToAddress: '',
    billFrom: '',
    billFromEmail: '',
    billFromAddress: '',
    notes: '',
    taxRate: 10,
    discountRate: 10
  });
  const [calculations, setCalculations] = useState({
    total: '0.00',
    subTotal: 0,
    taxAmount: 0,
    discountAmount: 0
  });
  const [items, setItems] = useState([]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCalculateTotal = useCallback(() => {
    const subTotal = items.reduce((sum, item) => (
      sum + parseFloat(item.price) * parseFloat(item.quantity)
    ), 0);
  
    const taxAmount = (subTotal * formData.taxRate) / 100;
    const discountAmount = (subTotal * formData.discountRate) / 100;
    const total = subTotal + taxAmount - discountAmount;
  
    setCalculations({
      subTotal: subTotal.toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      discountAmount: discountAmount.toFixed(2),
      total: total.toFixed(2)
    });
  }, [items, formData.taxRate, formData.discountRate]);
  
  useEffect(() => {
    handleCalculateTotal();
  }, [handleCalculateTotal]);
  

  const onRowAdd = () => {
    const newItem = {
      id: crypto.randomUUID(),
      name: '',
      description: '',
      price: '1.00',
      quantity: 1
    };
    setItems(prev => [...prev, newItem]);
  };

  const onDelEvent = (itemObject) => {

    setItems(prev => prev.filter(item => item.id !== itemObject.id));
    handleCalculateTotal();
  };

  const onItemizedItemEdit = (cellName, value, id) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, [cellName]: value } : item
    ));
    handleCalculateTotal();
  };

  const openModal = (e) => {
    e.preventDefault();
    handleCalculateTotal();
    setIsOpen(true);
  };

  return (
    <>
      <Form onSubmit={openModal}>
        <Row>
          <Col md={8} lg={9}>
            <Card className="p-4 p-xl-5 my-3 my-xl-4">
              <div className="d-flex flex-row align-items-start justify-content-between mb-3">
                <div className="d-flex flex-column">
                  <div className="d-flex flex-column">
                    <div className="mb-2">
                      <span className="fw-bold">Current Date: </span>
                      <span className="current-date">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <span className="fw-bold d-block me-2">Due Date:</span>
                    <Form.Control
                      type="date"
                      style={{ maxWidth: "150px" }}
                      className="form-control"
                      onChange={(e) => handleInputChange('dateOfIssue', e.target.value)}
                      value={formData.dateOfIssue}
                    />
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold d-block me-2">
                    Invoice Number: 
                  </span>
                  <Form.Control
                    type="number"
                    min="1"
                    required="required"
                    style={{ maxWidth: "70px" }}
                    className="form-control"
                    onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
                    value={formData.invoiceNumber}
                  />
                </div>
              </div>
              <hr className="my-4" />
              <Row>
                <Col>
                  <Form.Label>Bill to:</Form.Label>
                  <Form.Control
                    className="my-2"
                     required="required"
                    placeholder={"Who is this invoice to?"}
                    type="text"
                    onChange={(e) => handleInputChange('billTo', e.target.value)}
                    value={formData.billTo}
                  />
                  <Form.Control
                    className="my-2"
                     required="required"
                    placeholder={"Email address"}
                    type="email"
                    onChange={(e) => handleInputChange('billToEmail', e.target.value)}
                    value={formData.billToEmail}
                  />
                  <Form.Control
                    className="my-2"
                     required="required"
                    placeholder={"Billing address"}
                    type="text"
                    onChange={(e) => handleInputChange('billToAddress', e.target.value)}
                    value={formData.billToAddress}
                  />
                </Col>
                <Col>
                  <Form.Label>Bill from:</Form.Label>
                  <Form.Control
                    className="my-2"
                     required="required"
                    placeholder={"Who is this invoice from?"}
                    type="text"
                    onChange={(e) => handleInputChange('billFrom', e.target.value)}
                    value={formData.billFrom}
                  />
                  <Form.Control
                    className="my-2"
                     required="required"

                    placeholder={"Email address"}
                    type="email"
                    onChange={(e) => handleInputChange('billFromEmail', e.target.value)}
                    value={formData.billFromEmail}
                  />
                  <Form.Control
                    className="my-2"
                     required="required"
                    placeholder={"Billing address"}
                    type="text"
                    onChange={(e) => handleInputChange('billFromAddress', e.target.value)}
                    value={formData.billFromAddress}
                  />
                </Col>
              </Row>
              <InvoiceItems 
                currency={formData.currency} 
                onRowDel={onDelEvent} 
                onRowAdd={onRowAdd} 
                items={items} 
                onItemizedItemEdit={onItemizedItemEdit} 
                setItems={setItems}
              />
              <Row className="mt-4 justify-content-end">
                <Col lg={6}>
                  <div className="d-flex flex-row align-items-start justify-content-between">
                    <span className="fw-bold">Subtotal:</span>
                    <span>{formData.currency} {calculations.subTotal}</span>
                  </div>
                  <div className="d-flex flex-row align-items-start justify-content-between">
                    <span className="fw-bold">Discount:</span>
                    <span>{formData.currency} {calculations.discountAmount}</span>
                  </div>
                  <div className="d-flex flex-row align-items-start justify-content-between">
                    <span className="fw-bold">Tax:</span>
                    <span>{formData.currency} {calculations.taxAmount}</span>
                  </div>
                  <hr />
                  <div
                    className="d-flex flex-row align-items-start justify-content-between"
                    style={{ fontSize: "1.25rem" }}
                  >
                    <span className="fw-bold">Total:</span>
                    <span>{formData.currency} {calculations.total}</span>
                  </div>
                </Col>
              </Row>
              <hr className="my-4" />
              <Form.Label className="fw-bold">Notes:</Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
                className="my-2"
                placeholder="Thanks for your business!"
                type="text"
                onChange={(e) => handleInputChange('notes', e.target.value)}
                value={formData.notes}
              />
            </Card>
          </Col>
          <Col md={4} lg={3}>
            <div className="sticky-top pt-md-3 pt-xl-4">
              <Button type="submit" variant="primary" className="d-block w-100">
                Review Invoice
              </Button>
              <InvoiceModal 
                {...formData}
                showModal={isOpen}
                InvoiceItems={items}
                {...calculations}
                closeModal={() => setIsOpen(false)}
              />
              <hr className="my-4" />
              <Form.Group className="my-3">
                <Form.Label className="fw-bold">Currency:</Form.Label>
                <Form.Select 
                  onChange={(e) => handleInputChange('currency', e.target.value)} 
                  className="btn btn-light my-1"
                  value={formData.currency}
                >
                  <option value="₹">INR (Indian Rupee)</option>
                  <option value="$">USD (United State Dollar)</option>
                  <option value="£">GBP (British Pound Sterling)</option>
                  <option value="¥">JPY (Japanese Yen)</option>
                  <option value="$">CAD (Canadian Dollar)</option>
                  <option value="$">AUD (Australian Dollar)</option>
                  <option value="$">SGD (Singapore Dollar)</option>
                  <option value="¥">CNY (Chinese Renminbi)</option>
                  <option value="₿">BTC (Bitcoin)</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label className="fw-bold">Tax Rate:</Form.Label>
                <InputGroup className="my-1 flex-wrap">
                  <Form.Control
                    onChange={(e) => handleInputChange('taxRate', e.target.value)}
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={formData.taxRate}
                  />
                  <InputGroup.Text className="bg-light fw-bold text-secondary small">%</InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label className="fw-bold">Discount Rate:</Form.Label>
                <InputGroup className="my-1 flex-wrap">
                  <Form.Control
                    onChange={(e) => handleInputChange('discountRate', e.target.value)}
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={formData.discountRate}
                  />
                  <InputGroup.Text className="bg-light fw-bold text-secondary small">%</InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default InvoiceForm;
