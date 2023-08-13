import Link from "next/link";
export default function Hero() {
  return (
    <section id="hero">
      {/* Copy */}
      <div className="flex flex-col gap-y-14 items-center py-28">
        {/* Heading */}
        <h1 className="text-5xl text-center customSm-text-4xl sm:text-3xl font-extrabold">
          <span className="whitespace-nowrap text-darkBlue">
            Find your next{" "}
            <br />
            <span className="sky-text-gradient">
              adventure
            </span>
          </span>
        </h1>

        {/* Description */}
        <p className="text-center text-lg sm:text-base text-gray-700 font-semibold">
          With integrated maps, weather updates, and comprehensive travel
          information, we make travel planning a breeze.
        </p>

        {/* Call to action */}
        <Link
          href="/search"
          className="bg-skyBlue rounded-md py-2 px-4 text-offWhite font-bold"
        >
          Get Started Free
        </Link>
      </div>
    </section>
  );
}
