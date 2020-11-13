import React from "react";
import './landing.css';
import {  Col, Row, Container} from 'react-bootstrap';
//====== images ======
import iphone from "../img/iphone.png";

function Landing() {
  return (
    <div className="landing-page">
            <div class="welcome d-flex justify-content-center flex-column">
            <div class="container">
                <nav class="navbar navbar-expand-lg navbar-dark pt-4 px-0">
                    <a class="navbar-brand mr-5" href="#">
                        <img src="" class="mr-2" alt=""/>
                        Complì
                    </a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav">
                            <li class="nav-item active">
                                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Dashboard</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Data Capture</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Help</a>
                            </li>
                        </ul>



                    </div>
                </nav>
            </div>


            <div class="inner-wrapper mt-auto mb-auto container">
                <div class="row">
                    <div class="col-lg-6 col-md-5 col-sm-12 mt-auto mb-auto mr-3">
                        <h1 class="welcome-heading display-4 text-white">Employee health compliance made quick & easy</h1>
                        <p class="text-muted">Achieve faster compliance with leading edge machine learning and predictive analysis software designed to 
                        track key employee metrics regarding health, risk, and exposure
                        </p>
                        <a href=""
                            class="btn btn-lg btn-success btn-pill align-self-center">Learn More</a>


                    </div>

                    <div class="col-lg-4 col-md-5 col-sm-12 ml-auto">
                        <img class="iphone-mockup ml-auto" src={iphone} alt="insert image"/>
                    </div>
                </div>
            </div>
        </div>
       
        </div>
      
      


  );
}

export default Landing;