import React from "react";
import { useNavigate } from "react-router-dom";

export const TransactionCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate("/transaction/detail", { state: { id: data.id } });
      }}
      className="card w-100 mt-2 mb-2 tr-card"
      style={{ transition: "0.6s" }}
    >
      <div className="card-body">
        <h5
          style={{
            color: data.amount < 0 ? "#f42619" : "green",
          }}
          className="card-title"
        >
          {`${new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(data.amount)}`}
        </h5>
        <p className="card-text text-secondary mb-0">{data.createdAt}</p>
        <p style={{ position: "absolute", right: "15px", bottom: "35%" }}>
          {data.name}
        </p>
        <p
          className="fw-bold"
          style={{ position: "absolute", right: "15px", bottom: "5%" }}
        >
          Tarif :{" "}
          {`${new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(data.tariff)}`}
        </p>
      </div>
    </div>
  );
};
