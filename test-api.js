// Simple test script to check API endpoints
const API_BASE_URL = 'http://localhost:3001/api';

async function testAPI() {
  console.log('Testing API endpoints...\n');
  
  // Test products list
  try {
    console.log('1. Testing GET /api/products');
    const productsResponse = await fetch(`${API_BASE_URL}/products?limit=5`);
    console.log('Status:', productsResponse.status);
    
    if (productsResponse.ok) {
      const productsData = await productsResponse.json();
      console.log('Products found:', productsData.totalDocs || 0);
      
      if (productsData.docs && productsData.docs.length > 0) {
        const firstProduct = productsData.docs[0];
        console.log('First product ID:', firstProduct.id);
        console.log('First product name:', firstProduct.name);
        
        // Test single product
        console.log('\n2. Testing GET /api/products/:id');
        const productResponse = await fetch(`${API_BASE_URL}/products/${firstProduct.id}`);
        console.log('Status:', productResponse.status);
        
        if (productResponse.ok) {
          const productData = await productResponse.json();
          console.log('Single product success:', productData.success);
          console.log('Product name:', productData.data?.name);
        } else {
          const errorText = await productResponse.text();
          console.log('Single product error:', errorText);
        }
      } else {
        console.log('No products found in database');
      }
    } else {
      const errorText = await productsResponse.text();
      console.log('Products list error:', errorText);
    }
  } catch (error) {
    console.error('API test error:', error.message);
  }
}

testAPI();