import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import Chart from "../components/Chart";
import OccupancyChart from "../components/OccupancyChart";
import _ from "lodash";

// eslint-disable-next-line
Date.prototype.subtractDays = function (date, days) {
  this.setDate(date.getDate() - parseInt(days));
  return this;
};

Date.prototype.sameDay = function (d) {
  return (
    this.getFullYear() === d.getFullYear() &&
    this.getDate() === d.getDate() &&
    this.getMonth() === d.getMonth()
  );
};

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      filtered: [],
      risk: [],
      profile: {
        Low: 0,
        Med: 0,
        High: 0,
      },
      symptoms: {
        Fever: 0,
        Cough: 0,
        Throat: 0,
        Breath: 0,
        Aches: 0,
        Smell: 0,
        Taste: 0,
        Nausea: 0,
        Vomiting: 0,
        Diarrhoea: 0,
        Fatigue: 0,
        Weak: 0,
      },
      avgTemp: 0,
      occupancy: 0,
      isolation: 0,
    };
  }

  componentDidMount() {
    this.getScreeningRecords();
    this.getPredictions();
  }

  getScreeningRecords = () => {
    const endpoint = `https://compli-api.herokuapp.com/screening/`;
    fetch(endpoint, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          records: response.records,
        });
      })
      .then(() => this.processRecords())
      .catch((err) => {
        console.log(err);
      });
  };

  getPredictions = () => {
    const endpoint = `https://compli-api.herokuapp.com/prediction/`;
    fetch(endpoint, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          risk: response.risk.sort().reverse(),
        });
      })
      .then(() => this.processPredictions())
      .catch((err) => {
        console.log(err);
      });
  };

  processRecords = () => {
    let temperature = 0;
    const records = this.state.records.filter((element) =>
      new Date().sameDay(new Date(element[1]))
    );
    records.forEach((element) => {
      temperature += Number(element[3]);
    });

    const symptoms = this.state.symptoms;

    records.forEach((element) => {
      const data = element.slice(6);
      Object.keys(symptoms).forEach((key, idx) => {
        symptoms[key] += data[idx];
      });
    });

    this.setState({
      avgTemp: temperature / records.length,
      occupancy: records.length,
      filtered: records,
      symptoms: symptoms,
    });
  };

  processPredictions = () => {
    const sum = _.sum(this.state.risk);
    const profile = {
      Low: (this.state.risk[0] / sum) * 100,
      Med: (this.state.risk[1] / sum) * 100,
      High: (this.state.risk[2] / sum) * 100,
    };
    console.log(profile);
    this.setState({ profile: profile });
  };

  render() {
    return (
      <div className="App">
        <Container>
          <Row className="justify-content-center" style={{ marginTop: "2rem" }}>
            <Col md="auto">
              <h1 style={{ fontSize: "4rem" }}>Dashboard</h1>
            </Col>
          </Row>
          {this.state.records.length == 0 ? (
            <Spinner animation="border" role="status"></Spinner>
          ) : (
            <div>
              <Row style={{ marginTop: "1rem" }}>
                <Col md={3}>
                  <Card style={{ height: "12rem", marginBottom: "1rem" }}>
                    <Card.Body>
                      <Card.Title>Average Temperature</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {this.state.avgTemp > 37.5 ? "Abnormal" : "Normal"}
                      </Card.Subtitle>
                      <h1
                        style={{
                          fontSize: "5rem",
                          color:
                            this.state.avgTemp > 37.5
                              ? "orange"
                              : "rgb(67,169,40)",
                        }}
                      >
                        {Number(this.state.avgTemp).toFixed(1)}
                      </h1>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={3}>
                  <Card style={{ height: "12rem", marginBottom: "1rem" }}>
                    <Card.Body>
                      <Card.Title>Isolated Employees</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {this.state.isolation === 0
                          ? "Maximum Personnel"
                          : "Reduced Personnel"}
                      </Card.Subtitle>
                      <h1 style={{ fontSize: "5rem" }}>0</h1>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card style={{ minHeight: "12rem", marginBottom: "1rem" }}>
                    <Card.Body>
                      <Card.Title>Predicted Risk Profile</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        Employee Screening Submissions
                      </Card.Subtitle>
                      <Row className="justify-content-center">
                        <Col md={4}>
                          <h1>
                            <Badge pill variant={"success"}>
                              {Number(this.state.profile.Low).toFixed(1)}%
                            </Badge>
                          </h1>
                        </Col>

                        <Col md={4}>
                          <h1>
                            <Badge pill variant={"warning"}>
                              {Number(this.state.profile.Med).toFixed(1)}%
                            </Badge>
                          </h1>
                        </Col>
                        <Col md={4}>
                          <h1>
                            <Badge pill variant={"danger"}>
                              {Number(this.state.profile.High).toFixed(1)}%
                            </Badge>
                          </h1>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row style={{ marginTop: "1rem" }}>
                <Col md={6}>
                  <Card style={{ minHeight: "20rem", marginBottom: "1rem" }}>
                    <Card.Body>
                      <Card.Title>Daily Symptoms</Card.Title>
                      <Row className="justify-content-center">
                        <Col md="auto" sm="auto">
                          {this.state.filtered.length != 0 ? (
                            <Chart symptoms={this.state.symptoms} />
                          ) : null}
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card style={{ height: "20rem", marginBottom: "1rem" }}>
                    <Card.Body>
                      <Card.Title>In-Office Employees</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {(this.state.occupancy * 100) / 50 < 50
                          ? "Below Capacity"
                          : "Above Capacity"}
                      </Card.Subtitle>
                      <h1 style={{ fontSize: "6rem" }}>
                        {this.state.occupancy}
                      </h1>
                      <OccupancyChart
                        data={{ occupancy: this.state.occupancy }}
                      />
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card style={{ height: "20rem", marginBottom: "1rem" }}>
                    <Card.Body>
                      <Card.Title>Predicted Capacity</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
        </Container>
      </div>
    );
  }
}
