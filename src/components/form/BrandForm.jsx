import React, { useEffect, useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { useNotification } from "../../hooks";
import ImgSelector from "../ImgSelector";
import Selector from "../Selector";
import { Link } from "react-router-dom";

const commonInputClassName = 'w-full border-gray-400 outline-none focus:border-secondary transition ';

const defaultBrandInfo = {
  id: null,
  name: "",
  about: "",
  logo: null,
  type: "",
};

const typeOptions = [
  { title: "Basic Fashion", value: "Basic Fashion" },
  { title: "Fast Fashion", value: "Fast Fashion" },
  { title: "Luxury", value: "Luxury" },
  { title: "Designer", value: "Designer" },
  { title: "Other", value: "other" },
];

const validateBrand = ({ logo, name, about, type }) => {
  if (!name.trim()) return { error: "Brand name is missing!" };
  if (!about.trim()) return { error: "About section is empty!" };
  if (!type.trim()) return { error: "Brand type is missing!" };
  if (logo && !logo.type?.startsWith("image"))
    return { error: "Invalid image / logo file!" };

  return { error: null };
};

export default function BrandForm({
  title,
  initialState,
  btnTitle,
  busy,
  onSubmit,
}) {
  const [brandInfo, setBrandInfo] = useState({ ...defaultBrandInfo });
  const [selectedLogoForUI, setSelectedLogoForUI] = useState("");
  const { updateNotification } = useNotification();

  const updateLogoForUI = (file) => {
    const url = URL.createObjectURL(file);
    setSelectedLogoForUI(url);
  };

  const handleChange = ({ target }) => {
    const { value, files, name } = target;
    if (name === "logo") {
      const file = files[0];
      updateLogoForUI(file);
      return setBrandInfo({ ...brandInfo, logo: file });
    }

    setBrandInfo({ ...brandInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = validateBrand(brandInfo);
    if (error) return updateNotification("error", error);

    // submit form
    const formData = new FormData();
    for (let key in brandInfo) {
      if (key) formData.append(key, brandInfo[key]);
    }
    onSubmit(formData);
  };

  useEffect(() => {
    if (initialState) {
      setBrandInfo({ ...initialState, logo: null });
      setSelectedLogoForUI(initialState.logo);
    }
  }, [initialState]);

  const { id: _id, name, about, type } = brandInfo;

  return (
    <form
      className=" bg-white p-3 w-[35rem] rounded"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-between items-center mb-3">
        <h1 className="font-semibold text-xl">
          {title}
        </h1>
        <button
          className="h-8 w-24 bg-red-300 text-white hover:opacity-80 transition rounded flex items-center justify-center"
          type="submit"
        >
          {busy ? <ImSpinner3 className="animate-spin" /> : btnTitle}
        </button>
      </div>

      <div className="flex space-x-2">
        <ImgSelector
          selectedImg={selectedLogoForUI}
          className="w-36 h-36 aspect-square object-cover"
          name="logo"
          onChange={handleChange}
          lable="Select logo"
          accept="image/jpg, image/jpeg, image/png"
        />
        <div className="flex-grow flex flex-col space-y-2">
          <input
            placeholder="Enter name"
            type="text"
            className={commonInputClassName + "border-b-2"}
            name="name"
            value={name}
            onChange={handleChange}
          />
          <textarea
            name="about"
            value={about}
            onChange={handleChange}
            placeholder="About"
            className={commonInputClassName + "border-b-2 resize-none h-full"}
          ></textarea>
          <Link to={"/brand/review/" + brandInfo.id} className="cursor-pointer hover:font-bold text-gray-500">
            Browse Reviews
          </Link>
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