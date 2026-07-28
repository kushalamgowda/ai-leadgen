import { motion } from "framer-motion";

function Hero() {
  return (
    <motion.div
      initial={{ opacity:0, y:40 }}
      animate={{ opacity:1, y:0 }}
      transition={{ duration:0.8 }}
      className="hero"
    >
      <h1>AI Powered Lead Intelligence</h1>

      <p>
        Turn any company website into a qualified business lead using AI.
      </p>
    </motion.div>
  );
}

export default Hero;