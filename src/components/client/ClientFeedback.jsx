import React, { useState } from 'react';
import { Star, MessageSquare, Send } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const ClientFeedback = () => {
  const { t } = useLanguage();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const userReviews = [
    {
      id: 1,
      rating: 5,
      comment: 'Excellent service! Water quality is top-notch.',
      date: '2024-12-08',
      reply: 'Thank you for your feedback! We are glad you enjoyed our service.'
    },
    {
      id: 2,
      rating: 4,
      comment: 'Good delivery time, very satisfied.',
      date: '2024-12-07'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit feedback
    setRating(0);
    setComment('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">{t('feedback.title')}</h2>

      {/* Feedback Form */}
      <div className="card p-8 mb-8">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <MessageSquare className="w-6 h-6" />
          {t('feedback.writeReview')}
        </h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 mb-3">{t('feedback.yourRating')}</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="text-4xl hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-10 h-10 ${
                      star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">{t('feedback.yourComment')}</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              className="input-field"
              placeholder={t('feedback.shareExperience')}
            />
          </div>

          <button
            type="submit"
            disabled={rating === 0 || !comment.trim()}
            className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
            {t('feedback.submitReview')}
          </button>
        </form>
      </div>

      {/* User's Reviews */}
      <div className="card p-8">
        <h3 className="text-xl font-semibold mb-6">{t('feedback.yourReviews')}</h3>
        
        {userReviews.length > 0 ? (
          <div className="space-y-6">
            {userReviews.map(review => (
              <div key={review.id} className="border-b pb-6 last:border-b-0">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                
                <p className="text-gray-700 mb-3">{review.comment}</p>
                
                {review.reply && (
                  <div className="ml-6 pl-4 border-l-2 border-blue-200 bg-blue-50 p-4 rounded-r-lg">
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-semibold">{t('feedback.companyReply')}</span>
                    </p>
                    <p className="text-gray-700">{review.reply}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            {t('feedback.noReviews')}
          </p>
        )}
      </div>
    </div>
  );
};

export default ClientFeedback;