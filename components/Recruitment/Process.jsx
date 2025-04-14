import { Search, UserCheck, Handshake } from "lucide-react";

export default function Process() {
  const steps = [
    {
      title: "Candidate Sourcing",
      description:
        "We leverage top platforms and networks to find the best talent for your needs.",
      icon: <Search size={24} />,
    },
    {
      title: "Screening & Assessment",
      description:
        "Our experts conduct thorough evaluations to ensure the perfect candidate fit.",
      icon: <UserCheck size={24} />,
    },
    {
      title: "Interview & Placement",
      description:
        "We facilitate seamless interviews and ensure a smooth transition to your team.",
      icon: <Handshake size={24} />,
    },
  ];

  return (
    <section id="overview" className="section-light">
      <div className="container">
        <h2 className="gap-title">Our Recruitment Process</h2>
        <p className="gap-subtitle">
          Experience a streamlined, efficient hiring journey in three{" "}
          <span className="text-[#51D4D6]">simple steps.</span>
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="relative gap-card bg-[#0a0a0a]">
              <div className="gap-icon">{step.icon}</div>
              <h3 className="card-title">{step.title}</h3>
              <p className="card-content">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
