import React, { useEffect, useState } from "react";
import { HeaderComponent } from "../../components/screen/HeaderComponent";
import { useAuth } from "../../stores/auth/context";
import { Navigate, useNavigate } from "react-router-dom";
import { faUser, faListNumeric } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";

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

export const UpdateAccountPage = () => {
  const navigate = useNavigate();
  const { authState, onUpdateProfile, onLogout } = useAuth();
  const [edit, setEditProfile] = useState(false);
  const [errorInput, setError] = useState({
    condition: false,
    message: "",
  });
  const [data, setData] = useState({
    identityId: "",
    address: "",
    phoneNumber: "",
    dateOfBirth: "",
  });

  useEffect(() => {
    setData({
      identityId: authState?.user?.customerData?.identityId,
      address: authState?.user?.customerData?.address,
      phoneNumber: authState?.user?.customerData?.phoneNumber,
      dateOfBirth: authState?.user?.customerData?.dateOfBirth,
    });
  }, []);

  const handleInput = (event) => {
    const { value, name } = event.target;
    setData({ ...data, [name]: value });
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    const result = await onUpdateProfile(data);
    if (result && result.error) {
      return setError({
        condition: true,
        message: result.msg,
      });
    }
    setEditProfile(!edit);
    await Toast.fire({
      icon: "success",
      title: "Success edit profile",
    });
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  if (!authState?.authenticated) {
    return <Navigate to={"/login"} replace />;
  }
  return (
    <>
      <HeaderComponent />
      <main className="pb-5" style={{ marginTop: "95px" }}>
        <div className="container d-flex flex-column align-items-center">
          <div className="d-flex flex-column mt-3 align-items-center">
            <div
              className="rounded-circle"
              style={{
                width: "150px",
                height: "150px",
                backgroundImage: `url("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                border: "solid 1px grey",
              }}
            ></div>
            <p
              className="mt-3 mb-0 text-center"
              style={{ fontSize: "1.8rem", fontWeight: "700" }}
            >
              {authState.user?.name}
            </p>
          </div>
          {errorInput.condition && (
            <div
              className="w-75 alert alert-warning alert-dismissible fade show"
              role="alert"
            >
              <strong>Ada input salah!</strong> Cek lagi data yang kamu input
              <button
                type="button"
                className="float-end btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}
          <form
            onSubmit={updateProfile}
            className="d-flex align-items-center flex-column w-100"
          >
            <div className="input-group w-75 d-flex align-items-center">
              <span
                className="input-group-text"
                id="identity-edit"
                style={{ height: "43px" }}
              >
                <FontAwesomeIcon icon={faListNumeric} />
              </span>
              <input
                aria-describedby="identity-edit"
                className="p-2 rounded-end form-control"
                type="text"
                name="identityId"
                placeholder="masukkan no identitas anda"
                onChange={handleInput}
                value={data.identityId}
                style={{
                  marginTop: "15px",
                  marginBottom: "15px",
                  border: "solid 1px grey",
                  color: data.identityId === "" ? "grey" : "black",
                }}
                disabled={!edit ? true : false}
              />
            </div>
            <div className="input-group w-75 d-flex align-items-center">
              <span
                className="input-group-text"
                id="address-edit"
                style={{ height: "90px" }}
              >
                <FontAwesomeIcon icon={faUser} />
              </span>
              <textarea
                className="p-2 rounded-end form-control"
                aria-describedby="address-edit"
                name="address"
                onChange={handleInput}
                value={data.address}
                style={{
                  marginTop: "15px",
                  marginBottom: "15px",
                  border: "solid 1px grey",
                  color: data.address === "" ? "grey" : "black",
                  height: "90px",
                }}
                placeholder="masukkan alamat anda"
                disabled={!edit ? true : false}
              />
            </div>
            <div className="input-group w-75 d-flex align-items-center">
              <span
                className="input-group-text"
                id="phone-edit"
                style={{ height: "43px" }}
              >
                <FontAwesomeIcon icon={faListNumeric} />
              </span>
              <input
                aria-describedby="phone-edit"
                className="p-2 rounded-end form-control"
                type="text"
                name="phoneNumber"
                placeholder="nomor ponsel"
                onChange={handleInput}
                value={data.phoneNumber}
                style={{
                  marginTop: "15px",
                  marginBottom: "15px",
                  border: "solid 1px grey",
                  color: data.phoneNumber === "" ? "grey" : "black",
                }}
                disabled={!edit ? true : false}
              />
            </div>
            <div className="input-group w-75 d-flex align-items-center">
              <span
                className="input-group-text"
                id="dateOfBirth-edit"
                style={{ height: "43px" }}
              >
                <FontAwesomeIcon icon={faListNumeric} />
              </span>
              <input
                aria-describedby="dateOfBirth-edit"
                className="p-2 rounded-end form-control"
                type="date"
                name="dateOfBirth"
                onChange={handleInput}
                value={data.dateOfBirth}
                style={{
                  marginTop: "15px",
                  marginBottom: "15px",
                  border: "solid 1px grey",
                  color: data.phoneNumber === "" ? "grey" : "black",
                }}
                disabled={!edit ? true : false}
              />
            </div>
            <button
              style={{ display: !edit ? "none" : "block" }}
              type="submit"
              className="btn btn-secondtheme text-light w-75"
            >
              Simpan
            </button>
          </form>
          <button
            onClick={() => setEditProfile(!edit)}
            style={{ display: !edit ? "block" : "none" }}
            className="btn btn-secondtheme text-light w-75 mb-3"
          >
            Edit Profil
          </button>
          <button
            onClick={() => onLogout()}
            style={{ display: !edit ? "block" : "none" }}
            className="btn btn-outline-secondtheme w-75"
          >
            Logout
          </button>
        </div>
      </main>
    </>
  );
};
