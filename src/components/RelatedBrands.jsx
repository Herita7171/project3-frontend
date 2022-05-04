import React, { useEffect, useState } from "react";
import { getSingleBrand } from "../api/brand";
import { useNotification } from "../hooks";
import BrandList from "./user/BrandList";

export default function RelatedBrands({ brandId }) {
  const [brands, setBrands] = useState([]);

  const { updateNotification } = useNotification();

  const fetchRelatedBrands = async () => {
    const { error, brands } = await getSingleBrand(brandId);
    if (error) return updateNotification("error", "111111");

    setBrands([...brands]);
  };

  useEffect(() => {
    if (brandId) fetchRelatedBrands();
  }, [brandId]);
  return <BrandList name="Related Brands" brands={brands} />;
}