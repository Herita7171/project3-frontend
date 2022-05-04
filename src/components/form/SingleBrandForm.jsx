import React, { useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { useNotification } from "../../hooks";
import ImgSelector from "../ImgSelector";
import Selector from "../Selector";

const commonInputClassName = 'w-full border-gray-400 outline-none focus:border-secondary transition ';

const defaultSingleBrandInfo = {
  name: "",
  about: "",
  logo: null,
  type: "",
};

const typeOptions = [
  { title: "Basic Fashion", value: "Basic Fashion" },
  { title: "Fast Fashion", value: "Fast Fashion" },
  { title: "Designer", value: "Designer" },
  { title: "Luxury", value: "Luxury" },
  { title: "Other", value: "Other" }
];

const validateSingleBrand = ({name, about, logo, type }) => {
  if (!name.trim()) return { error: "The brand name is missing." };
  if (!about.trim()) return { error: "The about section is missing." };
  if (!type.trim()) return { error: "The brand type is missing." };
  if (logo && !logo.type?.startsWith("image"))
    return { error: "Invalid logo file!" };

  return { error: null };
};

export default function SingleBrandForm({ title, btnTitle, busy, onSubmit }) {
  const [singleBrandInfo, setSingleBrandInfo] = useState({ ...defaultSingleBrandInfo });
  const [userSelectedLogo, setUserSelectedLogo] = useState("");
  const { updateNotification } = useNotification();

  const updateLogo = (file) => {
    const url = URL.createObjectURL(file);
    setUserSelectedLogo(url);
  };

  const handleChange = ({ target }) => {
    const { value, files, name } = target;
    if (name === "logo") {
      const file = files[0];
      updateLogo(file);
      return setSingleBrandInfo({ ...singleBrandInfo, logo: file });
    }

    setSingleBrandInfo({ ...singleBrandInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = validateSingleBrand(singleBrandInfo);
    if (error) return updateNotification("error", error);

    // submit form
    const formData = new FormData();
    for (let key in singleBrandInfo) {
      if (key) formData.append(key, singleBrandInfo[key]);
    }
    updateNotification("success", "success");
    onSubmit(formData);
  };

  const { name, about, type } = singleBrandInfo;

  return (
    <form
      className="p-3 w-[35rem] rounded"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-between items-center mb-3">
        <h1 className="font-semibold text-lg">
          {title}
        </h1>
        <button
          className="h-8 w-24 bg-submitBtn text-white
          hover:bg-red-400 transition rounded flex items-center justify-center"
          type="submit"
        >
          {busy ? <ImSpinner3 className="animate-spin" /> : btnTitle}
        </button>
      </div>

      <div className="flex space-x-2">
        <ImgSelector
          selectedImg={userSelectedLogo}
          className="w-36 h-36 aspect-square object-cover"
          name="logo"
          onChange={handleChange}
          label="Add a Logo"
          accept="image/jpg, image/jpeg, image/png"
        />
        <div className="flex-grow flex flex-col space-y-2">
          <input
            placeholder="Brand Name"
            type="text"
            className={commonInputClassName + " border-b-2"}
            name="name"
            value={name}
            onChange={handleChange}
          />
          <textarea
            name="about"
            value={about}
            onChange={handleChange}
            placeholder="About"
            className={commonInputClassName + " border-b-2 resize-none h-full"}
          ></textarea>
        </div>
      </div>

      <div className="mt-3">
        <Selector
          options={typeOptions}
          label="Type"
          value={type}
          onChange={handleChange}
          name="type"
        />
      </div>
    </form>
  );
}