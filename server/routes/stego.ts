import { RequestHandler } from "express";
import { HealthResponse, DecryptResponse, ErrorResponse } from "@shared/api";

/**
 * Health check endpoint
 */
export const handleHealth: RequestHandler = (_req, res) => {
  const response: HealthResponse = {
    status: "ok",
    service: "StegoSecure API"
  };
  res.json(response);
};

/**
 * Encrypt endpoint - proxies to Python backend
 */
export const handleEncrypt: RequestHandler = async (req, res) => {
  try {
    const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";
    
    // Forward the multipart form data to Python backend
    const formData = new FormData();
    
    if (req.file) {
      const blob = new Blob([new Uint8Array(req.file.buffer)], { type: req.file.mimetype });
      formData.append('image', blob, req.file.originalname);
    }
    
    if (req.body.message) {
      formData.append('message', req.body.message);
    }
    
    if (req.body.key) {
      formData.append('key', req.body.key);
    }

    const response = await fetch(`${backendUrl}/api/encrypt`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      return res.status(response.status).json(error);
    }

    // Forward the image response
    const imageBuffer = await response.arrayBuffer();
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', 'attachment; filename="stego_image.png"');
    res.send(Buffer.from(imageBuffer));

  } catch (error) {
    console.error('Encrypt error:', error);
    const errorResponse: ErrorResponse = {
      detail: "Internal server error during encryption"
    };
    res.status(500).json(errorResponse);
  }
};

/**
 * Decrypt endpoint - proxies to Python backend
 */
export const handleDecrypt: RequestHandler = async (req, res) => {
  try {
    const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";
    
    // Forward the multipart form data to Python backend
    const formData = new FormData();
    
    if (req.file) {
      const blob = new Blob([new Uint8Array(req.file.buffer)], { type: req.file.mimetype });
      formData.append('image', blob, req.file.originalname);
    }
    
    if (req.body.key) {
      formData.append('key', req.body.key);
    }

    const response = await fetch(`${backendUrl}/api/decrypt`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      return res.status(response.status).json(error);
    }

    const result: DecryptResponse = await response.json();
    res.json(result);

  } catch (error) {
    console.error('Decrypt error:', error);
    const errorResponse: ErrorResponse = {
      detail: "Internal server error during decryption"
    };
    res.status(500).json(errorResponse);
  }
};