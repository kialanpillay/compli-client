import React, { Component } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import "./DailyCapture.css";
import Checklist from "../components/Checklist";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Container, RadioGroup } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import Alert from "react-bootstrap/Alert";
import CheckIcon from "@material-ui/icons/Check";

const symptomsData = [
  {
    text: "Cough",
  },
  {
    text: "Sore Throat ",
  },
  {
    text: "Shortness of breath ",
  },
  {
    text: "Body aches ",
  },
  {
    text: "Loss of taste ",
  },
  {
    text: "Nausea  ",
  },
  {
    text: "Vomiting ",
  },
  {
    text: "Diarrhoea ",
  },
  {
    text: "Fatigue ",
  },
  {
    text: "Weakness or tiredness ",
  },
];
const certData = [
  {
    text: "I Agree",
  },
];
let selectedSymptomsConverted = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

export default class Capture extends Component {
  constructor(props) {
    super(props);
    //Initialising class state data
    //State is used instead of class member variables to avoid manually managing component renders
    this.state = {
      empID: "",
      empTemp: "",
      empTravel: "0",
      empExposure: "0",
      empCert: "",
      selectedSymptoms: [],
      selectedCert: [],
      tempHigh: false,
      upload: false,
    };
    this.callbackChecklist = this.callbackChecklist.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.callbackChecklistCert = this.callbackChecklistCert.bind(this);
  }
  //Sets the state of the symptoms array to include items that have been selected.
  callbackChecklist = (checked) => {
    this.setState({ selectedSymptoms: checked });
    this.symptomsConvert(this.state.selectedSymptoms);
  };
  callbackChecklistCert = (checked) => {
    this.setState({ selectedCert: checked });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  symptomsConvert = (symptomsSelect) => {
    for (let i = 0; i < 10; i++) {
      if (symptomsSelect.includes(symptomsData[i].text)) {
        selectedSymptomsConverted[i] = 1;
      }
    }
  };
  checkTemp = (temp) => {
    // income tax number is 10 digits
    if (temp > 38) {
      this.setState({ tempHigh: true });
    }
  };

  post = () => {
    this.setState({ upload: true });
    const payload = {
      empID: this.state.empID,
      empTemp: this.state.empTemp,
      empTravel: this.state.empTravel,
      empExposure: this.state.empExposure,
      symptoms: selectedSymptomsConverted,
    };
    const endpoint = `https://compli-api.herokuapp.com/screening/`;
    fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  alertOnClose = () => {
    window.location.href = "/";
  };
  handleChangeTravel = (event) => {
    this.setState({ value: event.target.value });
    this.setState({ empTravel: event.target.value });
    console.log(this.state.empTravel);
  };
  handleChangeExposure = (event) => {
    this.setState({ value: event.target.value });
    this.setState({ empExposure: event.target.value });
    console.log(this.state.empExposure);
  };

  render() {
    return (
      <div
        className="p-Div"
        style={{ overflowX: "none", backgroundColor: "#36454F" }}
      >
        <Tabs
          defaultActiveKey="capture"
          style={{ marginTop: "1rem", backgroundColor: "#36454F" }}
        >
          <Tab
            eventKey="daily-capture"
            title="Employee Screening"
            style={{ backgroundColor: "#36454F" }}
          >
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
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                  </div>
                </div>
                <hr />
                {/*Div used for Symptoms  */}
                <div className="u-div">
                  <div className="ulabel">Symptoms</div>
                  <div className="ucontent-div">
                    <Form.Group as={Col} controlId="symptonsChecklist">
                      <Form.Label>Symptoms Today</Form.Label>

                      <Checklist
                        data={symptomsData.map((symptoms) => symptoms.text)}
                        checked={this.state.selectedSymptoms}
                        callback={this.callbackChecklist}
                      />
                    </Form.Group>
                    <img src={"./Covid.png"} height="350" alt="Graphic"></img>
                  </div>
                </div>
                <hr />
                {/*Div used for General */}
                <div className="u-div">
                  <div className="ulabel">General</div>
                  <div className="ucontent-div">
                    <Form.Group as={Col} controlId="employeeTemp">
                      <Form.Label>Your Temperature</Form.Label>

                      <Form.Control
                        placeholder="Enter your temperature today"
                        required={true}
                        name="empTemp"
                        value={this.state.empTemp}
                        onChange={this.handleChange}
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="exposure">
                      <Form.Label>
                        In the past 14 days, have you been in close proximity to
                        anyone who has tested positive for COVID-19?
                      </Form.Label>

                      <FormControl>
                        <RadioGroup
                          value={this.state.value}
                          onChange={this.handleChangeTravel}
                          name="Exposure"
                        >
                          <FormControlLabel
                            value="0"
                            control={<Radio style={{ color: "#17c671" }} />}
                            label="No"
                          />
                          <FormControlLabel
                            value="1"
                            control={<Radio style={{ color: "#17c671" }} />}
                            label="Yes"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Form.Group>

                    <Form.Group as={Col} controlId="travel">
                      <Form.Label>
                        Have you recently travelled to any high-risk country or
                        any high-risk area defined under the National Disaster
                        Regulations?{" "}
                      </Form.Label>

                      <FormControl>
                        <RadioGroup
                          name="Travel"
                          value={this.state.value}
                          onChange={this.handleChangeExposure}
                        >
                          <FormControlLabel
                            value="0"
                            control={<Radio style={{ color: "#17c671" }} />}
                            label="No"
                          />
                          <FormControlLabel
                            value="1"
                            control={<Radio style={{ color: "#17c671" }} />}
                            label="Yes"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Form.Group>
                  </div>
                </div>
                <hr />
                {/*Div used for Certification */}
                <div className="u-div">
                  <div className="ulabel">Certification</div>
                  <div className="ucontent-div">
                    <Form.Group as={Col} controlId="certChecklist">
                      <Form.Label>
                        I hereby certify that the responses provided above are
                        true and accurate to the best of my knowledge.
                      </Form.Label>

                      <Checklist
                        data={certData.map((cert) => cert.text)}
                        checked={this.state.selectedCert}
                        callback={this.callbackChecklistCert}
                      />
                    </Form.Group>
                    <Button
                      className="ubutton"
                      onClick={() => this.post()}
                      style={{
                        marginLeft: "15px",
                        backgroundColor: "#17c671",
                        border: "#17c671",
                        height: "50px",
                        width: "90px",
                      }}
                    >
                      Submit
                    </Button>
                    <Alert
                      show={this.state.upload}
                      variant={this.state.tempHigh ? "warning" : "success"}
                      onClose={() => this.alertOnClose("success")}
                      dismissible
                      style={{
                        display: "flex",
                        marginLeft: "0.5rem",
                        marginRight: "0.5rem",
                        marginTop: "0.5rem",
                      }}
                    >
                      {this.state.tempHigh
                        ? "Notify Manager"
                        : "Form Submitted"}
                      <CheckIcon
                        style={{
                          marginRight: "5px",
                        }}
                      />
                    </Alert>
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
//<a href="https://stories.freepik.com/people">Illustration by Freepik Stories</a>
