import React, { useState } from 'react';
import { X, Heart, DollarSign, User, Mail, MessageSquare, Shield, Loader2 } from 'lucide-react';
import { Species } from '../../types/species';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  species?: Species;
}

const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose, species }) => {
  const [amount, setAmount] = useState<string>('25');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [anonymous, setAnonymous] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const predefinedAmounts = ['10', '25', '50', '100', '250'];

  const handleAmountSelect = (selectedAmount: string) => {
    setAmount(selectedAmount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setAmount('custom');
  };

  const getFinalAmount = (): number => {
    const amountValue = amount === 'custom' ? customAmount : amount;
    return Math.round(parseFloat(amountValue) * 100); // Convert to cents
  };

  const handleDonate = async () => {
    setIsLoading(true);
    setError('');

    try {
      const finalAmount = getFinalAmount();
      
      if (finalAmount < 100) {
        setError('Minimum donation amount is $1.00');
        setIsLoading(false);
        return;
      }

      if (!donorEmail.trim()) {
        setError('Email address is required');
        setIsLoading(false);
        return;
      }

      // Simulate donation processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      alert('Thank you for your donation! This is a demo - no actual payment was processed.');
      onClose();
    } catch (err) {
      console.error('Donation error:', err);
      setError('Failed to process donation. This is a demo application.');
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-emerald-200 p-6 flex justify-between items-center rounded-t-xl">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 p-2 rounded-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Make a Donation</h2>
              <p className="text-gray-600">
                {species ? `Support ${species.commonName} conservation` : 'Support endangered species conservation'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={isLoading}
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Demo Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              <strong>Demo Mode:</strong> This is a demonstration. No actual payments will be processed.
            </p>
          </div>

          {/* Species Info */}
          {species && (
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <div className="flex items-center gap-4">
                <img
                  src={species.image}
                  alt={species.commonName}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{species.commonName}</h3>
                  <p className="text-sm text-gray-600 italic">{species.scientificName}</p>
                  <span className="inline-block px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium mt-1">
                    {species.conservationStatus.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Amount Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <DollarSign className="w-4 h-4 inline mr-1" />
              Donation Amount (USD)
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-3">
              {predefinedAmounts.map((presetAmount) => (
                <button
                  key={presetAmount}
                  onClick={() => handleAmountSelect(presetAmount)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    amount === presetAmount
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                  disabled={isLoading}
                >
                  ${presetAmount}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAmount('custom')}
                className={`px-4 py-2 rounded-lg border-2 transition-all ${
                  amount === 'custom'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 hover:border-emerald-300'
                }`}
                disabled={isLoading}
              >
                Custom
              </button>
              {amount === 'custom' && (
                <div className="flex-1">
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    placeholder="Enter amount"
                    min="1"
                    step="0.01"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    disabled={isLoading}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Donor Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <User className="w-4 h-4" />
              Donor Information
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name (Optional)
              </label>
              <input
                type="text"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="Your full name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <MessageSquare className="w-4 h-4 inline mr-1" />
                Message (Optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Leave a message of support..."
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="anonymous"
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
                className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                disabled={isLoading}
              />
              <label htmlFor="anonymous" className="text-sm text-gray-700 flex items-center gap-1">
                <Shield className="w-4 h-4" />
                Make this donation anonymous
              </label>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Donation Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Donation Summary</h4>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Amount:</span>
              <span className="font-semibold text-lg">
                ${amount === 'custom' ? customAmount || '0.00' : amount}.00 USD
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              This is a demo application. No actual payment will be processed.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleDonate}
              disabled={isLoading || !donorEmail.trim() || getFinalAmount() < 100}
              className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Heart className="w-4 h-4" />
                  Donate Now (Demo)
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;