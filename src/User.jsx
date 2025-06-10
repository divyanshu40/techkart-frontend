import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./components/Header";

const User = ({ sharedLoading, setSharedLoading}) => {

    const [userDetails, setUserDetails] = useState(null);
    const [displayPersonalinfo, setDisplayPersonalInfo] = useState(true);
    const [displayAddressPage, setDisplayAddressPage] = useState(false);
    const [displayOrdersPage, setDisplayOrdersPage] = useState(false);
    const [edit, setEdit] = useState(false);
    const [updatedUserDetails, setUpdatedUserDetails] = useState({});
    const [displayAddressForm, setDisplayAddressForm] = useState(false);
    const [newAddressInfo, setNewAddressInfo] = useState({});
    const [addressesDetails, setAddressesDetails] = useState(null);
    const [addressUpdateId, setAddressUpdatedId] = useState(null);
    const [updatedAddresssInfo, setUpdatedAddressInfo] = useState(null);
    const [ordersDetails, setOrdersDetails] = useState(null);

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

    const addressFormSubmitHandler = async (event) => {
        event.preventDefault();
        setSharedLoading(true);
        try {
            let addressAddingResponse = await fetch("https://tech-mart-backend-five.vercel.app/address/new", {
            method: "POST",
            body: JSON.stringify({
                address: newAddressInfo,
                user: "684613d7866bb380fdefbb0f"
            }),
            headers: {
                "content-type": "application/json"
            }
        });
        if (! addressAddingResponse.ok) {
            throw new Error("failed to add new address");
        }
        let response = await fetch("https://tech-mart-backend-five.vercel.app/addresses");
        if (! response.ok) {
            throw new Error("failed to fetch addresses");
        }
        let responseData = await response.json();
        setAddressesDetails(responseData);
        setDisplayAddressForm(false);
        setSharedLoading(false);
        } catch(error) {
            console.error('Error: ', error);
        }

    }

    const updateAddressHandler = async (addressId) => {
        setSharedLoading(true);
        try {
            let addressUpdatingResponse = await fetch(`https://tech-mart-backend-five.vercel.app/address/update/${addressId}`, {
                method: "POST",
                body: JSON.stringify({ address: updatedAddresssInfo }),
                headers: {
                    "content-type": "application/json"
                }
            });
            if (! addressUpdatingResponse.ok) {
                throw new Error("failed to update address");
            }
            let response = await fetch("https://tech-mart-backend-five.vercel.app/addresses");
            if (! response.ok) {
                throw new Error("failed to fetch addresses");
            }
            let responseData = await response.json();
            setAddressesDetails(responseData);
            setAddressUpdatedId(null);
            setUpdatedAddressInfo(null);
            setSharedLoading(false);
        }catch(error) {
            console.error('Error: ', error);
        }
    }

    const deleteAddressHandler = async (addressId) => {
        setSharedLoading(true);
        try {
            let addressDeletingResponse = await fetch(`https://tech-mart-backend-five.vercel.app/address/delete/${addressId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (! addressDeletingResponse.ok) {
                throw new Error("failed to delete address");
            }
            let response = await fetch("https://tech-mart-backend-five.vercel.app/addresses");
            if (! response.ok) {
                throw new Error("failed to fetch addresses");
            }
            let responseData = await response.json();
            setAddressesDetails(responseData);
            setSharedLoading(false);
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
    }, []);

    useEffect(() => {
        setSharedLoading(true);
        fetch("https://tech-mart-backend-five.vercel.app/addresses")
        .then((response) => {
            if (! response.ok) {
                throw new Error("failed to fetch addresses");
            }
            return response.json();
        })
        .then((responseData) => {
            setAddressesDetails(responseData);
        })
        .catch((error) => {
            console.error('Error: ', error);
        })
        .finally(() => {
            setSharedLoading(false);
        })
    }, []);

     useEffect(() => {
        setSharedLoading(true);
        fetch("https://tech-mart-backend-five.vercel.app/orders")
        .then((response) => {
            if (! response.ok) {
                throw new Error("failed to fetch orders");
            }
            return response.json();
        })
        .then((responseData) => {
            setOrdersDetails(responseData);
        })
        .catch((error) => {
            console.error('Error: ', error);
        })
        .finally(() => {
            setSharedLoading(false);
        })
    }, []);
    
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
                                <li className="fs-5 fw-medium list-group-item d-flex justify-content-between" onClick={() => {
                                    setDisplayOrdersPage(true);
                                    setDisplayAddressPage(false);
                                    setDisplayPersonalInfo(false);
                                }}>My Orders<i className="bi bi-arrow-right ms-5"></i></li>
                            </Link>
                            <li className="list-group-item">
                                <p className="fs-5 fw-medium py-2">Account Settings</p>
                                <Link className="fs-6 fw-normal link-offset-2 link-underline link-underline-opacity-0" onClick={() => {
                                    setDisplayPersonalInfo(true);
                                    setDisplayAddressPage(false);
                                    setDisplayOrdersPage(false);
                                }}>Profile Information</Link>
                                <br/>
                                <br/>
                                <Link className="fs-6 fw-normal link-offset-2 link-underline link-underline-opacity-0" onClick={() => {
                                    setDisplayAddressPage(true);
                                    setDisplayPersonalInfo(false);
                                    setDisplayOrdersPage(false);
                                }}>Manage Addresses</Link>
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
                        {displayAddressPage && <div className="card">
                               <div className="card-body position-relative">
                                {sharedLoading && <div className="spinner-border text-primary position-absolute top-50 start-50 translate-middle"></div>}
                                <p className="fs-4 fw-medium">Manage Addresses</p>
                                {!displayAddressForm && <Link className="link-offset-2 link-underline link-underline-opacity-0" onClick={() => setDisplayAddressForm(true)}>
                                 <div className="card">
                                    <div className="card-body">
                                        <p className="fs-5 fw-medium">+ Add a new address</p>
                                    </div>
                                  </div>
                                </Link>}
                                {displayAddressForm && <div className="card">
                                       <div className="card-body">
                                        <form onSubmit={addressFormSubmitHandler}>
                                        <div className="col-md-6">
                                            <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            placeholder="Name"
                                            onChange={(event) => setNewAddressInfo((prevData) => ({
                                            ...prevData, [event.target.id]: event.target.value
                                            }))}
                                            />
                                        </div>
                                        <div className="col-md-4 mt-4">
                                            <input
                                            type="text"
                                            className="form-control"
                                            id="phoneNumber"
                                            placeholder="PhoneNumber"
                                            onChange={(event) => setNewAddressInfo((prevData) => ({
                                                ...prevData, [event.target.id]: event.target.value
                                            }))}
                                            />
                                        </div>
                                        <div className="col-md-4 mt-4">
                                            <input
                                            type="text"
                                            className="form-control"
                                            id="pincode"
                                            placeholder="Pincode"
                                            onChange={(event) => setNewAddressInfo((prevData) => ({
                                                ...prevData, [event.target.id]: event.target.value
                                            }))}
                                            />
                                        </div>
                                        <div className="col-md-4 mt-4">
                                            <input
                                            type="text"
                                            className="form-control"
                                            id="locality"
                                            placeholder="Locality"
                                            onChange={(event) => setNewAddressInfo((prevData) => ({
                                                ...prevData, [event.target.id]: event.target.value
                                            }))}
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <textarea className="form-control" id="address" rows={4} cols={50} placeholder="Address"
                                            onChange={(event) => {
                                                setNewAddressInfo((prevData) => ({
                                                    ...prevData, [event.target.id]: event.target.value
                                                }))
                                            }}
                                            ></textarea>
                                        </div>
                                        <div className="col-md-4 mt-4">
                                            <input
                                            type="text"
                                            className="form-control"
                                            id="city"
                                            placeholder="City"
                                            onChange={(event) => setNewAddressInfo((prevData) => ({
                                                ...prevData, [event.target.id]: event.target.value
                                            }))}
                                            />
                                        </div>
                                        <div className="col-md-4 mt-4">
                                           
                                           <select id="state" name="state">
                                               <option value="">-- Select State --</option>
                                               <option value="Andhra Pradesh">Andhra Pradesh</option>
                                               <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                               <option value="Assam">Assam</option>
                                               <option value="Bihar">Bihar</option>
                                               <option value="Chhattisgarh">Chhattisgarh</option>
                                               <option value="Goa">Goa</option>
                                               <option value="Gujarat">Gujarat</option>
                                               <option value="Haryana">Haryana</option>
                                               <option value="Himachal Pradesh">Himachal Pradesh</option>
                                               <option value="Jharkhand">Jharkhand</option>
                                               <option value="Karnataka">Karnataka</option>
                                               <option value="Kerala">Kerala</option>
                                               <option value="Madhya Pradesh">Madhya Pradesh</option>
                                               <option value="Maharashtra">Maharashtra</option>
                                                <option value="Manipur">Manipur</option>
                                                <option value="Meghalaya">Meghalaya</option>
                                                <option value="Mizoram">Mizoram</option>
                                                <option value="Nagaland">Nagaland</option>
                                                <option value="Odisha">Odisha</option>
                                                <option value="Punjab">Punjab</option>
                                                <option value="Rajasthan">Rajasthan</option>
                                                <option value="Sikkim">Sikkim</option>
                                                <option value="Tamil Nadu">Tamil Nadu</option>
                                                <option value="Telangana">Telangana</option>
                                                <option value="Tripura">Tripura</option>
                                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                                <option value="Uttarakhand">Uttarakhand</option>
                                                <option value="West Bengal">West Bengal</option>
                                                <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                                <option value="Chandigarh">Chandigarh</option>
                                                <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                                                <option value="Delhi">Delhi</option>
                                                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                                <option value="Ladakh">Ladakh</option>
                                                <option value="Lakshadweep">Lakshadweep</option>
                                                <option value="Puducherry">Puducherry</option>
                                            </select>

                                        </div>
                                        <div className="mt-4">
                                            <label className="form-label fs-5 fw-medium">Address Type</label>
                                            <div className="form-check">
                                                <input
                                                type="radio"
                                                className="form-check-input"
                                                name="addressType"
                                                value="Home"
                                                onChange={(event) => setNewAddressInfo((prevData) => ({
                                                    ...prevData, [event.target.name]: event.target.value
                                                }))}
                                                />
                                                <label className="form-check-label fs-5 fw-normal">Home</label>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                type="radio"
                                                className="form-check-input"
                                                name="addressType"
                                                value="Work"
                                                onChange={(event) => setNewAddressInfo((prevData) => ({
                                                    ...prevData, [event.target.name]: event.target.value
                                                }))}
                                                />
                                                <label className="form-check-label fs-5 fw-normal">Work</label>
                                            </div>
                                        </div>
                                        <div className="d-flex py-4">
                                            <button type="submit" className="btn btn-primary">Save</button>
                                            <button className="btn btn-primary ms-5" onClick={(event) => {
                                                event.preventDefault();
                                                setDisplayAddressForm(false);
                                            }}>Cancel</button>
                                        </div>
                                        </form>
                                       </div>
                                    </div>}
                                    {addressesDetails && <div className="py-4">
                                            {addressesDetails.addresses.map((obj) => {
                                                if (addressUpdateId === obj._id) {
                                                    return (
                                                        <div className="card" key={obj._id}>
                                                            <div className="card-body">
                                                                <p className="fs-3 fw-medium">Edit address</p>
                                                                <form onSubmit={(event) => {
                                                                    event.preventDefault();
                                                                    updateAddressHandler(obj._id)
                                                                }}>
                                                                    <div className="col-md-6">
                                                                        <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="name"
                                                                        placeholder="Name"
                                                                        value={updatedAddresssInfo.name}
                                                                        onChange={(event) => setUpdatedAddressInfo((prevData) => ({
                                                                            ...prevData, [event.target.id]: event.target.value
                                                                        }))}
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-4 mt-4">
                                                                        <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="phoneNumber"
                                                                        placeholder="Phone Number"
                                                                        value={updatedAddresssInfo.phoneNumber}
                                                                        onChange={(event) => setUpdatedAddressInfo((prevData) => ({
                                                                            ...prevData, [event.target.id]: event.target.value
                                                                        }))}
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-4 mt-4">
                                                                        <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="pincode"
                                                                        placeholder="Pincode"
                                                                        value={updatedAddresssInfo.pincode}
                                                                        onChange={(event) => setUpdatedAddressInfo((prevData) => ({
                                                                            ...prevData, [event.target.id]: event.target.value
                                                                        }))}
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-4 mt-4">
                                                                        <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="locality"
                                                                        placeholder="Locality"
                                                                        value={updatedAddresssInfo.locality}
                                                                        onChange={(event) => setUpdatedAddressInfo((prevData) => ({
                                                                            ...prevData, [event.target.id]: event.target.value
                                                                        }))}
                                                                        />
                                                                    </div>
                                                                    <div className="mt-4">
                                                                        <textarea
                                                                        className="form-control"
                                                                        rows={4}
                                                                        cols={50}
                                                                        id="address"
                                                                        placeholder="Address"
                                                                        value={updatedAddresssInfo.address}
                                                                        onChange={(event) => setUpdatedAddressInfo((prevData) => ({
                                                                            ...prevData, [event.target.id]: event.target.value
                                                                        }))}
                                                                        ></textarea>
                                                                    </div>
                                                                    <div className="col-md-4 mt-4">
                                                                        <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="city"
                                                                        placeholder="City"
                                                                        value={updatedAddresssInfo.city}
                                                                        onChange={(event) => setUpdatedAddressInfo((prevData) => ({
                                                                            ...prevData, [event.target.id]: event.target.value
                                                                        }))}
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-4 mt-4">
                                                                        <select className="form-select" 
                                                                        id="state" 
                                                                        value={updatedAddresssInfo.state}
                                                                        onChange={(event) => setUpdatedAddressInfo((prevData) => ({
                                                                            ...prevData, [event.target.id]: event.target.value
                                                                        }))}
                                                                        >
                                                                            <option value="">--Select State--</option>
                                                                             <option value="Andhra Pradesh">Andhra Pradesh</option>
                                                                             <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                                                             <option value="Assam">Assam</option>
                                                                             <option value="Bihar">Bihar</option>
                                                                             <option value="Chhattisgarh">Chhattisgarh</option>
                                                                             <option value="Goa">Goa</option>
                                                                             <option value="Gujarat">Gujarat</option>
                                                                             <option value="Haryana">Haryana</option>
                                                                             <option value="Himachal Pradesh">Himachal Pradesh</option>
                                                                             <option value="Jharkhand">Jharkhand</option>
                                                                             <option value="Karnataka">Karnataka</option>
                                                                             <option value="Kerala">Kerala</option>
                                                                             <option value="Madhya Pradesh">Madhya Pradesh</option>
                                                                             <option value="Maharashtra">Maharashtra</option>
                                                                             <option value="Manipur">Manipur</option>
                                                                             <option value="Meghalaya">Meghalaya</option>
                                                                             <option value="Mizoram">Mizoram</option>
                                                                             <option value="Nagaland">Nagaland</option>
                                                                             <option value="Odisha">Odisha</option>
                                                                             <option value="Punjab">Punjab</option>
                                                                             <option value="Rajasthan">Rajasthan</option>
                                                                             <option value="Sikkim">Sikkim</option>
                                                                             <option value="Tamil Nadu">Tamil Nadu</option>
                                                                             <option value="Telangana">Telangana</option>
                                                                             <option value="Tripura">Tripura</option>
                                                                             <option value="Uttar Pradesh">Uttar Pradesh</option>
                                                                             <option value="Uttarakhand">Uttarakhand</option>
                                                                             <option value="West Bengal">West Bengal</option>
                                                                             <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                                                             <option value="Chandigarh">Chandigarh</option>
                                                                             <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                                                                             <option value="Delhi">Delhi</option>
                                                                             <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                                                             <option value="Ladakh">Ladakh</option>
                                                                             <option value="Lakshadweep">Lakshadweep</option>
                                                                             <option value="Puducherry">Puducherry</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="mt-4">
                                                                        <label className="form-label fs-5 fw-normal">Address Type</label>
                                                                        <div className="form-check">
                                                                            <input
                                                                            type="radio"
                                                                            className="form-check-input"
                                                                            name="addressType"
                                                                            value="Home"
                                                                            onChange={(event) => setUpdatedAddressInfo((prevData) => ({
                                                                                ...prevData, [event.target.name]: event.target.value
                                                                            }))}
                                                                            />
                                                                            <label className="form-check-label">Home</label>
                                                                        </div>
                                                                        <div className="form-check">
                                                                            <input
                                                                            type="radio"
                                                                            className="form-check-input"
                                                                            name="addressType"
                                                                            value="Work"
                                                                            onChange={(event) => setUpdatedAddressInfo((prevData) => ({
                                                                                ...prevData, [event.target.name]: event.target.value
                                                                            }))}
                                                                            />
                                                                            <label className="form-check-label">Work</label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="d-flex py-4">
                                                                        <button className="btn btn-primary" type="submit">Save</button>
                                                                        <button className="btn btn-primary ms-5" onClick={(event) => {
                                                                            event.preventDefault();
                                                                            setAddressUpdatedId(null);
                                                                            setUpdatedAddressInfo(null);
                                                                        }}>Cancel</button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div className="card py-4" key={obj._id}>
                                                            <div className="card-body">
                                                                <div className="d-flex justify-content-between">
                                                                    <span className="badge text-bg-secondary">{obj.address.addressType}</span>
                                                                    <div>
                                                                      <i className="bi bi-pencil" style={{ cursor: "pointer"}} title="Edit" onClick={() => {
                                                                        setAddressUpdatedId(obj._id);
                                                                        setUpdatedAddressInfo(obj.address);
                                                                      }}></i>
                                                                      <i className="bi bi-trash ms-5" style={{ cursor: "pointer"}} title="Delete" onClick={() => {
                                                                        deleteAddressHandler(obj._id)
                                                                      }}></i>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex">
                                                                    <p className="fs-5 fw-medium">{obj.address.name} - </p>
                                                                    <p className="fs-5 fw-normal ms-2">{obj.address.phoneNumber}</p>
                                                                </div>
                                                                <p className="fs-5 fw-normal">{obj.address.address}, {obj.address.locality}, {obj.address.city}, {obj.address.state}-{obj.address.pincode}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            })}
                                        </div>}
                               </div>
                            </div>}
                            {displayOrdersPage && <div>
                                   <p className="fs-3 fw-medium">My Orders</p>
                                   {ordersDetails && <ul className="list-group py-4">
                                       {ordersDetails.orders.map((obj) => {
                                        return (
                                            <li className="list-group-item" key={obj._id}>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    {Object.keys(obj.order).includes("mobile") && <img src={obj.order.mobile.thumbnailImage} className="img-fluid" style={{ width: "100px", height: "100px"}}/>}
                                                    {Object.keys(obj.order).includes("laptop") && <img src={obj.order.laptop.thumbnailImage} className="img-fluid" style={{ width: "100px", height: "100px"}}/>}
                                                    {Object.keys(obj.order).includes("mobile") && <p className="fs-5 fw-medium">{obj.order.mobile.generalFeatures.name}</p>}
                                                    {Object.keys(obj.order).includes("laptop") && <p className="fs-5 fw-medium">{obj.order.laptop.generalFeatures.name}</p>}
                                                    <p className="fs-5 fw-medium"><i className="bi bi-currency-rupee"></i>{obj.orderDiscountedPrice}</p>
                                                </div>
                                            </li>
                                        )
                                       })}
                                    </ul>}
                                </div>}
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
    const [inputQuery, setInputQuery] = useState("");

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
            <Header sharedCart={cart} sharedWishlist={wishlist} sharedInputQuery={inputQuery} setSharedInputQuery={setInputQuery}/>
            <User sharedLoading={loading} setSharedLoading={setLoading}/>
        </div>
    )
}

export default DisplayUserDetails

