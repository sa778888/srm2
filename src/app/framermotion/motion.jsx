"use client"

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Wrap = ({ children }) => {
  useEffect(() => {

    const timeoutId = setTimeout(() => {
    }, 50);

    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }} // Start from 50 units below (you can adjust the value)
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }} // Move down 50 units while exiting
        transition={{ delay: 0.3, duration: 0.9 }} // Adjust the delay and duration based on your preferences
      >
        <div>{children}</div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Wrap;
