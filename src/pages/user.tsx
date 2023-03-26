import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useGlobal } from "../hooks/useGlobal";
import { useUser } from "../hooks/useUser";

import Button from "../components/button";
import Input from "../components/input";
import Label from "../components/label";

export default function User() {
  const { openPanel, setOpenPanel } = useGlobal();
  const { users, currentUuid, create, update, eliminate } = useUser();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [birthdate, setBirthdate] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const [status, setStatus] = useState<string>("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (currentUuid !== "") {
      users
        .filter((item) => item.uuid === currentUuid)
        .map((item) => {
          setName(item.name);
          setEmail(item.email);
          setPhone(item.phone);
          setBirthdate(item.date_born);
          setCity(item.city_born);
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
          email,
          phone,
          date_born: birthdate,
          city_born: city,
          setErrors,
          setStatus,
        });
        return;
      }

      await create({
        name,
        email,
        phone,
        date_born: birthdate,
        city_born: city,
        setErrors,
        setStatus,
      });
    },
    [name, email, phone, birthdate, city, setStatus, setErrors]
  );

  return (
    <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10 sm:pb-8">
      <form onSubmit={submitForm} className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            REGISTRE UM USUARIO
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
              Email
            </Label>
            <Input
              type="email"
              name="email"
              id="email"
              required
              value={email ?? ""}
              handleOnChange={(value) => setEmail(value)}
              autoComplete="given-email"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="first-name" className="text-base sm:mt-px sm:pt-2">
              Telefone
            </Label>
            <Input
              type="text"
              name="phone"
              id="phone"
              required
              value={phone ?? ""}
              handleOnChange={(value) => setPhone(value)}
              autoComplete="tel"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="first-name" className="text-base sm:mt-px sm:pt-2">
              Aniversario
            </Label>
            <Input
              type="date"
              name="birthdate"
              id="birthdate"
              value={birthdate ?? ""}
              handleOnChange={(value) => setBirthdate(value)}
              autoComplete="bday"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="first-name" className="text-base sm:mt-px sm:pt-2">
              Cidade Natal
            </Label>
            <Input
              type="text"
              name="city"
              id="city"
              value={city ?? ""}
              handleOnChange={(value) => setCity(value)}
              autoComplete="given-city"
            />
          </div>
        </div>
        <Button>Enviar Formulário</Button>
      </form>
    </div>
  );
}
