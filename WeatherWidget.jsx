// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const WeatherWidget = ({ location }) => {
//   const [weather, setWeather] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!location) return;

//     const fetchWeather = async () => {
//       try {
//         const response = await axios.post("http://localhost:5000/api/weather", {
//           lat: location.lat,
//           lon: location.lon,
//         });
//         setWeather(response.data);
//       } catch (err) {
//         console.error("Error fetching weather:", err);
//         setError("Failed to fetch weather updates.");
//       }
//     };

//     fetchWeather();
//   }, [location]);

//   if (error) return <p className="text-red-600">{error}</p>;
//   if (!weather) return <p>🌦 Fetching Weather Updates...</p>;

//   return (
//     <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg text-center mt-4">
//       <h2 className="text-2xl font-bold text-blue-700">Weather Forecast 🌤</h2>
//       <p className="text-gray-600">{weather.city}, {weather.country}</p>

//       {/* 5-day forecast with 3-hour intervals */}
//       <div className="overflow-x-auto mt-4">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-blue-100 text-blue-800">
//               <th className="p-2">Date & Time</th>
//               <th className="p-2">🌡 Temp (°C)</th>
//               <th className="p-2">🌦 Condition</th>
//             </tr>
//           </thead>
//           <tbody>
//             {weather.forecast.map((data, index) => (
//               <tr key={index} className="border-b text-gray-700">
//                 <td className="p-2">{new Date(data.date).toLocaleString()}</td>
//                 <td className="p-2 font-bold">{Math.round(data.temperature)}°C</td>
//                 <td className="p-2">{data.description}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default WeatherWidget;
// WeatherDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png"
});

const API_KEY = "8c52afb01f4644857e6c5c39f6cf274f"; // Replace with your API key

export default function WeatherDashboard() {
  const [searchCity, setSearchCity] = useState("");
  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    // Attempt to get user location first
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lon } = position.coords;
          setCoords({ lat, lon });
          fetchWeatherData(lat, lon);
          fetchLocationName(lat, lon);
        },
        () => {
          // Fall back to IP-based location
          fetchIPBasedLocation();
        }
      );
    } else {
      // Fall back to IP-based location if geolocation not available
      fetchIPBasedLocation();
    }
  }, []);

  const fetchIPBasedLocation = async () => {
    try {
      const res = await axios.get("https://ipinfo.io/json?token=19d26564647a03"); // Get a token from ipinfo.io
      const [lat, lon] = res.data.loc.split(',');
      setCoords({ lat, lon });
      setCityName(res.data.city);
      fetchWeatherData(lat, lon);
    } catch (err) {
      setError("Unable to detect location. Please search for a city.");
      setLoading(false);
    }
  };
  

  const fetchLocationName = async (lat, lon) => {
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      setCityName(res.data.address.city || res.data.address.town || "Unknown Location");
    } catch (err) {
      console.error("Error fetching location name:", err);
    }
  };

  const fetchWeatherData = async (lat, lon) => {
    setLoading(true);
    try {
      // Current weather
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      setWeather(weatherRes.data);

      // 5-day forecast
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      
      // Get forecasts for multiple times of day
      const dailyForecasts = [];
      const processedDates = {};

      forecastRes.data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateStr = date.toLocaleDateString();
        const hour = date.getHours();
        
        // For each day, collect forecasts at different times
        if (!processedDates[dateStr] || processedDates[dateStr].length < 4) {
          if (!processedDates[dateStr]) {
            processedDates[dateStr] = [];
          }
          
          // Add the forecast for this time slot if we don't have too many already
          if (processedDates[dateStr].length < 8) {
            processedDates[dateStr].push({
              ...item,
              formattedTime: date.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit'
              }),
              fullDate: date
            });
          }
        }
      });

      // Convert the processed data to array
      Object.values(processedDates).forEach(dayForecasts => {
        if (dayForecasts.length > 0) {
          dailyForecasts.push(...dayForecasts);
        }
      });

      setForecast(dailyForecasts.slice(0, 24)); // Limit to 24 entries for UI clarity
      setLoading(false);
    } catch (err) {
      console.error("Error fetching weather:", err);
      setError("Failed to fetch weather data");
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchCity.trim() === "") return;
    
    setLoading(true);
    axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=1&appid=${API_KEY}`)
      .then(res => {
        if (res.data.length === 0) {
          setError("City not found. Please check spelling and try again.");
          setLoading(false);
          return;
        }
        
        const { lat, lon, name } = res.data[0];
        setCoords({ lat, lon });
        setCityName(name);
        fetchWeatherData(lat, lon);
      })
      .catch(err => {
        console.error("Error searching for city:", err);
        setError("Failed to search for city");
        setLoading(false);
      });
  };

  // Format date to Day, Month Date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  // Get weather icon
  const getWeatherIcon = (weather) => {
    if (!weather) return "☀️";
    
    const id = weather.id;
    const isNight = weather.icon?.includes("n");
    
    // Clear sky
    if (id === 800) {
      return isNight ? "🌙" : "☀️";
    }
    // Few clouds, scattered clouds
    else if (id === 801 || id === 802) {
      return isNight ? "☁️" : "⛅";
    }
    // Broken clouds, overcast
    else if (id === 803 || id === 804) {
      return "☁️";
    }
    // Rain, drizzle
    else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
      return "🌧️";
    }
    // Thunderstorm
    else if (id >= 200 && id <= 232) {
      return "⛈️";
    }
    // Snow
    else if (id >= 600 && id <= 622) {
      return "❄️";
    }
    // Mist, fog, etc.
    else if (id >= 701 && id <= 781) {
      return "🌫️";
    }
    
    return "☀️"; // Default
  };

  // Group forecasts by day for the tabs
  const getDayForecasts = () => {
    if (!forecast.length) return [];
    
    const days = {};
    forecast.forEach(item => {
      const dateKey = item.fullDate.toLocaleDateString('en-US', { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short'
      });
      
      if (!days[dateKey]) {
        days[dateKey] = [];
      }
      
      days[dateKey].push(item);
    });
    
    return Object.entries(days).map(([date, items]) => ({
      date,
      items
    }));
  };

  const dayForecasts = getDayForecasts();

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white">
  <div className="w-full p-4">
        {/* Header/Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between py-4 mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-blue-600 p-2 rounded-lg mr-3">
              {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-4.5-8.5" />
              </svg> */}
            </div>
            <h1 className="text-xl font-semibold">weather</h1>
          </div>
          
          <form onSubmit={handleSearch} className="flex w-full md:w-auto">
            <div className="relative flex-grow">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search location..."
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="w-full md:w-64 pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex ml-2">
              <button type="submit" className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </button>
              
 
              
    
            </div>
          </form>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-300 p-4 rounded-lg mb-6">
            {error}
          </div>
        ) : (
          <>
            {/* Today's Overview */}
            {weather && (
              <>
                <h2 className="text-xl font-semibold mb-4">Today Overview</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
                  {/* Main Temperature Card */}
                  <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="text-5xl mb-4">
                        {getWeatherIcon(weather.weather[0])}
                      </div>
                      <div className="text-4xl font-bold mb-2">
                        {Math.round(weather.main.temp)}°C
                      </div>
                      <div className="text-gray-400 mb-4 capitalize">
                        {weather.weather[0].description}
                      </div>
                      <div className="flex items-center text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{cityName}</span>
                      </div>
                      <div className="text-gray-400 mt-1">
                        {new Date(weather.dt * 1000).toLocaleDateString('en-US', { 
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long'
                        })}
                      </div>
                    </div>
                  </div>
                  
                  {/* Weather Details Grid */}
                  <div className="col-span-1 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Wind Speed */}
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                      <div className="flex items-start mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                        <span className="text-gray-400">Wind Speed</span>
                      </div>
                      <div className="text-2xl font-bold mt-2">
                        {Math.round(weather.wind.speed * 3.6)} km/h
                      </div>
                    </div>
                    
                    {/* Humidity */}
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                      <div className="flex items-start mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                        <span className="text-gray-400">Humidity</span>
                      </div>
                      <div className="text-2xl font-bold mt-2">
                        {weather.main.humidity}%
                      </div>
                    </div>
                    
                    {/* Forecast For Today */}
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                      <div className="flex items-start mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-400">Today</span>
                      </div>
                      <div className="text-2xl font-bold mt-2">
                        {forecast.length > 0 ? 
                          `${Math.round(forecast[0].main.temp)}°C` : 
                          `${Math.round(weather.main.temp)}°C`}
                      </div>
                      <div className="text-sm text-gray-400">
                        {forecast.length > 0 ? forecast[0].formattedTime : ''}
                      </div>
                    </div>
                    
                    {/* Pressure */}
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                      <div className="flex items-start mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="text-gray-400">Pressure</span>
                      </div>
                      <div className="text-2xl font-bold mt-2">
                        {weather.main.pressure} hPa
                      </div>
                    </div>
                    
                    {/* Visibility */}
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                      <div className="flex items-start mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span className="text-gray-400">Visibility</span>
                      </div>
                      <div className="text-2xl font-bold mt-2">
                        {weather.visibility / 1000} km
                      </div>
                    </div>
                    
                    {/* Sunrise/Sunset */}
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                      <div className="flex items-start mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span className="text-gray-400">Sunrise</span>
                      </div>
                      <div className="text-lg font-bold">
                        {new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                      <div className="flex items-start mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        <span className="text-gray-400">Sunset</span>
                      </div>
                      <div className="text-lg font-bold">
                        {new Date(weather.sys.sunset * 1000).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Next 5 Days */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Next 5 Days</h2>
                  
                  {/* Day Selection Tabs */}
                  <div className="flex flex-wrap gap-2 mb-4 overflow-x-auto">
                    <button 
                      className={`px-4 py-2 rounded-lg ${activeTab === 'all' ? 'bg-blue-600' : 'bg-gray-800 border border-gray-700'}`}
                      onClick={() => setActiveTab('all')}
                    >
                      All Days
                    </button>
                    
                    {dayForecasts.map((day, idx) => (
                      <button 
                        key={idx}
                        className={`px-4 py-2 rounded-lg whitespace-nowrap ${activeTab === day.date ? 'bg-blue-600' : 'bg-gray-800 border border-gray-700'}`}
                        onClick={() => setActiveTab(day.date)}
                      >
                        {day.date}
                      </button>
                    ))}
                  </div>
                  
                  {/* Forecast Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {(activeTab === 'all' ? forecast : forecast.filter(item => {
                      const itemDate = item.fullDate.toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        day: 'numeric', 
                        month: 'short'
                      });
                      return itemDate === activeTab;
                    })).map((item, idx) => (
                      <div key={idx} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-lg font-semibold">
                              {Math.round(item.main.temp)}°C
                            </div>
                            <div className="text-sm text-gray-400 capitalize">
                              {item.weather[0].description}
                            </div>
                          </div>
                          <div className="text-xl">
                            {getWeatherIcon(item.weather[0])}
                          </div>
                        </div>
                        
                        <div className="mt-4 text-gray-300">
                          {item.fullDate.toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            day: 'numeric', 
                            month: 'short',
                          })}
                        </div>
                        <div className="text-sm text-gray-400">
                          {item.formattedTime}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Map */}
                {coords && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Location Map</h2>
                    <div className="h-96 rounded-lg overflow-hidden">
                      <MapContainer
                        center={[coords.lat, coords.lon]}
                        zoom={11}
                        style={{ height: "100%", width: "100%" }}
                        className="z-0"
                      >
                        <TileLayer
                          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        />
                        <Marker position={[coords.lat, coords.lon]}>
                          <Popup>
                            <div className="text-center">
                              <div className="font-bold text-gray-800">{cityName}</div>
                              {weather && (
                                <div className="text-gray-600">{Math.round(weather.main.temp)}°C • {weather.weather[0].description}</div>
                              )}
                            </div>
                          </Popup>
                        </Marker>
                      </MapContainer>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
        
        {/* Footer */}
        <div className="text-center text-gray-500 text-sm mt-12 border-t border-gray-800 pt-4">
          <p>Data provided by OpenWeatherMap • © {new Date().getFullYear()} WeatherVerse</p>
        </div>
      </div>
    </div>
  );
}