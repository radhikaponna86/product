function Home() {
  const product = {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 79.99,
    rating: 4.5,
    reviews: 128,
    image: "🎧",
    description: "High-quality sound with noise cancellation",
    inStock: true,
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-12">Featured Product</h1>

      {/* Product Tile */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 max-w-md">
        {/* Product Image */}
        <div className="bg-gradient-to-br from-slate-100 to-slate-200 h-64 flex items-center justify-center">
          <span className="text-8xl">{product.image}</span>
        </div>

        {/* Product Details */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{product.name}</h2>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-amber-500">★★★★☆</span>
            <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-4">{product.description}</p>

          {/* Price */}
          <div className="mb-6">
            <span className="text-4xl font-bold text-amber-500">${product.price}</span>
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            {product.inStock ? (
              <span className="text-green-600 font-semibold">✓ In Stock</span>
            ) : (
              <span className="text-red-600 font-semibold">Out of Stock</span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg">
            Add to Cart
          </button>

          {/* Wishlist Button */}
          <button className="w-full mt-3 border-2 border-gray-300 hover:border-amber-500 text-gray-700 hover:text-amber-500 font-semibold py-2 rounded-lg transition duration-300">
            ♡ Add to Wishlist
          </button>
        </div>
      </div>
    </main>
  );
}

export default Home;