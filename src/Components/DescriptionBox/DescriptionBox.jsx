


import React, { useState, useEffect, useCallback } from 'react';
import './DescriptionBox.css';

const DescriptionBox = ({ productId }) => {
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchReviews = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:4000/get/user/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
      const data = await response.json();
      if (data.Success) {
        setReviews(data.reviews);
      } else {
        console.error('Failed to fetch reviews:', data.error);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }, [productId]);

  useEffect(() => {
    if (productId) {
      console.log('Product ID:', productId);
      fetchReviews();
    } else {
      console.error('');
    }
  }, [fetchReviews, productId]);

  const handleReviewSubmit = async () => {
    if (!productId) {
      alert('');
      return;
    }

    if (review.trim() === '') {
      alert('Please write a review before submitting!');
      return;
    }

    const cust_id = localStorage.getItem('userId');
    if (!cust_id) {
      alert('You need to log in to submit a review.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:4000/user/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: review, cust_id, productId }),
      });
      const data = await response.json();
      if (data.Success) {
        alert(data.message);
        setReview('');
        fetchReviews();
      } else {
        alert(data.error || 'Failed to submit review.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!productId) {
    return <p></p>;
  }

  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box"></div>
        <div className="descriptionbox-nav-box fade">
          <button
            className="review-button"
            onClick={() => setShowReviewForm(!showReviewForm)}
          >
            Reviews ({reviews.length})
          </button>
        </div>
      </div>

      {showReviewForm && (
        <div className="descriptionbox-reviews">
          <h3>Customer Reviews</h3>
          <div className="reviews-list">
            {reviews.length > 0 ? (
              reviews.map((rev, index) => (
                <div key={index} className="review-item">
                  <p>
                    <strong>{rev.user}</strong>: {rev.Comment}
                  </p>
                  <small>{new Date(rev.review_date).toLocaleString()}</small>
                </div>
              ))
            ) : (
              <p></p>
            )}
          </div>
          <div className="add-review">
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review here..."
              rows="4"
              cols="50"
            />
            <button
              className="submit-review"
              onClick={handleReviewSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DescriptionBox;
