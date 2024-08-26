import React from "react";

export default function Tag({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      {...props}
      className="w-fit cursor-pointer rounded bg-gray-50 px-2 py-1 text-sm font-medium capitalize leading-5 text-neutral-600"
    >
      {children}
    </div>
  );
}
