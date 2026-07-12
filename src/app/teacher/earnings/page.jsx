"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaCheck,
  FaChevronLeft,
  FaCreditCard,
  FaDollarSign,
  FaEnvelope,
  FaMobileAlt,
  FaPaypal,
  FaPlus,
  FaTimes,
  FaUniversity,
  FaUser,
} from "react-icons/fa";

const paymentMethods = [
  {
    id: "paypal-primary",
    title: "PayPal account",
    account: "djgil****@gmail.com",
    processingTime: "Up to 1 business day",
    fee: "Fees may apply",
    icon: "paypal",
  },
  {
    id: "paypal-secondary",
    title: "PayPal account",
    account: "oves****@gmail.com",
    processingTime: "Up to 1 business day",
    fee: "Fees may apply",
    icon: "paypal-secondary",
  },
  {
    id: "bank-transfer",
    title: "Bank transfer",
    account: "FR76 **** **** 4589",
    processingTime: "Up to 3 business days",
    fee: "Fees may apply",
    icon: "bank",
  },
];

function PaymentMethodIcon({ type, size = 28 }) {
  if (type === "bank") {
    return (
      <FaUniversity
        size={size}
        className="text-slate-500"
      />
    );
  }

  if (type === "paypal-secondary") {
    return (
      <span className="relative flex h-8 w-8 items-center justify-center">
        <span className="absolute h-8 w-8 rounded-full border-2 border-[#00a6e8]" />
        <span className="absolute h-8 w-8 rotate-45 rounded-full border-2 border-[#ffb700]" />
      </span>
    );
  }

  return (
    <FaPaypal
      size={size}
      className="text-[#003087]"
    />
  );
}

export default function PaymentWithdrawPage() {
  const router = useRouter();

  const [selectedMethodId, setSelectedMethodId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const withdrawAmount = "€599";

  const selectedPaymentMethod = paymentMethods.find(
    (method) => method.id === selectedMethodId
  );

  const handleSelectMethod = (methodId) => {
    setSelectedMethodId(methodId);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleContinue = () => {
    if (!selectedMethodId) {
      setErrorMessage("Please select a payment option.");
      return;
    }

    setErrorMessage("");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmWithdraw = () => {
    if (!selectedPaymentMethod) {
      return;
    }

    console.log("Withdrawal information:", {
      paymentMethod: selectedPaymentMethod,
      amount: withdrawAmount,
    });

    setShowModal(false);
    setSuccessMessage(
      "Your withdrawal request has been submitted successfully."
    );
  };

  return (
    <>
      <main className="min-h-screen bg-[#edf1f7] p-1.5">
        <section className="mx-auto min-h-[calc(100vh-12px)] w-full rounded-[8px] bg-white px-3 py-3 shadow-sm sm:px-5 sm:py-4">
          {/* Header */}
          <header className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-[#e8eef7] text-[#16458f] transition hover:bg-[#dce5f2]"
              aria-label="Go back"
            >
              <FaChevronLeft size={12} />
            </button>

            <h1 className="text-[17px] font-extrabold text-[#16458f]">
              Payment Withdraw
            </h1>
          </header>

          {/* Main background */}
          <section className="mt-5 flex min-h-[420px] items-start justify-center rounded-[9px] bg-[#e8eef7] px-3 py-8 sm:px-6 sm:py-10">
            {/* Withdraw card */}
            <div className="w-full max-w-[860px] rounded-xl bg-white px-4 py-5 sm:px-6 sm:py-6">
              <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
                {/* Left content */}
                <div className="w-full lg:max-w-[470px]">
                  {/* Mobile heading */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between lg:hidden">
                    <div>
                      <h2 className="text-[15px] font-extrabold text-[#16458f]">
                        Withdraw balance
                      </h2>

                      <p className="mt-4 text-[11px] text-slate-500">
                        Available for withdraw
                      </p>

                      <p className="mt-1 text-xl font-extrabold text-[#16458f]">
                        {withdrawAmount}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="inline-flex h-10 w-fit items-center justify-center gap-2 rounded-lg bg-[#e2233d] px-4 text-[11px] font-bold text-white transition hover:bg-[#c91f35]"
                    >
                      <FaPlus size={10} />
                      Add new payment method
                    </button>
                  </div>

                  {/* Desktop heading */}
                  <div className="hidden lg:block">
                    <h2 className="text-[15px] font-extrabold text-[#16458f]">
                      Withdraw balance
                    </h2>

                    <p className="mt-4 text-[11px] text-slate-500">
                      Available for withdraw
                    </p>

                    <p className="mt-1 text-xl font-extrabold text-[#16458f]">
                      {withdrawAmount}
                    </p>
                  </div>

                  <p className="mt-5 text-[11px] font-medium text-slate-500">
                    Select Payment Option
                  </p>

                  {/* Payment methods */}
                  <div className="mt-3 space-y-3">
                    {paymentMethods.map((method) => {
                      const isSelected =
                        selectedMethodId === method.id;

                      return (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() =>
                            handleSelectMethod(method.id)
                          }
                          className={`flex w-full items-start gap-3 rounded-[9px] border px-3 py-3 text-left transition ${
                            isSelected
                              ? "border-[#16458f] bg-blue-50 shadow-sm"
                              : "border-[#b9c9e1] bg-[#f5f8fc] hover:border-[#16458f]"
                          }`}
                        >
                          {/* Checkbox */}
                          <span
                            className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border ${
                              isSelected
                                ? "border-[#16458f] bg-[#16458f] text-white"
                                : "border-[#3e72be] bg-white"
                            }`}
                          >
                            {isSelected && <FaCheck size={8} />}
                          </span>

                          {/* Payment icon */}
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center">
                            <PaymentMethodIcon
                              type={method.icon}
                            />
                          </span>

                          {/* Payment information */}
                          <span className="min-w-0 flex-1">
                            <span className="block text-[11px] font-bold text-slate-700">
                              {method.title}
                            </span>

                            <span className="mt-2 block text-[10px] leading-5 text-slate-500">
                              • {method.processingTime}
                            </span>

                            <span className="block text-[10px] leading-5 text-slate-500">
                              • {method.fee}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Error */}
                  {errorMessage && (
                    <p className="mt-2 text-[11px] font-semibold text-red-600">
                      {errorMessage}
                    </p>
                  )}

                  {/* Success */}
                  {successMessage && (
                    <div className="mt-3 flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-[10px] font-semibold text-green-700">
                      <FaCheck
                        size={10}
                        className="mt-0.5 shrink-0"
                      />

                      <span>{successMessage}</span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-4 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => router.back()}
                      className="inline-flex h-8 min-w-[85px] items-center justify-center rounded-[6px] border border-[#e2233d] bg-white px-4 text-[10px] font-bold text-[#e2233d] transition hover:bg-red-50"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={handleContinue}
                      className="inline-flex h-8 min-w-[85px] items-center justify-center rounded-[6px] bg-[#20bd45] px-4 text-[10px] font-bold text-white transition hover:bg-[#18a83a]"
                    >
                      Continue
                    </button>
                  </div>
                </div>

                {/* Right illustration */}
                <div className="relative hidden min-h-[330px] flex-1 items-center justify-center lg:flex">
                  <button
                    type="button"
                    className="absolute right-0 top-0 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#e2233d] px-4 text-[11px] font-bold text-white transition hover:bg-[#c91f35]"
                  >
                    <FaPlus size={10} />
                    Add new payment method
                  </button>

                  <div className="relative mt-16 flex h-[245px] w-[315px] items-end justify-center">
                    {/* Person illustration */}
                    <div className="absolute bottom-4 left-0">
                      <div className="relative h-[145px] w-[115px]">
                        <FaUser className="absolute left-7 top-0 text-[35px] text-[#25263a]" />

                        <div className="absolute bottom-0 left-2 h-[105px] w-[70px] skew-x-[-8deg] rounded-t-[40px] bg-[#f7c1be]" />

                        <div className="absolute bottom-0 left-8 h-[90px] w-[55px] rounded-t-[35px] bg-slate-100" />

                        <div className="absolute bottom-5 left-14 flex h-[76px] w-[100px] rotate-[-18deg] items-center justify-center rounded-[10px] bg-[#16458f] text-white shadow-md">
                          <FaCreditCard size={42} />
                        </div>
                      </div>
                    </div>

                    {/* Mobile illustration */}
                    <div className="absolute bottom-4 right-0 flex h-[230px] w-[120px] flex-col items-center rounded-[24px] border-[6px] border-[#171722] bg-white px-2 py-4">
                      <div className="absolute -top-1 h-3 w-14 rounded-b-xl bg-[#171722]" />

                      <div className="mt-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#16458f] text-white">
                        <FaDollarSign size={22} />
                      </div>

                      <div className="mt-3 w-full space-y-2">
                        <div className="flex h-4 items-center gap-1 rounded border border-slate-200 px-1">
                          <span className="h-2 w-2 rounded-full bg-[#16458f]" />
                          <span className="h-1 w-11 rounded bg-[#16458f]" />
                        </div>

                        {[1, 2, 3, 4].map((item) => (
                          <div
                            key={item}
                            className="flex h-5 items-center gap-1 rounded border border-slate-200 px-1"
                          >
                            <span className="h-2 w-2 rounded-full bg-slate-200" />
                            <span className="h-1 flex-1 rounded bg-slate-200" />
                          </div>
                        ))}
                      </div>

                      <FaMobileAlt className="mt-auto text-slate-200" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </main>

      {/* Confirmation modal */}
      {showModal && selectedPaymentMethod && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6"
          onMouseDown={handleCloseModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="withdraw-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
            className="w-full max-w-[390px] rounded-xl bg-white p-5 shadow-2xl"
          >
            {/* Modal header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="withdraw-modal-title"
                  className="text-[17px] font-extrabold text-[#16458f]"
                >
                  Withdraw balance
                </h2>

                <p className="mt-1 text-[10px] text-slate-500">
                  Please review your withdrawal details
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-800 transition hover:bg-slate-100"
                aria-label="Close modal"
              >
                <FaTimes size={15} />
              </button>
            </div>

            {/* Withdrawal details */}
            <div className="mt-5 overflow-hidden rounded-[9px] border border-slate-200">
              <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-3 py-3">
                <span className="text-[10px] text-slate-600">
                  Transfer to
                </span>

                <span className="flex items-center gap-2 text-[10px] font-semibold text-slate-700">
                  <PaymentMethodIcon
                    type={selectedPaymentMethod.icon}
                    size={17}
                  />

                  {selectedPaymentMethod.title}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-3 py-3">
                <span className="text-[10px] text-slate-600">
                  Transfer to
                </span>

                <span className="flex items-center gap-2 text-[10px] font-semibold text-slate-700">
                  <FaEnvelope
                    size={11}
                    className="text-slate-400"
                  />

                  {selectedPaymentMethod.account}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 px-3 py-3">
                <span className="text-[10px] text-slate-600">
                  Amount
                </span>

                <span className="text-[11px] font-extrabold text-slate-700">
                  {withdrawAmount}
                </span>
              </div>
            </div>

            {/* Modal buttons */}
            <div className="mt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseModal}
                className="inline-flex h-8 min-w-[82px] items-center justify-center rounded-[6px] border border-[#e2233d] bg-white px-3 text-[9px] font-bold text-[#e2233d] transition hover:bg-red-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmWithdraw}
                className="inline-flex h-8 min-w-[120px] items-center justify-center rounded-[6px] bg-[#20bd45] px-3 text-[9px] font-bold text-white transition hover:bg-[#18a83a]"
              >
                Confirm &amp; Withdraw
              </button>
            </div>

            {/* Information note */}
            <p className="mt-6 text-[9px] font-medium leading-[14px] text-slate-600">
              <strong>Please note:</strong> Withdrawals are limited to €500
              per transaction and cannot be reversed once submitted.
              Transfers may take up to 7 business days to process, and
              additional fees may be charged by your bank or payment
              provider.
            </p>
          </div>
        </div>
      )}
    </>
  );
}