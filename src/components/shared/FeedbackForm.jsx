import React, { useState } from 'react';
import { Star, Send, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useForm } from '../../hooks/useForm';

const FeedbackForm = ({ onSubmit, onCancel, initialRating = 0, initialComment = '' }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const validate = (values) => {
    const errors = {};
    
    if (!values.comment?.trim()) {
      errors.comment = t('feedback.errors.commentRequired');
    }
    
    if (rating === 0) {
      errors.rating = t('feedback.errors.ratingRequired');
    }
    
    return errors;
  };

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setFieldError
  } = useForm({
    comment: initialComment
  }, validate);

  const handleFormSubmit = async (formValues, { resetForm }) => {
    if (rating === 0) {
      setFieldError('rating', t('feedback.errors.ratingRequired'));
      return;
    }

    const feedbackData = {
      rating,
      comment: formValues.comment,
      customerName: user?.name || 'Anonymous',
      customerPhone: user?.phone || '',
      customerEmail: user?.email || '',
      date: new Date().toISOString().split('T')[0]
    };

    try {
      await onSubmit(feedbackData);
      resetForm();
      setRating(0);
      if (onCancel) onCancel();
    } catch (error) {
      setFieldError('submit', error.message);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {onCancel && (
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">{t('feedback.writeReview')}</h3>
          <button
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
      
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Rating Stars */}
        <div>
          <label className="block text-gray-700 mb-3">
            {t('feedback.yourRating')}
            <span className="text-red-500 ml-1">*</span>
          </label>
          
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="text-4xl hover:scale-110 transition-transform"
                aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
              >
                <Star
                  className={`w-10 h-10 transition-colors ${
                    star <= (hoverRating || rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
          
          {errors.rating && (
            <p className="text-red-500 text-sm mt-2">{errors.rating}</p>
          )}
          
          <div className="mt-3 flex justify-between text-sm text-gray-600">
            <span>{t('feedback.poor')}</span>
            <span>{t('feedback.excellent')}</span>
          </div>
        </div>

        {/* Comment */}
        <div>
          <label className="block text-gray-700 mb-2">
            {t('feedback.yourComment')}
            <span className="text-red-500 ml-1">*</span>
          </label>
          <textarea
            name="comment"
            value={values.comment}
            onChange={handleChange}
            rows="4"
            className={`input-field ${errors.comment ? 'border-red-500' : ''}`}
            placeholder={t('feedback.shareExperience')}
            maxLength="500"
          />
          <div className="flex justify-between mt-2">
            {errors.comment && (
              <p className="text-red-500 text-sm">{errors.comment}</p>
            )}
            <span className="text-sm text-gray-500 ml-auto">
              {values.comment?.length || 0}/500
            </span>
          </div>
        </div>

        {/* Customer Info (if not logged in) */}
        {!user && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">
                {t('feedback.yourName')}
              </label>
              <input
                type="text"
                name="name"
                value={values.name || ''}
                onChange={handleChange}
                className="input-field"
                placeholder={t('feedback.namePlaceholder')}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">
                {t('feedback.yourEmail')}
              </label>
              <input
                type="email"
                name="email"
                value={values.email || ''}
                onChange={handleChange}
                className="input-field"
                placeholder={t('feedback.emailPlaceholder')}
              />
            </div>
          </div>
        )}

        {/* Submit Error */}
        {errors.submit && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{errors.submit}</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex gap-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {t('common.cancel')}
            </button>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting || rating === 0 || !values.comment?.trim()}
            className={`flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
              onCancel ? 'flex-1' : 'w-full'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {t('common.submitting')}
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                {t('feedback.submitReview')}
              </>
            )}
          </button>
        </div>

        {/* Privacy Note */}
        <p className="text-sm text-gray-500 text-center">
          {t('feedback.privacyNote')}
        </p>
      </form>
    </div>
  );
};

export default FeedbackForm;