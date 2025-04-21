import {
  ArrowRight,
  Network,
  BriefcaseBusiness,
  Globe,
  Building2,
} from "lucide-react";

export default function Services() {
  const types = [
    {
      icon: <Network size={24} />,
      title: "IT & Tech Outsourcing",
      description:
        "Leverage top-tier tech talent for software development, cybersecurity, and system integration without hiring in-house teams.",
    },
    {
      icon: <BriefcaseBusiness size={24} />,
      title: "Business Process Outsourcing (BPO)",
      description:
        "Streamline operations by outsourcing customer service, accounting, and administrative tasks to specialized professionals.",
    },
    {
      icon: <Globe size={24} />,
      title: "Offshore Outsourcing",
      description:
        "Expand your workforce internationally while reducing costs and accessing global expertise.",
    },
    {
      icon: <Building2 size={24} />,
      title: "Onshore & Nearshore Outsourcing",
      description:
        "Outsource services within your country or neighboring regions for easier collaboration and cultural alignment.",
    },
  ];

  return (
    <section id="outsourcing-services" className="section-dark">
      <div className="container">
        <h2 className="gap-title">Explore Our Outsourcing Solutions</h2>
        <p className="gap-subtitle">
          Whether you're looking to scale operations, cut costs, or enhance
          efficiency, we provide{" "}
          <span className="text-[#51D4D6]">tailored outsourcing solutions</span>{" "}
          to fit your business needs.
        </p>
        <div className="service-grid">
          {types.map((type, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-[#1e1e1e] rounded-lg gap-shadow"
            >
              <div className="gap-icon">{type.icon}</div>
              <h3 className="card-title">{type.title}</h3>
              <p className="card-content">{type.description}</p>
            </div>
          ))}
        </div>

        <div className="w-full flex flex-col items-center gap-8">
          <p className="gap-subtitle max-w-3xl ">
            Connect with us to power your business with{" "}
            <span className="text-[#51D4D6]">expert outsourcing</span> to
            streamline operations, reduce costs, and unlock growth without the
            hassle.
          </p>
          <a href="/contact-us" className="gap-button gap-button-primary mt-8">
            Connect with us <ArrowRight size={20} className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
}
