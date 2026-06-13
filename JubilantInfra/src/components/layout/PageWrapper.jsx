import { motion } from "framer-motion";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function PageWrapper({ 
  children, 
  showNav = true, 
  showFooter = true,
  className = ""
}) {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      {showNav && <Navbar />}
      
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex-grow flex flex-col"
      >
        {children}
      </motion.main>
      
      {showFooter && <Footer />}
    </div>
  );
}