import { useState, useEffect } from 'react';
import { Ticket } from './Ticket/Ticket';
import './Carousel.css';
import leftArrow from './images/left_arrow.png';
import rightArrow from './images/right_arrow.png';
import { Link } from 'react-router-dom';
import { handleResponse } from '../../../../utilities/ResponseHandler';
import { defaultCinemaValue, defaultDayValue, timezone } from '../../../../App';

export function Carousel({ city, cinema, day }) {
    const [movieData, setMovieData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                let queryParams = `city=${city}&timeZone=${timezone}`
                if (cinema !== defaultCinemaValue) {
                    queryParams = queryParams + `&cinema=${cinema}`
                }
                if (day !== defaultDayValue) {
                    queryParams = queryParams + `&date=${day}`
                }
                const response = await fetch(`https://cinematicketbooking.herokuapp.com/movie?${queryParams}`);
                handleResponse(response,
                    (error) => {
                        alert(error);
                    },
                    (result) => {
                        setMovieData(result);
                    }
                )
            } catch (error) {
                alert("Oops, something went wrong");
            }
        }
        fetchData()
    }, [city, cinema, day]);

    const windowWidth = 25;
    const itemsForCarousel = 4;
    const itemsInCarouselWindow = movieData.length > itemsForCarousel ? itemsForCarousel : movieData.length;
    const [offset, setOffset] = useState(0);
    const getClassNamesFor = () => {
        return movieData.length > itemsForCarousel ? 'carousel__container carousel__container_space-between' : 'carousel__container carousel__container_space-around'
    }
    const handleLeftArrow = () => {
        setOffset((currentOffset) => {
            const newOffset = currentOffset + windowWidth;
            return Math.min(newOffset, 0);
        })
    };
    const handleRightArrow = () => {
        setOffset((currentOffset) => {
            const newOffset = currentOffset - windowWidth;
            const maxOffset = -(windowWidth * (movieData.length - itemsInCarouselWindow));
            return Math.max(newOffset, maxOffset);
        })
    };

    return (
        <div className='carousel'>
            {movieData.length > itemsInCarouselWindow && <div className='carousel__arrow' onClick={handleLeftArrow}>
                <img src={leftArrow} alt='leftArrow' />
            </div>}
            <div className='carousel__window'>
                <div className={getClassNamesFor()}
                    style={{
                        transform: `translateX(${offset}%)`
                    }}
                >
                    {
                        movieData.map((movie) => {
                            const movieLink = '/movie/' + movie.movie_id;
                            return (
                                <div key={movie._id} className='carousel__item'>
                                    <div className='carousel__img-container'>
                                    <div className='carousel__img-content'>
                                        <Link to={movieLink}>
                                            <img className='carousel__img' src={movie.posterImg_link} alt='poster' />
                                        </Link>
                                        <div className='carousel__ticket'>
                                            <Link to={movieLink}>
                                                <Ticket />
                                            </Link>
                                        </div>
                                        <h3>{movie.movieName}</h3>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {movieData.length > itemsInCarouselWindow && <div className='carousel__arrow' onClick={handleRightArrow}>
                <img src={rightArrow} alt='rightArrow' />
            </div>}
        </div>
    );
}
