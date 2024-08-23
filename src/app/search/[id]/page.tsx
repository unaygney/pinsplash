import React from "react";

export default function SearchPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return <div>SearchPage : {id}</div>;
}
