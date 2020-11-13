import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "./DailyCapture.css";


export default class Capture extends Component {
  constructor(props) {
    super(props);
    //Initialising class state data
    //State is used instead of class member variables to avoid manually managing component renders
    this.state = {
      empID: "",
      empTemp:"",
      empTravel:"",
      empExposure:"",
      empExposure:"",

    };
  }
  render() {
    return (
      <div style={{ overflowX: "none" }}>
        <Tabs defaultActiveKey="capture" style={{ marginTop: "1rem" }}>
          <Tab eventKey="daily-capture" title="Employee Screening">
            <div className="container u-form">
              <div className="pageHeading">Daily Screening Questions</div>
              <hr /> {/*Splits up sections*/}
              <Form>
                {/*Div used for ID  */}
                <div className="u-div">
                  <div className="ulabel">Employee Details</div>
                  <div className="ucontent-div">
                    <Form.Group as={Col} controlId="employeeID">
                      <OverlayTrigger placement="left">
                        <Form.Label>Identification Number</Form.Label>
                      </OverlayTrigger>
                      <Form.Control
                        placeholder="Enter ID Number"
                        required={true}
                        name="empID"
                        value={this.state.empID}
                      />
                    </Form.Group>
                  </div>
                </div>
                <hr /> 
                  {/*Div used for Symptoms  */}
                  <div className="u-div">
                  <div className="ulabel">Symptoms</div>
                  <div className="ucontent-div">
                    <Form.Group as={Col} controlId="checklist edit">
                      <OverlayTrigger placement="left">
                        <Form.Label>Identification Number</Form.Label>
                      </OverlayTrigger>
                      <Form.Control
                        placeholder="will be checklist"
                        required={true}
                        name="checklist"
                        value={this.state.empID}
                      />
                    </Form.Group>
                  </div>
                </div>
                <hr /> 
                  {/*Div used for General */}
                  <div className="u-div">
                  <div className="ulabel">General</div>
                  <div className="ucontent-div">
                    <Form.Group as={Col} controlId="employeeTemp">
                      <OverlayTrigger placement="left">
                        <Form.Label>Your Temperature</Form.Label>
                      </OverlayTrigger>
                      <Form.Control
                        placeholder="Enter your temperature today"
                        required={true}
                        name="empTemp"
                        value={this.state.empTemp}
                      />
                    </Form.Group>
                 
          
                    <Form.Group as={Col} controlId="exposure">
                      <OverlayTrigger placement="left">
                        <Form.Label>In the past 14 days, have you been in close proximity to anyone who has tested positive for COVID-19?</Form.Label>
                      </OverlayTrigger>
                      <Form.Control
                        placeholder="radio buttons Y and N"
                        required={true}
                        name="empExposure"
                        value={this.state.empExposure}
                      />
                    </Form.Group>
               
          
                    <Form.Group as={Col} controlId="travel">
                      <OverlayTrigger placement="left">
                        <Form.Label>Have you recently travelled to any high-risk country or any high-risk area defined under the National Disaster Regulations? </Form.Label>
                      </OverlayTrigger>
                      <Form.Control
                        placeholder="radio buttons Y and N"
                        required={true}
                        name="empTravel"
                        value={this.state.empTravel}
                      />
                    </Form.Group>
                  </div>
                </div>
                <hr /> 
                  {/*Div used for Certification */}
                  <div className="u-div">
                  <div className="ulabel">Certification</div>
                  <div className="ucontent-div">
                    <Form.Group as={Col} controlId="empCert">
                      <OverlayTrigger placement="left">
                        <Form.Label>I hereby certify that the responses provided above are true and accurate to the best of my knowledge. </Form.Label>
                      </OverlayTrigger>
                      <Form.Control
                        placeholder="will be checklist button-agreement box"
                        required={true}
                        name="checklist"
                        value={this.state.empCert}
                      />
                    </Form.Group>
                    <Button
                    className="ubutton"
                  
                    style={{
                      marginLeft: "15px",
                      backgroundColor: "green",
                      border: "#4E2E84",
                      height: "50px",
                      width: "90px",
                    }}
                  >
                      Submit
            
                  </Button>
                  </div>

                </div>
               

              </Form>
            </div>
          </Tab>
          <Tab eventKey="healthCheck-capture" title="Employee Health"></Tab>
        </Tabs>
      </div>
    );
  }
}
