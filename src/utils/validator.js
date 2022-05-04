export const validateShop = (shopInfo) => {
    const {
      shopName,
      shopAbout,
      shopType,
      city,
      address,
      includes,
    } = shopInfo;
  
    if (!shopName.trim()) return { error: "The shop name is missing." };
    if (!shopAbout.trim()) return { error: "The about section is required." };
    if (!shopType.trim()) return { error: "The shop type is missing." };
    if (!city.trim()) return { error: "The city is missing."};
    if (!address.trim()) return { error: "The shop address is missing."};
    if (!includes.length) return { error: "The brands are missing." };
    for (let c of includes) {
      if (typeof c !== "object") return { error: "Invalid brand." };
    }
    return { error: null };
};