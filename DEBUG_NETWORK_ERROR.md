# Network Error Debugging Guide

## Step 1: Check if Server is Running ✅

Open PowerShell and run:
```bash
cd "c:\Users\pari sha\OneDrive\Desktop\projects\luxury-store"
npm run dev
```

You should see:
```
Server is running on port 5000
MongoDB Connected Successfully
```

If you see errors, the server is NOT running.

---

## Step 2: Check Browser Console (F12)

1. Open browser DevTools: Press **F12**
2. Go to **Console** tab
3. Click Submit button
4. Look for console.log output showing:
   - "Sending request to: http://localhost:5000/add-product"
   - "FormData: {name, price, hasFile}"

This tells us the request was SENT.

---

## Step 3: Check Network Tab (F12)

1. Open browser DevTools: Press **F12**
2. Go to **Network** tab
3. Click Submit
4. Look for "add-product" request
5. Click it and check:
   - **Status**: Should be 201 (success) or 200
   - **Request**: FormData with name, price, image
   - **Response**: Should say "Product added successfully!"

If status is **500** or **404**: Server error
If status is **0** or no request shows: Server not running

---

## Step 4: Check Server Logs

When you run `npm run dev`, watch the server terminal for errors when clicking Submit. You should see:

✅ Good: 
```
POST /add-product request received
Product saved to database
```

❌ Bad (example errors):
```
Error: Cannot read property 'path' of undefined
Error: ECONNREFUSED (server not running)
Error: MongoDB connection failed
```

---

## Step 5: Verify .env File

Check if `server/.env` exists and has:
```
MONGO_URI=mongodb+srv://...
CLOUDINARY_CLOUD_NAME=dfphnfub1
CLOUDINARY_API_KEY=838995717369843
CLOUDINARY_API_SECRET=...
PORT=5000
```

---

## Common Issues & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| ECONNREFUSED | Server not running | Run `npm run dev` |
| 500 error | req.file is undefined | Now fixed in server.js |
| CORS error | Frontend/Backend mismatch | Check both use http://localhost:5000 |
| MONGO error | DB not connected | Check MONGO_URI in .env |
| Image not uploading | Cloudinary error | Check API keys in .env |

---

## Quick Test Commands

### Test 1: Is server running?
```bash
curl http://localhost:5000/get-products
```

### Test 2: Test POST endpoint
```bash
# This will fail but shows if endpoint exists
curl -X POST http://localhost:5000/add-product
```

If you get "connection refused", server is DOWN.
If you get a response, server is UP.

---

## Report Back With:

When you run the steps above, tell me:
1. ✅ Server running? (Yes/No)
2. ✅ Console logs showing? (Share the output)
3. ✅ Network tab status code? (201, 500, etc.)
4. ✅ Server terminal shows any errors? (Yes/No - share them)
