const Home = () => {
    return (
      <div className="min-h-screen p-6 bg-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-green-700 mb-4">🌾 KrishiSarthi</h1>
          <p className="text-lg text-gray-700 mb-6">
            A smart farming assistant for farmers. Get access to weather forecasts, crop price trends,
            YouTube-based learning, and local language chatbot support.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
            <div className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-xl font-semibold text-green-800 mb-2">📍 Weather Forecast</h2>
              <p className="text-gray-600">View upcoming weather conditions for better planning.</p>
            </div>
            <div className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-xl font-semibold text-green-800 mb-2">💹 Crop Prices</h2>
              <p className="text-gray-600">Check real-time prices of various crops in your region.</p>
            </div>
            <div className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-xl font-semibold text-green-800 mb-2">🎥 Learning Videos</h2>
              <p className="text-gray-600">Watch educational YouTube videos about farming techniques.</p>
            </div>
            <div className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-xl font-semibold text-green-800 mb-2">🤖 Local Chatbot</h2>
              <p className="text-gray-600">Talk to the chatbot in your local language for support.</p>
            </div>
          </div>
  
          <div className="mt-10">
            <p className="text-gray-700">To access full features, please login.</p>
            <a
              href="/login"
              className="inline-block mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    );
  };
  
  export default Home;
  