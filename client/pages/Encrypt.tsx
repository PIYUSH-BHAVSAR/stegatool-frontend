import { useState } from "react";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import FileUpload from "@/components/FileUpload";
import { Eye, EyeOff, Download, CheckCircle2 } from "lucide-react";

export default function Encrypt() {
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [encryptionKey, setEncryptionKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [stegoImage, setStegoImage] = useState<string | null>(null);

  const messageLength = message.length;
  const maxMessageLength = 1000;

  const handleFileSelect = (file: File) => {
    setImage(file);
    setError("");
  };

  const handleEncrypt = async () => {
    setError("");

    // Validation
    if (!image) {
      setError("Please upload an image");
      return;
    }

    if (!message.trim()) {
      setError("Please enter a message to encrypt");
      return;
    }

    if (!encryptionKey.trim()) {
      setError("Please enter an encryption key");
      return;
    }

    if (message.length > maxMessageLength) {
      setError(`Message is too long (max ${maxMessageLength} characters)`);
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("message", message);
      formData.append("key", encryptionKey);

      const response = await fetch("/api/encrypt", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Failed to encrypt image");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setStegoImage(url);
      setSuccess(true);

      // Reset form
      setImage(null);
      setMessage("");
      setEncryptionKey("");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (stegoImage) {
      const link = document.createElement("a");
      link.href = stegoImage;
      link.download = `stego-image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const resetForm = () => {
    setImage(null);
    setMessage("");
    setEncryptionKey("");
    setStegoImage(null);
    setSuccess(false);
    setError("");
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-3">Encrypt & Embed</h1>
            <p className="text-foreground/70">
              Hide your secret message inside an image with military-grade encryption
            </p>
          </div>

          {!success ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form Section */}
              <div className="space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold mb-3">
                    📤 Select Image to Hide Message In
                  </label>
                  <FileUpload
                    onFileSelect={handleFileSelect}
                    label="Choose Image"
                    error={error && !image ? error : undefined}
                  />
                  {image && (
                    <p className="text-xs text-success mt-2 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Image selected: {image.name}
                    </p>
                  )}
                </div>

                {/* Secret Message */}
                <div>
                  <label className="block text-sm font-semibold mb-3">
                    📝 Secret Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value.slice(0, maxMessageLength));
                      setError("");
                    }}
                    placeholder="Enter the secret message to hide inside the image"
                    className="w-full px-4 py-3 rounded-lg glass-card border border-border/30 text-foreground placeholder-foreground/40 focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 resize-none transition-all"
                    rows={6}
                  />
                  <div className="flex justify-between items-center mt-2 text-xs text-foreground/60">
                    <span>{messageLength} / {maxMessageLength} characters</span>
                    {messageLength > maxMessageLength * 0.8 && (
                      <span className="text-accent">Approaching limit</span>
                    )}
                  </div>
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
                      placeholder="Enter encryption key (share this securely with recipient)"
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

                {/* Submit Button */}
                <Button
                  onClick={handleEncrypt}
                  loading={loading}
                  disabled={!image || !message.trim() || !encryptionKey.trim() || loading}
                  size="lg"
                  variant="primary"
                  className="w-full"
                >
                  Encrypt & Embed
                </Button>

                {/* Security Badge */}
                <div className="security-badge w-full justify-center">
                  <span>All processing is temporary. No data is stored.</span>
                </div>
              </div>

              {/* Info Section */}
              <div className="space-y-6">
                <div className="glass-card p-6 rounded-lg border border-border/30">
                  <h3 className="text-lg font-semibold mb-4">How It Works</h3>
                  <ol className="space-y-3 text-sm text-foreground/80">
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-semibold">
                        1
                      </span>
                      <span>Upload an image (JPG or PNG)</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-semibold">
                        2
                      </span>
                      <span>Enter your secret message (max {maxMessageLength} characters)</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-semibold">
                        3
                      </span>
                      <span>Set a strong encryption key</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-semibold">
                        4
                      </span>
                      <span>Download your encrypted stego image</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-semibold">
                        5
                      </span>
                      <span>Share the image with the recipient (keep key secret!)</span>
                    </li>
                  </ol>
                </div>

                <div className="glass-card p-6 rounded-lg border border-border/30">
                  <h3 className="text-lg font-semibold mb-3">💡 Tips</h3>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    <li>• Use a strong, random encryption key</li>
                    <li>• Keep the key private and secure</li>
                    <li>• The encrypted image looks like any normal image</li>
                    <li>• Message size must not exceed image capacity</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            /* Success State */
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="glass-card p-8 rounded-lg border border-success/30 bg-success/5 text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-success/20">
                    <CheckCircle2 className="w-8 h-8 text-success" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2 text-success">
                  Message Successfully Embedded
                </h2>
                <p className="text-foreground/70 mb-6">
                  Your message has been encrypted and hidden inside the image. Download the stego image and share it securely.
                </p>

                {stegoImage && (
                  <div className="mb-6 rounded-lg overflow-hidden border border-border/30">
                    <img
                      src={stegoImage}
                      alt="Stego Image"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={downloadImage}
                    size="lg"
                    variant="primary"
                    className="flex-1"
                  >
                    <Download className="w-5 h-5" />
                    Download Image
                  </Button>
                  <Button
                    onClick={resetForm}
                    size="lg"
                    variant="secondary"
                    className="flex-1"
                  >
                    Encrypt Another
                  </Button>
                </div>
              </div>

              <div className="glass-card p-6 rounded-lg border border-border/30">
                <h3 className="text-lg font-semibold mb-3">Next Steps</h3>
                <ol className="space-y-2 text-sm text-foreground/80">
                  <li>✅ Save the downloaded image securely</li>
                  <li>📧 Share the image with your recipient via any channel</li>
                  <li>🔐 Securely communicate the encryption key separately</li>
                  <li>🔓 Recipient can decrypt using the Decrypt feature</li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
