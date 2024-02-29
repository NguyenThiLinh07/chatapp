import React, { useEffect, useRef } from 'react';

function ContextMenu({ options, cordinates, contextMenu, setContextMenu }) {
  const contextMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutSide = (e) => {
      console.log('e.target', e.target);
      console.log('e.target', e.target.id, e.target.class);
      if (e.target.id !== 'context-opener') {
        console.log('contextMenuRef', contextMenuRef.current);
        if (contextMenuRef.current && !contextMenuRef.current.contains(e.target)) {
          setContextMenu(false);
        }
      }
    };
    document.addEventListener('click', handleClickOutSide);
    return () => {
      document.removeEventListener('click', handleClickOutSide);
    };
  }, []);

  const handleClick = (e, callback) => {
    e.stopPropagation();
    callback();
    setContextMenu(false);
  };

  return (
    <div
      className={`bg-dropdown-background fixed py-2 z-[100] shadow-xl rounded-lg`}
      ref={contextMenuRef}
      style={{
        top: cordinates.y,
        left: cordinates.x,
      }}
    >
      <ul>
        {options.map(({ name, callback }) => (
          <li
            key={name}
            onClick={(e) => handleClick(e, callback)}
            className="px-5 py-2 hover:bg-background-default-hover cursor-pointer w-[200px]"
          >
            <span className="text-white">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContextMenu;
