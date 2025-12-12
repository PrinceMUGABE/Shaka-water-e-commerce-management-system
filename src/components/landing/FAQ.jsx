import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Mail } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const FAQ = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: t('faq.questions.deliveryAreas'),
      answer: t('faq.answers.deliveryAreas')
    },
    {
      question: t('faq.questions.deliveryTime'),
      answer: t('faq.answers.deliveryTime')
    },
    {
      question: t('faq.questions.paymentMethods'),
      answer: t('faq.answers.paymentMethods')
    },
    {
      question: t('faq.questions.waterSafety'),
      answer: t('faq.answers.waterSafety')
    },
    {
      question: t('faq.questions.orderCancellation'),
      answer: t('faq.answers.orderCancellation')
    },
    {
      question: t('faq.questions.subscription'),
      answer: t('faq.answers.subscription')
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <HelpCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {t('faq.title')}
          </h2>
          <p className="text-gray-600">
            {t('faq.subtitle')}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50 border-t">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 text-center">
          <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {t('faq.stillHaveQuestions')}
          </h3>
          <p className="text-gray-600 mb-6">
            {t('faq.contactSupport')}
          </p>
          <a
            href="mailto:support@crystalflow.rw"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Mail className="w-5 h-5" />
            {t('faq.contactUs')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;