// app/admin/support/page.tsx

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-[#F7F9FC] px-6 py-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-2xl font-semibold text-[#1B3F73]">Admin Support</h1>

        <p className="mt-2 text-sm text-gray-500">
          Manage support requests, tickets, and user issues from here.
        </p>

        <section className="mt-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
          <h2 className="text-lg font-semibold text-gray-800">
            Support Dashboard
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            No support tickets available yet.
          </p>
        </section>
      </div>
    </main>
  );
}
