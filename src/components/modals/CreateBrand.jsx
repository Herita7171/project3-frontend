import React, { useState } from "react";
import { createBrand } from "../../api/brand";
import { useNotification } from "../../hooks";
import SingleBrandForm from "../form/SingleBrandForm";
import ModalContainer from "./ModalContainer";

export default function CreateBrand({ visible, onClose }) {
  const [busy, setBusy] = useState(false);

  const { updateNotification } = useNotification();

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, brand } = await createBrand(data);
    setBusy(false);
    if (error) return updateNotification("error", error);
    updateNotification("success", "The brand has been created.");
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <SingleBrandForm
        onSubmit={!busy ? handleSubmit : null}
        title="Create New Brand"
        btnTitle="Create"
        busy={busy}
      />
    </ModalContainer>
  );
}