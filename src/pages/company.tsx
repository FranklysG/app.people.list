import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useGlobal } from "../hooks/useGlobal";

import Button from "../components/button";
import Input from "../components/input";
import Label from "../components/label";
import { useCompany } from "../hooks/useCompany";

export default function Company() {
  const { openPanel, setOpenPanel } = useGlobal();
  const { company, currentUuid, create, update } = useCompany();

  const [name, setName] = useState<string>("");
  const [doc, setDoc] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const [status, setStatus] = useState<string>("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (currentUuid !== "") {
      company
        .filter((item) => item.uuid === currentUuid)
        .map((item) => {
          setName(item.name);
          setDoc(item.doc);
          setAddress(item.address);
        });
    }
  }, [currentUuid]);

  useEffect(() => {
    errors.length > 0 && errors.map((error) => toast.error(error));
  }, [errors]);

  useEffect(() => {
    status && toast.success(status);
  }, [status]);

  const submitForm = useCallback(
    async (event: any) => {
      event.preventDefault();
      setOpenPanel(!openPanel);

      if (currentUuid !== "") {
        await update({
          uuid: currentUuid,
          name,
          doc,
          address,
          setErrors,
          setStatus,
        });
        return;
      }

      await create({
        name,
        doc,
        address,
        setErrors,
        setStatus,
      });
    },
    [name, doc, address, setStatus, setErrors]
  );

  return (
    <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10 sm:pb-8">
      <form onSubmit={submitForm} className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            REGISTRE UMA COMPANIA
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            NÃO SE PREOCUPE SEUS DADOS ESTÃO SEGUROS
          </p>
        </div>
        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="first-name" className="text-base sm:mt-px sm:pt-2">
              Nome
            </Label>
            <Input
              data-cy="input-company-name"
              type="text"
              name="name"
              id="name"
              required
              value={name ?? ""}
              handleOnChange={(value) => setName(value)}
              autoComplete="given-name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="first-name" className="text-base sm:mt-px sm:pt-2">
              CPNJ
            </Label>
            <Input
              data-cy="input-company-doc"
              type="text"
              name="doc"
              id="doc"
              required
              value={doc ?? ""}
              handleOnChange={(value) => setDoc(value)}
              autoComplete="given-doc"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="first-name" className="text-base sm:mt-px sm:pt-2">
              Endereço
            </Label>
            <Input
              data-cy="input-company-address"
              type="text"
              name="address"
              id="address"
              value={address ?? ""}
              handleOnChange={(value) => setAddress(value)}
              autoComplete="tel"
            />
          </div>
        </div>
        <Button id="button-company-confirm-form">Enviar Formulário</Button>
      </form>
    </div>
  );
}
