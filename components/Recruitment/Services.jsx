import { Briefcase, Clock, Star, Users, ArrowRight } from "lucide-react";

export default function Services() {
  const types = [
    {
      title: "Permanent Recruitment",
      description:
        "Connect with full-time professionals who align with your company’s vision.",
      icon: <Clock size={24} />,
    },
    {
      title: "Temporary/Contract",
      description:
        "Flexible staffing solutions to meet short-term project demands.",
      icon: <Briefcase size={24} />,
    },
    {
      title: "Executive Search",
      description:
        "Expert headhunting for top-tier leadership and strategic roles.",
      icon: <Star size={24} />,
    },
    {
      title: "Freelance Recruitment",
      description:
        "Find remote and freelance talent to drive your projects forward.",
      icon: <Users size={24} />,
    },
  ];

  return (
    <section id="types-of-recruitment" className="section-dark">
      <div className="container">
        <h2 className="gap-title">Staffing Solutions for Every Need</h2>
        <p className="gap-subtitle">
          Our comprehensive recruitment services are tailored to meet your
          <span className="text-[#51D4D6]"> specific staffing</span> needs.
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
            <span className="text-[#51D4D6]">
              Ready to Hire the Best Talent?
            </span>{" "}
            Connect with us to discover how our tailored recruitment solutions
            can stream-line your hiring process and drive your business forward.
          </p>

          <a href="/contact-us" className="gap-button">
            Connect with us <ArrowRight size={20} className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
}
