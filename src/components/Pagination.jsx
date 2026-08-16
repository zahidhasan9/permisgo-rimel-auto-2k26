"use client";

const buildPageNumbers = (page, totalPages) => {
  const pages = new Set([1, totalPages, page - 1, page, page + 1]);

  return [...pages]
    .filter((item) => item >= 1 && item <= totalPages)
    .sort((a, b) => a - b);
};

export default function Pagination({
  page,
  limit,
  total,
  totalPages,
  loading = false,
  onPageChange,
  onLimitChange,
}) {
  const safePage = Math.max(Number(page) || 1, 1);
  const safeLimit = Math.max(Number(limit) || 20, 1);
  const safeTotalPages = Math.max(Number(totalPages) || 1, 1);
  const safeTotal = Math.max(Number(total) || 0, 0);

  const firstItem = safeTotal ? (safePage - 1) * safeLimit + 1 : 0;
  const lastItem = Math.min(safePage * safeLimit, safeTotal);
  const pageNumbers = buildPageNumbers(safePage, safeTotalPages);

  return (
    <div className="flex min-w-0 flex-col gap-3 border-t border-slate-200 bg-white px-3 py-3 sm:px-4 sm:py-4 lg:flex-row lg:items-center lg:justify-between">
      <p className="text-center text-xs text-slate-600 sm:text-left sm:text-sm">
        Showing <strong>{firstItem}</strong>–<strong>{lastItem}</strong> of{" "}
        <strong>{safeTotal}</strong>
      </p>

      <div className="flex max-w-full items-center gap-1.5 overflow-x-auto pb-1 sm:flex-wrap sm:gap-2 sm:overflow-visible sm:pb-0">
        <label className="mr-1 flex shrink-0 items-center gap-1 text-xs text-slate-600 sm:mr-2 sm:gap-2 sm:text-sm">
          Rows
          <select
            value={safeLimit}
            disabled={loading}
            onChange={(event) => onLimitChange(Number(event.target.value))}
            className="rounded-lg border border-slate-300 bg-white px-1.5 py-2"
          >
            {[10, 20, 50, 100].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          disabled={loading || safePage <= 1}
          onClick={() => onPageChange(safePage - 1)}
          className="shrink-0 rounded-lg border border-slate-300 px-2.5 py-2 text-xs font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 sm:px-3 sm:text-sm"
        >
          <span className="sm:hidden">Prev</span>
          <span className="hidden sm:inline">Previous</span>
        </button>

        {pageNumbers.map((pageNumber, index) => {
          const previousNumber = pageNumbers[index - 1];
          const showGap = previousNumber && pageNumber - previousNumber > 1;

          return (
            <span key={pageNumber} className="flex items-center gap-2">
              {showGap && <span className="px-1 text-slate-400">…</span>}
              <button
                type="button"
                disabled={loading}
                onClick={() => onPageChange(pageNumber)}
                className={`min-w-9 rounded-lg px-2.5 py-2 text-xs font-semibold sm:min-w-10 sm:px-3 sm:text-sm ${
                  pageNumber === safePage
                    ? "bg-blue-600 text-white"
                    : "border border-slate-300 bg-white text-slate-700"
                }`}
              >
                {pageNumber}
              </button>
            </span>
          );
        })}

        <button
          type="button"
          disabled={loading || safePage >= safeTotalPages}
          onClick={() => onPageChange(safePage + 1)}
          className="shrink-0 rounded-lg border border-slate-300 px-2.5 py-2 text-xs font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 sm:px-3 sm:text-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
}
