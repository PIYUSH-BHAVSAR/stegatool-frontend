import { useState } from 'react';
import { DecryptResponse, ErrorResponse } from '@shared/api';

export function StegoForm() {
  const [encryptFile, setEncryptFile] = useState<File | null>(null);
  const [decryptFile, setDecryptFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [encryptKey, setEncryptKey] = useState('');
  const [decryptKey, setDecryptKey] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEncrypt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!encryptFile || !message || !encryptKey) {
      setError('Please fill all fields for encryption');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('image', encryptFile);
      formData.append('message', message);
      formData.append('key', encryptKey);

      const response = await fetch('/api/encrypt', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error: ErrorResponse = await response.json();
        throw new Error(error.detail);
      }

      // Download the encrypted image
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'stego_image.png';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      alert('Image encrypted and downloaded successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Encryption failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDecrypt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!decryptFile || !decryptKey) {
      setError('Please select an image and enter the decryption key');
      return;
    }

    setLoading(true);
    setError('');
    setDecryptedMessage('');

    try {
      const formData = new FormData();
      formData.append('image', decryptFile);
      formData.append('key', decryptKey);

      const response = await fetch('/api/decrypt', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error: ErrorResponse = await response.json();
        throw new Error(error.detail);
      }

      const result: DecryptResponse = await response.json();
      setDecryptedMessage(result.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Decryption failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-2">
            🔐 StegoSecure
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Secure image steganography with encryption
          </p>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 mx-2 sm:mx-0">
            <div className="flex items-start">
              <span className="text-red-500 mr-2 flex-shrink-0">⚠️</span>
              <span className="text-sm sm:text-base break-words">{error}</span>
            </div>
          </div>
        )}

        {/* Forms Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Encrypt Form */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-blue-50 px-4 sm:px-6 py-4 border-b border-blue-100">
              <h2 className="text-lg sm:text-xl font-semibold text-blue-800 flex items-center">
                <span className="mr-2">🔒</span>
                Encrypt Message
              </h2>
            </div>
            
            <form onSubmit={handleEncrypt} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Select Image
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={(e) => setEncryptFile(e.target.files?.[0] || null)}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    required
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">JPG/PNG, max 5MB</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Secret Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none h-24 sm:h-28"
                  placeholder="Enter your secret message..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Encryption Key
                </label>
                <input
                  type="password"
                  value={encryptKey}
                  onChange={(e) => setEncryptKey(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter encryption key..."
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Encrypting...
                  </>
                ) : (
                  <>
                    <span className="mr-2">🔐</span>
                    Encrypt & Download
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Decrypt Form */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-green-50 px-4 sm:px-6 py-4 border-b border-green-100">
              <h2 className="text-lg sm:text-xl font-semibold text-green-800 flex items-center">
                <span className="mr-2">🔓</span>
                Decrypt Message
              </h2>
            </div>
            
            <form onSubmit={handleDecrypt} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Select Stego Image
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={(e) => setDecryptFile(e.target.files?.[0] || null)}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  required
                />
                <p className="text-xs text-slate-500 mt-1">Image with hidden message</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Decryption Key
                </label>
                <input
                  type="password"
                  value={decryptKey}
                  onChange={(e) => setDecryptKey(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Enter decryption key..."
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Decrypting...
                  </>
                ) : (
                  <>
                    <span className="mr-2">🔍</span>
                    Decrypt Message
                  </>
                )}
              </button>
            </form>
            
            {/* Decrypted Message Result */}
            {decryptedMessage && (
              <div className="mx-4 sm:mx-6 mb-4 sm:mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-medium text-green-800 mb-2 flex items-center">
                  <span className="mr-2">✅</span>
                  Decrypted Message:
                </h3>
                <div className="bg-white p-3 rounded border border-green-200">
                  <p className="text-green-700 break-words text-sm sm:text-base">{decryptedMessage}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-xs sm:text-sm text-slate-500">
            Your files are processed securely and never stored on our servers
          </p>
        </div>
      </div>
    </div>
  );
}