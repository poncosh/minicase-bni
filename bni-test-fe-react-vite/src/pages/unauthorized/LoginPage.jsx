import React, { useState, useEffect } from "react";
import { useAuth } from "../../stores/auth/context";
import { Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAt,
  faEye,
  faEyeSlash,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import bniLogo from "../../assets/img/bni_logo.png";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { Illustration } from "../../components/Illustration";
import { LoadingComponent } from "../../components/screen/LoadingComponent";

const Toast = Swal.mixin({
  toast: true,
  position: "top-right",
  iconColor: "white",
  customClass: {
    popup: "colored-toast",
  },
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});

export const LoginPage = () => {
  const navigate = useNavigate();
  const { authState, onLogin } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errorInput, setError] = useState({
    condition: false,
    message: "",
  });
  const [isEye, setEye] = useState(false);
  const loading = useSelector((state) => state.transactions.isLoading);

  const submitLogin = async () => {
    if (data.password === "") {
      return setError({
        condition: true,
        message: "Password tidak boleh kosong",
      });
    }
    if (data.password.length < 6) {
      return setError({
        condition: true,
        message: "Password harus lebih panjang dari 6 karakter",
      });
    }
    const result = await onLogin(data);
    if (result && result.error) {
      return setError({
        condition: true,
        message: result.msg,
      });
    }
    await Toast.fire({
      icon: "success",
      title: "Success Login",
    });
    return navigate("/");
  };

  useEffect(() => {
    document.title = "MiniCase BNI | Login";
  }, []);

  const handleInput = (event) => {
    const { value, name } = event.target;
    setData({ ...data, [name]: value });
  };

  if (authState?.authenticated) {
    return <Navigate to="/" replace />;
  }
  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <main
      className="container-fluid m-0"
      style={{
        minHeight: "100vh",
      }}
    >
      <div className="row">
        <div className="col-6 shadow">
          <div className="d-flex flex-column w-100 h-100 p-3 justify-content-center">
            <div className="d-flex flex-row m-2 justify-content-center align-items-center">
              <img
                src={bniLogo}
                width={100}
                style={{ objectFit: "contain" }}
                className="me-2"
              />
              <h2
                className="ms-3 mt-0 mb-0 p-0"
                style={{ textShadow: "0 1px 0.1rem #E85222", color: "#006584" }}
              >
                MiniCase BNI
              </h2>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitLogin();
              }}
              className="d-flex flex-column align-items-center p-4 m-5 border rounded shadow"
            >
              <h3 className="fw-bold">Masuk untuk memulai</h3>
              <div className="input-group w-75 d-flex align-items-center">
                <span
                  className="input-group-text"
                  id="email-login"
                  style={{ height: "43px" }}
                >
                  <FontAwesomeIcon icon={faAt} />
                </span>
                <input
                  aria-describedby="email-login"
                  className="p-2 rounded-end form-control"
                  type="email"
                  name="email"
                  placeholder="masukkan email anda"
                  onChange={handleInput}
                  value={data.email}
                  style={{
                    marginTop: "15px",
                    marginBottom: "15px",
                    border: "solid 1px grey",
                    color: data.email === "" ? "grey" : "black",
                  }}
                  required={true}
                />
              </div>
              <div className="input-group w-75 d-flex align-items-center">
                <span
                  className="input-group-text"
                  id="password-login"
                  style={{ height: "43px" }}
                >
                  <FontAwesomeIcon
                    color={
                      errorInput.condition === true && data.password === ""
                        ? "#f42619"
                        : errorInput.condition === true &&
                          errorInput.message ===
                            "Password harus lebih panjang dari 6 karakter" &&
                          data.password.length < 8
                        ? "#f42619"
                        : errorInput.condition === true &&
                          errorInput.message === "Username atau password salah"
                        ? "#f42619"
                        : "black"
                    }
                    icon={faLock}
                  />
                </span>
                <input
                  aria-describedby="password-login"
                  className="p-2 rounded-end form-control"
                  type={!isEye ? "password" : "text"}
                  name="password"
                  placeholder="masukkan password anda"
                  onChange={handleInput}
                  value={data.password}
                  style={{
                    marginTop: "15px",
                    marginBottom: "15px",
                    border:
                      errorInput.condition === true && data.password === ""
                        ? "solid 1px #f42619"
                        : errorInput.condition === true &&
                          errorInput.message ===
                            "Password harus lebih panjang dari 6 karakter" &&
                          data.password.length < 8
                        ? "solid 1px #f42619"
                        : errorInput.condition === true &&
                          errorInput.message === "Username atau password salah"
                        ? "solid 1px #f42619"
                        : "solid 1px grey",
                    color: data.password === "" ? "grey" : "black",
                  }}
                />
                <FontAwesomeIcon
                  style={{ position: "absolute", right: "15px" }}
                  icon={!isEye ? faEye : faEyeSlash}
                  onClick={() => setEye(!isEye)}
                />
              </div>
              {errorInput.condition && (
                <p className="text-secondtheme text-end">
                  {errorInput.message}
                </p>
              )}
              <button
                className="btn btn-secondtheme text-light w-75 p-2 rounded text-center mt-2"
                type="submit"
              >
                Masuk
              </button>
            </form>
          </div>
        </div>
        <Illustration />
      </div>
    </main>
  );
};
