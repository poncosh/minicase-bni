import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
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

const AuthContext = createContext({});

const baseURL = "http://localhost:8080/api";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    authenticated: null,
    user: null,
    balance: null,
  });

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("MINICASE_BNI_TOKEN");
      try {
        if (token) {
          const { data } = await axios.get(`${baseURL}/users/about`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "MINICASE_BNI_TOKEN"
              )}`,
            },
          });

          setAuthState({
            token: token,
            authenticated: true,
            user: data?.data,
            balance: data?.data?.balance,
          });
        }
      } catch (error) {
        await Toast.fire({
          icon: "info",
          title: "Please login again",
        });
      }
    })();
  }, []);

  const login = async (dataUser) => {
    try {
      const { email, password } = dataUser;

      const { data } = await axios.post(`${baseURL}/users/login`, {
        email,
        password,
      });

      localStorage.setItem("MINICASE_BNI_TOKEN", data.authToken);

      const { data: user } = await axios.get(`${baseURL}/users/about`, {
        headers: {
          Authorization: `Bearer ${data.authToken}`,
        },
      });

      setAuthState({
        token: data?.authToken,
        authenticated: true,
        user: user?.data,
        balance: user?.data?.balance,
      });

      return data;
    } catch (error) {
      return { error: true, msg: error.response.data.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("MINICASE_BNI_TOKEN");

    setAuthState({
      token: null,
      authenticated: null,
      user: null,
      balance: null,
    });
  };

  const updateProfile = async (dataUser) => {
    try {
      const { identityId, address, phoneNumber, dateOfBirth } = dataUser;

      const { data } = await axios.put(
        `${baseURL}/users/data`,
        {
          identityId,
          address,
          phoneNumber,
          dateOfBirth,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "MINICASE_BNI_TOKEN"
            )}`,
            "Content-Type": "application/json",
          },
        }
      );

      setAuthState({
        ...authState,
        user: data?.data,
      });

      return data;
    } catch (error) {
      return { error: true, msg: error.response.data.message };
    }
  };

  const topUpBalance = async (amount) => {
    try {
      const { data } = await axios.post(
        `${baseURL}/users/transaction/topup`,
        {
          amount: amount,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "MINICASE_BNI_TOKEN"
            )}`,
            "Content-Type": "application/json",
          },
        }
      );

      setAuthState({
        ...authState,
        balance: authState.balance + amount,
      });

      return data;
    } catch (error) {
      return { error: true, msg: error.response.data.message };
    }
  };

  const transactionWithinBni = async (dataTransaction) => {
    try {
      const { name, amount } = dataTransaction;

      const { data } = await axios.post(
        `${baseURL}/users/transaction/bni`,
        {
          name: name,
          amount: amount,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "MINICASE_BNI_TOKEN"
            )}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { data: balance } = await axios.get(`${baseURL}/users/about`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("MINICASE_BNI_TOKEN")}`,
        },
      });

      setAuthState({
        ...authState,
        balance: balance?.data?.balance,
      });

      return data;
    } catch (error) {
      return { error: true, msg: error.response.data.message };
    }
  };

  const transactionExternal = async (dataTransaction) => {
    try {
      const { name, amount } = dataTransaction;

      const { data } = await axios.post(
        `${baseURL}/users/transaction/others`,
        {
          name: name,
          amount: amount,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "MINICASE_BNI_TOKEN"
            )}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { data: balance } = await axios.get(`${baseURL}/users/about`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("MINICASE_BNI_TOKEN")}`,
        },
      });

      setAuthState({
        ...authState,
        balance: balance?.data?.balance,
      });

      return data;
    } catch (error) {
      return { error: true, msg: error.response.data.message };
    }
  };

  const value = {
    onLogin: login,
    onLogout: logout,
    onUpdateProfile: updateProfile,
    onTopUpBalance: topUpBalance,
    onTransactionInternal: transactionWithinBni,
    onTransactionExternal: transactionExternal,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
