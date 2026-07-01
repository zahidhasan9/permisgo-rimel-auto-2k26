const Support = ({ title, headPara, mainContent }) => {
  return (
    <>
      {/* Header Section */}
      <section className="bg-blue-950 px-4 py-12 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {title}
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-7 text-white/80 sm:text-base">
              {headPara}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-white px-4 py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 text-sm font-medium leading-7 text-slate-700 shadow-sm sm:p-6 sm:text-base">
            <span>{mainContent}</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Support;
