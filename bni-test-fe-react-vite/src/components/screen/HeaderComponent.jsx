import React from "react";
import bniLogo from "../../assets/img/bni_logo.png";
import { useLocation, useNavigate } from "react-router-dom";

export const HeaderComponent = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const location = pathname.split("/")[1];

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light d-flex flex-column m-0 p-0">
      <div
        onClick={() => navigate("/")}
        className="d-flex flex-row align-items-center navbar-brand sims-logo"
      >
        <img className="me-3" src={bniLogo} height="30px" />
        <p className="m-0 p-0" style={{ fontWeight: "600" }}>
          BNI Online Transaction
        </p>
      </div>
      <div className="container-fluid justify-content-end bg-lighttheme pt-5 pb-5 pt-md-4 pb-md-4 border-bottom pe-5">
        <button
          className="navbar-toggler m-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse flex-grow-0" id="navbarNav">
          <ul className="navbar-nav text-center">
            <li className="navbar-item">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/transaction");
                }}
                className={
                  location === "transaction" ? "nav-link active" : "nav-link"
                }
                style={{ fontWeight: "600" }}
              >
                TRANSACTION
              </a>
            </li>
            <li className="navbar-item">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/account");
                }}
                className={
                  location === "account" ? "nav-link active" : "nav-link"
                }
                style={{ fontWeight: "600" }}
              >
                AKUN
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
