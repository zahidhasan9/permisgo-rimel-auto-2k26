import Image from "next/image";
import Link from "next/link";

// Image
import heroImage from "../../../../public/image/cpf-offer.png";

const CpfOffer = () => {
  return (
    <section className="px-6 py-12 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div>
            <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl">
              Finance your driving licence with the CPF
            </h1>

            <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">
              Choose the perfect package that fits your learning needs and
              budget.
            </p>

            <Link
              href="#"
              className="mt-5 inline-block rounded-md bg-red-500 px-6 py-3 text-base font-semibold text-white transition duration-300 hover:bg-red-600"
            >
              To be called back by an advisor
            </Link>
          </div>

          <div>
            <Image
              src={heroImage}
              alt="CPF driving licence offer"
              className="h-auto w-full"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CpfOffer;
