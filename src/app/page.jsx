import React from 'react';
import Link from 'next/link';

const Page = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Link href="/inspiration">
        <div className="text-center">
          <span className="text-3xl font-bold">Inspiration</span>
        </div>
      </Link>
    </div>
  );
}

export default Page;
