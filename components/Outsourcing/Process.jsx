import { Blocks, UserSearch, ClipboardCheck, LineChart } from "lucide-react";

export default function Process() {
  const benefits = [
    {
      icon: <ClipboardCheck size={24} />,
      title: "Understanding Your Needs",
      description:
        "Collaborate with you to identify the specific roles and skills required to propel your business forward.",
    },
    {
      icon: <UserSearch size={24} />,
      title: "Selecting the Perfect Talent",
      description:
        "Tap into our extensive network to find professionals who align with your company culture and objectives.",
    },
    {
      icon: <Blocks size={24} />,
      title: "Seamless Integration",
      description:
        "Ensure a smooth onboarding process, integrating outsourced staff into your existing workflows effortlessly.",
    },
    {
      icon: <LineChart size={24} />,
      title: "Continuous Growth Monitoring",
      description:
        "Regularly assess performance and provide support to ensure ongoing success and improvement.",
    },
  ];

  return (
    <section id="process" className="section-light">
      <div className="container">
        <h2 className="gap-title">How it works.</h2>
        <p className="gap-subtitle">
          Finding the right <span className="text-[#51D4D6]">talent pool</span>{" "}
          made effortless – Here’s how we do it!
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
