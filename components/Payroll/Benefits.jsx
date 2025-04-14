import { Target, Clock, ShieldCheck, TrendingUp } from "lucide-react";

export default function Benefits() {
  const benefits = [
    {
      icon: <Target size={24} />,
      title: "Accuracy",
      description:
        "Experience precise calculations that eliminate errors and ensure every cent is accounted for.",
    },
    {
      icon: <Clock size={24} />,
      title: "Time-Saving",
      description:
        "Streamline your processes to save valuable time and focus on what matters most.",
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Compliance",
      description:
        "Stay ahead with up-to-date compliance features that keep you aligned with ever-changing laws.",
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Scalable Solutions",
      description:
        "Grow with confidence—our solutions adapt to your business, no matter the size.",
    },
  ];

  return (
    <section id="benefits" className="section-light">
      <div className="container">
        <h2 className="gap-title">Why Choose Our Payroll Solutions?</h2>
        <p className="gap-subtitle">
          Curious how it all works? Let’s break down why our payroll solutions
          <span className="text-[#51D4D6]"> make managing pay a breeze!</span>
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="gap-card bg-[#0a0a0a]">
              <div className="gap-icon">{benefit.icon}</div>
              <h3 className="card-title ">{benefit.title}</h3>
              <p className="card-content ">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
