import React, { useEffect, useRef, useState } from 'react'
import serach_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

const Weather = () => {

    // Use a ref to access the input field value
    const inputRef = useRef();
    // State to store weather data once fetched
    const [weatherData, setWeatherData] = useState(false);

    // Function to fetch weather data based on the city
    const search = async (city) => {
        // If no city is entered, show an alert
        if (city === "") {
            alert("Enter City Name");
            return;
        }

        try {
            // API url to fetch weather data, including the city name and API key
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_KEY_ID}`;
            const response = await fetch(url);
            const data = await response.json();
            
            // If the API response is not successful, alert the user
            if (!response.ok) {
                alert(data.message);
                return;
            }

            // Get the weather icon URL
            const iconCode = data.weather[0].icon;
            const icon = `https://openweathermap.org/img/wn/${iconCode}@2x.png` || clear_icon;

            // Set the weather data state with the fetched information
            setWeatherData({
                humidity: data.main.humidity,
                wind_speed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            });

        } catch (error) {
            console.log("error in Api", error);
            // If there's an error with the API call, reset the weather data state
            setWeatherData(false);
        }
    };

    // useEffect hook to fetch weather for "London" on starting
    useEffect(() => {
        search("London");
    }, []);

    // Function to handle the 'Enter' key press event
    const handleKeyPress = (event) => {
        // Check if the pressed key is Enter
        if (event.key === "Enter") {
            // call the search function with the value from the input field
            search(inputRef.current.value);
        }
    };

    return (
        <div className='place-self-center p-10 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col items-center'>
            {/* Search input field and search button */}
            <div className='flex items-center gap-3'>
                <input
                    ref={inputRef}
                    className='h-12 border-none outline-none rounded-3xl pl-6'
                    type="text"
                    placeholder='Search'
                    onKeyDown={handleKeyPress} // Listen for the 'Enter' key press
                />
                {/* Search icon button */}
                <img
                    className='w-12 px-4 py-3 rounded-full bg-white cursor-pointer'
                    onClick={() => { search(inputRef.current.value) }} // Trigger search when clicked
                    src={serach_icon} alt="" 
                />
            </div>

            {/* If weather data is available, display it */}
            {weatherData ? <>
                <img className='w-36 mx-7' src={weatherData.icon} alt="" />
                <p className='text-white text-7xl leading-none'>{weatherData.temperature}°c</p>
                <p className='text-white text-4xl'>{weatherData.location}</p>
                <div className='w-full mt-10 text-white flex justify-between'>
                    <div className='flex items-start gap-3 text-xl'>
                        <img className='w-7 mt-3' src={humidity_icon} alt="" />
                        <div>
                            <p>{weatherData.humidity}%</p>
                            <span className='block text-base'>Humidity</span>
                        </div>
                    </div>
                    <div className='flex items-start gap-3 text-xl'>
                        <img className='w-7 mt-3' src={wind_icon} alt="" />
                        <div>
                            <p>{weatherData.wind_speed} km/h</p>
                            <span className='block text-base'>Wind Speed</span>
                        </div>
                    </div>
                </div>
            </> : <>
                {/* If there's no weather data (loading or error), show a message */}
                <h2 className='mt-3 text-red-700 font-bold'>Cannot connect to the Server, Try again later</h2>
            </>}
        </div>
    );
};

export default Weather;
