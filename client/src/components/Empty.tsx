import React from 'react';
import Image from 'next/image';

function Empty() {
  return (
    <div className="bg-panel-header-background flex justify-center items-center border-conversation-border border-l flex-col h-[100vh] border-b-4 border-b-icon-green">
      <Image src="/app.webp" alt="app" height={300} width={300} />
    </div>
  );
}

export default Empty;
