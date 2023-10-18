import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInquiryTransaction } from "../../stores/slicers";
import { useAuth } from "../../stores/auth/context";
import { Navigate } from "react-router-dom";
import { LoadingComponent } from "../../components/screen/LoadingComponent";
import { HeaderComponent } from "../../components/screen/HeaderComponent";
import { TransactionCard } from "../../components/cards/TransactionCard";

export const InquiriesPage = () => {
  const dispatch = useDispatch();
  const [inquiries, setInquiries] = useState([]);
  const loading = useSelector((state) => state.transactions.isLoading);
  const { authState } = useAuth();

  useEffect(() => {
    document.title = "MiniCase BNI | Inquiries";
    dispatch(getInquiryTransaction()).then(({ payload }) =>
      setInquiries(payload)
    );
  }, []);

  if (!authState?.authenticated) {
    return <Navigate to={"/login"} replace />;
  }
  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <>
      <HeaderComponent />
      <main className="pb-5" style={{ marginTop: "95px" }}>
        <div className="container">
          <div className="row">
            {inquiries?.map((inquiry) => (
              <TransactionCard key={inquiry.id} data={inquiry} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};
