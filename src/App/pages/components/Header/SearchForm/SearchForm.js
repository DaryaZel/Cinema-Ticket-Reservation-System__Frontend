import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { handleResponse } from '../../../../utilities/ResponseHandler';
import { LandingPageContext } from '../../../LandingPage/LandingPage';
import glass from './images/magnifying_glass.png';
import './SearchForm.css';

export function SearchForm({ movieData, setMovieData }) {
    const [inputText, setInputText] = useState('');
    const [makeRequest, setMakeRequest] = useState(false)
    // const [movieData, setMovieData] = useState([]);
    const { setMoviesList } = useContext(LandingPageContext)

    const searchMovieList = () => {
        async function fetchData() {
            let searchTextObj = { 'payload': inputText }
            try {
                const response = await fetch(`https://cinematicketbooking.herokuapp.com/movie/search`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(searchTextObj)
                    });
                handleResponse(response,
                    (error) => {
                        alert(error);
                    },
                    (result) => {
                        setMovieData(null);
                        setMoviesList(result);
                    }
                )
            } catch (error) {
                alert("Oops, something went wrong");
            }
        }
        fetchData()
    }
    const handleChange = (event) => {
        setInputText(event.target.value);
    };
    const handleEnterEvent = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            searchMovieList()
        }
    };
    const handleClick = (e) => {
        e.preventDefault()
        searchMovieList()
    };
    const changeMovieData = () => {
        setMakeRequest((prevMakeRequest)=>!prevMakeRequest);
    }

    useEffect(() => {
        async function fetchData() {
            let searchTextObj = { 'payload': inputText }
            try {
                const response = await fetch(`https://cinematicketbooking.herokuapp.com/movie/search`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(searchTextObj)
                    });
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

    }, [inputText, makeRequest]);

    return (
        <form className="search-form">
            <div className="search-form__container">
                <div className="search-form__content">
                    <div className="search-form__dropdown-content">
                        <input id='searchText' type='text'
                            name='searchText' className="search-form__input"
                            value={inputText} placeholder="Search movie..."
                            maxLength="20" autoComplete="off"
                            onKeyPress={(e) => handleEnterEvent(e)}
                            onChange={handleChange}
                            onClick={(e) => {
                                changeMovieData(e)
                                e.stopPropagation()
                            }} >
                        </input>
                        {movieData && movieData.map((movie) => {
                            const movieLink = '/movie/' + movie._id;
                            return (<div key={movie._id}>
                                <Link to={movieLink} className="link">
                                    <span>{movie.movieName}</span>
                                </Link>
                            </div>)
                        })}
                    </div>
                </div>
                <div> <button id='searchButton' name='searchButton' className="search-form__button" onClick={handleClick}>
                    <img src={glass} alt='search' />
                </button></div>
            </div>
        </form>
    );
}
