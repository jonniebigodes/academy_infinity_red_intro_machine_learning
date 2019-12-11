import React from "react";
import { Link } from 'gatsby'
import "../assets/App.css";
import Footer from "../components/Footer";
import InfoPackage from "../../package.json";
export default () => (
  <div className="App">
    <div>
      <h1 className="header-app">
        Begining Machine Learning with TensorFlow.js
      </h1>
      <p className="app-description">
        This app houses all of the homework assignments and other assorted
        projects for the course.
      </p>
      <div className="sections-container">
        <section className="assignment-section">
          <h4>Welcome to Machine Learning Homework</h4>
          <div className="assignment-section-content">
            If you want to check out my solution for the first homework for the
            course, go <Link to="/nsfw">here</Link>
          </div>
        </section>
      </div>
    </div>
    <div className="containerDeps">
      <div className="dependenciesInfo">
        <h4>The packages used</h4>
        <div
          dangerouslySetInnerHTML={{ __html: "&lcub;" }}
          style={{ textAlign: "start" }}
        />
        {Object.keys(InfoPackage.dependencies).map((x,index) => (
          <p key={`deps_used_${index}`}>{x}</p>
        ))}
        <div
        dangerouslySetInnerHTML={{ __html: "&rcub;;" }}
        style={{ textAlign: "start" }}
      />
      </div>
    </div>
    <Footer />
  </div>
);
