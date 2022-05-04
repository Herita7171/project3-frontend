import React from "react";
import { AiFillStar } from "react-icons/ai";

export default function RatingStar({ rating }) {
  if (!rating)
    return (
      <p className="text-highlight">No reviews</p>
    );

  return (
    <p className="text-highlight flex items-center space-x-1">
      <span>{rating}</span>
      <AiFillStar />
    </p>
  );
}