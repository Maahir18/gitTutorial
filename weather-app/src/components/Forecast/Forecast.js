import React, { useState } from 'react';

const api = {
    key:"cf9629a95c6471274fd1fed68d53d481",
    base: "https:/api.openweathermap.org/data/2.5/"
}

const Forecast = ()=> {
    const[query, setQuery] = useState('');
    const[weather, setWeather] = useState({});
    const search = (evt) =>{
        if(evt.key ==='Enter') {
            fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
            .then(res=>res.json())
            .then(result=>{
                console.log(result);
                setQuery('');
                setWeather(result);
            }); 
        }
    }
    const dateBuilder = (d) =>{
        let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        let days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }

    return (
        //JSX code will go here
        <div>
           <h2>Find Current Weather Conditions</h2>
           <div className="searchBox">
               <input type="text" className="searchBar" placeholder="Search..." onChange={e=>setQuery(e.target.value)}
               value={query} onKeyPress={search}
               />
           </div>
           {(typeof weather.main != "undefined")?(
           <div>
                <div className="locationBox">
                    {weather.name},{weather.sys.country}
                </div>
                <div>
                    {dateBuilder(new Date())}
                </div>
                <div className="weatherBox">
                    {Math.round(weather.main.temp)} deg C
                </div>
            </div>
            ):('')}
       </div>
    )
}


export default Forecast;