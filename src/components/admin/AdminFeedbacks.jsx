import React from 'react';
import { Star, Phone, Calendar } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const AdminFeedback = () => {
  const { t } = useLanguage();

  const feedbacks = [
    {
      id: 1,
      customer: 'Jean Mugabo',
      phone: '0788123456',
      rating: 5,
      comment: 'Excellent service! Water quality is top-notch.',
      date: '2024-12-08'
    },
    {
      id: 2,
      customer: 'Marie Uwase',
      phone: '0722345678',
      rating: 4,
      comment: 'Good delivery time, very satisfied.',
      date: '2024-12-07'
    },
    {
      id: 3,
      customer: 'Paul Habimana',
      phone: '0788987654',
      rating: 5,
      comment: 'Best water service in Kigali!',
      date: '2024-12-06'
    }
  ];

  const averageRating = feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('feedback.title')}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="card p-6 text-center">
          <div className="text-4xl font-bold text-gray-800 mb-2">{averageRating.toFixed(1)}</div>
          <div className="flex justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-5 h-5 ${i < Math.floor(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600">{t('feedback.averageRating')}</p>
        </div>

        <div className="card p-6 text-center">
          <div className="text-4xl font-bold text-gray-800 mb-2">{feedbacks.length}</div>
          <p className="text-sm text-gray-600">{t('feedback.totalReviews')}</p>
        </div>

        <div className="card p-6 text-center">
          <div className="text-4xl font-bold text-gray-800 mb-2">96%</div>
          <p className="text-sm text-gray-600">{t('feedback.satisfactionRate')}</p>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4">{t('feedback.recentReviews')}</h3>
        <div className="space-y-4">
          {feedbacks.map(feedback => (
            <div key={feedback.id} className="border-b pb-4 last:border-b-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold">{feedback.customer}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-3 h-3" />
                    {feedback.phone}
                    <Calendar className="w-3 h-3 ml-2" />
                    {feedback.date}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(feedback.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700">{feedback.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminFeedback;