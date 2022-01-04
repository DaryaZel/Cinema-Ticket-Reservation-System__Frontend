import { useState, useEffect } from 'react';

export function FilterFormCinema({ city, changeSelectedCinema }) {
    const [cinemas, setCinemas] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://cinematicketbooking.herokuapp.com/cinema')
                if (response.status >= 500 && response.status < 600) {
                    throw new Error("Bad response from server");
                }
                const json = await response.json();
                setCinemas(json);
            } catch (error) {
                alert(error);
            }
        }
        fetchData()
    }, []);

    const cinemaArray = [];
    for (let i = 0; i < cinemas.length; i++) {
        if (!cinemaArray.includes(cinemas[i].cinemaName) && cinemas[i].cityName === city) {
            cinemaArray.push(cinemas[i].cinemaName);
        }
    };

    cinemaArray.sort((a, b) => {
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    });

    return (
        <div className='filter-form'>
            <select className='filter-form__selector' name="select" onChange={(e) => changeSelectedCinema(e.target.value)} >
                <option value="All cinemas" selected>All cinemas</option>
                {
                    cinemaArray.map((cinema, index) => (
                        <option key={cinema + index} value={cinema}>{cinema}</option>
                    ))
                }
            </select>
        </div>
    );
}
