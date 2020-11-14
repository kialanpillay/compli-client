import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "../components/Navbar";
import LoginButton from "../components/LoginButton";
import Sidebar from "../components/Sidebar";

function Test() {
    return (
        <div>
            <Row>
                <Col md={2}>
            <Sidebar/>
            </Col>
            <Col>
            </Col>
            </Row>
            
           
        </div>
    );
}

export default Test;