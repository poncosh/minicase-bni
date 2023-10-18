import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { LoginPage } from "../../pages/unauthorized";
import {
  HomePage,
  TopUpPage,
  TransactionOption,
  TransferExternal,
  TransferOptionPage,
  TransferWithinBni,
} from "../../pages/authorized";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/top-up",
        element: <TopUpPage />,
      },
      {
        path: "/transfer",
        element: <TransferOptionPage />,
      },
      {
        path: "/transaction",
        element: <TransactionOption />,
      },
      {
        path: "/transfer/bni",
        element: <TransferWithinBni />,
      },
      {
        path: "/transfer/others",
        element: <TransferExternal />,
      },
    ],
  },
]);
