import React, { useRef, useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  label?: string;
  error?: string;
}

export default function FileUpload({
  onFileSelect,
  accept = ".jpg,.jpeg,.png",
  label = "Upload Image",
  error,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const processFile = (file: File) => {
    // Validate file type
    const validTypes = accept.split(",").map((t) => t.trim().toLowerCase());
    const fileType = "." + file.name.split(".").pop()?.toLowerCase();

    if (!validTypes.includes(fileType)) {
      return;
    }

    setFileName(file.name);
    onFileSelect(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const clearFile = () => {
    setPreview(null);
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      {preview ? (
        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden border border-border/30 glass-card">
            <img src={preview} alt="Preview" className="w-full h-64 object-cover" />
            <button
              onClick={clearFile}
              className="absolute top-2 right-2 p-2 rounded-lg bg-card/80 hover:bg-error/80 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="text-sm text-foreground/70">
            <p className="font-medium">{fileName}</p>
          </div>
        </div>
      ) : (
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-lg p-8 transition-all duration-300 cursor-pointer glass-card ${
            isDragging
              ? "border-accent/80 bg-accent/10"
              : "border-border/50 hover:border-accent/50"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />

          <div className="text-center">
            <div className="flex justify-center mb-4">
              {isDragging ? (
                <Upload className="w-12 h-12 text-accent animate-bounce" />
              ) : (
                <ImageIcon className="w-12 h-12 text-accent/60" />
              )}
            </div>
            <p className="text-lg font-semibold text-foreground mb-2">{label}</p>
            <p className="text-sm text-foreground/60 mb-4">
              Drag and drop your image here, or click to select
            </p>
            <p className="text-xs text-foreground/50">Supported formats: JPG, PNG</p>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-3 p-3 rounded-lg bg-error/10 border border-error/30 text-error text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
