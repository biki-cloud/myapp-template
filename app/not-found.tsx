"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404</h1>
      <h2 className="mt-4 text-xl">ページが見つかりませんでした</h2>
      <p className="mt-2 text-gray-600">
        お探しのページは存在しないか、移動された可能性があります。
      </p>
    </div>
  );
}
