import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsTrash, BsPencilSquare } from "react-icons/bs";
import { deleteReview, getReviewByBrand } from "../../api/review";
import { useAuth, useNotification } from "../../hooks";
import Container from "../Container";
import CustomButtonLink from "../CustomButtonLink";
import RatingStar from "../RatingStar";
import ConfirmModal from "../modals/ConfirmModal";
import NotFoundAlert from "../NotFoundAlert";
import EditRatingModal from "../modals/EditRatingModal";
import AddReview from "../modals/AddReview";
import { useNavigate } from 'react-router-dom';

const getNameInitial = (name = "") => {
    return name[0].toUpperCase();
  };
  
  export default function BrandReviews() {
    const [reviews, setReviews] = useState([]);
    const [profileAuthorsReview, setProfileAuthorsReview] = useState(null);
    const [selectedReview, setSelectedReview] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [busy, setBusy] = useState(false);
    const nav = useNavigate();
  
    const { brandId } = useParams();
    const { authInfo } = useAuth();
    const profileId = authInfo.profile?.id;
  
    const { updateNotification } = useNotification();

    const fetchReviews = async () => {
      const { brand, error } = await getReviewByBrand(brandId);
      if (error) return updateNotification("error", error);
  
      setReviews([...brand.reviews]);
    };
  
    const findProfileAuthorsReview = () => {
      if (profileAuthorsReview) return setProfileAuthorsReview(null);
  
      const matched = reviews.find((review) => review.author.id === profileId);
      if (!matched)
        return alert("You have not made any reviews yet. Try to add a review.");

      setProfileAuthorsReview(matched);
    };
  
    const handleOnEditClick = () => {
      const { id, content, rating } = profileAuthorsReview;
      setSelectedReview({
        id,
        content,
        rating,
      });
  
      setShowEditModal(true);
    };

    const handleOnAddClick = () => {
      setShowAddModal(true);
    };
  
    const handleDeleteConfirm = async () => {
      setBusy(true);
      const { error, message } = await deleteReview(profileAuthorsReview.id);
      setBusy(false);
      if (error) return updateNotification("error", error);
  
      updateNotification("success", message);
  
      const updatedReviews = reviews.filter(
          (r) => r.id !== profileAuthorsReview.id
      );
      setReviews([...updatedReviews]);
      setProfileAuthorsReview(null);
      hideConfirmModal();
    };
  
    const handleOnReviewUpdate = (review) => {
      const updatedReview = {
        ...profileAuthorsReview,
        rating: review.rating,
        content: review.content,
      };
  
      setProfileAuthorsReview({ ...updatedReview });
  
      const newReviews = reviews.map((r) => {
        if (r.id === updatedReview.id) return updatedReview;
        return r;
      });
  
      setReviews([...newReviews]);
    };

    const handleOnReviewAdd = () => {
      console.log("successfully added");
      window.location.reload(false);
    };
  
  
    const displayConfirmModal = () => setShowConfirmModal(true);
    const hideConfirmModal = () => setShowConfirmModal(false);
    const hideEditModal = () => {
      setShowEditModal(false);
      setSelectedReview(null);
    };

    const hideAddModal = () => {
      setShowAddModal(false);
    };
  
    useEffect(() => {
      if (brandId) fetchReviews();
    }, [brandId]);

    return (
        <div className="min-h-screen pb-10">
          <Container className="xl:px-0 px-2 py-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-red-300">
              <span className="font-normal">
                Reviews:
              </span>
              </h1>

              {profileId ? (
                  <CustomButtonLink
                      label={profileAuthorsReview ? "View All" : "Find/Edit My Review"}
                      onClick={findProfileAuthorsReview}
                  />
              ) : null}

              {profileId ? (
                  <CustomButtonLink
                  label={"Add a Review"}
                  onClick={handleOnAddClick}
              />
              ) : null}

              <CustomButtonLink label={"Back"} onClick={() => {
                nav('/brands');
              }}/>
            </div>
  
            <NotFoundAlert text="No Reviews !" visible={!reviews.length} />
  
            {profileAuthorsReview ? (
                <div>
                  <ReviewCard review={profileAuthorsReview} />
                  <div className="flex space-x-3 text-red-300 text-xl p-3">
                    <button onClick={displayConfirmModal} type="button">
                      <BsTrash />
                    </button>
                    <button onClick={handleOnEditClick} type="button">
                      <BsPencilSquare />
                    </button>
                  </div>
                </div>
            ) : (
                <div className="space-y-3 mt-3">
                  {reviews.map((review) => (
                      <ReviewCard review={review} key={review.id} />
                  ))}
                </div>
            )}
          </Container>
  
          <ConfirmModal
              visible={showConfirmModal}
              onCancel={hideConfirmModal}
              onConfirm={handleDeleteConfirm}
              busy={busy}
              title="Are you sure?"
              subtitle="This action will remove this review permanently."
          />
  
          <EditRatingModal
              visible={showEditModal}
              initialState={selectedReview}
              onSuccess={handleOnReviewUpdate}
              onClose={hideEditModal}
          />
      
          <AddReview
              visible={showAddModal}
              onSuccess={handleOnReviewAdd}
              onClose={hideAddModal}
          />
        </div>
    );
  }
  
  const ReviewCard = ({ review }) => {
    if (!review) return null;
  
    const { author, content, rating } = review;
    return (
        <div className="flex space-x-3">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-light-subtle text-white text-xl select-none">
            {getNameInitial(author.name)}
          </div>
          <div className="text-red-400">
            <h1 className="font-semibold text-lg">
              {author.name}
            </h1>
            <RatingStar rating={rating} />
            <p>{content}</p>
          </div>
        </div>
    );
  };