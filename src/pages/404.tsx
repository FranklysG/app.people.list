import React from "react";
import Link from "next/link";
import Logo from "../assets/svg/Logo";
import Guest from "../layouts/guest";

export default function NotFoudPage() {
  return (
    <Guest>
      <main className="flex-grow flex flex-col bg-white">
        <div className="flex-grow mx-auto max-w-7xl w-full flex flex-col px-4 sm:px-6 lg:px-8">
          <div className="flex-shrink-0 my-auto py-16 sm:py-32">
            <p className="text-sm font-semibold text-pink-600 uppercase tracking-wide">
              404 Oops!
            </p>
            <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
              Não entendi {":)"}
            </h1>
            <p className="mt-2 text-base text-gray-500">
              Tente voltar para o a pagina inicial
            </p>
            <div className="mt-6">
              <Link href="/">
                <a className="text-base font-medium text-pink-600 hover:text-pink-500">
                  Voltar para a dashboard<span aria-hidden="true"> &rarr;</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex-shrink-0 bg-gray-50">
        <div className="mx-auto max-w-7xl w-full px-4 py-16 sm:px-6 lg:px-8">
          <nav className="flex space-x-4">
            <a
              href="#"
              className="text-sm font-medium text-gray-500 hover:text-gray-600"
            >
              Entre em contado com o suporte
            </a>
            <span
              className="inline-block border-l border-gray-300"
              aria-hidden="true"
            ></span>
            <a
              href="#"
              className="text-sm font-medium text-gray-500 hover:text-gray-600"
            >
              Nossa ouvidoria
            </a>
          </nav>
        </div>
      </footer>
    </Guest>
  );
}
