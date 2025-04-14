import { Edit, Settings, CheckCircle, Package } from "lucide-react";

export default function Process() {
  const benefits = [
    {
      icon: <Edit size={24} />,
      title: "Data Input",
      description:
        "Seamlessly capture employee hours, salary details, and benefit info.",
    },
    {
      icon: <Settings size={24} />,
      title: "Processing",
      description:
        "Automated calculations ensure accurate deductions and compliance.",
    },
    {
      icon: <CheckCircle size={24} />,
      title: "Review",
      description: "Real-time audits and verifications to guarantee precision.",
    },
    {
      icon: <Package size={24} />,
      title: "Delivery",
      description:
        "Timely distribution of payslips and direct deposits to employees.",
    },
  ];

  return (
    <section id="process" className="section-light">
      <div className="container">
        <h2 className="gap-title">How it works.</h2>
        <p className="gap-subtitle">
          Explore the seamless journey from{" "}
          <span className="text-[#51D4D6]">data collection</span> to{" "}
          <span className="text-[#51D4D6]">payday perfection.</span>
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
