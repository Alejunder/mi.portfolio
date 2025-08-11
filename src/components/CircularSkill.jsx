import React, { useState } from "react";
import { motion } from "framer-motion";
import "../styles/circularSkill.css";

const CircularSkill = ({ title, percent, color }) => {
  const [isHovered, setIsHovered] = useState(false);
  const radius = 54;
  const stroke = 8; // Reduced stroke width to give more inner space
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;
  
  // More accurate text handling to ensure text fits and renders completely
  const getTextClass = () => {
    // Check for wide characters like W, M, capital letters
    const hasWideChars = /[MWQAG]/.test(title);
    // Check for descenders (characters that go below the baseline)
    const hasDescenders = /[gjpqy]/.test(title);
    
    // Special handling for texts with problematic characters
    if (hasWideChars && title.length > 13) return 'multiline xs-text';
    if (hasDescenders && title.length > 14) return 'multiline xs-text';
    if (title.length > 15) return 'multiline xs-text';
    
    if (hasWideChars && title.length > 8) return 'xs-text';
    if (hasDescenders && title.length > 9) return 'xs-text';
    if (title.length > 10) return 'xs-text';
    
    if (hasWideChars && title.length > 6) return 'sm-text';
    if (title.length > 8) return 'sm-text';
    
    // For shorter text but with special characters or wide characters
    if (title.includes(' ') && title.length > 6) return 'sm-text';
    return '';
  };

  return (
    <motion.div
      className="circle-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.08, 
        transition: { 
          type: "spring", 
          stiffness: 300, 
          damping: 10 
        } 
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <svg
        height={radius * 2}
        width={radius * 2}
        className="circle-svg"
        style={{ outline: "none", border: "none" }}
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
          animate={{ 
            strokeDashoffset,
            filter: isHovered ? `drop-shadow(0 0 8px ${color})` : "none",
            scale: isHovered ? 1.05 : 1
          }}
          transition={{ 
            strokeDashoffset: { duration: 1.5 },
            scale: { type: "spring", stiffness: 300, damping: 10 }
          }}
          strokeLinecap="round"
          className="animated-circle"
        />
      </svg>
      {/* Percentage positioned lower */}
      <motion.span
        className="percent-text"
        animate={{ 
          color: isHovered ? color : "#aaa",
          fontSize: isHovered ? "1rem" : "0.85rem"
        }}
        transition={{ duration: 0.3 }}
        style={{ 
          position: "absolute",
          top: "55%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          display: "block",
          fontWeight: "600"
        }}
      >
        {percent}%
      </motion.span>
      
      {/* Title - Above the center */}
      <motion.div 
        className="title-centered"
        animate={{
          scale: isHovered ? 1.05 : 1,
          textShadow: isHovered ? `0 0 8px ${color}` : "none"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
        style={{ 
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "78%",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "3px 0",
          overflow: "visible"
        }}
      >
        <h4 
          className={`skill-title ${getTextClass()}`} 
          style={{ 
            padding: "2px 0", 
            color: "#e6e6e6", 
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)" 
          }}
        >
          {title}
        </h4>
      </motion.div>
    </motion.div>
  );
};

export default CircularSkill;
