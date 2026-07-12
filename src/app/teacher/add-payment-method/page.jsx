"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaCcMastercard,
  FaCheck,
  FaChevronLeft,
  FaPaypal,
  FaRegCircle,
  FaUniversity,
} from "react-icons/fa";

const paymentMethods = [
  {
    id: "bank",
    title: "Bank Account",
  },
  {
    id: "payoneer",
    title: "Payoneer account",
  },
  {
    id: "paypal",
    title: "PayPal account",
  },
];

const inputClass =
  "h-9 w-full rounded-[6px] border border-transparent bg-white px-3 text-[10px] font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#16458f] focus:ring-2 focus:ring-blue-100";

const labelClass =
  "mb-1.5 block text-[9px] font-semibold text-slate-600";

function PaymentLogo({ type }) {
  if (type === "bank") {
    return <FaUniversity size={18} className="text-slate-400" />;
  }

  if (type === "paypal") {
    return <FaPaypal size={20} className="text-[#003087]" />;
  }

  return (
    <span className="relative flex h-6 w-6 items-center justify-center">
      <FaRegCircle
        size={23}
        className="absolute text-[#00a8e8]"
      />

      <FaRegCircle
        size={21}
        className="absolute translate-x-[2px] text-[#ff9f1c]"
      />
    </span>
  );
}

function PaymentMethodCard({
  method,
  selectedMethod,
  onSelect,
}) {
  const isSelected = selectedMethod === method.id;

  return (
    <button
      type="button"
      onClick={() => onSelect(method.id)}
      aria-pressed={isSelected}
      className={`flex h-[44px] min-w-0 items-center gap-2 rounded-[7px] border px-3 text-left transition ${
        isSelected
          ? "border-[#16458f] bg-blue-50"
          : "border-[#b9c9e1] bg-[#f7f9fc] hover:border-[#16458f]"
      }`}
    >
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border ${
          isSelected
            ? "border-[#22b844] bg-[#22b844] text-white"
            : "border-[#4e7fc2] bg-white"
        }`}
      >
        {isSelected && <FaCheck size={8} />}
      </span>

      <PaymentLogo type={method.id} />

      <span className="truncate text-[9px] font-semibold text-slate-700">
        {method.title}
      </span>
    </button>
  );
}

function BankAccountForm() {
  const [formData, setFormData] = useState({
    cardHolder: "",
    cardNumber: "",
    month: "",
    year: "",
    location: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Bank account information:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 rounded-[8px] bg-[#e8eef7] p-4"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-[11px] font-extrabold text-slate-800">
          Bank Account Information
        </h3>

        <FaCcMastercard
          size={24}
          className="shrink-0 text-[#e2233d]"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label
            htmlFor="cardHolder"
            className={labelClass}
          >
            Card holder
          </label>

          <input
            id="cardHolder"
            name="cardHolder"
            type="text"
            value={formData.cardHolder}
            onChange={handleChange}
            placeholder="Card holder"
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="cardNumber"
            className={labelClass}
          >
            Card number
          </label>

          <input
            id="cardNumber"
            name="cardNumber"
            type="text"
            inputMode="numeric"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="Card number"
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="month"
            className={labelClass}
          >
            Month
          </label>

          <input
            id="month"
            name="month"
            type="text"
            value={formData.month}
            onChange={handleChange}
            placeholder="March"
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="year"
            className={labelClass}
          >
            Month
          </label>

          <input
            id="year"
            name="year"
            type="text"
            inputMode="numeric"
            value={formData.year}
            onChange={handleChange}
            placeholder="2025"
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="location"
            className={labelClass}
          >
            Location
          </label>

          <input
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            placeholder="Dhaka"
            className={inputClass}
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 inline-flex h-7 min-w-[86px] items-center justify-center rounded-[5px] bg-[#e2233d] px-4 text-[9px] font-bold text-white transition hover:bg-[#c91f35]"
      >
        Submit
      </button>
    </form>
  );
}

function PayoneerForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Payoneer information:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 rounded-[8px] bg-[#e8eef7] p-4"
    >
      <div className="flex items-center gap-1.5">
        <PaymentLogo type="payoneer" />

        <h3 className="text-[18px] font-semibold text-slate-900">
          Payoneer
        </h3>
      </div>

      <p className="mt-2 text-[9px] leading-4 text-slate-500">
        Sign in to connect PermisGo to your Payoneer account
      </p>

      <div className="mt-5 space-y-4">
        <div>
          <label
            htmlFor="payoneerUsername"
            className={labelClass}
          >
            Enter Username
          </label>

          <input
            id="payoneerUsername"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="Write here"
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="payoneerPassword"
            className={labelClass}
          >
            Password
          </label>

          <input
            id="payoneerPassword"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Write here"
            className={inputClass}
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-5 inline-flex h-7 min-w-[86px] items-center justify-center rounded-[5px] bg-[#e2233d] px-4 text-[9px] font-bold text-white transition hover:bg-[#c91f35]"
      >
        Sign In
      </button>
    </form>
  );
}

function PayPalForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("PayPal email:", email);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 rounded-[8px] bg-[#e8eef7] p-4"
    >
      <div className="flex items-center gap-1.5 text-[#003087]">
        <FaPaypal size={22} />

        <h3 className="text-[17px] font-extrabold italic">
          PayPal
        </h3>
      </div>

      <p className="mt-2 text-[9px] leading-4 text-slate-500">
        Sign in to connect PermisGo to your PayPal account
      </p>

      <div className="mt-5">
        <label
          htmlFor="paypalEmail"
          className={labelClass}
        >
          Enter Email
        </label>

        <input
          id="paypalEmail"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Write here"
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        className="mt-5 inline-flex h-7 min-w-[86px] items-center justify-center rounded-[5px] bg-[#e2233d] px-4 text-[9px] font-bold text-white transition hover:bg-[#c91f35]"
      >
        Continue
      </button>
    </form>
  );
}

export default function AddPaymentMethodPage() {
  const router = useRouter();

  const [selectedMethod, setSelectedMethod] = useState("");

  const handleSelectMethod = (methodId) => {
    setSelectedMethod(methodId);
  };

  return (
    <main className="min-h-screen bg-[#edf1f7] p-1">
      <section className="min-h-[calc(100vh-8px)] rounded-[7px] bg-white px-3 py-3 sm:px-4">
        <header className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[7px] bg-[#e8eef7] text-[#16458f] transition hover:bg-[#dce5f2]"
            aria-label="Go back"
          >
            <FaChevronLeft size={11} />
          </button>

          <h1 className="text-[14px] font-extrabold text-[#16458f]">
            Payment Withdraw
          </h1>
        </header>

        <section className="mt-5 min-h-[310px] rounded-[7px] bg-[#e8eef7] px-3 py-7 sm:min-h-[315px] sm:px-8">
          <div className="mx-auto w-full max-w-[760px] rounded-[8px] bg-white p-4">
            <div>
              <h2 className="text-[12px] font-extrabold text-[#16458f]">
                Add Payment method
              </h2>

              <p className="mt-1 text-[8px] font-medium text-slate-500">
                Add your preferred payment method
              </p>
            </div>

            <div className="mt-4 overflow-x-auto">
              <div className="grid min-w-[450px] grid-cols-3 gap-2">
                {paymentMethods.map((method) => (
                  <PaymentMethodCard
                    key={method.id}
                    method={method}
                    selectedMethod={selectedMethod}
                    onSelect={handleSelectMethod}
                  />
                ))}
              </div>
            </div>

            {selectedMethod === "bank" && (
              <BankAccountForm />
            )}

            {selectedMethod === "payoneer" && (
              <PayoneerForm />
            )}

            {selectedMethod === "paypal" && (
              <PayPalForm />
            )}
          </div>
        </section>
      </section>
    </main>
  );
}