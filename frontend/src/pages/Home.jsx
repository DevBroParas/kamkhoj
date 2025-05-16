import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import graffitiBg from "../assets/graffitiBg.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Home = () => {
  const companies = [
    { name: "TechCorp", logo: "TC", color: "bg-blue-500", jobs: 42 },
    { name: "InnovateX", logo: "IX", color: "bg-red-500", jobs: 28 },
    { name: "GlobalSys", logo: "GS", color: "bg-green-500", jobs: 35 },
    { name: "DataFlow", logo: "DF", color: "bg-yellow-500", jobs: 19 },
    { name: "NexusAI", logo: "NA", color: "bg-purple-500", jobs: 23 },
  ];

  const features = [
    {
      icon: "🔍",
      title: "Smart Matching",
      description:
        "Our AI-powered algorithm connects you with jobs that match your skills and preferences.",
    },
    {
      icon: "⚡",
      title: "Fast Application",
      description:
        "Apply to multiple jobs with just a few clicks. No more lengthy application forms.",
    },
    {
      icon: "💼",
      title: "Top Companies",
      description:
        "Access opportunities from startups to Fortune 500 companies across India.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">

      {/* Hero Section */}
<section
  className="flex flex-col justify-center items-center text-center p-8 text-white min-h-[600px] bg-cover bg-center relative"
  style={{
    backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${graffitiBg})`,
  }}
>
  <motion.h1
    className="text-5xl font-bold mb-6 max-w-3xl"
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    Empowering Your Career Journey
  </motion.h1>

  <motion.p
    className="text-xl max-w-2xl leading-relaxed text-gray-200"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, delay: 0.3 }}
  >
    Discover top opportunities tailored to your strengths. At KaamKhoj, we connect passionate talent with India’s best companies.
  </motion.p>

  <motion.div
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white opacity-80 flex flex-col items-center gap-2"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.8 }}
    transition={{ duration: 0.8, delay: 1.2 }}
  >
    <div className="text-sm">Scroll to explore</div>
    <div className="text-2xl animate-bounce">↓</div>
  </motion.div>
</section>


      {/* Top Companies */}
      <section className="py-16 px-8 bg-background text-center">
        <motion.h2
          className="text-3xl font-bold mb-12 text-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Top Companies Hiring Now
        </motion.h2>

        <motion.div
          className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {companies.map((company, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center w-48 hover:scale-105 transition-transform duration-300"
            >
              <div className={`w-20 h-20 rounded-lg flex items-center justify-center text-white font-bold text-2xl mb-4 ${company.color}`}>
                {company.logo}
              </div>
              <div className="font-semibold text-lg text-foreground mb-1">{company.name}</div>
              <div className="text-sm text-muted-foreground">{company.jobs} open positions</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-8 bg-background text-center">
        <motion.h2
          className="text-3xl font-bold mb-4 text-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Why Choose KaamKhoj?
        </motion.h2>

        <motion.p
          className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          We're connecting top talent with the best opportunities across India
        </motion.p>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-muted p-8 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background text-foreground px-8 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-screen-xl mx-auto mb-12">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold mb-6">
              <span className="text-[--color-fire]">Kaam</span>Khoj<span className="text-[--color-fire]">.</span>in
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Connecting talent with opportunity across India. Find your dream job or the perfect candidate with KaamKhoj.
            </p>
            <div className="flex gap-4">
              {["📱", "💻", "📧", "📍"].map((icon, i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer">
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Job Seekers */}
          <div>
            <h3 className="text-lg font-bold mb-6">For Job Seekers</h3>
            <ul className="space-y-3">
              {["Browse Jobs", "Create Profile", "Job Alerts", "Career Advice", "Salary Guide"].map((item, i) => (
                <li key={i}>
                  <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Employers */}
          <div>
            <h3 className="text-lg font-bold mb-6">For Employers</h3>
            <ul className="space-y-3">
              {["Post a Job", "Browse Candidates", "Pricing", "Enterprise Solutions", "Recruitment Tools"].map((item, i) => (
                <li key={i}>
                  <a href="/company-home" className="text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Have questions or feedback? Reach out to our team.
            </p>
            <div className="space-y-2 text-muted-foreground">
              <div>📞 +91 1234567890</div>
              <div>📧 contact@kaamkhoj.in</div>
              <div>📍 Mumbai, India</div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-border pt-8 text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} KaamKhoj.in. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4 flex-wrap">
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"].map((item, i) => (
              <a key={i} href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
