// CSR - Client Side Rendering
"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function PostSearchInput() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  // Debounce: prevents fetch on every keystroke.
  // Waits for 0.5s of inactivity before firing the search.
  // If user types again within 0.5s, previous timeout is cleared.
  // This reduces number of fetches and improves performance.
  // Without debounce, every keystroke would trigger a fetch, leading to excessive requests.
  useEffect(() => {
    const delay = setTimeout(() => {
      const queryParams = new URLSearchParams();
      if (search) {
        queryParams.set("id", search); // It's a key-value pair. Will make like ?id=3
      }
      const url = `${pathname}?${queryParams.toString()}`
      router.push(url);
    }, 500); // 0.5s debounce

    return () => clearTimeout(delay);
  }, [search, router, pathname]);

  return (
    <input
      type="number"
      placeholder="Search by ID..."
      className="text-black border px-3 py-2 rounded"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}