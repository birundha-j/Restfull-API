import react, { useCallback, useEffect, useState } from 'react';
import './Data.css';
import Back from './Images/backbutton.png'
import Modal from './model';
import useModal from './usemodel';
import Logo from './Images/logos.jpg'

export default function Fetchdata() {
    const [showData, setShowData] = useState([])
    const [specificMovie, setSpecificMovie] = useState(false)
    const [movieDetails, setMoviewDetails] = useState({})
    const [showStar, setShowStar] = useState([])
    const [loader, setLoader] = useState(true)
    const { isShowing, toggle } = useModal();
    const [selectMovieList, setSelectMovieList] = useState([])



    // const fetchData = () => {
    //     fetch("https://jsonplaceholder.typicode.com/")
    //         .then(res => {
    //         })
    // }

    useEffect(() => {
        demoAsyncCall().then(() => displaydata())
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
                res => {
                    setShowData(res.results)
                    setLoader(false)
                }
            )
    }

    function demoAsyncCall() {
        return new Promise((resolve) => setTimeout(() => resolve(), 1000));
    }


    const viewDetails = useCallback((data) => {
        setMoviewDetails(data)
        setSpecificMovie(true)
    }, [specificMovie, movieDetails])

    const changeAddStar = useCallback((data, id) => {
        selectMovieList.push(data)
        setShowStar([...showStar, id])
    }, [showStar, selectMovieList])

    const changeRemoveStar = useCallback((data, id) => {
        if (id > -1) {
            showStar.splice(id, 1);
        }
        setShowStar([...showStar]);

        const reducedArr = selectMovieList.filter((item, itemIndex) => {
            return itemIndex !== id
        })

        setSelectMovieList(reducedArr)


    }, [showStar, selectMovieList])

    console.log(selectMovieList, "est")




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
        <div className="masterContainer" >
            {loader && <div className="loader"></div>}
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
            <div>
                {/* <img src={Logo} className="logoView" /> */}
                <div className="websiteHeading">Popular Movie Website</div>

            </div>

            <div className="favoritsList">
                {specificMovie === false && <div className="favoritesMovies" onClick={toggle}>
                    <div>Favorites</div>
                    <div>{showStar.length}</div>
                </div>}
                <Modal
                    isShowing={isShowing}
                    hide={toggle}
                    selectMovieList={selectMovieList}
                />
            </div>
            {specificMovie === false &&
                <div className="container">

                    <>
                        {showData.map((data, index) => {
                            return (
                                <div className="imageViewContaner">
                                    <div className="imageText">
                                        <img src={"https://image.tmdb.org/t/p/original" + data.poster_path} className="imageView" />
                                        <div className="img__description">
                                            <div className="viewDetails" onClick={() => viewDetails(data)}>View Details</div>
                                        </div>
                                    </div>
                                    <div className="moviesInstruct">
                                        <div className="moviesBar">
                                            <div className="movietitleView">{data.title}</div>
                                            <div className="releaseYear">{new Date(data.release_date).getFullYear()}</div>
                                        </div>
                                        <div className="movieStar">
                                            {showStar.includes(index) ?
                                                <div onClick={() => changeRemoveStar(data, index)} className="fillStar">★</div>
                                                :
                                                <div onClick={() => changeAddStar(data, index)} className="emptyStar">☆</div>}
                                        </div>
                                    </div>

                                </div>
                            )
                        })}
                    </>

                </div>
            }
            {specificMovie &&
                <div className="specificMovieContainer">

                    <div>
                        <img onClick={() => setSpecificMovie(false)} src={Back} className="backBtnView" />
                        <div className="movieDetails">
                            <img src={"https://image.tmdb.org/t/p/original" + movieDetails.poster_path} className="singleimageView" />
                            <div className="movieInstruction">
                                <div className="movieName">{movieDetails.title}</div>
                                <div className="movieVoterange">View Rating : {" " + movieDetails.vote_average}</div>
                                <div className="movieVoterange">language    :{movieDetails.original_language === "en" ? "  English" : null}</div>
                                <div className="movieVoterange">Release Year : {" " + new Date(movieDetails.release_date).getFullYear()}</div>
                                <div>
                                    <div className="movieVoterange">Description :</div>
                                    <div className="titleOverview">{movieDetails.overview}</div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            }



        </div>
    )
}