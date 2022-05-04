import React, { useState } from "react";
import { updateBrand } from "../../api/brand";
import { useNotification } from "../../hooks";
import BrandForm from "../form/BrandForm";
import ModalContainer from "./ModalContainer";

export default function UpdateBrand({
  visible,
  initialState,
  onSuccess,
  onClose,
}) {
  const [busy, setBusy] = useState(false);

  const { updateNotification } = useNotification();

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, brand } = await updateBrand(initialState.id, data);
    setBusy(false);
    if (error) return updateNotification("error", error);

    onSuccess(brand);
    updateNotification("success", "Brand updated successfully.");
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <BrandForm
        onSubmit={!busy ? handleSubmit : null}
        title="Update Brand"
        btnTitle="Update"
        busy={busy}
        initialState={initialState}
      />
    </ModalContainer>
  );
}