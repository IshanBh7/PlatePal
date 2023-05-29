import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';

export default function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
    let [address, setAddress] = useState("");
    let navigate = useNavigate()

    // const handleClick = async (e) => {
    //     e.preventDefault();
    //     let navLocation = () => {
    //         return new Promise((res, rej) => {
    //             navigator.geolocation.getCurrentPosition(res, rej);
    //         });
    //     }
    //     let latlong = await navLocation().then(res => {
    //         let latitude = res.coords.latitude;
    //         let longitude = res.coords.longitude;
    //         return [latitude, longitude]
    //     })
    //     // console.log(latlong)
    //     let [lat, long] = latlong
    //     console.log(lat, long)
    //     const response = await fetch("http://localhost:5000/api/auth/getlocation", {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ latlong: { lat, long } })

    //     });
    //     const { location } = await response.json()
    //     console.log(location);
    //     setAddress(location);
    //     setCredentials({ ...credentials, [e.target.name]: location })
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("plate-pal-99tg-fgqu257v7-ishanbh7.vercel.app/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
        });
        const json = await response.json()
        console.log(json);

        if (json.success) {
            localStorage.setItem('token', json.authToken)
            navigate("/login")
      
          }
          else {
            alert("Enter Valid Credentials")
          }
    }

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    return (
        <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover',height: '100vh' }}>
      <div>
      <Navbar />
      </div>
            <div className='container'>
                <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
                    <div className="m-3">
                        <label htmlFor="name" className="form-label signupcredentials">Name</label>
                        <input type="text" className="form-control" name='name' onChange={onChange} value={credentials.name} />
                    </div>
                    <div className="m-3">
                        <label htmlFor="exampleInputEmail1" className="form-label signupcredentials">Email address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="m-3">
                        <label htmlFor="exampleInputPassword1" className="form-label signupcredentials">Password</label>
                        <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
                    </div>
                    <div className="m-3">
                        <label htmlFor="exampleInputPassword1" className="form-label signupcredentials">Address</label>
                        <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} />
                    </div>

                    
                    <button type="submit" className=" search m-3 btn btn-primary" style={{ "color": "black" }}>Submit</button>
                    <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
                </form>
            </div>
        </div>
    )
}
