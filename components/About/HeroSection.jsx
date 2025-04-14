import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 px-4">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
        Empowering Talent Acquisition & Business Success
      </h1>
      <p className="text-lg md:text-2xl text-gray-300 max-w-2xl">
        We specialize in recruitment, payroll, and outsourcing solutions to
        drive growth and innovation.
      </p>
      <a
        href="#core-values"
        className="mt-8 flex items-center gap-2 bg-[#1e1e1e] hover:shadow-[0_0_15px_5px_#51D4D6] transition-shadow duration-500 px-6 py-3 rounded-lg text-white"
      >
        More about us <ArrowRight size={20} />
      </a>
    </section>
  );
};

export default HeroSection;
