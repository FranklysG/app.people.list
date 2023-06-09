import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "../lib/axios";
import useMount from "../utils/useMount";
import { UserType } from "../@types";

type UserProps = {
  users: UserType[];
  update: ({ setErrors, setStatus, ...props }: any) => void;
  create: ({ setErrors, setStatus, ...props }: any) => void;
  eliminate: ({ setErrors, setStatus, ...props }: any) => void;
  show: ({ setErrors, setStatus, ...props }: any) => void;
  currentUuid: string;
  setCurrentUuid: (data: string) => void;
};

type UserProviderProps = {
  children?: ReactNode;
};

export const User = createContext({} as UserProps);

function UserProvider({ children }: UserProviderProps) {
  const [users, setUsers] = useState<UserType[]>();
  const [currentUuid, setCurrentUuid] = useState<string>("");

  const show = useCallback(async ({ setErrors, setStatus, ...props }: any) => {
    await axios
      .get(`/api/users?search=${props.search ?? ''}`)
      .then((res) => res.data.data)
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {});
  }, []);

  const update = useCallback(
    async ({ setErrors, setStatus, ...props }: any) => {
      setErrors([]);
      setStatus(null);

      await axios
        .put("/api/users", props)

        .then((response) => {
          setStatus(response.data.message);
          show('');
        })

        .catch((error) => {
          if (error.response.status !== 422) {
            console.log(error);
            return;
          }
        });
    },
    []
  );

  const create = useCallback(
    async ({ setErrors, setStatus, ...props }: any) => {
      setErrors([]);
      setStatus(null);
      
      await axios
        .post("/api/users", props)
        .then((response) => {
          setStatus(response.data.message);
          show("");
        })
        .catch((error) => {
          setErrors(["Tente novamente mais tarde :)"]);
          if (error.response?.status !== 422) {
            console.log(error);
            return;
          }
          setErrors(Object.values(error.response.data.errors).flat());
        });
    },
    []
  );

  const eliminate = useCallback(
    async ({ setErrors, setStatus, ...props }: any) => {
      setErrors([]);
      setStatus(null);

      await axios
        .delete("/api/users", {
          data: props,
        })
        .then((response) => {
          setStatus(response.data.message);
          show('');
        })
        .catch((error) => {
          setErrors("Esse usuario tem companias relacionadas");
          if (error.response.status !== 422) {
            console.log(error);
            return;
          }
          setErrors(Object.values(error.response.data.errors).flat());
        });
    },
    []
  );

  useEffect(() => {
    (async () => {
      await axios
        .get("/api/users")
        .then((res) => res.data.data)
        .then((data) => {
          setUsers(data);
        })
        .catch((error) => {});
    })();
  }, []);

  const values = {
    users,
    update,
    create,
    eliminate,
    show,
    currentUuid,
    setCurrentUuid,
  };
  return <User.Provider value={values}>{children}</User.Provider>;
}

function useUser() {
  const context = useContext(User);
  if (context === undefined) {
    throw new Error("useUser must be used within an UserProvider");
  }
  return context;
}

export { UserProvider, useUser };
