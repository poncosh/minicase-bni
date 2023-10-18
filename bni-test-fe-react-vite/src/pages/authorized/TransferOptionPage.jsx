import React, { useEffect } from "react";
import bniLogo from "../../assets/img/bni_logo.png";
import bankLogo from "../../assets/img/bank_logo.png";
import { HeaderComponent } from "../../components/screen/HeaderComponent";
import { UserData } from "../../components/UserData";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../stores/auth/context";

export const TransferOptionPage = () => {
  const navigate = useNavigate();
  const { authState } = useAuth();

  useEffect(() => {
    document.title = "MiniCase BNI | Tranfer Type";
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
                  onClick={() => navigate("/transfer/bni")}
                  className="target-content-bni rounded d-flex align-items-center justify-content-center"
                  style={{
                    width: "100%",
                    minHeight: "350px",
                    backgroundColor: "black",
                    backgroundImage: `url("${bniLogo}")`,
                    backgroundSize: "400px",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "50% 50%",
                    transition: "1.5s",
                  }}
                >
                  <h2
                    style={{
                      textShadow: "10px 10px 1rem #000000",
                      color: "white",
                    }}
                  >
                    Antar BNI
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex flex-column m-3 border shadow rounded">
                <div
                  onClick={() => navigate("/transfer/others")}
                  className="target-content-bni rounded d-flex align-items-center justify-content-center"
                  style={{
                    width: "100%",
                    minHeight: "350px",
                    backgroundColor: "black",
                    backgroundImage: `url("${bankLogo}")`,
                    backgroundSize: "400px",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "50% 50%",
                    transition: "1.5s",
                  }}
                >
                  <h2
                    style={{
                      textShadow: "-2px -2px 1rem #000000",
                      color: "white",
                    }}
                  >
                    Antar Bank
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
