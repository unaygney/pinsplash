import React from "react";

export default function page({ params }: { params: { id: string } }) {
  const { id } = params;

  let devodedId = decodeURIComponent(id);
  return <div>page{devodedId}</div>;
}
