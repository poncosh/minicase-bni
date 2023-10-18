import React, { useState, useEffect } from "react";
import { HeaderComponent } from "../../components/screen/HeaderComponent";
import { UserData } from "../../components/UserData";
import { Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill, faPerson } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../stores/auth/context";
import CurrencyInput from "react-currency-input-field";
import Swal from "sweetalert2";

export const TransferExternal = () => {
  const { authState, onTransactionExternal } = useAuth();
  const [data, setData] = useState({
    name: "",
    amount: "",
  });
  const navigate = useNavigate();
  const topUpAmount = [
    {
      id: 1,
      amount: 50000,
    },
    {
      id: 2,
      amount: 100000,
    },
    {
      id: 3,
      amount: 200000,
    },
    {
      id: 4,
      amount: 500000,
    },
    {
      id: 5,
      amount: 1000000,
    },
    {
      id: 6,
      amount: 5000000,
    },
  ];

  useEffect(() => {
    document.title = "SIMS - PPOB | Top Up";
  }, []);

  const handleInput = (event) => {
    const { value, name } = event.target;
    setData({ ...data, [name]: value });
  };

  const submitTopUp = () => {
    if (Number(data.amount) < 20000) {
      return Swal.fire({
        icon: "error",
        title: `Top Up sebesar ${new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(data.amount)}`,
        text: "Gagal, mohon top up saldo di atas Rp 20.000,-",
      });
    }
    Swal.fire({
      title: `Anda yakin untuk Top Up sebesar ${new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(data.amount)}?`,
      customClass: {
        icon: "no-border",
      },
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, lanjutkan top up",
      cancelButtonText: "Batalkan",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const item = await onTransactionExternal(data);
        if (item && item.error) {
          return Swal.fire({
            icon: "error",
            title: `Top Up sebesar ${new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(data.amount)}`,
            text: "Gagal",
            confirmButtonText: "Kembali ke beranda",
          }).then(() => navigate("/"));
        }
        Swal.fire({
          icon: "success",
          title: `Top Up sebesar ${new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(data.amount)}`,
          text: "Sukses",
          confirmButtonText: "Kembali ke beranda",
        }).then(() => navigate("/"));
      }
    });
  };

  if (!authState?.authenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <HeaderComponent />
      <main style={{ marginTop: "95px" }}>
        <UserData />
        <div className="container d-flex flex-column mt-3">
          <div className="ps-3">
            <p className="mb-1" style={{ fontWeight: "500" }}>
              Silahkan masukan
            </p>
            <p style={{ fontSize: "1.8rem", fontWeight: "600" }}>
              Nominal Transfer External
            </p>
          </div>
          <div className="container">
            <div className="row">
              <form
                id="topup-form"
                className="d-flex flex-column col-7"
                onSubmit={(e) => {
                  e.preventDefault();
                  submitTopUp();
                }}
              >
                <div className="input-group d-flex align-items-center w-100">
                  <span
                    className="input-group-text"
                    id="transaction-name"
                    style={{ height: "43px", width: "45px" }}
                  >
                    <FontAwesomeIcon icon={faPerson} />
                  </span>
                  <input
                    aria-describedby="transaction-name"
                    className="p-2 rounded-end form-control"
                    type="text"
                    name="name"
                    placeholder="masukkan nama transaksi"
                    onChange={handleInput}
                    value={data.name}
                    style={{
                      marginTop: "15px",
                      marginBottom: "15px",
                      border: "solid 1px grey",
                      color: data.name === "" ? "grey" : "black",
                    }}
                    required={true}
                  />
                </div>
                <div className="input-group d-flex align-items-center w-100">
                  <span
                    className="input-group-text"
                    id="amount-topup"
                    style={{ height: "43px" }}
                  >
                    <FontAwesomeIcon icon={faMoneyBill} />
                  </span>
                  <CurrencyInput
                    aria-describedby="amount-topup"
                    className="p-2 rounded-end form-control"
                    name="amount"
                    placeholder="masukkan nominal transfer"
                    value={data.amount}
                    decimalsLimit={2}
                    onValueChange={(value) =>
                      setData({
                        ...data,
                        amount: value,
                      })
                    }
                    style={{
                      marginTop: "15px",
                      marginBottom: "15px",
                      border: !data.amount
                        ? "solid 1px grey"
                        : "solid 1px black",
                      color: !data.amount ? "grey" : "black",
                    }}
                  />
                </div>
                <button
                  id="topup-submit"
                  className={
                    !data.amount
                      ? "btn btn-secondary text-light p-2"
                      : "btn btn-secondtheme text-light p-2"
                  }
                  type="submit"
                  disabled={!data.amount}
                >
                  Transfer
                </button>
              </form>
              <div className="col-5 container-fluid">
                <div className="row p-3 g-3">
                  {topUpAmount.map((fixedAmount) => (
                    <div key={fixedAmount.id} className="col-4">
                      <button
                        className="rounded-0 btn btn-outline-dark"
                        style={{ width: "100%" }}
                        onClick={() =>
                          setData({
                            ...data,
                            amount: fixedAmount.amount,
                          })
                        }
                      >
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(fixedAmount.amount)}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
