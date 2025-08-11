import React from "react";
import { motion } from "framer-motion";
import "../styles/circularSkill.css";

const CircularSkill = ({ title, percent, color }) => {
  const radius = 54;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;
  
  // Determine if we need special text handling based on title length and content
  const getTextClass = () => {
    if (title.length > 15) return 'multiline xs-text';
    if (title.length > 12) return 'xs-text';
    if (title.length > 9) return 'sm-text';
    // For shorter text but with special characters or wide characters
    if (title.includes(' ') && title.length > 7) return 'sm-text';
    return '';
  };

  return (
    <motion.div
      className="circle-container"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
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
        <div className="title-container">
          <h4 className={`skill-title ${getTextClass()}`}>{title}</h4>
        </div>
        <span>{percent}%</span>
      </div>
    </motion.div>
  );
};

export default CircularSkill;
