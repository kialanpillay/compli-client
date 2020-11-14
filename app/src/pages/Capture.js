import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Checklist from "../components/Checklist";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { RadioGroup } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import Alert from "react-bootstrap/Alert";
import CheckIcon from "@material-ui/icons/Check";
import "./Capture.css";
import Sidebar from "../components/Sidebar";

const symptomsData = [
  {
    text: "Fever",
  },
  {
    text: "Cough",
  },
  {
    text: "Sore Throat",
  },
  {
    text: "Shortness of Breath",
  },
  {
    text: "Body Aches",
  },
  {
    text: "Loss of Smell ",
  },
  {
    text: "Loss of Taste ",
  },
  {
    text: "Nausea",
  },
  {
    text: "Vomiting ",
  },
  {
    text: "Diarrhoea",
  },
  {
    text: "Fatigue",
  },
  {
    text: "Weakness",
  },
];
const certData = [
  {
    text: "I Agree",
  },
];
let selectedSymptomsConverted = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

export default class Capture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empID: "",
      empTemp: 36,
      empTravel: "0",
      empExposure: "0",
      empCert: "",
      selectedSymptoms: [],
      certification: [],
      fever: false,
      uploadScreening: false,
      upload: false,
      empDays: 10,
      empSigns: "0",
      empFever: "0",
      canReturn: 0,
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
    this.setState({ certification: checked });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  symptomsConvert = (symptomsSelect) => {
    for (let i = 0; i < symptomsData.length; i++) {
      if (symptomsSelect.includes(symptomsData[i].text)) {
        selectedSymptomsConverted[i] = 1;
      }
    }
  };

  checkTemp = (temp) => {
    if (temp > 38) {
      this.setState({ fever: true });
    }
  };

  postScreening = () => {
    this.setState({ uploadScreening: true });
    const payload = {
      empID: this.state.empID,
      empTemp: Number(this.state.empTemp),
      empTravel: Number(this.state.empTravel),
      empExposure: Number(this.state.empExposure),
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
      .catch((err) => {
        console.log(err);
      });
  };

  postHealthCheck = () => {
    this.setState({ upload: true });
    this.employeeReturnCheck();
    const payload = {
      empID: this.state.empID,
      days: Number(this.state.empDays),
      fever: Number(this.state.empFever),
      symptoms: Number(this.state.empSigns),
      approved: Number(this.state.canReturn),
    };
    const endpoint = `https://compli-api.herokuapp.com/quarantine/`;
    fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .catch((err) => {
        console.log(err);
      });
  };

  dailyCheck = () => {
    if (
      this.state.selectedSymptoms.length > 0 ||
      Number(this.state.empExposure) == 1 ||
      Number(this.state.empTravel) == 1
    ) {
      this.postNotification("employee");
      return false;
    } else {
      return true;
    }
  };

  postNotification = (option) => {
    const payload = {
      option: option,
      empID: this.state.empID,
      to: "kialanpillay@gmail.com",
    };
    const endpoint = `https://compli-api.herokuapp.com/notification/`;
    fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .catch((err) => {
        console.log(err);
      });
  };

  employeeReturnCheck = () => {
    if (Number(this.state.empFever) == 0 && Number(this.state.empSigns) == 0) {
      this.setState({ canReturn: 1 });
    } else {
      this.setState({ canReturn: 0 });
    }
  };
  alertOnClose = () => {
    window.location.href = "/";
  };

  handleChangeTravel = (event) => {
    this.setState({ empTravel: event.target.value });
  };
  handleChangeExposure = (event) => {
    this.setState({ empExposure: event.target.value });
  };
  handleChangeSigns = (event) => {
    this.setState({ empSigns: event.target.value });
  };
  handleChangeFever = (event) => {
    this.setState({ empFever: event.target.value });
  };

  render() {
    return (
      <div className="p-Div">
        <div className="hf">
          <Row>
            <Col md={2}>
              <Sidebar />
            </Col>
            <Col className="heightfix" md={10}>
              <Tabs defaultActiveKey="capture" style={{ marginTop: "2rem" }}>
                <Tab eventKey="capture" title="Employee Screening">
                  <div className="container u-form">
                    <div className="pageHeading">Daily Screening Questions</div>
                    <hr /> {/*Splits up sections*/}
                    <Form>
                      {/*Div used for ID  */}
                      <div className="u-div">
                        <div className="ulabel">Employee Details</div>
                        <div className="ucontent-div">
                          <Form.Group as={Col} controlId="employeeID">
                            <Form.Label>Identification Number</Form.Label>
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
                          <Row>
                            <Col md={4}>
                              <Form.Group
                                as={Col}
                                controlId="symptonsChecklist"
                              >
                                <Form.Label>Symptoms Today</Form.Label>

                                <Checklist
                                  data={symptomsData.map(
                                    (symptoms) => symptoms.text
                                  )}
                                  checked={this.state.selectedSymptoms}
                                  callback={this.callbackChecklist}
                                />
                              </Form.Group>
                            </Col>
                            <Col md={8}>
                              <img
                                src={"./Covid.png"}
                                width="400"
                                alt="Graphic"
                              ></img>
                            </Col>
                          </Row>
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
                              In the past 14 days, have you been in close
                              proximity to anyone who has tested positive for
                              COVID-19?
                            </Form.Label>

                            <FormControl>
                              <RadioGroup
                                value={this.state.empExposure}
                                onChange={this.handleChangeExposure}
                                name="Exposure"
                              >
                                <FormControlLabel
                                  value="0"
                                  control={
                                    <Radio style={{ color: "#17c671" }} />
                                  }
                                  label="No"
                                />
                                <FormControlLabel
                                  value="1"
                                  control={
                                    <Radio style={{ color: "#17c671" }} />
                                  }
                                  label="Yes"
                                />
                              </RadioGroup>
                            </FormControl>
                          </Form.Group>

                          <Form.Group as={Col} controlId="travel">
                            <Form.Label>
                              Have you recently travelled to any high-risk
                              country or any high-risk area defined under the
                              National Disaster Regulations?{" "}
                            </Form.Label>

                            <FormControl>
                              <RadioGroup
                                name="Travel"
                                value={this.state.empTravel}
                                onChange={this.handleChangeTravel}
                              >
                                <FormControlLabel
                                  value="0"
                                  control={
                                    <Radio style={{ color: "#17c671" }} />
                                  }
                                  label="No"
                                />
                                <FormControlLabel
                                  value="1"
                                  control={
                                    <Radio style={{ color: "#17c671" }} />
                                  }
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
                              I hereby certify that the responses provided above
                              are true and accurate to the best of my knowledge.
                            </Form.Label>

                            <Checklist
                              data={certData.map((cert) => cert.text)}
                              checked={this.state.certification}
                              callback={this.callbackChecklistCert}
                            />
                          </Form.Group>
                          <Button
                            className="ubutton"
                            onClick={() => this.postScreening()}
                            disabled={this.state.certification.length === 0}
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
                            show={this.state.uploadScreening}
                            variant={this.dailyCheck() ? "success" : "warning"}
                            onClose={() => this.alertOnClose()}
                            dismissible
                            style={{
                              display: "flex",
                              marginLeft: "0.5rem",
                              marginRight: "0.5rem",
                              marginTop: "0.5rem",
                            }}
                          >
                            {this.dailyCheck()
                              ? "Form Submitted."
                              : "Form Submitted. You will be contacted soon."}
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
                <Tab
                  eventKey="healthCheck-capture"
                  title="Employee Quarantine Health Check"
                >
                  <div className="container u-form">
                    <div className="pageHeading">Quarantine Health Check</div>
                    <hr />
                    <Form>
                      {/*Div used for ID  */}
                      <div className="u-div">
                        <div className="ulabel">Employee Details</div>
                        <div className="ucontent-div">
                          <Form.Group as={Col} controlId="employeeID">
                            <Form.Label>Identification Number</Form.Label>
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
                      {/*Div used for Symptoms info */}
                      <div className="u-div">
                        <div className="ulabel">Symptoms</div>
                        <div className="ucontent-div">
                          <Form.Group as={Col} controlId="employeeTemp">
                            <Form.Label>
                              How many days have you been in quarantine?
                            </Form.Label>

                            <Form.Control
                              placeholder={10}
                              required={true}
                              name="empDays"
                              value={this.state.empDays}
                              onChange={this.handleChange}
                            />
                          </Form.Group>

                          <Form.Group as={Col} controlId="signs">
                            <Form.Label>
                              Are you experiencing any visible signs/symptoms of
                              illness? These include coughing, sore throat,
                              shortness of breath, body aches, loss of
                              smell/taste, nausea, vomiting, diarrhoea, fatigue,
                              fever and weakness.
                            </Form.Label>

                            <FormControl>
                              <RadioGroup
                                value={this.state.empSigns}
                                onChange={this.handleChangeSigns}
                                name="signs"
                              >
                                <FormControlLabel
                                  value={"0"}
                                  control={
                                    <Radio style={{ color: "#17c671" }} />
                                  }
                                  label="No"
                                />
                                <FormControlLabel
                                  value={"1"}
                                  control={
                                    <Radio style={{ color: "#17c671" }} />
                                  }
                                  label="Yes"
                                />
                              </RadioGroup>
                            </FormControl>
                          </Form.Group>

                          <Form.Group as={Col} controlId="nofever">
                            <Form.Label>
                              I have had no fever for at least 24 hours without
                              taking medication to reduce fever during that time
                              AND symptoms have improved.
                            </Form.Label>

                            <FormControl>
                              <RadioGroup
                                name="nofever"
                                value={this.state.empFever}
                                onChange={this.handleChangeFever}
                              >
                                <FormControlLabel
                                  value={"0"}
                                  control={
                                    <Radio style={{ color: "#17c671" }} />
                                  }
                                  label="True"
                                />
                                <FormControlLabel
                                  value={"1"}
                                  control={
                                    <Radio style={{ color: "#17c671" }} />
                                  }
                                  label="False"
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
                              I hereby certify that the responses provided above
                              are true and accurate to the best of my knowledge.
                            </Form.Label>

                            <Checklist
                              data={certData.map((cert) => cert.text)}
                              checked={this.state.certification}
                              callback={this.callbackChecklistCert}
                            />
                          </Form.Group>
                          <Button
                            className="ubutton"
                            onClick={() => this.postHealthCheck()}
                            disabled={this.state.certification.length === 0}
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
                            variant={
                              this.state.canReturn == 0 ? "danger" : "success"
                            }
                            onClose={() => this.alertOnClose()}
                            dismissible
                            style={{
                              display: "flex",
                              marginLeft: "0.5rem",
                              marginRight: "0.5rem",
                              marginTop: "0.5rem",
                            }}
                          >
                            {this.state.canReturn == 0
                              ? "Form Submitted. You are required to remain at home."
                              : "Form Submitted. You may return to work."}
                          </Alert>
                        </div>
                      </div>
                    </Form>
                  </div>
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
