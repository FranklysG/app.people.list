import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "../lib/axios";
import { CompanyType } from "../@types";

type CompanyProps = {
  company: CompanyType[];
  update: ({ setErrors, setStatus, ...props }: any) => void;
  create: ({ setErrors, setStatus, ...props }: any) => void;
  eliminate: ({ setErrors, setStatus, ...props }: any) => void;
  show: ({ setErrors, setStatus, ...props }: any) => void;
  currentUuid: string;
  setCurrentUuid: (data: string) => void;
};

type CompanyProviderProps = {
  children?: ReactNode;
};

export const Company = createContext({} as CompanyProps);

function CompanyProvider({ children }: CompanyProviderProps) {
  const [company, setCompany] = useState<CompanyType[]>();
  const [currentUuid, setCurrentUuid] = useState<string>("");

  const show = useCallback(async ({ setErrors, setStatus, ...props }: any) => {
    await axios
      .get(`/api/company?search=${props.search ?? ''}`)
      .then((res) => res.data.data)
      .then((data) => {
        setCompany(data);
      })
      .catch((error) => {});
  }, []);

  const update = useCallback(
    async ({ setErrors, setStatus, ...props }: any) => {
      setErrors([]);
      setStatus(null);

      await axios
        .put("/api/company", props)
        .then((response) => {
          setStatus(response.data.message);
          show("");
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
        .post("/api/company", props)
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
        .delete("/api/company", {
          data: props,
        })
        .then((response) => {
          setStatus(response.data.message);
          show("");
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
        .get("/api/company")
        .then((res) => res.data.data)
        .then((data) => {
          setCompany(data);
        })
        .catch((error) => {});
    })();
  }, []);

  const values = {
    company,
    update,
    create,
    eliminate,
    show,
    currentUuid,
    setCurrentUuid,
  };
  return <Company.Provider value={values}>{children}</Company.Provider>;
}

function useCompany() {
  const context = useContext(Company);
  if (context === undefined) {
    throw new Error("useCompany must be used within an CompanyProvider");
  }
  return context;
}

export { CompanyProvider, useCompany };
