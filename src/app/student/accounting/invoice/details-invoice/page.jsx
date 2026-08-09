"use client";

import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";

export default function Page() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f6f7fb] px-3 py-4 text-[#111827] sm:px-5 sm:py-6">
      <div className="mx-auto w-full max-w-[1440px]">
        {/* HEADER */}
        <header className="mb-4 flex items-center justify-between gap-3 sm:mb-5">
          <div className="flex items-center gap-3">
            <Link
              href="/student/accounting/invoice"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/5 bg-white"
            >
              <IoChevronBack />
            </Link>

            <h1 className="text-[18px] font-medium tracking-tight">Invoice</h1>
          </div>

          <button className="shrink-0 rounded-full bg-[#e11d48] px-4 py-2 text-[12px] font-medium text-white hover:opacity-90">
            Download
          </button>
        </header>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
          {/* LEFT SIDE */}
          <div className="space-y-4 lg:col-span-2 lg:space-y-5">
            {/* INVOICE TABLE */}
            <div className="rounded-2xl border border-black/5 bg-white p-4 sm:p-5">
              <table className="hidden w-full text-[12.5px] sm:table">
                <thead className="text-[#6b7280]">
                  <tr className="border-b border-black/5">
                    <th className="text-left py-2 font-medium">Article</th>
                    <th className="text-center font-medium">Qty</th>
                    <th className="text-center font-medium">Unit Price</th>
                    <th className="text-right font-medium">Total</th>
                  </tr>
                </thead>

                <tbody className="text-[#111827]">
                  <tr className="border-b border-black/5">
                    <td className="py-3 font-medium">
                      Premium Driving Licence + 20 Lessons
                    </td>
                    <td className="text-center">1</td>
                    <td className="text-center">$1,149.00</td>
                    <td className="text-right">$1,149.00</td>
                  </tr>

                  <tr>
                    <td colSpan="3" className="py-2 text-right text-[#6b7280]">
                      Subtotal
                    </td>
                    <td className="text-right font-medium">$1,149.00</td>
                  </tr>

                  <tr>
                    <td colSpan="3" className="py-1 text-right text-[#6b7280]">
                      Discount
                    </td>
                    <td className="text-right text-red-500">-$250.00</td>
                  </tr>

                  <tr>
                    <td colSpan="3" className="py-1 text-right text-[#6b7280]">
                      Paid
                    </td>
                    <td className="text-right">$0.00</td>
                  </tr>

                  <tr className="border-t border-black/5">
                    <td colSpan="3" className="py-3 text-right font-medium">
                      Pay
                    </td>
                    <td className="text-right font-semibold">$899.00</td>
                  </tr>
                </tbody>
              </table>

              <div className="sm:hidden">
                <div className="border-b border-black/5 pb-4">
                  <p className="text-[11px] font-medium uppercase tracking-wide text-[#6b7280]">
                    Article
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-5">
                    Premium Driving Licence + 20 Lessons
                  </p>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <p className="text-[#6b7280]">Qty</p>
                      <p className="mt-1 font-medium">1</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[#6b7280]">Unit price</p>
                      <p className="mt-1 font-medium">$1,149.00</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#6b7280]">Total</p>
                      <p className="mt-1 font-semibold">$1,149.00</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-4 text-[13px]">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[#6b7280]">Subtotal</span>
                    <span className="font-medium">$1,149.00</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[#6b7280]">Discount</span>
                    <span className="font-medium text-red-500">-$250.00</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[#6b7280]">Paid</span>
                    <span>$0.00</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-4 border-t border-black/5 pt-3 text-sm">
                    <span className="font-semibold">Pay</span>
                    <span className="font-bold">$899.00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* DISCOUNT CARD */}
            <div className="rounded-2xl bg-[#0f3b8f] p-5 text-white sm:p-6">
              <p className="text-[13px] opacity-90">
                Pay in full and get extra discount
              </p>

              <p className="mt-2 text-[14px] opacity-90">
                The amount due will then be
              </p>

              <h2 className="mt-2 text-[28px] font-semibold tracking-tight sm:text-[32px]">
                $799
              </h2>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-4">
            {/* PAYMENT CARD */}
            <div className="rounded-2xl border border-black/5 bg-white p-4 sm:p-5">
              <h2 className="text-[16px] font-medium">Payment Information</h2>

              <div className="mt-4 space-y-3 text-[12.5px]">
                <input
                  placeholder="Card holder"
                  className="w-full rounded-xl border border-black/10 px-3 py-2 outline-none focus:border-black/30"
                />

                <input
                  placeholder="Card number"
                  className="w-full rounded-xl border border-black/10 px-3 py-2 outline-none focus:border-black/30"
                />

                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <input
                    placeholder="Month"
                    className="min-w-0 rounded-xl border border-black/10 px-3 py-2"
                  />
                  <input
                    placeholder="Year"
                    className="min-w-0 rounded-xl border border-black/10 px-3 py-2"
                  />
                </div>

                <input
                  placeholder="Location"
                  className="w-full rounded-xl border border-black/10 px-3 py-2"
                />

                <select className="w-full rounded-xl border border-black/10 px-3 py-2">
                  <option>Pay in one installment</option>
                </select>

                <div className="flex gap-2">
                  <input
                    placeholder="Discount code"
                    className="min-w-0 flex-1 rounded-xl border border-black/10 px-3 py-2"
                  />
                  <button className="rounded-xl bg-[#e11d48] px-3 text-white text-[12px]">
                    Ok
                  </button>
                </div>

                <button className="w-full rounded-xl bg-[#e11d48] py-2 text-white font-medium">
                  Pay $799.00
                </button>
              </div>
            </div>

            {/* PAYPAL */}
            <div className="rounded-2xl border border-black/5 bg-white p-4 text-center text-[12px] text-[#6b7280]">
              Pay with Paypal
              <p className="mt-1 text-[11px]">
                Charged every 30 days if installment
              </p>
            </div>

            {/* CASH */}
            <button className="w-full rounded-2xl bg-green-500 py-2 text-white font-medium">
              Pay by cash
            </button>

            <p className="text-[11px] leading-5 text-[#6b7280]">
              You will find all payment terms on this invoice
            </p>

            <Link href="#" className="text-[12px] text-blue-600">
              Print the invoice
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
