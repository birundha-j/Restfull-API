import react, { useCallback, useEffect, useState } from 'react';
import './Data.css';
import Back from './Images/backbutton.png'

export default function Fetchdata() {
    const [showData, setShowData] = useState([])
    const [specificMovie, setSpecificMovie] = useState(false)
    const [movieDetails, setMoviewDetails] = useState({})
    const [showStar, setShowStar] = useState([])

    // const fetchData = () => {
    //     fetch("https://jsonplaceholder.typicode.com/")
    //         .then(res => {
    //         })
    // }

    useEffect(() => {
        displaydata()
    }, [])

    const displaydata = () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=1", requestOptions)
            .then((response) => response.json())
            .then(
                res => setShowData(res.results)
            )
    }


    const viewDetails = useCallback((data) => {
        setMoviewDetails(data)
        setSpecificMovie(true)
    }, [specificMovie, movieDetails])

    const changeStart = useCallback((data) => {
        setShowStar([...showStar, data])

    }, [showStar])

    // const displaydata = () => {
    //     fetch("https://jsonplaceholder.typicode.com/users")
    //         .then(response => response.json())
    //         .then(resp => {
    //             setShowData(resp)
    //         }
    //         )


    // }

    console.log(showData, "fetch")

    return (
        <div >
            {/* <button onClick={fetchData}>Fetch</button>

            <table>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Company</th>
                    <th>Website</th>
                </tr>

                {showData.map((data) => {
                    return (
                        <tr>
                            <td>{data.name}</td>
                            <td>{data.email}</td>
                            <td>{data.address.street}</td>
                            <td>{data.phone}</td>
                            <td>{data.company.name}</td>
                            <td>{data.website}</td>
                        </tr>
                    )
                })}
            </table> */}
            {/* <div className="imageTitle">The Tomorrow War</div>

            <div className="imageText">
                <img src={Tomorrow} className="imageView" />
                <div className="imageTitle">Rating</div>
            </div> */}
            <div className="container">
                <div className="favoritesMovies">
                    <div>Favorites</div>
                    <div>{showStar.length}</div>
                </div>
                {specificMovie === false && <>
                    {showData.map((data, index) => {
                        return (
                            <div className="imageViewContaner">
                                <div className="imageText">
                                    <img src={"https://image.tmdb.org/t/p/original" + data.poster_path} className="imageView" />
                                    <div className="img__description">
                                        <div className="viewDetails" onClick={() => viewDetails(data)}>View Details</div>
                                        {showStar.includes(index) ?
                                            <div className="fillStar">★</div>
                                            :
                                            <div onClick={() => changeStart(index)} className="emptyStar">☆</div>}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </>
                }
            </div>

            <div className="specificMovieContainer">
                {console.log(movieDetails, "specificMovie")}
                {specificMovie &&
                    <div>
                        <img onClick={() => setSpecificMovie(false)} src={Back} className="backBtnView" />
                        <div className="movieDetails">
                            <img src={"https://image.tmdb.org/t/p/original" + movieDetails.poster_path} className="singleimageView" />
                            <div className="movieInstruction">
                                <div className="movieName">{movieDetails.title}</div>
                                <div className="movieVoterange">Vote Rating : {" " + movieDetails.vote_average}</div>
                                <div className="movieVoterange">language    :{" " + movieDetails.original_language}</div>
                                <div>
                                    <div className="movieVoterange">overview :</div>
                                    <div className="titleOverview">{movieDetails.overview}</div>
                                </div>

                            </div>
                        </div>
                    </div>}
            </div>



        </div>
    )
}