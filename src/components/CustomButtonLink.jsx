import React from "react";

export default function CustomButtonLink({ label, clickable = true, onClick }) {
  const className = clickable
    ? "text-highlight hover:underline"
    : "text-highlight cursor-default";

  return (
    <button onClick={onClick} className={className} type="button">
      {label}
    </button>
  );
}