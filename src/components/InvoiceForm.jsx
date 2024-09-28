import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
const InvoiceForm = () => {
  return (
    <>
      <Form>
        <Row>
          <Col md={8} lg={9}>
            <Card className="p-4 p-xl-5 my-3 my-xl-4">
              <div className="d-flex flex-row align-items-start justify-content-between mb-3">
                <div className="d-flex flex-column">
                  <div className="d-flex flex-column">
                    <div className="mb-2">
                      <span className="fw-bold">Current Date:&nbsp;</span>
                      <span className="current-date">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                    </div>
                    <div className="d-flex flex-row align-items-center">
                      <span className="fw-bold d-block me-2">
                        Due&nbsp;Date:
                      </span>
                      <Form.Control
                        type="date"
                        style={{ maxWidth: "150px" }}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <span className="fw-bold d-block me-2">
                      Invoice&nbsp;Number:&nbsp;
                    </span>
                    <Form.Control
                      type="number"
                      min="1"
                      required="required"
                      style={{ maxWidth: "70px" }}
                      className="form-control"
                    />
                  </div>
              </div>
              <hr className="my-4"/>
              <Row>
                <Col md={6}>
                <Form.Label>Bill to:</Form.Label>
                </Col>
                <Col md={6}>
                <Form.Label>Bill from:</Form.Label>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col md={4} lg={3}>
            form2
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default InvoiceForm;
