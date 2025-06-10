import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./components/Header";

const WishlistDetails = ({ sharedCart, setSharedCart, sharedWishlist, setSharedWishlist, sharedLoading, setSharedLoading}) => {

    const addToCartHandler = async (wishlistItem) => {
        setSharedLoading(true);
        try {
            let itemAddingResponse = await fetch(`https://tech-mart-backend-five.vercel.app/cart/new`, {
            method: "POST",
            body: JSON.stringify({ product: wishlistItem }),
            headers: {
                "content-type": "application/json"
            }
        });
        if (! itemAddingResponse.ok) {
            throw new Error("failed to add item to the cart");
        }
        alert("Item added to cart")
        let response = await fetch("https://tech-mart-backend-five.vercel.app/cart");
        if (! response.ok) {
            throw new Error("failed to fetch cart details");
        }
        let responseData = await response.json();
        setSharedCart(responseData);
        setSharedLoading(false);
        } catch(error) {
            console.error("Error: ", error);
        }
    }

    const deleteItemHandler = async (itemId) => {
        setSharedLoading(true);
        try {
            let itemDeletingResponse = await fetch(`https://tech-mart-backend-five.vercel.app/wishlist/delete/${itemId}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            }
        });
        if (! itemDeletingResponse.ok) {
            throw new Error("failed to delete items from wishlist");
        }
        alert("Item deleted from wishlist");
        let response = await fetch("https://tech-mart-backend-five.vercel.app/wishlist");
        if (! response.ok) {
            throw new Error("failed to fetch wishlist details");
        }
        let responseData = await response.json();
        setSharedWishlist(responseData);
        setSharedLoading(false);
        } catch(error) {
            console.error("Error: ", error);
        }
    }

    return (
        <div className="bg-light">
            <div className="container">
                <p className="fs-4 fw-medium py-4">My Wishlist</p>
                <div className="row">
                    <div className="col position-relative mt-5">
                        {sharedLoading && <div className="spinner-border text-primary position-absolute top-50 start-50 translate-middle"></div>}
                        {!sharedLoading && <>
                          <ul className="list-group">
                    {sharedWishlist?.wishlistItems?.map((obj) => {
                        return (
                            <li className="list-group-item" key={obj._id}>
                                <div className="row d-flex align-items-center">
                                    <div className="col-md-4">
                                        {Object.keys(obj.product).includes("mobile") && <Link to={`/productDetails/mobiles/${obj.product.mobile._id}`} style={{ cursor: "pointer"}}><img src={obj.product.mobile.thumbnailImage} className="img-fluid" style={{ width: "100px", height: "100px"}}/></Link>}
                                        {Object.keys(obj.product).includes("laptop") && <Link to={`/productDetails/laptops/${obj.product.laptop._id}`} style={{ cursor: "pointer"}}><img src={obj.product.laptop.thumbnailImage} className="img-fluid" style={{ width: "100px", height: "100px"}}/></Link>}
                                    </div>
                                    <div className="col">
                                        {Object.keys(obj.product).includes("mobile") && <p className="fs-5 fw-medium">{obj.product.mobile.generalFeatures.name}</p>}
                                        {Object.keys(obj.product).includes("laptop") && <p className="fs-5 fw-medium">{obj.product.laptop.generalFeatures.name}</p>}
                                        <div className="d-flex">
                                            {Object.keys(obj.product).includes("mobile") && <p className="fs-5 fw-medium"><del><i className="bi bi-currency-rupee"></i>{obj.product.mobile.orignalPrice}</del></p>}
                                            {Object.keys(obj.product).includes("laptop") && <p className="fs-5 fw-medium"><del><i className="bi bi-currency-rupee"></i>{obj.product.laptop.orignalPrice}</del></p>}
                                            {Object.keys(obj.product).includes("mobile") && <p className="fs-5 fw-medium ms-5"><i className="bi bi-currency-rupee"></i>{obj.product.mobile.discountedPrice}</p>}
                                            {Object.keys(obj.product).includes("laptop") && <p className="fs-5 fw-medium ms-5"><i className="bi bi-currency-rupee"></i>{obj.product.laptop.discountedPrice}</p>}
                                            {Object.keys(obj.product).includes("mobile") && <p className="fs-5 fw-medium ms-5" style={{ color: "green"}}>{obj.product.mobile.discount}% Off</p>}
                                            {Object.keys(obj.product).includes("laptop") && <p className="fs-5 fw-medium ms-5" style={{ color: "green"}}>{obj.product.laptop.discount}% Off</p>}
                                        </div>
                                        {Object.keys(obj.product).includes("mobile") && <>
                                          {sharedCart?.cartItems?.find((ele) => ele?.product?.mobile?._id === obj?.product?.mobile?._id) ? <Link className="link-offset-2 link-underline link-underline-opacity-0" to="/cart"><button className="btn btn-warning fs-5 fw-medium">Go To Cart</button></Link> :  <button className="btn btn-warning fs-5 fw-medium" onClick={() => {
                                            addToCartHandler(obj.product)
                                        }}>Add To Cart</button>}
                                        </>}
                                         {Object.keys(obj.product).includes("laptop") && <>
                                          {sharedCart?.cartItems?.find((ele) => ele?.product?.laptop?._id === obj?.product?.laptop?._id) ? <Link className="link-offset-2 link-underline link-underline-opacity-0 fs-5 fw-medium" to="/cart"><button className="btn btn-warning">Go To Cart</button></Link> :  <button className="btn btn-warning fs-5 fw-medium" onClick={() => {
                                            addToCartHandler(obj.product)
                                        }}>Add To Cart</button>}
                                        </>}
                                    </div>
                                    <div className="col">
                                        <button className="btn btn-danger" onClick={() => {
                                            deleteItemHandler(obj._id)
                                        }}>Delete</button>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
                        </>}
                         
                    </div>
                </div>
            </div>
        </div>
    )
}


const DisplayWishlist = () => {
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
            console.error('Error: ', error)
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
                throw new Error("failed to fetch wishlist details");
            }
            return response.json();
        })
        .then((responseData) => {
            setWishlist(responseData);
        })
        .catch((error) => {
            console.error('Error', error);
        })
        .finally(() => {
            setLoading(false)
        })
    }, []);
    return (
        <div>
            <Header sharedCart={cart} sharedWishlist={wishlist} sharedInputQuery={inputQuery} setSharedInputQuery={setInputQuery}/>
            <WishlistDetails sharedCart={cart} setSharedCart={setCart} sharedWishlist={wishlist} setSharedWishlist={setWishlist} sharedLoading={loading} setSharedLoading={setLoading}/>
        </div>
    )
}

export default DisplayWishlist


