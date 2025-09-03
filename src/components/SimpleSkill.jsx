
import React from 'react';
import { Icon } from '@iconify/react';

const SimpleSkill = ({ title, icon, color }) => {
  return (
    <div
      className="simple-skill"
      style={{
        backgroundColor: "rgba(45, 45, 45, 0.5)",
        borderLeft: `4px solid ${color}`,
        padding: "12px 15px",
        borderRadius: "4px",
        minWidth: "120px",
        textAlign: "left"
      }}
    >
      <div className="skill-content">
        <Icon 
          icon={icon} 
          style={{ 
            color: color, 
            fontSize: "2rem", 
            marginBottom: "8px",
            display: "block"
          }} 
        />
        <div className="skill-title-simple" style={{ color: "#ffffff", fontSize: "0.9rem" }}>
          {title}
        </div>
      </div>
    </div>
  );
};

export default SimpleSkill;
