import { useState } from "react";
import Footer from "./components/Footer";

function App() {
  const [location, setLocation] = useState("");
  const [result, setResult] = useState(null);
  const key = import.meta.env.VITE_API_KEY;
  const url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${location}&aqi=no`;


  const fetchWeather = async () => {
    if (!location) {
      alert("Please enter a location");
      return;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      if (data.error) {
        setResult({ error: data.error.message });
      } else {
        setResult({
          temp_C: data.current.temp_c,
          temp_F: data.current.temp_f,
          condition: data.current.condition.text,
          icon: data.current.condition.icon,
          city: data.location.name,
          country: data.location.country
        });
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setResult({ error: "Failed to fetch weather data. Try again later." });
    }
  };

  function Clear() {
    setResult(null);
    setLocation("");
  }

  return (
    <>
    <div className="flex justify-center items-center h-screen bg-slate-100">
      <div className="bg-green-100 w-88 rounded-md shadow-xl py-10 px-10 text-center">
        <p className="font-semibold text-2xl">Weather App</p>
        <p className="pt-3">Enter the Location</p>

        <input
          placeholder="Enter Location"
          className="text-center mt-4 w-full py-1.5 rounded-md bg-white"
          type="text"
          name= "location"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
        />

        <div className="grid grid-cols-2 gap-6">
          <button
            className="mt-4 py-1.5 rounded-md bg-blue-500 text-white hover:bg-white hover:text-black"
            onClick={fetchWeather}
          >
            Get Weather
          </button>
          <button
            className="mt-4 py-1.5 rounded-md bg-red-500 text-white hover:bg-white hover:text-red-500"
            onClick={Clear}
          >
            Clear
          </button>
        </div>

        <div className="mt-5">
          {result ? (
            result.error ? (
              <p className="text-black text-l">{result.error}</p>
            ) : (
              <div className="mt-4 p-4 bg-white rounded">
                <p className="text-xl font-bold">{result.city}, {result.country}</p>
                <p className="text-lg">{result.condition}</p>
                <p className="text-lg">{result.temp_C}°C, {result.temp_F}°F</p>
                <img src={result.icon} alt="weather icon" className="mx-auto mt-2" />
              </div>
            )
          ) : null}
        </div>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
}

export default App;
