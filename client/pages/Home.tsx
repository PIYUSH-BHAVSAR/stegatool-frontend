import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import { Lock, Unlock, Shield } from "lucide-react";

export default function Home() {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)]">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background gradient effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center text-center">
            {/* Logo Icon */}
            <div className="mb-8 inline-flex p-4 rounded-2xl bg-accent/10 border border-accent/30">
              <Lock className="w-8 h-8 text-accent" />
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-3xl">
              Hide Encrypted Messages{" "}
              <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
                Inside Images
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mb-12 leading-relaxed">
              Secure image steganography powered by encryption — no data stored, no tracking.
              Keep your secrets safe in plain sight.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto justify-center">
              <Link to="/encrypt" className="w-full sm:w-auto">
                <Button size="lg" variant="primary" className="w-full">
                  <Lock className="w-5 h-5" />
                  Encrypt Image
                </Button>
              </Link>
              <Link to="/decrypt" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="w-full">
                  <Unlock className="w-5 h-5" />
                  Decrypt Image
                </Button>
              </Link>
            </div>

            {/* Security Badge */}
            <div className="security-badge mb-8">
              <Shield className="w-4 h-4" />
              <span>All processing is temporary. No data is stored.</span>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full">
              <div className="glass-card p-6 rounded-lg border border-border/30">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/20 mb-4">
                  <Lock className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Secure Encryption</h3>
                <p className="text-foreground/60 text-sm">
                  Military-grade encryption keeps your messages safe from prying eyes.
                </p>
              </div>

              <div className="glass-card p-6 rounded-lg border border-border/30">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/20 mb-4">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Zero Server Storage</h3>
                <p className="text-foreground/60 text-sm">
                  Your images and messages are never stored on our servers.
                </p>
              </div>

              <div className="glass-card p-6 rounded-lg border border-border/30">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/20 mb-4">
                  <Unlock className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Easy to Use</h3>
                <p className="text-foreground/60 text-sm">
                  Simple, intuitive interface for encrypting and decrypting messages.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <section className="border-t border-border/30 mt-24 py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-foreground/60 text-sm">
              We do not store your images or messages.{" "}
              <Link to="/docs" className="text-accent hover:text-accent/80 transition-colors">
                Learn more
              </Link>
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
