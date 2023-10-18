import React, { useEffect } from "react";
import bniSetor from "../../assets/img/setor_tunai_bni.jpg";
import bniTransfer from "../../assets/img/transfer_bni.jpg";
import { HeaderComponent } from "../../components/screen/HeaderComponent";
import { UserData } from "../../components/UserData";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../stores/auth/context";

export const HomePage = () => {
  const navigate = useNavigate();
  const { authState } = useAuth();

  useEffect(() => {
    document.title = "MiniCase BNI | Home";
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
      <main className="pb-5" style={{ marginTop: "95px" }}>
        <UserData />
        <div className="container border-top">
          <div className="row">
            <div className="col-6">
              <div className="d-flex flex-column m-3 border shadow rounded">
                <div
                  onClick={() => navigate("/top-up")}
                  className="target-content-bni rounded d-flex align-items-center justify-content-center"
                  style={{
                    width: "100%",
                    minHeight: "350px",
                    backgroundColor: "black",
                    backgroundImage: `url("${bniSetor}")`,
                    backgroundSize: "cover",
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
                    Setor Online
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex flex-column m-3 border shadow rounded">
                <div
                  onClick={() => navigate("/transfer")}
                  className="target-content-bni rounded d-flex align-items-center justify-content-center"
                  style={{
                    width: "100%",
                    minHeight: "350px",
                    backgroundColor: "black",
                    backgroundImage: `url("${bniTransfer}")`,
                    backgroundSize: "cover",
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
                    Transfer Uang
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
