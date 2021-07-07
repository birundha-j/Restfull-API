import react, { useEffect, useState } from 'react';

export default function Fetchdata() {
    const [showData, setShowData] = useState([])

    const fetchData = () => {
        fetch("https://jsonplaceholder.typicode.com/")
            .then(res => {
            })
    }

    useEffect(() => {
        displaydata()
    }, [])

    const displaydata = () => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(resp => {
                setShowData(resp)
            }
            )


    }

    console.log(showData, "fetch")

    return (
        <div>
            <button onClick={fetchData}>Fetch</button>

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
            </table>
        </div>
    )
}