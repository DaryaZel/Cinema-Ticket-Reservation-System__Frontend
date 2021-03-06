import { useContext, useEffect, useState } from "react";
import { timezone, tokenStorageKey, UserContext } from "../../App";
import { handleResponse } from "../../utilities/ResponseHandler";
import { Header } from "../components/Header/Header";
import { PageLoader } from "../components/PageLoader/PageLoader";
import location from './images/location.png';
import timetable from './images/timetable.png';
import './PersonalAccountPage.css';

export function PersonalAccountPage() {
    const { user } = useContext(UserContext);
    const [reservations, setReservations] = useState([]);
    const [shouldDisplayContent, setShouldDisplayContent] = useState(false);
    const locale = "en-US";
    const formattingOptionsForReservation = {
        month: 'numeric', day: 'numeric', year: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: false,
        timezone: timezone
    };
    const formattingOptionsForSession = {
        month: 'long', day: 'numeric', weekday: 'long',
        hour: 'numeric', minute: 'numeric',
        hour12: false
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem(tokenStorageKey) || sessionStorage.getItem(tokenStorageKey);
                if (token) {
                    const response = await fetch('https://cinematicketbooking.herokuapp.com/reservation', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    handleResponse(response,
                        (error) => {
                            alert(error);
                        },
                        (result) => {
                            setReservations(result);
                            setShouldDisplayContent(true);
                        }
                    )
                }
                else {
                    setReservations([]);
                }
            } catch (error) {
                alert("Oops, something went wrong");
            }
        }
        fetchData()
    }, [user]);

    return (
        <div>
            {shouldDisplayContent ? null : <PageLoader />}
            <Header showSearchForm={false} />

            {reservations.length !== 0 ?
                <div> <h2>Reservations List</h2>
                    {reservations.map((reservation) => {
                        let ticketsPriceSum = 0;
                        reservation.tickets.forEach((ticket) => {
                            ticketsPriceSum += ticket.availableSeat_price;
                        })
                        return (
                            <div key={reservation._id} className='reservations__content-container'>
                                <h2 className='reservations__movie-name'>{reservation.movieName}</h2>
                                <div className='reservations__place'>
                                    <img src={location} alt='location' />
                                    <h3>{reservation.cinemaName}</h3>
                                </div>
                                <div className='reservations__date'>
                                    <img src={timetable} alt='timetable' />
                                    <h3>{(new Date(reservation.date)).toLocaleDateString(locale, formattingOptionsForSession)}</h3>
                                </div>
                                {reservation.tickets.map((ticket) => {
                                    return <h4 key={ticket._id}>Seat: {ticket.availableSeat_number} Row: {ticket.availableSeat_row} .....  {ticket.availableSeat_price}$</h4>
                                })}
                                <h3>Total Price: {ticketsPriceSum}$</h3>
                                <h3 className='reservations__information'>Reservation {new Date(reservation.createdAt).toLocaleDateString(locale, formattingOptionsForReservation)}</h3>
                            </div>
                        )
                    })
                    }
                </div>
                :
                <h2>Sorry, we didn't find information about your reservations</h2>}
        </div>
    )
}
