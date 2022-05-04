import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const createBrand = async (formData) => {
  const token = getToken();
  try {
    const { data } = await client.post("/brand/create", formData, {
      headers: {
        authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const searchBrand = async (query) => {
  const token = getToken();
  try {
    const { data } = await client(`/brand/search?name=${query}`, {
      headers: {
        authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getSingleBrand = async (id) => {
  try {
    const { data } = await client("/brand/single/" + id);
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getTopBrands = async (type) => {
  try {
    let endpoint = "/brand/top-brands";
    if (type) endpoint = endpoint + "?type=" + type; 
    const {data} = await client(endpoint);
    return data;
  } catch (error) {
    return catchError(error);
  }
}

export const getLatestSubmissions = async () => {
  try {
    const { data } = await client("/brand/latest-submissions");
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getRelatedBrands = async (id) => {
  try {
    const { data } = await client("/brand/related/" + id);
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const deleteBrand = async (id) => {
  const token = getToken();
  try {
    const { data } = await client.delete("/brand/" + id, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getBrands = async (pageNo, limit) => {
  const token = getToken();
  try {
    const { data } = await client(
      `/brand/brands?pageNo=${pageNo}&limit=${limit}`,
      {
        headers: {
          authorization: "Bearer " + token,
          "content-type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const updateBrand = async (id, formData) => {
  const token = getToken();
  try {
    const { data } = await client.post("/brand/update/" + id, formData, {
      headers: {
        authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};