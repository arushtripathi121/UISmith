import React from 'react'
import { motion } from 'framer-motion'
import GoogleSignIn from '../components/GoogleSignIn';
import LightRays from '../reactbits/LightRays';
import '../index.css';

const LandingPage = () => {

  return (
    <main className="min-h-screen bg-gray-950 text-white scroll-smooth">

      <div className="relative w-full min-h-screen" id="home">

        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="light-rays-bg absolute inset-0 w-full h-full"
        />

        <div className="relative z-10">

          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="px-20 py-6 flex justify-between items-center"
          >
            <div className="flex items-center space-x-1">
              <div className="text-4xl font-extrabold tracking-widest text-indigo-400 uppercase">
                UI
              </div>
              <div className="text-3xl font-light tracking-normal text-gray-300 capitalize">
                Smith
              </div>
            </div>

            <nav className="hidden md:flex space-x-10 text-gray-300 text-lg">
              <a href="#home" className="hover:text-indigo-400 transition cursor-pointer">Home</a>
              <a href="#features" className="hover:text-indigo-400 transition cursor-pointer">Features</a>
              <a href="#about" className="hover:text-indigo-400 transition cursor-pointer">About</a>
              <a href="#contact" className="hover:text-indigo-400 transition cursor-pointer">Contact</a>
            </nav>
          </motion.header>

          <section className="min-h-screen flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-16 items-center"
            >
              <div className="space-y-8 max-w-4xl">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
                  className="text-6xl font-bold leading-tight"
                >
                  Create stunning UIs from a single prompt
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.4, delay: 0.5, ease: "easeOut" }}
                  className="text-lg text-gray-300 leading-relaxed"
                >
                  UISmith is an AI-powered interface builder that helps developers and creators design,
                  generate, and preview responsive frontend UI layouts instantly using prompts.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
                className="flex justify-center"
              >
                <GoogleSignIn />
              </motion.div>

            </motion.div>
          </section>

        </div>
      </div>

      <section id="features" className="scroll-mt-24 px-20 pb-28 space-y-14">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-5xl font-bold tracking-tight text-center"
        >
          Powerful <span className="text-indigo-400">Features</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center text-gray-300 text-xl max-w-3xl mx-auto"
        >
          Everything you need to build beautiful, production-ready UIs — faster than ever.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 pt-6">

          {[
            {
              title: "AI-Powered UI Generation",
              desc: "Describe any layout and UISmith instantly converts it into clean, structured UI code."
            },
            {
              title: "Live Coding Preview",
              desc: "Watch your design update instantly as you modify code or prompts in real time."
            },
            {
              title: "Multiple Code Formats",
              desc: "Export HTML, React, Tailwind CSS, or entire page templates instantly."
            },
            {
              title: "Smart Layout Engine",
              desc: "Automatically generates perfect spacing, alignment, and responsiveness."
            },
            {
              title: "Reusable Components",
              desc: "Easily generate cards, forms, navbars, and other reusable UI blocks."
            },
            {
              title: "Modern UI Patterns",
              desc: "Get ready-made modern design patterns with responsive standards."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: i * 0.2, ease: "easeOut" }}
              className="p-8 rounded-2xl bg-gray-900/40 shadow-[0_0_25px_rgba(0,0,0,0.4)] border border-gray-800
                         hover:shadow-[0_0_35px_rgba(79,70,229,0.4)] transition-all duration-300 space-y-4"
            >
              <h3 className="text-2xl font-semibold text-indigo-400">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}

        </div>
      </section>


      <section id="about" className="scroll-mt-24 px-20 py-32 space-y-12">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-5xl font-bold tracking-tight text-center"
        >
          About <span className="text-indigo-400">UISmith</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 pt-10">

          {[
            {
              title: "Generate UI with Prompts",
              desc: "Describe what you want — UISmith converts ideas into layouts, components, and full pages."
            },
            {
              title: "Instant Live Preview",
              desc: "See your UI come alive instantly as you change prompts or code."
            },
            {
              title: "Clean, Ready-to-Use Code",
              desc: "Export production-ready HTML, React, or Tailwind code."
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: idx * 0.2, ease: "easeOut" }}
              className="p-8 rounded-2xl bg-gray-900/30 shadow-[0_0_25px_rgba(0,0,0,0.4)] space-y-3 border border-gray-800
                         hover:shadow-[0_0_35px_rgba(79,70,229,0.4)] transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold text-indigo-400">{item.title}</h3>
              <p className="text-gray-400 text-lg leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}

        </div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="text-xl text-gray-300 leading-relaxed pt-8 text-center"
        >
          UISmith removes repetitive work and helps you focus on creativity. Build smarter and faster.
        </motion.p>

      </section>

      <motion.footer
        id="contact"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="scroll-mt-24 px-20 py-16 border-t border-gray-800 text-gray-300"
      >

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          <div className="space-y-3">
            <div className="flex items-center space-x-1">
              <div className="text-3xl font-extrabold tracking-widest text-indigo-400 uppercase">
                UI
              </div>
              <div className="text-2xl font-light capitalize">
                Smith
              </div>
            </div>
            <p className="text-gray-400 text-base leading-relaxed">
              Build beautiful, production-ready UIs instantly using AI-powered prompts.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Product</h4>
            <ul className="space-y-2">
              <li className="hover:text-indigo-400 cursor-pointer transition">Features</li>
              <li className="hover:text-indigo-400 cursor-pointer transition">Preview</li>
              <li className="hover:text-indigo-400 cursor-pointer transition">Prompts</li>
              <li className="hover:text-indigo-400 cursor-pointer transition">Documentation</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Company</h4>
            <ul className="space-y-2">
              <li className="hover:text-indigo-400 cursor-pointer transition">About</li>
              <li className="hover:text-indigo-400 cursor-pointer transition">Contact</li>
              <li className="hover:text-indigo-400 cursor-pointer transition">Privacy Policy</li>
              <li className="hover:text-indigo-400 cursor-pointer transition">Terms of Service</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Connect</h4>
            <ul className="space-y-2">
              <li className="hover:text-indigo-400 cursor-pointer transition">Twitter</li>
              <li className="hover:text-indigo-400 cursor-pointer transition">GitHub</li>
              <li className="hover:text-indigo-400 cursor-pointer transition">LinkedIn</li>
              <li className="hover:text-indigo-400 cursor-pointer transition">Support</li>
            </ul>
          </div>

        </div>

        <div className="pt-10 border-t border-gray-800 mt-10 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} UISmith. All rights reserved.
        </div>

      </motion.footer>

    </main>
  )
}

export default LandingPage;
