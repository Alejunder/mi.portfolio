import React from "react";
import { motion } from "framer-motion";
import "../styles/circularSkill.css";

const CircularSkill = ({ title, percent, color }) => {
  const radius = 54;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <motion.div
      className="circle-container"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <svg
        height={radius * 2}
        width={radius * 2}
        className="circle-svg"
      >
        <circle
          stroke="#2d2d2d"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <motion.circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5 }}
          strokeLinecap="round"
        />
      </svg>
      <div className="circle-text">
        <h4>{title}</h4>
        <span>{percent}%</span>
      </div>
    </motion.div>
  );
};

export default CircularSkill;
