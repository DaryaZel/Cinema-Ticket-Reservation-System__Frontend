import { useState, useEffect } from 'react';
import { handleResponse } from '../../../../utilities/ResponseHandler';
import { MainMovieCinemaSchedule } from './MainMovieCinemaSchedule';
import { timezone } from '../../../../App';
import './MainMovieSchedule.css';

export function MainMovieSchedule({ city, cinema, day, movieId }) {
    const [dateSchedule, setDateSchedule] = useState([]);
    const locale = "en-US";
    const formattingOptions = { month: 'long', day: 'numeric', weekday: 'long' };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://cinematicketbooking.herokuapp.com/schedule/${movieId}?city=${city}&cinema=${cinema}&date=${day}&timeZone=${timezone}`);
                handleResponse(response,
                    (error) => {
                        alert(error);
                    },
                    (result) => {
                        setDateSchedule(result);
                    }
                );
            } catch (error) {
                alert(error);
            }
        }
        fetchData()
    }, [city, cinema, day]);

    return (
        <div className='schedule'>
            {dateSchedule.map((elem) => {
                return (
                    <div>
                        <div className='schedule__date-container'>
                            <h2>{new Date(elem.day).toLocaleDateString(locale, formattingOptions)}</h2>
                        </div>
                        {
                            elem.schedules.map((cinema) => (
                                <MainMovieCinemaSchedule cinema={cinema} />
                            ))
                        }</div>
                )
            })}
        </div>
    );
}
