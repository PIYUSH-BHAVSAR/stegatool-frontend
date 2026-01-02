# StegoSecure API Integration

Your frontend is now integrated with the StegoSecure backend! Here's what's been set up:

## 🔗 API Endpoints

### Health Check
```
GET /api/health
```
Returns: `{"status": "ok", "service": "StegoSecure API"}`

### Encrypt Image
```
POST /api/encrypt
Content-Type: multipart/form-data

Fields:
- image: File (JPG/PNG, max 5MB)
- message: string (secret message)
- key: string (encryption key)
```
Returns: PNG image file download

### Decrypt Image
```
POST /api/decrypt
Content-Type: multipart/form-data

Fields:
- image: File (stego image)
- key: string (decryption key)
```
Returns: `{"status": "success", "message": "decrypted text"}`

## 🚀 How It Works

1. **Frontend**: React app with upload forms
2. **Express Proxy**: Your Node.js server forwards requests to Python backend
3. **Python Backend**: FastAPI server handles steganography operations

## 🔧 Configuration

Set your Python backend URL in `.env`:
```
BACKEND_URL=http://localhost:8000
```

For production, update this to your deployed Python backend URL.

## 📱 Usage

1. Start your Python backend: `uvicorn main:app --reload --host 0.0.0.0 --port 8000`
2. Start your frontend: `npm run dev`
3. Visit `http://localhost:8080`

## 🌐 Deployment

### For Netlify:
1. Deploy your Python backend to Render/Railway
2. Update `BACKEND_URL` environment variable in Netlify
3. Deploy your frontend using the existing Netlify configuration

The Express server will run as a Netlify function and proxy requests to your Python backend.

## ✅ What's Included

- ✅ Type-safe API interfaces
- ✅ File upload handling with multer
- ✅ Error handling and validation
- ✅ Responsive UI with TailwindCSS
- ✅ Production-ready build configuration
- ✅ Netlify deployment ready