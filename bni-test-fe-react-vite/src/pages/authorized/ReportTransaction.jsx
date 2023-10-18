import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getDetailTransaction } from "../../stores/slicers";
import { LoadingComponent } from "../../components/screen/LoadingComponent";
import { HeaderComponent } from "../../components/screen/HeaderComponent";

export const ReportTransaction = () => {
  const { state } = useLocation();
  const loading = useSelector((state) => state.transactions.isLoading);
  const [item, setItem] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetailTransaction(state.id)).then(({ payload }) => {
      setItem(payload);
    });
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }
  if (!state) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh", minWidth: "100vw" }}
      >
        <h3>Not Accessible</h3>
      </div>
    );
  }
  return (
    <>
      <HeaderComponent />
      <main className="pb-5" style={{ marginTop: "95px" }}>
        <div className="container">
          <div className="row">
            <div className="col-12 border rounded shadow ps-6 pe-6 mt-4">
              <div
                className="d-flex flex-column justify-content-center"
                style={{ minHeight: "400px" }}
              >
                <hr />
                <h3 className="m-0">{item.name}</h3>
                <p className="m-0">
                  {new Date(item.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p className="text-center m-0">
                  Tarif:{" "}
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(item.tariff)}
                </p>
                <h2 className="text-center m-0">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(item.amount)}
                </h2>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
