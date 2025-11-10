"use client";
import React from "react";
import { motion } from "motion/react";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-background"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <div key={index} className="contents">
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div className="p-10 rounded-3xl border border-border bg-card shadow-lg shadow-primary/10 max-w-xs w-full" key={i}>
                  <div className="text-card-foreground">{text}</div>
                  <div className="flex items-center gap-2 mt-5">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5 text-card-foreground">{name}</div>
                      <div className="leading-5 opacity-60 tracking-tight text-muted-foreground">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )),
        ]}
      </motion.div>
    </div>
  );
};

const testimonials = [
  {
    text: "This AI platform revolutionized our startup operations, streamlining automation and analytics. The cloud-based infrastructure keeps us agile and competitive.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Sarah Chen",
    role: "Startup Founder",
  },
  {
    text: "Implementing their AI solutions was seamless. The intuitive interface made team onboarding effortless, accelerating our product development.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Marcus Rodriguez",
    role: "CTO",
  },
  {
    text: "The AI support team is exceptional, guiding us through complex integrations and providing ongoing optimization recommendations.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Emily Thompson",
    role: "AI Product Manager",
  },
  {
    text: "Their AI platform's seamless integration enhanced our decision-making capabilities. Highly recommend for any startup looking to scale with intelligence.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "David Park",
    role: "CEO",
  },
  {
    text: "The AI-powered analytics and automated workflows have transformed our efficiency, making us 10x more productive than before.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Lisa Wang",
    role: "Operations Director",
  },
  {
    text: "The AI implementation exceeded expectations, streamlining our processes and providing insights that boosted our growth by 300%.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Rachel Kim",
    role: "Growth Analyst",
  },
  {
    text: "Our startup's performance improved dramatically with AI-driven insights and user-friendly automation tools.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Alex Johnson",
    role: "Marketing Lead",
  },
  {
    text: "They delivered an AI solution that exceeded expectations, understanding our startup's unique needs and scaling challenges.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Priya Patel",
    role: "Head of Sales",
  },
  {
    text: "Using their AI platform, our conversion rates and customer insights significantly improved, driving unprecedented business growth.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Jordan Smith",
    role: "Product Manager",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const AnimatedTestimonials = () => {
  return (
    <section className="bg-background py-16 md:py-32 relative">
      <div className="container z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <h2 className="text-4xl font-semibold lg:text-5xl text-foreground tracking-tight mt-5 text-center">
            What our users say
          </h2>
          <p className="text-center mt-6 text-muted-foreground">
            See what our customers have to say about our AI platform.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-16 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default AnimatedTestimonials;