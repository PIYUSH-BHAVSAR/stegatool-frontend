import Layout from "@/components/Layout";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

export default function Docs() {
  const [copiedBlock, setCopiedBlock] = useState<string | null>(null);

  const copyToClipboard = (text: string, blockId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBlock(blockId);
    setTimeout(() => setCopiedBlock(null), 2000);
  };

  const CodeBlock = ({
    code,
    language = "json",
    blockId,
  }: {
    code: string;
    language?: string;
    blockId: string;
  }) => (
    <div className="relative">
      <div className="code-block">
        <pre>
          <code>{code}</code>
        </pre>
      </div>
      <button
        onClick={() => copyToClipboard(code, blockId)}
        className="absolute top-3 right-3 p-2 rounded-lg bg-card/80 hover:bg-accent/20 transition-colors"
      >
        {copiedBlock === blockId ? (
          <Check className="w-4 h-4 text-success" />
        ) : (
          <Copy className="w-4 h-4 text-foreground/60" />
        )}
      </button>
    </div>
  );

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-3">API Documentation</h1>
            <p className="text-foreground/70 text-lg">
              Complete API reference for the StegoSecure steganography platform.
            </p>
          </div>

          {/* Overview Section */}
          <section className="mb-12 glass-card p-8 rounded-lg border border-border/30">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-foreground/80 mb-6">
              The StegoSecure API provides endpoints for encrypting messages into images and decrypting them back. All requests and responses use JSON format, with image files sent as multipart/form-data.
            </p>
            <div className="space-y-3 text-sm text-foreground/80">
              <p>
                <strong>Base URL:</strong>{" "}
                <code className="bg-card/50 px-2 py-1 rounded text-accent">
                  https://api.stegosecure.com
                </code>
              </p>
              <p>
                <strong>Authentication:</strong> No authentication required for this
                version
              </p>
              <p>
                <strong>Rate Limit:</strong> 100 requests per minute per IP
              </p>
            </div>
          </section>

          {/* Encrypt Endpoint */}
          <section className="mb-12">
            <div className="glass-card p-8 rounded-lg border border-border/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/20">
                  <span className="text-lg">🔐</span>
                </div>
                <h2 className="text-2xl font-bold">Encrypt Endpoint</h2>
              </div>

              <div className="space-y-6">
                {/* Method and URL */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground/70">
                    REQUEST
                  </p>
                  <CodeBlock
                    code="POST /api/encrypt"
                    language="text"
                    blockId="encrypt-method"
                  />
                </div>

                {/* Description */}
                <div>
                  <p className="text-foreground/80">
                    Encrypts a message and embeds it into an image using steganography.
                  </p>
                </div>

                {/* Parameters */}
                <div className="space-y-3">
                  <p className="font-semibold text-foreground">Parameters</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border/30">
                          <th className="text-left py-2 px-3 text-foreground/80">
                            Name
                          </th>
                          <th className="text-left py-2 px-3 text-foreground/80">
                            Type
                          </th>
                          <th className="text-left py-2 px-3 text-foreground/80">
                            Required
                          </th>
                          <th className="text-left py-2 px-3 text-foreground/80">
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-foreground/70">
                        <tr className="border-b border-border/20">
                          <td className="py-2 px-3 font-mono text-accent">
                            image
                          </td>
                          <td className="py-2 px-3">File (jpg, png)</td>
                          <td className="py-2 px-3">
                            <span className="text-success">Yes</span>
                          </td>
                          <td className="py-2 px-3">
                            Image file to hide message in
                          </td>
                        </tr>
                        <tr className="border-b border-border/20">
                          <td className="py-2 px-3 font-mono text-accent">
                            message
                          </td>
                          <td className="py-2 px-3">String</td>
                          <td className="py-2 px-3">
                            <span className="text-success">Yes</span>
                          </td>
                          <td className="py-2 px-3">
                            Secret message (max 1000 characters)
                          </td>
                        </tr>
                        <tr className="border-b border-border/20">
                          <td className="py-2 px-3 font-mono text-accent">
                            key
                          </td>
                          <td className="py-2 px-3">String</td>
                          <td className="py-2 px-3">
                            <span className="text-success">Yes</span>
                          </td>
                          <td className="py-2 px-3">Encryption key</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Request Example */}
                <div className="space-y-3">
                  <p className="font-semibold text-foreground">Request Example</p>
                  <CodeBlock
                    code={`curl -X POST https://api.stegosecure.com/api/encrypt \\
  -F "image=@image.jpg" \\
  -F "message=Hello, World!" \\
  -F "key=MySecureKey123"`}
                    language="bash"
                    blockId="encrypt-request"
                  />
                </div>

                {/* Response Example */}
                <div className="space-y-3">
                  <p className="font-semibold text-foreground">Response</p>
                  <p className="text-sm text-foreground/70">
                    Returns a PNG image file with the embedded encrypted message.
                  </p>
                  <CodeBlock
                    code={`HTTP/1.1 200 OK
Content-Type: image/png
Content-Disposition: attachment; filename="stego-image.png"

[Binary image data with encrypted message embedded]`}
                    language="text"
                    blockId="encrypt-response"
                  />
                </div>

                {/* Error Responses */}
                <div className="space-y-3">
                  <p className="font-semibold text-foreground">Error Responses</p>
                  <div className="space-y-2">
                    <div className="p-3 rounded-lg bg-error/5 border border-error/30">
                      <p className="text-sm font-mono text-error mb-1">
                        400 Bad Request
                      </p>
                      <CodeBlock
                        code={`{
  "detail": "Image file is required"
}`}
                        language="json"
                        blockId="encrypt-error-400"
                      />
                    </div>
                    <div className="p-3 rounded-lg bg-error/5 border border-error/30">
                      <p className="text-sm font-mono text-error mb-1">
                        413 Payload Too Large
                      </p>
                      <CodeBlock
                        code={`{
  "detail": "Image file is too large (max 10MB)"
}`}
                        language="json"
                        blockId="encrypt-error-413"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Decrypt Endpoint */}
          <section className="mb-12">
            <div className="glass-card p-8 rounded-lg border border-border/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/20">
                  <span className="text-lg">🔓</span>
                </div>
                <h2 className="text-2xl font-bold">Decrypt Endpoint</h2>
              </div>

              <div className="space-y-6">
                {/* Method and URL */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground/70">
                    REQUEST
                  </p>
                  <CodeBlock
                    code="POST /api/decrypt"
                    language="text"
                    blockId="decrypt-method"
                  />
                </div>

                {/* Description */}
                <div>
                  <p className="text-foreground/80">
                    Decrypts and extracts a message from a stego image using the
                    provided encryption key.
                  </p>
                </div>

                {/* Parameters */}
                <div className="space-y-3">
                  <p className="font-semibold text-foreground">Parameters</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border/30">
                          <th className="text-left py-2 px-3 text-foreground/80">
                            Name
                          </th>
                          <th className="text-left py-2 px-3 text-foreground/80">
                            Type
                          </th>
                          <th className="text-left py-2 px-3 text-foreground/80">
                            Required
                          </th>
                          <th className="text-left py-2 px-3 text-foreground/80">
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-foreground/70">
                        <tr className="border-b border-border/20">
                          <td className="py-2 px-3 font-mono text-accent">
                            image
                          </td>
                          <td className="py-2 px-3">File (jpg, png)</td>
                          <td className="py-2 px-3">
                            <span className="text-success">Yes</span>
                          </td>
                          <td className="py-2 px-3">Stego image file</td>
                        </tr>
                        <tr className="border-b border-border/20">
                          <td className="py-2 px-3 font-mono text-accent">
                            key
                          </td>
                          <td className="py-2 px-3">String</td>
                          <td className="py-2 px-3">
                            <span className="text-success">Yes</span>
                          </td>
                          <td className="py-2 px-3">
                            Encryption key used during encoding
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Request Example */}
                <div className="space-y-3">
                  <p className="font-semibold text-foreground">Request Example</p>
                  <CodeBlock
                    code={`curl -X POST https://api.stegosecure.com/api/decrypt \\
  -F "image=@stego-image.png" \\
  -F "key=MySecureKey123"`}
                    language="bash"
                    blockId="decrypt-request"
                  />
                </div>

                {/* Response Example */}
                <div className="space-y-3">
                  <p className="font-semibold text-foreground">Response</p>
                  <CodeBlock
                    code={`{
  "message": "Hello, World!"
}`}
                    language="json"
                    blockId="decrypt-response"
                  />
                </div>

                {/* Error Responses */}
                <div className="space-y-3">
                  <p className="font-semibold text-foreground">Error Responses</p>
                  <div className="space-y-2">
                    <div className="p-3 rounded-lg bg-error/5 border border-error/30">
                      <p className="text-sm font-mono text-error mb-1">
                        401 Unauthorized
                      </p>
                      <CodeBlock
                        code={`{
  "detail": "Unable to decrypt message. Invalid key or corrupted image."
}`}
                        language="json"
                        blockId="decrypt-error-401"
                      />
                    </div>
                    <div className="p-3 rounded-lg bg-error/5 border border-error/30">
                      <p className="text-sm font-mono text-error mb-1">
                        400 Bad Request
                      </p>
                      <CodeBlock
                        code={`{
  "detail": "Image file is required"
}`}
                        language="json"
                        blockId="decrypt-error-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-12 glass-card p-8 rounded-lg border border-border/30">
            <h2 className="text-2xl font-bold mb-6">Best Practices</h2>
            <div className="space-y-4 text-foreground/80">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  🔐 Security
                </h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Always use strong, random encryption keys</li>
                  <li>Transmit keys through secure channels (not with the image)</li>
                  <li>Never log or store user keys on the server</li>
                  <li>Use HTTPS for all API calls</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  📁 File Handling
                </h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Supported formats: JPG, PNG</li>
                  <li>Maximum file size: 10MB</li>
                  <li>Images are not stored after processing</li>
                  <li>Ensure image quality is maintained</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  ⚡ Performance
                </h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Process large images asynchronously</li>
                  <li>Implement client-side compression</li>
                  <li>Cache API responses when appropriate</li>
                  <li>Monitor response times</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Status Codes */}
          <section className="glass-card p-8 rounded-lg border border-border/30">
            <h2 className="text-2xl font-bold mb-6">HTTP Status Codes</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/30">
                    <th className="text-left py-2 px-3 text-foreground/80">
                      Code
                    </th>
                    <th className="text-left py-2 px-3 text-foreground/80">
                      Meaning
                    </th>
                    <th className="text-left py-2 px-3 text-foreground/80">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="text-foreground/70">
                  <tr className="border-b border-border/20">
                    <td className="py-2 px-3 font-mono text-success">200</td>
                    <td className="py-2 px-3">OK</td>
                    <td className="py-2 px-3">
                      Request successful, encryption/decryption complete
                    </td>
                  </tr>
                  <tr className="border-b border-border/20">
                    <td className="py-2 px-3 font-mono text-error">400</td>
                    <td className="py-2 px-3">Bad Request</td>
                    <td className="py-2 px-3">
                      Missing or invalid parameters
                    </td>
                  </tr>
                  <tr className="border-b border-border/20">
                    <td className="py-2 px-3 font-mono text-error">401</td>
                    <td className="py-2 px-3">Unauthorized</td>
                    <td className="py-2 px-3">
                      Decryption failed (wrong key or corrupted image)
                    </td>
                  </tr>
                  <tr className="border-b border-border/20">
                    <td className="py-2 px-3 font-mono text-error">413</td>
                    <td className="py-2 px-3">Payload Too Large</td>
                    <td className="py-2 px-3">
                      File size exceeds maximum limit (10MB)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-mono text-error">500</td>
                    <td className="py-2 px-3">Server Error</td>
                    <td className="py-2 px-3">
                      Internal server error, try again later
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
