import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function AppSearch({
  showResetIcon,
  placeholder,
  onSubmit,
  onReset,
}) {
  const [value, setValue] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    onSubmit(value);
  };

  const handleReset = () => {
    setValue("");
    onReset();
  };

  return (
    <form className="relative" onSubmit={handleOnSubmit}>
      <input
        type="text"
        className="border-2 border-light-subtle focus:border-primary text-lg transition bg-transparent rounded p-1 outline-none "
        placeholder={placeholder}
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />

      {showResetIcon ? (
        <button
          onClick={handleReset}
          type="button"
          className="absolute top-1/2 -translate-y-1/2 right-2 text-secondary"
        >
          <AiOutlineClose />
        </button>
      ) : null}
    </form>
  );
}
