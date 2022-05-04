import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getSingleBrand } from "../../api/brand";
import { useAuth, useNotification } from "../../hooks";
import Container from "../Container";
import RatingStar from "../RatingStar";
import RelatedBrands from "../RelatedBrands";

const convertReviewCount = (count) => {
  if (count <= 999) return count;

  return parseFloat(count / 1000).toFixed(2) + "k";
};

export default function SingleBrandPage() {
  const [ready, setReady] = useState(false);
  const [brand, setBrand] = useState({});

  const { brandId } = useParams();
  const { updateNotification } = useNotification();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const fetchBrand = async () => {
    const { error, brand } = await getSingleBrand(brandId);
    if (error) return updateNotification("error", error);

    setReady(true);
    setBrand(brand);
  };

  const handleOnRateBrand = () => {
    if (!isLoggedIn) return navigate("/auth/signin");
  };

  useEffect(() => {
    if (brandId) fetchBrand();
  }, [brandId]);

  if (!ready)
    return (
      <div className="h-screen flex justify-center items-center bg-white">
        <p className="text-light-subtle animate-pulse">
          Please wait
        </p>
      </div>
    );

  const {
    id,
    logo,
    name,
    about,
    type,
    reviews = {},
  } = brand;

  return (
    <div className="bg-white min-h-screen pb-10">
      <Container>
        <div className="flex justify-between">
          <h1 className="text-4xl text-highlight font-semibold py-3">
            {name}
          </h1>
          <div className="flex flex-col items-end">
            <RatingStar rating={reviews.ratingAvg} />
            <Link
              className="text-highlight"
              to={"/brand/reviews/" + id}
            >
              {convertReviewCount(reviews.reviewCount)} Reviews
            </Link>

            <button
              className="text-highlight"
              type="button"
              onClick={handleOnRateBrand}
            >
              Rate Brand
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-light-subtle">{about}</p>

          <div className="flex space-x-2">
            <p className="text-light-subtle font-semibold">
              Type:
            </p>
            <p className="text-highlight">{type}</p>
          </div>
        </div>
        <div className="mt-3">
          <RelatedBrands brandId={brandId} />
        </div>
      </Container>
    </div>
  );
}
