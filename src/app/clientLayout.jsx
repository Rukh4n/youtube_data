"use client"; // Client Component

import { useState } from "react";

export default function ClientLayout({ children }) {
  const [videos, setVideos] = useState([]); // State to store video data

  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
