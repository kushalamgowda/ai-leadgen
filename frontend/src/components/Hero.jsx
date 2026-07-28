import { motion } from "framer-motion";

function Hero() {
  return (
    <motion.div
      className="hero-content"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1>
        AI Powered
        <span> Lead Intelligence</span>
      </h1>

      <p>
        Turn any business website into a qualified sales lead
        using AI-powered data extraction and scoring.
      </p>
    </motion.div>
  );
}

export default Hero;