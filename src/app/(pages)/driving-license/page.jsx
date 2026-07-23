import Image from "next/image";
import Link from "next/link";
import { FaStar, FaTimesCircle } from "react-icons/fa";
import { FaSquareCheck } from "react-icons/fa6";

import hero from "../../../../public/image/appoin-hero.png";
import broomLogo from "../../../../public/image/broomLogo.png";
import cpfOffer from "../../../../public/image/cpf-offer.png";
import googleLogo from "../../../../public/image/googleLogo.png";
import service1 from "../../../../public/image/hser1.png";
import service2 from "../../../../public/image/hser2.png";
import service3 from "../../../../public/image/hser3.png";
import laws3 from "../../../../public/image/laws3.png";
import tes1 from "../../../../public/image/tes1.png";
import tes2 from "../../../../public/image/tes2.png";
import tes3 from "../../../../public/image/tes3.png";
import badge from "../../../../public/image/traffic-two-price-batch.png";
import trustLogo from "../../../../public/image/trustLogo.png";

const licensePackages = [
  {
    title: "Zen Permit",
    subtitle: "Code + 20 driving lessons",
    price: "€599",
    oldPrice: "€699",
    hours: ["10h", "20h", "30h"],
    features: ["20 driving lessons", "Initial assessment", "Code Training", "30 days training", "Support for the practical exam"],
  },
  {
    title: "Premium License",
    subtitle: "Code + 20 driving lessons",
    price: "€799",
    oldPrice: "€899",
    hours: ["20h", "30h", "40h"],
    features: ["20 driving lessons", "Initial assessment", "Code Training", "Support for the practical exam", "Initial 30 days"],
  },
  {
    title: "Accelerated Permit",
    subtitle: "Code + 20 driving lessons",
    price: "€899",
    oldPrice: "€999",
    hours: ["10h", "20h", "30h"],
    features: ["20 driving lessons", "Initial assessment", "Code Training", "30 day training", "Support for the practical exam within 30 days"],
  },
];

const codePacks = [
  {
    title: "Eco Code",
    price: "FREE",
    features: ["Duration: Unlimited", "Access to the code app", "Video course and online manual", "5000 questions and 30 practice exams"],
  },
  {
    title: "Zen Code",
    price: "€9.99",
    oldPrice: "€19.99",
    badge: true,
    best: true,
    features: ["Duration: 12 month package", "Access to the code app", "Video course and online manual", "5000 questions and 30 practice exams", "Administrative procedures & Coaching"],
  },
  {
    title: "Success Code",
    price: "€33.99",
    oldPrice: "€43.99",
    badge: true,
    features: ["Duration: 12 month package", "Access to the code app", "Video course and online manual", "5000 questions and 30 practice exams", "A place for a highway code exam"],
  },
];

const singleOffers = [
  ["Driving Lessons", "€34.90"],
  ["Automatic Driving course", "€36.90"],
  ["Prior appointment", "€50"],
  ["Educational Meeting", "€50"],
  ["Support for the practical test", "€70"],
];

const services = [
  { image: service1, title: "Online and classroom Highway Code", price: "Starting from €300" },
  { image: service2, title: "Category B driving license, manual car", price: "Starting from €300" },
  { image: service3, title: "Automatic BCA car license", price: "Starting from €300" },
];

const ratingCards = [
  { image: broomLogo, title: "VroomVroom" },
  { image: googleLogo, title: "Google Ratings" },
  { image: trustLogo, title: "Trustpilot Ratings" },
];

const testimonials = [
  { image: tes1, name: "Esther Howard" },
  { image: tes2, name: "Marvin McKinney" },
  { image: tes3, name: "Wade Warren" },
  { image: tes1, name: "Annette Black" },
];

function TransmissionSwitch() {
  return (
    <div className="flex items-center gap-1 rounded-full bg-[#edf2f9] p-1 !text-[12px] font-semibold">
      <span className="rounded-full bg-[#174a9b] px-4 py-2 text-white">Manual transmission</span>
      <span className="px-4 py-2 text-[#5d6671]">Automatic transmission</span>
    </div>
  );
}

function PackageCard({ item }) {
  return (
    <article className="flex min-h-[610px] flex-col rounded-[10px] border-2 border-[#174a9b] bg-white px-6 py-8 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="text-center">
        <h3 className="text-[25px] font-bold text-[#e4213c]">{item.title}</h3>
        <p className="mt-2 !text-[13px] text-[#6b7077]">{item.subtitle}</p>
        <p className="mt-1 !text-[12px] font-semibold text-[#174a9b]">Most economical offer</p>
        <div className="mt-5 flex justify-center gap-3">
          {item.hours.map((hour) => (
            <span key={hour} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#174a9b] !text-[11px] font-bold text-white">
              {hour}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-7 flex items-end gap-4">
        <span className="text-[27px] font-bold text-[#174a9b]">{item.price}</span>
        <span className="pb-1 !text-[12px] text-[#737981] line-through">{item.oldPrice}</span>
      </div>
      <h4 className="mt-6 text-[17px] font-bold text-[#174a9b]">Package Contents</h4>
      <ul className="mt-5 flex-1 space-y-4">
        {item.features.map((feature, index) => (
          <li key={feature} className="flex gap-3 !text-[13px] leading-5 text-[#34383e]">
            {index === item.features.length - 1 ? (
              <FaTimesCircle className="mt-1 shrink-0 text-[#e4213c]" />
            ) : (
              <FaSquareCheck className="mt-1 shrink-0 text-[#174a9b]" />
            )}
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link href="/register" className="mx-auto mt-8 inline-flex min-h-[42px] min-w-[150px] items-center justify-center rounded-full border border-[#174a9b] px-6 !text-[13px] font-semibold text-[#e4213c] transition hover:bg-[#174a9b] hover:text-white">
        Sign up
      </Link>
    </article>
  );
}

function CodePackCard({ item }) {
  return (
    <article className="relative flex min-h-[555px] flex-col rounded-[10px] border-2 border-[#174a9b] bg-white px-6 py-8 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {item.badge && <Image src={badge} alt="Recommended" sizes="46px" className="absolute -right-2 -top-6 h-11 w-11 object-contain" />}
      <div className="text-center">
        {item.best && <p className="!text-[12px] font-semibold text-[#174a9b]">Best Value</p>}
        <h3 className="mt-1 text-[25px] font-bold text-[#e4213c]">{item.title}</h3>
        <p className="mt-2 !text-[12px] font-medium text-[#4671aa]">Complete revision + Administrative procedures</p>
        <div className="mx-auto mt-5 flex min-h-[42px] max-w-[180px] items-center justify-center rounded-full border border-[#174a9b] px-4">
          <span className="text-[18px] font-bold text-[#174a9b]">{item.price}</span>
          {item.oldPrice && <span className="ml-3 !text-[11px] text-[#707780] line-through">{item.oldPrice}</span>}
        </div>
      </div>
      <h4 className="mt-6 text-center text-[17px] font-bold text-[#174a9b]">Package Contents</h4>
      <ul className="mt-5 flex-1 space-y-3">
        {item.features.map((feature, index) => {
          const inactive = item.title === "Zen Code" && index === item.features.length - 1;
          return (
            <li key={feature} className="flex gap-3 !text-[13px] leading-5 text-[#34383e]">
              {inactive ? <FaTimesCircle className="mt-1 shrink-0 text-[#e4213c]" /> : <FaSquareCheck className="mt-1 shrink-0 text-[#174a9b]" />}
              <span>{feature}</span>
            </li>
          );
        })}
      </ul>
      <Link href="/register" className="mx-auto mt-7 inline-flex min-h-[40px] min-w-[150px] items-center justify-center rounded-full bg-[#e4213c] px-6 !text-[12px] font-semibold uppercase text-white transition hover:bg-[#174a9b]">
        Sign Up
      </Link>
    </article>
  );
}

export default function DrivingLicensePage() {
  return (
    <main className="overflow-hidden bg-white text-[#202124]">
      <section className="bg-[#eaf0f9]">
        <div className="mx-auto grid min-h-[500px] max-w-[1280px] grid-cols-[minmax(0,1fr)] items-center gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:px-10">
          <div>
            <h1 className="text-[35px] font-bold leading-tight tracking-[-0.025em] sm:text-[42px]">
              Our rates are up to <span className="text-[#e4213c]">30%</span>
              <br /> cheaper <span className="text-[#e4213c]">*</span>
            </h1>
            <Link href="/contact-us" className="mt-10 inline-flex min-h-[46px] items-center justify-center rounded-[8px] bg-[#e4213c] px-7 !text-[14px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#174a9b] hover:shadow-lg">
              To be accompanied by an advisor
            </Link>
          </div>
          <Image src={hero} alt="Driving lesson with an instructor" priority sizes="(max-width: 768px) 92vw, 560px" className="h-auto w-full max-w-[560px] justify-self-end" />
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="text-[32px] font-bold">Our Packages</h2>
            <TransmissionSwitch />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {["Driving License", "CPF Offers", "Accompanied Driving", "Code", "À la carte"].map((tab, index) => (
              <span key={tab} className={`rounded-[7px] border px-5 py-2 !text-[12px] font-semibold ${index === 0 ? "border-[#174a9b] bg-[#dce8fb] text-[#174a9b]" : "border-[#d6deea] bg-white text-[#3f454c]"}`}>{tab}</span>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-3">
            {licensePackages.map((item) => <PackageCard key={item.title} item={item} />)}
          </div>
          <div className="mt-16 rounded-[10px] bg-[#eaf0f9] px-6 py-9 text-center">
            <h3 className="text-[20px] font-bold">Manage your entire online training at the best price</h3>
            <Link href="/offers" className="mt-6 inline-flex rounded-[8px] bg-[#e4213c] px-8 py-3 !text-[13px] font-semibold text-white transition hover:bg-[#174a9b]">Discover Our Offers</Link>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:pb-24">
        <div className="mx-auto grid max-w-[1280px] items-center gap-10 rounded-[100px] bg-[#174a9b] px-9 py-12 text-white md:grid-cols-[1fr_300px] lg:px-[110px]">
          <div>
            <h2 className="text-[28px] font-bold">Get your driver&apos;s license using your CPF</h2>
            <p className="mt-4 !text-[14px] leading-6 text-white/85">Permisgo is Qualiopi certified and eligible for CPF funding. Finance your driving license with your Personal Training Account.</p>
            <Link href="/cpf-offer" className="mt-6 inline-flex rounded-[8px] bg-[#e4213c] px-8 py-3 !text-[13px] font-semibold text-white transition hover:bg-white hover:text-[#174a9b]">Discover Our CPF Offers</Link>
          </div>
          <Image src={cpfOffer} alt="Mon Compte Formation" sizes="260px" className="mx-auto h-auto w-[260px]" />
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:pb-24">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="text-[30px] font-bold">Our accompanied driving package</h2>
            <TransmissionSwitch />
          </div>
          <div className="mt-8 grid gap-10 rounded-[10px] bg-[#eaf0f9] p-7 md:grid-cols-[45%_55%] lg:p-12">
            <div className="rounded-[10px] bg-white p-7 text-center">
              <h3 className="text-[24px] font-bold text-[#e4213c]">Accompanied Driving</h3>
              <p className="mt-2 !text-[13px] text-[#757a81]">Code + 20 driving lessons</p>
              <div className="mt-8 flex items-end justify-between"><strong className="text-[25px] text-[#174a9b]">€599*</strong><span className="!text-[12px] text-[#717780] line-through">€699</span></div>
              <Link href="/register" className="mt-7 inline-flex w-full justify-center rounded-[8px] bg-[#e4213c] px-6 py-3 !text-[13px] font-semibold text-white transition hover:bg-[#174a9b]">Sign up</Link>
            </div>
            <div>
              <h3 className="text-[18px] font-bold text-[#174a9b]">Package Contents</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {["20 driving lessons", "Age: From 15 years old", "Initial assessment", "Code Training", "Training follow-up by a coach", "Learning booklet", "Appointment prior to accompanied driving"].map((feature) => (
                  <li key={feature} className="flex gap-3 !text-[13px] text-[#34383e]"><FaSquareCheck className="mt-1 shrink-0 text-[#174a9b]" />{feature}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 rounded-[10px] bg-[#eaf0f9] px-6 py-8 text-center">
            <h3 className="text-[20px] font-bold">Manage your entire online training at the best price</h3>
            <Link href="/offers" className="mt-6 inline-flex rounded-[8px] bg-[#e4213c] px-8 py-3 !text-[13px] font-semibold text-white transition hover:bg-[#174a9b]">Discover Our Method for the Permit</Link>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-[850px] text-center">
          <h2 className="text-[32px] font-bold">Discover our à la carte offers</h2>
          <p className="mt-4 !text-[13px] text-[#777c82]">It is possible to choose your training program à la carte.</p>
          <div className="mt-10 space-y-4 text-left">
            {singleOffers.map(([name, price]) => (
              <div key={name} className="flex min-h-[58px] items-center rounded-[9px] bg-[#eaf0f9] px-5">
                <span className="flex-1 !text-[14px] font-semibold">{name}</span>
                <span className="mr-6 !text-[13px] font-bold text-[#20ae55]">{price}</span>
                <button type="button" className="rounded-full bg-[#e4213c] px-5 py-2 !text-[12px] font-semibold text-white transition hover:bg-[#174a9b]">Add</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eaf0f9] px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-[1280px]">
          <div className="text-center"><h2 className="text-[34px] font-bold">Permisgo&apos;s Highway Code Packs</h2><p className="mt-4 !text-[13px] text-[#73787e]">What is your need?</p></div>
          <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-9 lg:grid-cols-3">{codePacks.map((item) => <CodePackCard key={item.title} item={item} />)}</div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-[1280px] items-center gap-10 rounded-[100px] bg-[#174a9b] px-9 py-12 text-white md:grid-cols-[1fr_240px] lg:px-[120px]">
          <div><h2 className="text-[28px] font-bold">écoles de conduite labellisées</h2><p className="mt-5 !text-[14px] text-white/85">Des centres de formation agréés, respectant des standards de qualité élevés.</p></div>
          <Image src={laws3} alt="Qualiopi certification" sizes="190px" className="mx-auto h-auto w-[190px] rounded-[6px]" />
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:pb-24">
        <div className="mx-auto max-w-[1280px] text-center">
          <span className="rounded-[5px] bg-[#e7f7ec] px-4 py-2 !text-[12px] font-semibold text-[#20a657]">Services</span>
          <h2 className="mt-5 text-[34px] font-bold">All our other services</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <article key={service.title} className="rounded-[10px] bg-[#eaf0f9] px-6 py-8 transition hover:-translate-y-1 hover:shadow-xl">
                <Image src={service.image} alt="" sizes="70px" className="mx-auto h-[70px] w-[70px] object-contain" />
                <h3 className="mt-5 text-[17px] font-bold">{service.title}</h3><p className="mt-3 !text-[13px] text-[#3f9d5a]">{service.price}</p>
                <Link href="/offers" className="mt-5 inline-flex rounded-full border border-[#174a9b] px-5 py-2 !text-[12px] font-semibold text-[#e4213c] transition hover:bg-[#174a9b] hover:text-white">Learn more</Link>
              </article>
            ))}
          </div>
          <Link href="/offers" className="mt-8 inline-flex rounded-[8px] bg-[#e4213c] px-7 py-3 !text-[13px] font-semibold text-white transition hover:bg-[#174a9b]">View All</Link>
        </div>
      </section>

      <section className="bg-[#174a9b] px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto grid max-w-[1280px] gap-6 md:grid-cols-3">
          {ratingCards.map((rating) => (
            <article key={rating.title} className="flex min-h-[165px] flex-col items-center justify-center rounded-[20px] bg-[#f6f8fb] p-6 text-center transition hover:-translate-y-1 hover:bg-white hover:shadow-xl">
              <Image src={rating.image} alt="" sizes="40px" className="h-10 w-10 object-contain" /><h3 className="mt-2 text-[18px] font-bold">{rating.title}</h3>
              <div className="mt-2 flex gap-3 text-[#ffc52c]">{[0,1,2,3,4].map((star) => <FaStar key={star} />)}</div><p className="mt-2 !text-[13px]">04 out of 05</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f5f7fa] px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-[1280px]">
          <span className="rounded-[5px] bg-[#e7f7ec] px-4 py-2 !text-[12px] font-semibold text-[#20a657]">Testimonials</span><h2 className="mt-5 text-[34px] font-bold">What Our Students Say</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="rounded-[10px] bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl">
                <p className="!text-[13px] leading-6 text-[#50545a]">Thanks to the instructors, I passed my driving test on the first try. The lessons were clear and very helpful!</p>
                <div className="mt-5 flex gap-2 text-[#ffc52c]">{[0,1,2,3,4].map((star) => <FaStar key={star} />)}</div>
                <div className="mt-6 flex items-center gap-3"><Image src={testimonial.image} alt={testimonial.name} sizes="40px" className="h-10 w-10 rounded-full object-cover" /><div><h3 className="text-[13px] font-bold">{testimonial.name}</h3><p className="!text-[12px] text-[#747981]">Web Designer</p></div></div>
              </article>
            ))}
          </div>
          <Link href="/reviews" className="mt-10 inline-flex rounded-[8px] bg-[#e4213c] px-6 py-3 !text-[13px] font-semibold text-white transition hover:bg-[#174a9b]">View All</Link>
        </div>
      </section>
    </main>
  );
}
