import react, { useEffect, useState } from 'react';
import './Data.css';
import Tomorrow from './Images/tomorrow.jpg'

export default function Fetchdata() {
    const [showData, setShowData] = useState([])

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
        <div className="container">
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

            {showData.map((data) => {
                return (
                    <div>
                        <div>{data.title}</div>
                        <div className="imageText">
                            <img src={"https://image.tmdb.org/t/p/original" + data.poster_path} className="imageView" />
                            <div className="img__description">Rating</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}