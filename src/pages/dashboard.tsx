import { useState } from "react";
import { CheckCircleIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { PlusIcon } from "@heroicons/react/24/outline";

import moment from "moment";

import App from "../layouts/app";
import Navbar from "../layouts/navbar";

import { useGlobal } from "../hooks/useGlobal";
import { useUser } from "../hooks/useUser";
import { useCompany } from "../hooks/useCompany";

import Panel from "../components/panel";

import User from "./user";
import Company from "./company";

import { classNames, generateGreetings } from "../utils";
import Select from "../components/select";
import ViewTableUsers from "../partials/ViewTableUsers";
import ViewTableCompanys from "../partials/ViewTableCompanys";

const avatar =
  "https://images.unsplash.com/photo-1636622433525-127afdf3662d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

const forms = [];

export default function Dashboard() {
  const { openPanel, setOpenPanel } = useGlobal();
  const { setCurrentUuid: setCurrentUuidUser } = useUser();
  const { setCurrentUuid: setCurrentUuidCompany } = useCompany();

  const [hour, setHour] = useState(moment().format("HH"));
  const [viewTable, setViewTable] = useState<string>("peoples");
  const [isCompany, setIsCompany] = useState<boolean>(false);

  return (
    <App header={"Dashboard"}>
      <Navbar />
      <Panel>{isCompany ? <User /> : <Company />}</Panel>
      <section className="flex-1 pb-8">
        {/* Page header */}
        <div className="bg-white shadow">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
              <div className="min-w-0 flex-1">
                {/* Profile */}
                <div className="flex items-center">
                  <picture>
                    <source srcSet={`${avatar}`} type="image/webp" />
                    <img
                      width="4rem"
                      height="4rem"
                      className="hidden h-16 w-16 rounded-full sm:block"
                      src={`${avatar}`}
                      alt="avatar"
                    />
                  </picture>

                  <div>
                    <div className="flex items-center">
                      <picture>
                        <source srcSet={`${avatar}`} type="image/webp" />
                        <img
                          width="4rem"
                          height="4rem"
                          className="h-16 w-16 rounded-full sm:hidden"
                          src={`${avatar}`}
                          alt="avatar"
                        />
                      </picture>

                      <h1 className="-mt-4 sm:-mt-0 ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                        {generateGreetings(hour)}, Sr. Jhon Doe
                      </h1>
                    </div>
                    <dl className="flex flex-col ml-16 -mt-9 sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                      <dt className="sr-only">Empresa</dt>
                      <dt className="sr-only">Status da Conta</dt>
                      <dd className="mt-3 flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                        <CheckCircleIcon
                          className={classNames(
                            true ? "text-green-400" : "text-red-400",
                            "mr-1.5 h-5 w-5 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                        Conta {true ? "Verificada" : "Não Verificada"}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="min-w-0 flex-1 mt-5 md:mt-0">
                {/* Button Plus */}
                <div className="hidden md:flex gap-3 justify-center md:justify-end ">
                  <Select
                    defaultValue={"peoples"}
                    handleOnChange={(e) => setViewTable(e.target.value)}
                  >
                    <option key={"peoples"} value={"peoples"}>
                      Pessoas
                    </option>
                    <option key={"companies"} value={"companies"}>
                      Companias
                    </option>
                  </Select>
                  <button
                    type="button"
                    className="flex items-center justify-center rounded-full bg-pink-600 p-2 text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                    onClick={() => {
                      setCurrentUuidUser("");
                      setIsCompany(true);
                      setOpenPanel(!openPanel);
                    }}
                  >
                    <span className="mr-2">Adicionar Pessoa</span>
                    <PlusIcon className="h-6 w-6" aria-hidden="true" />
                    <span className="sr-only">Adicionar Pessoa</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center rounded-full bg-pink-600 p-2 text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                    onClick={() => {
                      setCurrentUuidCompany("");
                      setIsCompany(false);
                      setOpenPanel(!openPanel);
                    }}
                  >
                    <span className="mr-2">Adicionar Compania</span>
                    <PlusIcon className="h-6 w-6" aria-hidden="true" />
                    <span className="sr-only">Adicionar Compania</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="shadow sm:hidden px-4 flex justify-center">
            <h4 className="py-4 text-gray-400 text-center">Desculpe, mas por enquanto não temos viasualização mobile</h4>
          </div>

          {/* Activity table (small breakpoint and up) */}
          <div className="hidden sm:block">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="mt-2 flex flex-col">
                {viewTable === "peoples" ? (
                  <ViewTableUsers />
                ) : (
                  <ViewTableCompanys />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </App>
  );
}
