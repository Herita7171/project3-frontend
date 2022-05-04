import React, { useState } from "react";
import { submitShopObject } from "../../api/shop";
import ModalContainer from "../modals/ModalContainer";
import ShopForm from "./ShopForm";

export default function CreateShop({ visible, onClose }) {

  const handleSubmit = async (data) => {
    const res = await submitShopObject(data);
    console.log(res);
  };
  
  return (
    <ModalContainer visible={visible} onClose={onClose}>
      <ShopForm onSubmit={handleSubmit}/>
    </ModalContainer>
  );
}
