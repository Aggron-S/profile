import React from "react";
import { wLogo, meCropped } from "./js/imports";

export default class Header extends React.Component {
  constructor() {
    super();
  }
  #openNav = (e) => {
    e.preventDefault();
    document.getElementById("websiteMenuToggle").style.width = "18.75rem";
  }
  #closeNav = (e) => {
    e.preventDefault();
    document.getElementById("websiteMenuToggle").style.width = "0";
  }
  render() {
    const header = (
      <>
        <header className="my-bg-color-primary">
          <div className="container-fluid">
            <nav className="navbar navbar-expand-lg">
              <div className="container-fluid mt-3">
                <div className="website-name float-start mt-3">
                  <a className="navbar-brand text-light fw-bolder" href="#">
                    <img className="img-fluid page-logo-properties me-2" src={wLogo} alt="page-logo" />Warren Catilo
                  </a>
                </div>
                <div className="sidenav" id="websiteMenuToggle">
                  <a className="nav-link pt-3 me-3 closebtn" onClick={this.#closeNav}>&times;</a>
                  <a className="navbar-brand p-3 me-3 text-dark fw-bolder" href="#">
                    <img className="img-fluid page-logo-properties me-2" src={wLogo} alt="page-logo"/>Warren Catilo
                  </a>
                  <a className="nav-link p-3 me-3" href="#">Home</a>
                  <a className="nav-link p-3 me-3" href="#abt-me">About Me</a>
                  <a className="nav-link p-3 me-3" href="#hb">Hobbies</a>
                  <a className="nav-link p-3 me-3" href="#gl">Goals</a>
                  <a className="nav-link p-3 me-3" href="#exp">Expertise</a>
                </div>
                <span className="mt-3" onClick={this.#openNav}>&#9776;</span>
              </div>
            </nav>

            {/* Welcome */}
            <section className="container">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2">
                <div className="col text-start mx-auto my-my-1">
                  <div className="welcome-txt">
                    <h1 className="display-3 fw-bolder text-light">Hi! I'm Warren</h1>
                    <h4 className="h4 fw-bold fst-italic my-txt-semi-light">Aspiring Innovator, Ready to Protect Network Sector.</h4>
                  </div>
                </div>
                <div className="col mt-sm-3"> 
                  <img className="img-fluid float-sm-end my-header-img-properties" src={meCropped} alt="me-bg-right"/>
                </div>
              </div>
            </section>
          </div>
        </header>
      </>
    );
    return header;
  }
}