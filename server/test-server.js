const axios = require('axios');

async function testServer() {
  try {
    console.log("🔍 Testing server connection...\n");

    // Test 1: Check if server is running
    console.log("Test 1: GET /get-products");
    const getRes = await axios.get('http://localhost:5000/get-products');
    console.log("✅ Server is running!");
    console.log("Response:", getRes.data);
    console.log("\n");

    // Test 2: Try adding a product without image
    console.log("Test 2: POST /add-product (without image)");
    const testProduct = {
      name: "Test Product",
      price: 999
    };
    const postRes = await axios.post('http://localhost:5000/add-product', testProduct);
    console.log("✅ Product added successfully!");
    console.log("Response:", postRes.data);
    console.log("\n");

    console.log("✅ All tests passed! Server is working correctly.");

  } catch (err) {
    console.error("❌ Error:", err.message);
    if (err.response) {
      console.error("Response status:", err.response.status);
      console.error("Response data:", err.response.data);
    } else {
      console.error("\n🔴 SERVER NOT RUNNING!");
      console.error("Run: npm run dev");
    }
  }
}

testServer();
