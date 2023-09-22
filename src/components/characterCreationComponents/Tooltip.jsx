import React, { useState } from 'react';

export default function Tooltip({ text, children }) {
  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
        {children}
      </div>
      {isVisible && (
        <div className='font-Merriweather'
        style={{ position: 'absolute', width: '300px', top: '100%', left: 0, background: 'white', color: '#696969', padding: '5px', borderRadius: '10px', zIndex: 1 }}>
          {text}
        </div>
      )}
    </div>
  );
};
