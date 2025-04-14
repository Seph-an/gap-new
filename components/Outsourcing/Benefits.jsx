import { UserSearch, PiggyBank, ShieldCheck, Rocket } from "lucide-react";

export default function Benefits() {
  const benefits = [
    {
      icon: <UserSearch size={24} />,
      title: "Access to Top-Tier Talent",
      description:
        "We connect you with highly skilled professionals tailored to your industry, ensuring the perfect fit for your business needs.",
    },
    {
      icon: <PiggyBank size={24} />,
      title: "Cost-Effective & Scalable Solutions",
      description:
        "Reduce overhead costs while scaling your workforce up or down based on demand—without the hassle of long-term commitments.",
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Compliance & Risk Management",
      description:
        "We handle all legal, tax, and labor compliance matters, so you can focus on growing your business without worrying about regulations.",
    },
    {
      icon: <Rocket size={24} />,
      title: "Streamlined Hiring & Onboarding",
      description:
        "Our efficient recruitment process ensures a smooth transition, minimizing downtime and maximizing productivity from day one.",
    },
  ];

  return (
    <section id="benefits" className="section-light">
      <div className="container">
        <h2 className="gap-title">Why You Should Work With Us.</h2>
        <p className="gap-subtitle">
          We don’t just provide staff, we deliver seamless workforce solutions
          that{" "}
          <span className="text-[#51D4D6]">drive efficiency, cut costs,</span>{" "}
          and <span className="text-[#51D4D6]">boost productivity!</span>
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
