import {
  ArrowTrendingUpIcon,
  CheckBadgeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useCallback, useEffect, useState } from "react";
import { MagnifyingGlass, TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import Modal from "../../components/modal";
import { useGlobal } from "../../hooks/useGlobal";
import { useUser } from "../../hooks/useUser";

const lines = ["", "", "", "", "", ""];

export default function ViewTableUsers() {
  const { openPanel, setOpenPanel } = useGlobal();
  const { users, show, eliminate, setCurrentUuid, currentUuid } = useUser();
  const [load, setLoad] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const [status, setStatus] = useState<string>("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    errors.length > 0 && errors.map((error) => toast.error(error));
  }, [errors]);

  useEffect(() => {
    status && toast.success(status);
  }, [status]);

  const handleUserDelete = useCallback(async (uuid: string) => {
    setLoad(true);
    await eliminate({
      uuid,
      setErrors,
      setStatus,
    });

    setLoad(false);
  }, []);

  useEffect(() => {
    (async () => {
      await show({
        search,
        setErrors,
        setStatus,
      });
    })();
  }, [search]);

  return (
    <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
      <div className="flex flex-1">
        <form className="px-3 flex w-full ml-2 md:ml-0" action="#" method="GET">
          <div className="relative w-full text-gray-400 focus-within:text-gray-600">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 flex items-center"
              aria-hidden="true"
            >
              <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            <input
              id="search-field"
              name="search-field"
              className="block h-full w-full border-transparent py-4 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
              placeholder="Busque por qualquer campos existente na tabela"
              type="search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </form>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th
              className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
              scope="col"
            >
              Nome
            </th>
            <th
              className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
              scope="col"
            >
              Email
            </th>
            <th
              className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
              scope="col"
            >
              Telefone
            </th>
            <th
              className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
              scope="col"
            >
              Cidade Natal
            </th>
            <th
              className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
              scope="col"
            >
              Aniversário
            </th>
            <th
              className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
              scope="col"
            ></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {users?.length
            ? users?.map((item) => (
                <tr key={item.uuid} className="bg-white">
                  <td className="max-w-lg whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    <div className="flex">
                      <a
                        href={`api/generate/${item.uuid}`}
                        className="group inline-flex space-x-2 truncate text-sm"
                      >
                        <ArrowTrendingUpIcon
                          className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        <p className="truncate text-gray-500 group-hover:text-gray-900">
                          {item.name}
                        </p>
                      </a>
                    </div>
                  </td>
                  <td className="max-w-lg whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    <p className="truncate text-gray-500 group-hover:text-gray-900">
                      {item.email}
                    </p>
                  </td>
                  <td className="max-w-lg whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    <p className="truncate text-gray-500 group-hover:text-gray-900">
                      {item.phone}
                    </p>
                  </td>
                  <td className="max-w-lg whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    <p className="truncate text-gray-500 group-hover:text-gray-900">
                      {item.city_born}
                    </p>
                  </td>
                  <td className="max-w-lg whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    <time dateTime={item.date_born}>{item.date_born}</time>
                  </td>
                  <td className="flex gap-2 items-center whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <button
                      onClick={() => {
                        setCurrentUuid(item.uuid);
                        setOpenPanel(!openPanel);
                      }}
                      className="text-pink-600 hover:text-pink-900"
                    >
                      Editar
                    </button>
                    <span> / </span>
                    {item.uuid === currentUuid ? (
                      load ? (
                        <TailSpin color="#be185d" height={20} width={15} />
                      ) : (
                        <button
                          onClick={() => {
                            setCurrentUuid(item.uuid);
                            handleUserDelete(item.uuid);
                          }}
                          className="text-pink-600 hover:text-pink-900"
                        >
                          Deletar
                        </button>
                      )
                    ) : (
                      <button
                        onClick={() => {
                          setCurrentUuid(item.uuid);
                          handleUserDelete(item.uuid);
                        }}
                        className="text-pink-600 hover:text-pink-900"
                      >
                        Deletar
                      </button>
                    )}
                  </td>
                </tr>
              ))
            : lines.map((line, index) => (
                <tr key={index} className="bg-white">
                  <td className="w-full max-w-0 whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    <div className="flex">
                      <a
                        href={`#`}
                        className="group inline-flex space-x-2 truncate text-sm"
                      >
                        <ArrowTrendingUpIcon
                          className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        <p className="animate-pulse truncate bg-gray-200 w-72 rounded-lg group-hover:text-gray-900"></p>
                      </a>
                    </div>
                  </td>
                  <td className="w-full max-w-lg whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    <p className="animate-pulse truncate bg-gray-200 w-10 rounded-lg group-hover:text-gray-900">
                      ‎
                    </p>
                  </td>
                  <td className="hidden whitespace-nowrap px-6 py-4 text-sm text-gray-500 md:block">
                    <p className="animate-pulse truncate bg-gray-200 w-10 rounded-lg group-hover:text-gray-900">
                      ‎
                    </p>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                    <p className="animate-pulse truncate bg-gray-200 w-10 rounded-lg group-hover:text-gray-900">
                      ‎
                    </p>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
      {/* Pagination */}
      <nav
        className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
        aria-label="Pagination"
      >
        <div className="hidden sm:block">
          <p className="text-sm text-gray-700">
            Encontrados <span className="font-medium">1</span> a{" "}
            <span className="font-medium">10</span> de{" "}
            <span className="font-medium">20</span> resultados
          </p>
        </div>
        <div className="flex flex-1 justify-between sm:justify-end">
          <a
            href="#"
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Anterior
          </a>
          <a
            href="#"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Próximo
          </a>
        </div>
      </nav>
    </div>
  );
}
