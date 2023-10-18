import React, { useEffect, useState } from "react";
import { useAuth } from "../../stores/auth/context";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentTransaction } from "../../stores/slicers";
import { LoadingComponent } from "../../components/screen/LoadingComponent";
import { HeaderComponent } from "../../components/screen/HeaderComponent";
import { UserData } from "../../components/UserData";

export const PaymentsPage = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { authState } = useAuth();
  const [payments, setPayments] = useState([]);
  const loading = useSelector((state) => state.transactions.isLoading);
  const [userOpen, setUserOpen] = useState(false);
  const navigate = useNavigate();
  const monthLocation = pathname.split("/")[3];

  useEffect(() => {
    document.title = "MiniCase BNI | Payments";
    dispatch(getPaymentTransaction()).then(({ payload }) => {
      setPayments(payload);
      console.log(payload);
    });
  }, []);

  const data = payments.map((el) => ({
    ...el,
    createdAt: new Date(el.createdAt).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));

  const months = [
    {
      id: 1,
      name: "January",
    },
    {
      id: 2,
      name: "February",
    },
    {
      id: 3,
      name: "March",
    },
    {
      id: 4,
      name: "April",
    },
    {
      id: 5,
      name: "May",
    },
    {
      id: 6,
      name: "June",
    },
    {
      id: 7,
      name: "July",
    },
    {
      id: 8,
      name: "August",
    },
    {
      id: 9,
      name: "September",
    },
    {
      id: 10,
      name: "October",
    },
    {
      id: 11,
      name: "November",
    },
    {
      id: 12,
      name: "December",
    },
  ];

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
        <UserData />
        <div className="container">
          <p
            className="ps-3 mb-3"
            style={{ fontSize: "1.4rem", fontWeight: "600" }}
          >
            Semua Transaksi
          </p>
          <div className="row">
            {months.map((month) => (
              <p
                key={month.id}
                id="navigation-id"
                onClick={() => {
                  setUserOpen(true);
                  navigate(`/transaction/payments/${month.name.toLowerCase()}`);
                }}
                className="m-0 col-4 col-md-3 col-lg-1 rounded-top text-center pt-2 pb-2"
                style={{
                  fontWeight:
                    monthLocation === month.name.toLowerCase() ? "700" : "400",
                  backgroundColor:
                    monthLocation === month.name.toLowerCase()
                      ? "#D7CABF"
                      : "white",
                }}
              >
                {month.name}
              </p>
            ))}
          </div>
          <div className="container d-flex flex-column">
            <Outlet context={[data]} />
          </div>
        </div>
      </main>
    </>
  );
};
