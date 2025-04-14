import HeroSection from "../../components/Payroll/HeroSection";
import Benefits from "../../components/Payroll/Benefits";
import Services from "../../components/Payroll/Services";
import Process from "../../components/Payroll/Process";

export default function PayrollPage() {
  return (
    <main>
      <HeroSection />
      <Benefits />
      <Process />
      <Services />
    </main>
  );
}
