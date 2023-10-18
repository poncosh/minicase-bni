import React, { useEffect } from "react";
import { HeaderComponent } from "../../components/screen/HeaderComponent";
import inquiries from "../../assets/img/inquiries.jpg";
import payment from "../../assets/img/payment.jpg";
import { UserData } from "../../components/UserData";
import { useAuth } from "../../stores/auth/context";
import { Navigate, useNavigate } from "react-router-dom";

export const TransactionOption = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "MiniCase BNI | Transactions Type";
  }, []);

  if (!authState?.authenticated) {
    return <Navigate to={"/login"} replace />;
  }
  if (!authState?.user?.customerData) {
    return <Navigate to={"/account"} replace />;
  }
  return (
    <>
      <HeaderComponent />
      <main style={{ marginTop: "95px" }}>
        <UserData />
        <div className="container border-top">
          <div className="row">
            <div className="col-6">
              <div className="d-flex flex-column m-3 border shadow rounded">
                <div
                  onClick={() => navigate("/transaction/inquiries")}
                  className="target-content-bni rounded d-flex flex-column align-items-center justify-content-center"
                  style={{
                    width: "100%",
                    minHeight: "350px",
                    backgroundColor: "black",
                    backgroundImage: `url("${inquiries}")`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "50% 50%",
                    transition: "1.5s",
                  }}
                >
                  <h2
                    style={{
                      textShadow: "5px 5px 3rem #000000",
                      color: "black",
                    }}
                  >
                    Inquiries
                  </h2>
                  <p
                    className="fw-bold"
                    style={{
                      textShadow: "5px 5px 3rem #000000",
                      color: "black",
                    }}
                  >
                    Cek status transaksi anda dalam 90 hari terakhir
                  </p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex flex-column m-3 border shadow rounded">
                <div
                  onClick={() => navigate("/transaction/payments")}
                  className="target-content-bni rounded d-flex flex-column align-items-center justify-content-center"
                  style={{
                    width: "100%",
                    minHeight: "350px",
                    backgroundColor: "black",
                    backgroundImage: `url("${payment}")`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "50% 50%",
                    transition: "1.5s",
                  }}
                >
                  <h2
                    style={{
                      textShadow: "5px 5px 3rem #000000",
                      color: "black",
                    }}
                  >
                    Payment
                  </h2>
                  <p
                    className="fw-bold"
                    style={{
                      textShadow: "5px 5px 3rem #000000",
                      color: "black",
                    }}
                  >
                    Cek transaksi keluar anda
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
