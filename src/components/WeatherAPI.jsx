import { useState } from "react";
import './WeatherAPI.css';

function WeatherDATA() {
    const formatDate = (input) => {
        const date = new Date(input);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    }

    const getDay = (input) => {
        const date = new Date(input);
        return date.toLocaleString('default', { weekday: 'long' });
    }

    const getWeather = async (city) => {
        const apiKey = '4ce63996ffb141b7bbd175127251107';
        const baseUrl = 'https://api.weatherapi.com/v1/current.json';
        const url = `${baseUrl}?key=${apiKey}&q=${city}&aqi=yes`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Flattened weatherData object
            setWeatherData({
                location: data.location.name,
                country: data.location.country,
                localtime: data.location.localtime,
                temp: data.current.temp_c,
                heatindex: data.current.feelslike_c,
                fc: data.current.feelslike_c,
                icon: data.current.condition.icon,
                climate_condition: data.current.condition.text,
                wind: data.current.wind_kph,
                winddirection: data.current.wind_dir,
                humidity: data.current.humidity,
                gust: data.current.gust_kph,
                visibility: data.current.vis_km,
                co2: data.current.air_quality.co,
                so2: data.current.air_quality.so2,
                no2: data.current.air_quality.no2,
                o3: data.current.air_quality.o3,
                due:data.current.dewpoint_c
            });

        } catch (error) {
            console.error("Failed to fetch weather data:", error);
        }
    }

    const [weatherData, setWeatherData] = useState(null);
    // getWeather(place);
    const [PLACE, SETPLACE] = useState("none");
    const placeChange = (e) =>{
        SETPLACE(e.target.value);
    }
    const ShowWeather = ()=>{
        getWeather(PLACE)
    }

    const inputbox_style = {
        width:"60%",
        height:"5vh",
        textAlign:"left",
        fontFamily:"monospace",
        fontSize:"20px"
    }
    const searchdiv_style = {
        marginTop:"15px",
        width:"100%",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"

    }
    return(
        <div>
            <div className="searchplace" style={searchdiv_style}>
                <input type="text" placeholder="Please Enter a City" onChange={placeChange} style={inputbox_style}></input>
                &nbsp;&nbsp;&nbsp;<button onClick={ShowWeather}>Search</button>
            </div>
                {weatherData && (
                    <>
                        <div className="weather-container">
                    <div className="cover"></div>
                    
                        
                            <div className="main">
                                <div className="main-data frost-glass-main">
                                    <div className="location">&nbsp;&nbsp;{weatherData.location}</div>
                                    <div className="sectiondata">
                                        <div className="region">
                                            <div className="location-country"><i className="fa-solid fa-location-dot"></i>&nbsp;&nbsp;{weatherData.location}, {weatherData.country}</div>
                                            <div className="day">{getDay(weatherData.localtime)}</div>
                                            <div className="date"><i className="fa-solid fa-calendar-days"></i> &nbsp;{formatDate(weatherData.localtime)}</div>
                                        </div>
                                        <div className="temperature">
                                            <div className="image"><img src={weatherData.icon} height="100" width="100" alt="icon" /></div>
                                            <div className="tempvalue">
                                                <div className="main-temp">{weatherData.temp}&deg;C </div>
                                                <div className="heatindex">/{weatherData.heatindex}&deg;C </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="climate_status">{weatherData.climate_condition}</div>
                                    <div className="feelslike">Feels Like {weatherData.fc} &deg;C</div>
                                </div>
                            </div>

                            <div className="other-data">
                                <div className="stats">
                                    <div className="stat frost-glass"><h2>Wind &nbsp;<i className="fa-solid fa-wind"></i></h2><div className="other-param">{weatherData.wind} km/hr</div></div>
                                    <div className="stat frost-glass"><h2>Wind Direction&nbsp;<i className="fa-brands fa-nfc-directional"></i></h2><div className="other-param">{weatherData.winddirection}</div></div>
                                    <div className="stat frost-glass"><h2>Humidity&nbsp;<i className="fa-solid fa-droplet"></i></h2><div className="other-param">{weatherData.humidity}%</div></div>
                                    <div className="stat frost-glass"><h2>Gust&nbsp;<i className="fa-solid fa-wind"></i></h2><div className="other-param">{weatherData.gust} km/hr</div></div>
                                    <div className="stat frost-glass"><h2>DewPoint&nbsp;<i className="fa-solid fa-temperature-half"></i></h2><div className="other-param">{weatherData.due} &deg;C</div></div>
                                    <div className="stat frost-glass"><h2>Visibility&nbsp;<i className="fa-solid fa-eye"></i></h2><div className="other-param">{weatherData.visibility} km</div></div>
                                </div>
                                <div className="air-quality">
                                    <div className="gas frost-glass2"><h2>CO<sub>2</sub> Rate &nbsp;<i className="fa-solid fa-smog"></i></h2><div className="other-param">{weatherData.co2.toFixed(2)} μg/m³</div></div>
                                    <div className="gas frost-glass2"><h2>SO<sub>2</sub> Rate &nbsp;<i className="fa-solid fa-industry"></i></h2><div className="other-param">{weatherData.so2.toFixed(2)} μg/m³</div></div>
                                    <div className="gas frost-glass2"><h2>NO<sub>2</sub> Rate &nbsp;<i className="fa-solid fa-wind"></i></h2><div className="other-param">{weatherData.no2.toFixed(2)} μg/m³</div></div>
                                    <div className="gas frost-glass2"><h2>O<sub>3</sub> Rate &nbsp;<i className="fa-solid fa-wind"></i></h2><div className="other-param">{weatherData.o3.toFixed(2)} μg/m³</div></div>
                                </div>
                            </div>
                        
                    
                </div>
                
                 </>   
                )
            }
                </div>
    );
}

export default WeatherDATA;
