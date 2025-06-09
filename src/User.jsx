import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./components/Header";

const User = ({ sharedLoading, setSharedLoading}) => {

    const [userDetails, setUserDetails] = useState(null);
    const [displayPersonalinfo, setDisplayPersonalInfo] = useState(true);
    const [edit, setEdit] = useState(false);
    const [updatedUserDetails, setUpdatedUserDetails] = useState({});

    const updateUserDetailsHandler = async () => {
        setSharedLoading(true);
        try {
            let updatedUserData = await fetch("https://tech-mart-backend-five.vercel.app/user/update", {
                method: "POST",
                body: JSON.stringify(updatedUserDetails),
                headers: {
                    "content-type": "application/json"
                }
            });
            if (!updatedUserData.ok) {
                throw new Error("failed to update user details");
            }
            let updatedUserResponse = await updatedUserData.json();
            setUserDetails(updatedUserResponse);
            setSharedLoading(false);
            setEdit(false);
        } catch(error) {
            console.error('Error: ', error);
        }
    }

    useEffect(() => {
        fetch("https://tech-mart-backend-five.vercel.app/user")
        .then((response) => {
            if (! response.ok) {
                throw new Error("failed to fetch user details");
            }
            return response.json();
        })
        .then((responseData) => {
            setUserDetails(responseData);
        })
        .catch((error) => {
            console.error("Error: ", error)
        })
    }, [])
    
    return (
        <div className="bg-light">
            <div className="container">
                <div className="row py-4">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex">
                                    <i className="bi bi-person-circle" style={{ fontSize: "35px"}}></i>
                                    <p className="fs-5 fw-medium ms-4">{userDetails?.user?.name}</p>
                                </div>
                            </div>
                        </div>
                        <ul className="list-group py-4">
                            <Link className="link-offset-2 link-underline link-underline-opacity-0">
                                <li className="fs-5 fw-medium list-group-item d-flex justify-content-between">My Orders<i className="bi bi-arrow-right ms-5"></i></li>
                            </Link>
                            <li className="list-group-item">
                                <p className="fs-5 fw-medium py-2">Account Settings</p>
                                <Link className="fs-6 fw-normal link-offset-2 link-underline link-underline-opacity-0" onClick={() => setDisplayPersonalInfo(true)}>Profile Information</Link>
                                <br/>
                                <br/>
                                <Link className="fs-6 fw-normal link-offset-2 link-underline link-underline-opacity-0">Manage Addresses</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col">
                        {(displayPersonalinfo && !edit) && <>
                          <div className="card">
                            <div className="card-body">
                                <Link onClick={() => {
                                    setUpdatedUserDetails(userDetails.user);
                                    setEdit(true);
                                }}>Edit</Link>
                                <div className="col-md-4">
                                    <label className="form-label fs-5 fw-medium">Name:</label>
                                    <br/>
                                    <input type="text" className="form-control" id="name" readOnly value={userDetails?.user?.name}/>
                                </div>
                                <br/>
                                <div className="col">
                                    <label className="form-label fs-5 fw-medium">Gender</label>
                                    <div className="form-check">
                                        <input type="radio" className="form-check-input" disabled name="gender" value="Male" checked/>
                                        <label className="form-check-label">Male</label>
                                    </div>
                                    <div className="form-check">
                                        <input type="radio" className="form-check-input" disabled name="gender" value="Female" />
                                        <label className="form-check-label">Female</label>
                                    </div>
                                </div>
                                <div className="col-md-5 mt-4">
                                    <label className="form-label fs-5 fw-medium">Email Address</label>
                                    <input type="text" className="form-control" id="emailId" value={userDetails?.user?.emailId} readOnly/>
                                </div>
                                <div className="col-md-4 py-4">
                                    <label className="form-label fs-5 fw-medium">Mobile Number</label>
                                    <input type="text" className="form-control" id="phoneNumber" value={userDetails?.user?.phoneNumber} disabled/>
                                </div>
                            </div>
                        </div>
                        </>}
                        {(displayPersonalinfo && edit) && <>
                          <div className="card">
                            <div className="card-body">
                                <div className="col-md-4">
                                    <label className="form-label fs-5 fw-medium">Name:</label>
                                    <br/>
                                    <input type="text" className="form-control" id="name" value={updatedUserDetails?.name} onChange={(event) => setUpdatedUserDetails((prevData) => ({
                                        ...prevData, [event.target.id]: event.target.value
                                    }))}/>
                                </div>
                                <br/>
                                <div className="col">
                                    <label className="form-label fs-5 fw-medium">Gender</label>
                                    <div className="form-check">
                                        <input type="radio" className="form-check-input"  name="gender" value="Male" onChange={(event) => setUpdatedUserDetails((prevData) => ({
                                            ...prevData, [event.target.name]: event.target.value
                                        }))}/>
                                        <label className="form-check-label">Male</label>
                                    </div>
                                    <div className="form-check">
                                        <input type="radio" className="form-check-input"  name="gender" value="Female" onChange={(event) => setUpdatedUserDetails((prevData) => ({
                                            ...prevData, [event.target.name]: event.target.value
                                        }))}/>
                                        <label className="form-check-label">Female</label>
                                    </div>
                                </div>
                                <div className="col-md-5 mt-4">
                                    <label className="form-label fs-5 fw-medium">Email Address</label>
                                    <input type="text" className="form-control" id="emailId" value={updatedUserDetails?.emailId} onChange={(event) => setUpdatedUserDetails((prevData) => ({
                                        ...prevData, [event.target.id]: event.target.value
                                    }))}/>
                                </div>
                                <div className="col-md-4 mt-4">
                                    <label className="form-label fs-5 fw-medium">Mobile Number</label>
                                    <input type="text" className="form-control" id="phoneNumber" value={updatedUserDetails?.phoneNumber} onChange={(event) => setUpdatedUserDetails((prevData) => ({
                                        ...prevData, [event.target.id]: event.target.value
                                    }))}/>
                                </div>
                                <div className="py-4">
                                    <button className="btn btn-primary" onClick={updateUserDetailsHandler}>Save</button>
                                </div>
                            </div>
                        </div>
                        </>}
                    </div>
                </div>
            </div>
        </div>
    )
}


const DisplayUserDetails = () => {

    const [cart, setCart] = useState(null);
    const [wishlist, setWishlist] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch("https://tech-mart-backend-five.vercel.app/cart")
        .then((response) => {
            if (! response.ok) {
                throw new Error("failed to fetch cart details");
            }
            return response.json();
        })
        .then((responseData) => {
            setCart(responseData);
        })
        .catch((error) => {
            console.error('Error: ', error);
        })
        .finally(() => {
            setLoading(false);
        })
    }, []);

    useEffect(() => {
        setLoading(true);
        fetch("https://tech-mart-backend-five.vercel.app/wishlist")
        .then((response) => {
            if (! response.ok) {
                throw new Error("failed to fetch cart details");
            }
            return response.json();
        })
        .then((responseData) => {
            setWishlist(responseData);
        })
        .catch((error) => {
            console.error('Error: ', error);
        })
        .finally(() => {
            setLoading(false);
        })
    }, []);
    return (
        <div>
            <Header sharedCart={cart} sharedWishlist={wishlist}/>
            <User sharedLoading={loading} setSharedLoading={setLoading}/>
        </div>
    )
}

export default DisplayUserDetails