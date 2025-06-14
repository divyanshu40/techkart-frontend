import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./components/Header";

const Cart = ({sharedCart, setSharedCart, sharedLoading, setSharedLoading, sharedError, setSharedError, sharedWishlist, setSharedWishlist}) => {

    const [selectedCartItems, setSelectedCartItems] = useState([]);
    const [selectedItemIds, setSelectedItemIds] = useState([]);
    const [displayItemCountIncrementMessage, setDisplayItemCountIncrementMessage] = useState(false);
    const [displayItemCountDecrementMessage, setDisplayItemCountDecrementMessage] = useState(false);
    const [displayAddToWishlistMessage, setDisplayAddToWishlistMessage] = useState(false);
    const [displayDeleteWishlistItemMessage, setDisplayDeleteWishlistItemMessage] = useState(false);
    const [displayDeleteCartItemMessage, setDisplayDeleteCartItemMessage] = useState(false);

    const itemCountIncrementHandler = async (itemId) => {
        setSharedLoading(true)
        try {
            let updatedItem = await fetch(`https://tech-mart-backend-five.vercel.app/cart/update/${itemId}`, {
                method: "POST",
                body: JSON.stringify({ $inc: { quantity: 1 } }),
                headers: {
                    "content-type": "application/json"
                }
            });
            if (! updatedItem.ok) {
                throw new Error("failed to update the cart item details");
            }
            let response = await fetch("https://tech-mart-backend-five.vercel.app/cart");
            if (! response.ok) {
                throw new Error("failed to fetch cart details");
            }
            let responseData = await response.json();
            setSharedCart(responseData);
            setDisplayItemCountIncrementMessage(true);
            setSharedLoading(false);
        } catch(error) {
            console.error('Error: ', error);
        }
    }

    const itemCountDecrementHandler = async (itemId) => {
        setSharedLoading(true);
        try {
            let updatedItem = await fetch(`https://tech-mart-backend-five.vercel.app/cart/update/${itemId}`, {
            method: "POST",
            body: JSON.stringify({ $inc: { quantity: - 1 } }),
            headers: {
                "content-type": "application/json"
            }
        });
        if (! updatedItem) {
            throw new Error("failed to update the cart item details");
        }
        let response = await fetch("https://tech-mart-backend-five.vercel.app/cart");
        let responseData = await response.json();
        setSharedCart(responseData);
        setDisplayItemCountDecrementMessage(true);
        setSharedLoading(false);
        } catch(error) {
            console.error('Error: ', error)
        }
    }

    const deleteCartItemHandler = async (itemId) => {
        setSharedLoading(true)
        try {
            let deletedCartItem = await fetch(`https://tech-mart-backend-five.vercel.app/cart/delete/${itemId}`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json"
                }
            });
            if (! deletedCartItem.ok) {
                throw new Error("failed to delete cart item");
            }
            let response = await fetch("https://tech-mart-backend-five.vercel.app/cart");
            if (! response.ok) {
                throw new Error("failed to fetch cart details");
            }
            let responseData = await response.json();
            setSharedCart(responseData);
            setDisplayDeleteCartItemMessage(true);
            setSharedLoading(false)
        } catch(error) {
            console.error('Error: ', error);
        }
    }

    const addToWishlistHandler = async (productData) => {
        setSharedLoading(true);
        try {
            let itemAddingResponse = await fetch("https://tech-mart-backend-five.vercel.app/wishlist/new", {
                method: "POST",
                body: JSON.stringify({ product: productData }),
                headers: {
                    "content-type": "application/json"
                }
            });
            if (! itemAddingResponse.ok) {
                throw new Error("failed to add item to wishlist");
            }
            
            let response = await fetch("https://tech-mart-backend-five.vercel.app/wishlist");
            if (! response.ok) {
                throw new Error("failed to fetch wishlist details")
            }
            let responseData = await response.json();
            setSharedWishlist(responseData);
            setDisplayAddToWishlistMessage(true);
            setSharedLoading(false)
        }catch(error) {
            setSharedError(error.message)
        }
    }

    const deleteWishlistItemHandler = async (wishlistItemId) => {
        setSharedLoading(true);
        try {
            let deletingResponse = await fetch(`https://tech-mart-backend-five.vercel.app/wishlist/delete/${wishlistItemId}`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json"
                }
            });
            if (! deletingResponse) {
                throw new Error("failed to delete item from wishlist");
            }
            let response = await fetch("https://tech-mart-backend-five.vercel.app/wishlist");
            if (! response.ok) {
                throw new Error("failed to fetch wishlist items")
            }
            let responseData = await response.json();
            setSharedWishlist(responseData);
            setDisplayDeleteWishlistItemMessage(true);
            setSharedLoading(false);
        } catch(error) {
            setSharedError(error.message)
        }
    }
    
    return (
        <div className="row bg-light">
            <div className="col-md-7 ms-5 mt-5 position-relative">
                <p className="fs-1 fw-medium">Cart Items</p>
                <p className="fs-5 fw-medium">Select items to place order</p>
                {displayItemCountIncrementMessage && <div className="alert alert-success col-md-4 position-relative">
                      <p className="fs-5 fw-medium">Cart Item Increased</p>
                      <button className="btn btn-close position-absolute top-0 end-0" onClick={() => setDisplayItemCountIncrementMessage(false)}></button>
                    </div>}
                    {displayItemCountDecrementMessage && <div className="alert alert-danger col-md-4 position-relative">
                      <p className="fs-5 fw-medium">Cart Item Decreased</p>
                      <button className="btn btn-close position-absolute top-0 end-0" onClick={() => setDisplayItemCountDecrementMessage(false)}></button>
                    </div>}
                    {displayAddToWishlistMessage && <div className="alert alert-success col-md-4 position-relative">
                      <p className="fs-5 fw-medium">Cart item added to wishlist</p>
                      <button className="btn btn-close position-absolute top-0 end-0" onClick={() => setDisplayAddToWishlistMessage(false)}></button>
                    </div>}
                    {displayDeleteWishlistItemMessage && <div className="alert alert-danger col-md-4 position-relative">
                      <p className="fs-5 fw-medium">Cart item deleted from wishlist</p>
                      <button className="btn btn-close position-absolute top-0 end-0" onClick={() => setDisplayDeleteWishlistItemMessage(false)}></button>
                    </div>}
                    {displayDeleteCartItemMessage && <div className="alert alert-danger col-md-4 position-relative">
                      <p className="fs-5 fw-medium">Item deleted from cart</p>
                      <button className="btn btn-close position-absolute top-0 end-0" onClick={() => setDisplayDeleteCartItemMessage(false)}></button>
                    </div>}
                {sharedLoading && <div className="spinner-border text-primary position-absolute top-50 start-100 translate-middle"></div>}
                {sharedError && <p className="fs-5 fw-medium">{sharedError}</p>}
                {sharedCart?.cartItems?.length === 0 && <p className="fs-2 fw-medium">No Items in the Cart</p>}
                <ul className="list-group py-2">
                    {sharedCart?.cartItems?.map((obj) => {
                        console.log(obj)
                        return (
                            <li className="list-group-item" key={obj._id}>
                                <div className="row d-flex align-items-center ">
                                    {Object.keys(obj.product).includes("mobile") && <>
                                      {sharedWishlist?.wishlistItems?.filter((ele) => Object.keys(ele.product).includes("mobile")).find((ele) => ele.product.mobile._id === obj.product.mobile._id)? <i className="bi bi-heart-fill py-4" style={{ fontSize: "20px", cursor: "pointer", color: "red"}} onClick={() => {
                                        deleteWishlistItemHandler(sharedWishlist?.wishlistItems?.filter((ele) => Object.keys(ele.product).includes("mobile")).find((ele) => ele.product.mobile._id === obj.product.mobile._id)["_id"])
                                      }}></i> : <i className="bi bi-heart py-4" style={{ fontSize: "20px", cursor: "pointer"}} onClick={() => {
                                        addToWishlistHandler(obj.product)
                                    }}></i>}
                                    </>}
                                    {Object.keys(obj.product).includes("laptop") && <>
                                      {sharedWishlist?.wishlistItems?.filter((ele) => Object.keys(ele.product).includes("laptop")).find((ele) => ele.product.laptop._id === obj.product.laptop._id)? <i className="bi bi-heart-fill py-4" style={{ fontSize: "20px", cursor: "pointer", color: "red"}} onClick={() => {
                                        deleteWishlistItemHandler(sharedWishlist?.wishlistItems?.filter((ele) => Object.keys(ele.product).includes("laptop")).find((ele) => ele.product.laptop._id === obj.product.laptop._id)["_id"])
                                      }}></i> : <i className="bi bi-heart py-4" style={{ fontSize: "20px", cursor: "pointer"}} onClick={() => {
                                        addToWishlistHandler(obj.product)
                                    }}></i>}
                                    </>}
                                    <div className="col-md-3">
                                        <input
                                        type="checkbox"
                                        className="form-check-input"
                                        value={obj}
                                        onChange={(event) => {
                                            if (event.target.checked) {
                                                setSelectedCartItems((prevArray) => [...prevArray, obj]);
                                                setSelectedItemIds((prevArray) => [...prevArray, obj._id]);
                                            } else {
                                                setSelectedCartItems((prevArray) => prevArray.filter((ele) => ele._id !== obj._id));
                                                setSelectedItemIds((prevArray) => prevArray.filter((ele) => ele !== obj._id));
                                            }
                                        }}
                                        />
                                        {Object.keys(obj.product).includes("laptop") && <Link to={`/productDetails/laptops/${obj.product.laptop._id}`}><img src={obj.product.laptop.thumbnailImage} className="img-fluid" style={{ width: "200px", height: "200px"}}/></Link>}
                                        {Object.keys(obj.product).includes("mobile") && <Link to={`/productDetails/mobiles/${obj.product.mobile._id}`}><img src={obj.product.mobile.thumbnailImage} className="img-fluid" style={{ width: "200px", height: "200px"}}/></Link>}
                                    </div>
                                    <div className="col ms-5">
                                        {Object.keys(obj.product).includes("laptop") && <p className="fs-5 fw-medium">{obj.product.laptop.generalFeatures.name}</p>}
                                        {Object.keys(obj.product).includes("mobile") && <p className="fs-5 fw-medium">{obj.product.mobile.generalFeatures.name}</p>}
                                        <div className="d-flex">
                                            {Object.keys(obj.product).includes("laptop") && <p className="fs-5 fw-medium" style={{ color: "grey"}}><del><i className="bi bi-currency-rupee"></i>{obj.product.laptop.orignalPrice}</del></p>}
                                            {Object.keys(obj.product).includes("mobile") && <p className="fs-5 fw-medium" style={{ color: "grey"}}><del><i className="bi bi-currency-rupee"></i>{obj.product.mobile.orignalPrice}</del></p>}
                                            {Object.keys(obj.product).includes("laptop") && <p className="fs-5 fw-medium ms-4"><i className="bi bi-currency-rupee"></i>{obj.product.laptop.discountedPrice * obj.quantity}</p>}
                                            {Object.keys(obj.product).includes("mobile") && <p className="fs-5 fw-medium ms-4"><i className="bi bi-currency-rupee"></i>{obj.product.mobile.discountedPrice * obj.quantity}</p>}
                                            {Object.keys(obj.product).includes("laptop") && <p className="fs-5 fw-medium ms-5" style={{ color: "green"}}>{obj.product.laptop.discount}% Off</p>}
                                            {Object.keys(obj.product).includes("mobile") && <p className="fs-5 fw-medium ms-5" style={{ color: "green"}}>{obj.product.mobile.discount}% Off</p>}
                                        </div>
                                        <div className="col-md-6 ms-4">
                                           <div className="input-group">
                                           {obj.quantity=== 1 ? <button className="btn btn-danger" disabled>-</button> :  <button className="btn btn-danger" onClick={() => {
                                                itemCountDecrementHandler(obj._id)
                                            }}>-</button>}
                                            <input type="text" className="form-control fw-medium text-center" value={obj.quantity}/>
                                            <button className="btn btn-primary" onClick={() => {
                                                itemCountIncrementHandler(obj._id)
                                            }}>+</button>
                                           </div>
                                        </div>
                                    </div>
                                    <div className="col ms-5 position-relative">
                                        <button className="btn btn-danger" onClick={() => {
                                            deleteCartItemHandler(obj._id)
                                        }}>Delete</button>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="col position-relative">
                <div className="card position-absolute top-50 start-50 translate-middle" style={{ width: "450px"}}>
                    <div className="card-body p-5">
                        <p className="fs-4 fw-medium">Cart Subtotal ({selectedCartItems.length} items): <i className="bi bi-currency-rupee"></i>{selectedCartItems.reduce((acc, curr) =>{
                            let total = 0;
                            if (Object.keys(curr.product).includes("mobile")) {
                                total = acc + (curr.product.mobile.discountedPrice * curr.quantity);
                                return total;
                            } else if (Object.keys(curr.product).includes("laptop")) {
                                total = acc + (curr.product.laptop.discountedPrice * curr.quantity);
                                return total;
                            }
                        }, 0)}</p>
                        {selectedCartItems.length === 0 ? <button className="btn btn-success rounded-pill text-center" disabled style={{ width: "350px"}}>Continue</button> :  <Link to="/orderDetails/cart"><button className="btn btn-success rounded-pill text-center" style={{ width: "350px"}} onClick={() => {
                            sessionStorage.setItem("cartItemsIds", JSON.stringify(selectedItemIds));
                            sessionStorage.setItem("checkedCartItems", JSON.stringify(selectedCartItems))
                        }}>Continue</button></Link>}
                    </div>
                </div>
            </div>
        </div>
    )
}

const DisplayCartItems = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [wishlist, setWishlist] = useState(null);
    const [error, setError] = useState(null);
    const [inputQuery, setInputQuery] = useState("")

    useEffect(() => {
        setLoading(true);
        fetch("https://tech-mart-backend-five.vercel.app/cart")
        .then((response) => {
            if (! response.ok) {
                throw new Error("failed to fetch data");
            }
            return response.json();
        })
        .then((responseData) => {
            setCart(responseData);
        })
        .catch((error) => {
            setError(error.message);
        })
        .finally(() => {
            setLoading(false);
        })
    }, []);

    useEffect(() => {
        fetch("https://tech-mart-backend-five.vercel.app/wishlist")
        .then((response) => {
            if (! response.ok) {
                throw new Error("failed to fetch data")
            }
            return response.json();
        })
        .then((responseData) => {
            setWishlist(responseData);
        })
        .catch((error) => {
            setError(error.message)
        })
    }, []);

    return (
        <div>
            <Header sharedCart={cart} sharedWishlist={wishlist} sharedInputQuery={inputQuery} setSharedInputQuery={setInputQuery}/>
            <Cart sharedCart={cart} setSharedCart={setCart} sharedLoading={loading} setSharedLoading={setLoading} sharedError={error} setSharedError={setError} sharedWishlist={wishlist} setSharedWishlist={setWishlist}/>
        </div>
    )
}

export default DisplayCartItems