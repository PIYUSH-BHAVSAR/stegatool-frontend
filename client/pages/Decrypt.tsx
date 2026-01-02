import { useState } from "react";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import FileUpload from "@/components/FileUpload";
import { Eye, EyeOff, Copy, CheckCircle2 } from "lucide-react";

export default function Decrypt() {
  const [image, setImage] = useState<File | null>(null);
  const [encryptionKey, setEncryptionKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [extractedMessage, setExtractedMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFileSelect = (file: File) => {
    setImage(file);
    setError("");
  };

  const handleExtract = async () => {
    setError("");

    // Validation
    if (!image) {
      setError("Please upload a stego image");
      return;
    }

    if (!encryptionKey.trim()) {
      setError("Please enter the encryption key");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("key", encryptionKey);

      const response = await fetch("/api/decrypt", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail || "Unable to decrypt message. Invalid key or corrupted image."
        );
      }

      const data = await response.json();
      setExtractedMessage(data.message || "");
      setSuccess(true);

      // Reset form
      setImage(null);
      setEncryptionKey("");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(extractedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetForm = () => {
    setImage(null);
    setEncryptionKey("");
    setExtractedMessage("");
    setSuccess(false);
    setError("");
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-3">Extract Message</h1>
            <p className="text-foreground/70">
              Decrypt hidden messages from stego images using your encryption key
            </p>
          </div>

          {!success ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form Section */}
              <div className="space-y-6">
                {/* Stego Image Upload */}
                <div>
                  <label className="block text-sm font-semibold mb-3">
                    📤 Upload Stego Image
                  </label>
                  <FileUpload
                    onFileSelect={handleFileSelect}
                    label="Choose Stego Image"
                    error={error && !image ? error : undefined}
                  />
                  {image && (
                    <p className="text-xs text-success mt-2 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Image selected: {image.name}
                    </p>
                  )}
                </div>

                {/* Encryption Key */}
                <div>
                  <label className="block text-sm font-semibold mb-3">
                    🔑 Encryption Key
                  </label>
                  <div className="relative">
                    <input
                      type={showKey ? "text" : "password"}
                      value={encryptionKey}
                      onChange={(e) => {
                        setEncryptionKey(e.target.value);
                        setError("");
                      }}
                      placeholder="Enter the same key used during encryption"
                      className="w-full px-4 py-3 pr-12 rounded-lg glass-card border border-border/30 text-foreground placeholder-foreground/40 focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowKey(!showKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-accent transition-colors"
                    >
                      {showKey ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Error Alert */}
                {error && !image && (
                  <div className="p-4 rounded-lg bg-error/10 border border-error/30 text-error text-sm">
                    {error}
                  </div>
                )}

                {/* Extract Button */}
                <Button
                  onClick={handleExtract}
                  loading={loading}
                  disabled={!image || !encryptionKey.trim() || loading}
                  size="lg"
                  variant="primary"
                  className="w-full"
                >
                  Extract Message
                </Button>

                {/* Security Badge */}
                <div className="security-badge w-full justify-center">
                  <span>All processing is temporary. No data is stored.</span>
                </div>
              </div>

              {/* Info Section */}
              <div className="space-y-6">
                <div className="glass-card p-6 rounded-lg border border-border/30">
                  <h3 className="text-lg font-semibold mb-4">How to Decrypt</h3>
                  <ol className="space-y-3 text-sm text-foreground/80">
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-semibold">
                        1
                      </span>
                      <span>Download the stego image from your recipient</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-semibold">
                        2
                      </span>
                      <span>Upload the image here</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-semibold">
                        3
                      </span>
                      <span>Enter the encryption key (provided by sender)</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-semibold">
                        4
                      </span>
                      <span>Click "Extract Message" to reveal the hidden text</span>
                    </li>
                  </ol>
                </div>

                <div className="glass-card p-6 rounded-lg border border-border/30">
                  <h3 className="text-lg font-semibold mb-3">⚠️ Important</h3>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    <li>• The encryption key is case-sensitive</li>
                    <li>• Wrong key will result in decryption failure</li>
                    <li>• Image must not be corrupted or modified</li>
                    <li>• Ask sender if extraction fails</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            /* Success State */
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="glass-card p-8 rounded-lg border border-success/30 bg-success/5">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-success/20">
                    <CheckCircle2 className="w-8 h-8 text-success" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2 text-success text-center">
                  Message Extracted Successfully
                </h2>
                <p className="text-foreground/70 text-center mb-6">
                  Here is the decrypted message hidden in the image:
                </p>

                {/* Message Display */}
                <div className="mb-6 space-y-3">
                  <textarea
                    value={extractedMessage}
                    readOnly
                    className="w-full px-4 py-4 rounded-lg glass-card border border-border/30 text-foreground resize-none focus:outline-none"
                    rows={6}
                  />
                  <Button
                    onClick={copyToClipboard}
                    variant="secondary"
                    className="w-full"
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? "Copied!" : "Copy to Clipboard"}
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={resetForm}
                    size="lg"
                    variant="primary"
                    className="flex-1"
                  >
                    Decrypt Another
                  </Button>
                </div>
              </div>

              <div className="glass-card p-6 rounded-lg border border-border/30">
                <h3 className="text-lg font-semibold mb-3">What's Next?</h3>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li>✅ Message successfully decrypted</li>
                  <li>📋 Copy the message or keep the textarea open</li>
                  <li>💬 You can now use this information</li>
                  <li>🔄 Need to decrypt another? Click the button above</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
