import React from "react";
import { Link } from "react-router-dom";
import GridContainer from "../GridContainer";
import RatingStar from "../RatingStar";

const trimTitle = (text = "") => {
  if (text.length <= 20) return text;
  return text.substring(0, 20) + "..";
};

export default function BrandList({ name, brands = [] }) {
  if (!brands.length) return null;

  return (
    <div>
      <h1 className="text-2xl text-secondary font-semibold mb-5">
        {name}
      </h1>
      <GridContainer>
        {brands.map((brand) => {
          return <ListItem key={brand.id} brand={brand} />;
        })}
      </GridContainer>
    </div>
  );
}

const ListItem = ({ brand }) => {
  const { id, name, logo, reviews } = brand;
  return (
    <Link to={"/brand/" + id}>
      <img className="aspect-video object-cover" src={brand} alt={name} />
      <h1
        className="text-lg text-secondary font-semibold"
        name={name}
      >
        {trimTitle(name)}
      </h1>
      <RatingStar rating={reviews.ratingAvg} />
    </Link>
  );
};
