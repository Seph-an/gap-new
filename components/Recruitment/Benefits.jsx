import { ShieldCheck, Target, BarChart2, Heart } from "lucide-react";

export default function Benefits() {
  const benefits = [
    {
      title: "Access to Top Talent",
      description:
        "We connect you with industry-leading professionals who fit your company's culture and goals.",
      icon: <ShieldCheck size={24} />,
    },
    {
      title: "Efficient Hiring Process",
      description:
        "Our streamlined process saves you time and resources, ensuring you get the right candidate quickly.",
      icon: <Target size={24} />,
    },
    {
      title: "Data-Driven Insights",
      description:
        "Benefit from advanced analytics and market insights to inform your hiring strategy.",
      icon: <BarChart2 size={24} />,
    },
    {
      title: "Dedicated Support",
      description:
        "Our team is committed to your success, providing continuous support and guidance.",
      icon: <Heart size={24} />,
    },
  ];

  return (
    <section id="benefits" className="section-light">
      <div className="container">
        <h2 className="gap-title">Why Choose Our Recruitment Services?</h2>
        <p className="gap-subtitle">
          Discover the advantages of partnering with us for your hiring needs.
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
