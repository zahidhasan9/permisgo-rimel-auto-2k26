"use client";

import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#f6f7fb] px-6 py-6 text-[#111827]">
      <div className="mx-auto max-w-[1200px]">
        {/* HEADER */}
        <header className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-black/5"
            >
              <IoChevronBack />
            </Link>

            <h1 className="text-[18px] font-medium tracking-tight">Invoice</h1>
          </div>

          <button className="rounded-full bg-[#e11d48] px-4 py-2 text-[12px] font-medium text-white hover:opacity-90">
            Download
          </button>
        </header>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* LEFT SIDE */}
          <div className="md:col-span-2 space-y-5">
            {/* INVOICE TABLE */}
            <div className="rounded-2xl bg-white border border-black/5 p-5">
              <table className="w-full text-[12.5px]">
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
            </div>

            {/* DISCOUNT CARD */}
            <div className="rounded-2xl bg-[#0f3b8f] text-white p-6">
              <p className="text-[13px] opacity-90">
                Pay in full and get extra discount
              </p>

              <p className="mt-2 text-[14px] opacity-90">
                The amount due will then be
              </p>

              <h2 className="mt-2 text-[32px] font-semibold tracking-tight">
                $799
              </h2>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-4">
            {/* PAYMENT CARD */}
            <div className="rounded-2xl bg-white border border-black/5 p-5">
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

                <div className="grid grid-cols-2 gap-3">
                  <input
                    placeholder="Month"
                    className="rounded-xl border border-black/10 px-3 py-2"
                  />
                  <input
                    placeholder="Year"
                    className="rounded-xl border border-black/10 px-3 py-2"
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
                    className="flex-1 rounded-xl border border-black/10 px-3 py-2"
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

            <p className="text-[11px] text-[#6b7280]">
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
