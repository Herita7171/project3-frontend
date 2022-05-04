import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const addReview = async (brandId, reviewData) => {
  const token = getToken();
  console.log(brandId, reviewData)
  try {
    const { data } = await client.post("/review/add/" + brandId, reviewData, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    alert("A review was already made. Try to edit your review.");
    return catchError(error);
  }
};

export const deleteReview = async (reviewId) => {
  const token = getToken();
  try {
    const { data } = await client.delete(`/review/${reviewId}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getReviewByBrand = async (brandId) => {
  try {
    const { data } = await client(`/review/get-reviews-by-brand/${brandId}`);
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const updateReview = async (reviewId, reviewData) => {
  const token = getToken();
  try {
    const { data } = await client.patch(`/review/${reviewId}`, reviewData, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};