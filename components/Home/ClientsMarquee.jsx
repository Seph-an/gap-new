"use client";

import Marquee from "react-fast-marquee";
import Image from "next/image";
import testimonials from "./testimonials";
import { useInView } from "react-intersection-observer";

const ClientsMarquee = () => {
  const { ref, inView } = useInView({
    threshold: 0.8,
  });
  return (
    <div ref={ref} className="w-full h-[100px] mt-12 mb-8">
      {inView && (
        <Marquee
          speed={50}
          gradient={true}
          gradientColor={[30, 30, 30]}
          pauseOnHover={true}
          className="py-1 h-full flex items-center bg-white rounded-lg"
        >
          {testimonials.map((client, index) => (
            <Image
              key={index}
              src={client.src}
              alt={client.tag}
              width={150}
              height={80}
              className="mx-5 rounded-md  transition-all"
            />
          ))}
        </Marquee>
      )}
    </div>
  );
};

export default ClientsMarquee;
//grayscale hover:grayscale-0 - makes the logos gray and colorfull on hover
// initial={{ opacity: 0, y: 20 }}
// animate={{ opacity: 1, y: 0 }}
// transition={{ duration: 0.6, delay: index * 0.2 }}
