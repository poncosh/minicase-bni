import React, { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { TransactionCard } from "../../components/cards/TransactionCard";

export const PaymentsTransaction = () => {
  const { month } = useParams();
  const [data] = useOutletContext();
  const displayData = data.filter(
    (el) => el.createdAt.split(" ")[0].toLowerCase() === month
  );

  useEffect(() => {
    document.title = `MiniCase BNI | Payments ${
      month.charAt(0).toUpperCase() + month.slice(1)
    }`;
  }, [month]);

  if (displayData.length === 0) {
    return (
      <p
        className="text-center text-secondary mt-3"
        style={{ fontWeight: "600" }}
      >
        Maaf, tidak ada history transaksi saat ini
      </p>
    );
  }
  return (
    <div className="d-flex flex-column gap-2 mb-4">
      {displayData.map((el) => (
        <TransactionCard key={el.id} data={el} />
      ))}
    </div>
  );
};
