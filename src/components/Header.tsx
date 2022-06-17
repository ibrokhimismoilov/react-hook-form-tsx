import React from "react";

type HeaderTypes = {
  renderCount?: number;
  title?: string;
};

export const Header = ({ renderCount, title }: HeaderTypes) => {
  console.log(renderCount);

  return (
    <header>
      <h2>Render count: {renderCount}</h2>
      <h1>{title}</h1>
    </header>
  );
};
