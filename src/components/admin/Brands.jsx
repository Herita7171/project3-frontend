import React, { useState, useEffect } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { deleteBrand, getBrands, searchBrand } from "../../api/brand";
import { useNotification, useSearch } from "../../hooks";
import AppSearch from "../form/AppSearch";
import ConfirmModal from "../modals/ConfirmModal";
import UpdateBrand from "../modals/UpdateBrand";
import NotFoundAlert from "../NotFoundAlert";

let currentPageNo = 0;
const limit = 10;

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [results, setResults] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);
  const [busy, setBusy] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const { updateNotification } = useNotification();
  const { handleSearch, resetSearch, resultNotFound } = useSearch();

  const fetchBrands = async (pageNo) => {
    const { profiles, error } = await getBrands(pageNo, limit);
    if (error) return updateNotification("error", error);

    if (!profiles.length) {
      currentPageNo = pageNo - 1;
      return setReachedToEnd(true);
    }

    setBrands([...profiles]);
  };

  const handleOnEditClick = (profile) => {
    setShowUpdateModal(true);
    setSelectedProfile(profile);
  };

  const hideUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const handleOnSearchSubmit = (value) => {
    handleSearch(searchBrand, value, setResults);
  };

  const handleSearchFormReset = () => {
    resetSearch();
    setResults([]);
  };

  const handleOnBrandUpdate = (profile) => {
    const updatedBrands = brands.map((brand) => {
      if (profile.id === brand.id) {
        return profile;
      }

      return brand;
    });

    setBrands([...updatedBrands]);
  };

  const handleOnDeleteClick = (profile) => {
    setSelectedProfile(profile);
    setShowConfirmModal(true);
  };

  const handleOnDeleteConfirm = async () => {
    
  };

  const hideConfirmModal = () => setShowConfirmModal(false);

  useEffect(() => {
    fetchBrands(currentPageNo);
  }, []);

  return (
    <>
      <div className="p-2">
        <div className="flex justify-end mt-3">
          <AppSearch
            onReset={handleSearchFormReset}
            onSubmit={handleOnSearchSubmit}
            placeholder="Search Brands..."
            showResetIcon={results.length || resultNotFound}
          />
        </div>
        <NotFoundAlert text="Record not found" visible={resultNotFound} />

        <div className="p-10 mx-20 pt-6">
          {results.length || resultNotFound
            ? results.map((brand) => (
                <BrandProfile
                  profile={brand}
                  key={brand.id}
                  onEditClick={() => handleOnEditClick(brand)}
                  onDeleteClick={() => handleOnDeleteClick(brand)}
                />
              ))
            : brands.map((brand) => (
                <BrandProfile
                  profile={brand}
                  key={brand.id}
                  onEditClick={() => handleOnEditClick(brand)}
                  onDeleteClick={() => handleOnDeleteClick(brand)}
                />
              ))}
        </div>
      </div>

      <ConfirmModal
        title="Are you sure?"
        subtitle="This action will remove this profile permanently!"
        visible={showConfirmModal}
        busy={busy}
        onConfirm={handleOnDeleteConfirm}
        onCancel={hideConfirmModal}
      />

      <UpdateBrand
        visible={showUpdateModal}
        onClose={hideUpdateModal}
        initialState={selectedProfile}
        onSuccess={handleOnBrandUpdate}
      />
    </>
  );
}

const BrandProfile = ({ profile, onEditClick, onDeleteClick }) => {
  const [showOptions, setShowOptions] = useState(false);
  const acceptedNameLength = 15;

  const handleOnMouseEnter = () => {
    setShowOptions(true);
  };

  const handleOnMouseLeave = () => {
    setShowOptions(false);
  };

  if (!profile) return null;

  const getName = (name) => {
    if (name.length <= acceptedNameLength) return name;

    return name.substring(0, acceptedNameLength) + "..";
  };

  const { name, logo, about = "" } = profile;

  return (
    <div className="bg-white shadow rounded h-20 overflow-hidden">
      <div
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        className="flex cursor-pointer relative"
      >
        <img
          src={logo}
          alt={name}
          className="w-20 aspect-square object-cover"
        />

        <div className="px-2">
          <h1 className="text-xl text-primary font-semibold whitespace-nowrap">
            {getName(name)}
          </h1>
          <p className="text-primary opacity-70">
            {about.substring(0, 50)}
          </p>
        </div>

        <Options
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
          visible={showOptions}
        />
      </div>
    </div>
  );
};

const Options = ({ visible, onDeleteClick, onEditClick }) => {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 bg-primary bg-opacity-25 backdrop-blur-sm flex justify-center items-center space-x-5">
      <button
        onClick={onDeleteClick}
        className="p-2 rounded-full bg-white text-primary hover:opacity-80 transition"
        type="button"
      >
        <BsTrash />
      </button>
      <button
        onClick={onEditClick}
        className="p-2 rounded-full bg-white text-primary hover:opacity-80 transition"
        type="button"
      >
        <BsPencilSquare />
      </button>
    </div>
  );
};