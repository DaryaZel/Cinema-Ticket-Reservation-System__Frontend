import { useState, useEffect } from 'react';
import './Schedule.css';
import { CinemaSchedule } from './CinemaSchedule';

export function Schedule() {
    const [schedule, setSchedule] = useState([])
  
    useEffect(() => {
      async function fetchData() {
        try {
            debugger
          const response = await fetch('https://cinematicketbooking.herokuapp.com/schedule')
          if (response.status >= 400 && response.status < 600) {
            throw new Error("Bad response from server");
          }
          const json = await response.json()
          setSchedule(json)
        } catch (e) {
          alert(e)
        }
      }
      fetchData()
    }, []);

    return (
        <div className='schedule'>
            <div className='schedule__date-container'>
                <h2>December 16 , Today, Thursday</h2>
            </div>
            {schedule.map((cinema) => (
                <CinemaSchedule cinema={cinema} />
            ))}
        </div>
    );
}
