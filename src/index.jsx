import React from "react";
import ReactDOM from "react-dom/client";

import Header from "./Header";
import Main from "./Main";
import Footer from './Footer';

import "../style/mod/dist/css/bootstrap.css";
import "../style/style.css";

class Page extends React.Component {
  constructor() {
    super();
  }
  render() {
    const page = (
      <>  
        <Header/>
        <Main/>
        <Footer/>  
      </>
    );
    return page;
  }
  static renderPage() {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<Page/>);
  }
}
Page.renderPage();