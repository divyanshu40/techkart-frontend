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
    const [deletedWishlistItem, setDeletedWishlistItem] = useState(null);
    const [addedWishlistItem, setAddedWishlistItem] = useState(null);
    const [updatedCartItem, setUpdatedCartItem] = useState(null);

    const itemCountIncrementHandler = async (itemId) => {
        setSharedLoading(true)
        try {
            let updatedItemResponse = await fetch(`https://tech-mart-backend-five.vercel.app/cart/update/${itemId}`, {
                method: "POST",
                body: JSON.stringify({ $inc: { quantity: 1 } }),
                headers: {
                    "content-type": "application/json"
                }
            });
            if (! updatedItemResponse.ok) {
                throw new Error("failed to update the cart item details");
            }
            let updatedCartData = await updatedItemResponse.json();
            let response = await fetch("https://tech-mart-backend-five.vercel.app/cart");
            if (! response.ok) {
                throw new Error("failed to fetch cart details");
            }
            let responseData = await response.json();
            setUpdatedCartItem(updatedCartData.updatedItem)
            setSharedCart(responseData);
            setDisplayItemCountIncrementMessage(true);
            setSharedLoading(false);
            setTimeout(() => setDisplayItemCountIncrementMessage(false), 5000);
        } catch(error) {
            console.error('Error: ', error);
        }
    }

    const itemCountDecrementHandler = async (itemId) => {
        setSharedLoading(true);
        try {
            let updatedItemResponse = await fetch(`https://tech-mart-backend-five.vercel.app/cart/update/${itemId}`, {
            method: "POST",
            body: JSON.stringify({ $inc: { quantity: - 1 } }),
            headers: {
                "content-type": "application/json"
            }
        });
        if (! updatedItemResponse) {
            throw new Error("failed to update the cart item details");
        }
        let updatedData = await updatedItemResponse.json();
        let response = await fetch("https://tech-mart-backend-five.vercel.app/cart");
        let responseData = await response.json();
        setUpdatedCartItem(updatedData.updatedItem)
        setSharedCart(responseData);
        setDisplayItemCountDecrementMessage(true);
        setSharedLoading(false);
        setTimeout(() => setDisplayItemCountDecrementMessage(false), 5000);
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
            setTimeout(() => setDisplayDeleteCartItemMessage(false), 5000);
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
            let addedItem = await itemAddingResponse.json();
            console.log(addedItem);
            
            let response = await fetch("https://tech-mart-backend-five.vercel.app/wishlist");
            if (! response.ok) {
                throw new Error("failed to fetch wishlist details")
            }
            let responseData = await response.json();
            setAddedWishlistItem(addedItem?.wishlist)
            setSharedWishlist(responseData);
            setDisplayAddToWishlistMessage(true);
            setDisplayDeleteWishlistItemMessage(false)
            setSharedLoading(false)
            setTimeout(() => setDisplayAddToWishlistMessage(false), 5000)
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
            let deletedWishlistData = await deletingResponse.json();
            let response = await fetch("https://tech-mart-backend-five.vercel.app/wishlist");
            if (! response.ok) {
                throw new Error("failed to fetch wishlist items")
            }
            let responseData = await response.json();
            setDeletedWishlistItem(deletedWishlistData.deletedItem)
            setSharedWishlist(responseData);
            setDisplayDeleteWishlistItemMessage(true);
            setDisplayAddToWishlistMessage(false)
            setSharedLoading(false);
            setTimeout(() => setDisplayDeleteWishlistItemMessage(false), 5000)
        } catch(error) {
            setSharedError(error.message)
        }
    }
    
    return (
        <div className="row bg-light">
            <div className="col-md-7 ms-5 mt-5 position-relative">
                <p className="fs-1 fw-medium">Cart Items</p>
                <p className="fs-5 fw-medium">Select items to place order</p>
                    
                {sharedLoading && <div className="spinner-border text-primary position-absolute top-50 start-100 translate-middle"></div>}
                {sharedError && <p className="fs-5 fw-medium">{sharedError}</p>}
                {sharedCart?.cartItems?.length === 0 && <p className="fs-2 fw-medium">No Items in the Cart</p>}
                <ul className="list-group py-2">
                    {sharedCart?.cartItems?.map((obj) => {
                        return (
                            <div>
                             {displayDeleteCartItemMessage && <div className="alert bg-danger col-md-4">
                      <p className="fs-5 fw-medium">Item deleted from cart</p>
                    </div>}
                            <li className="list-group-item" key={obj._id}>
                                { (Object.keys(obj.product).includes("mobile") && addedWishlistItem?.product?.mobile?._id === obj?.product?.mobile?._id && displayAddToWishlistMessage) && <div className="alert bg-success col-md-4">
                                      <p className="text-light fw-medium text-center">Cart item added to wishlist</p>
                                    </div>}
                                    { (Object.keys(obj.product).includes("mobile") && deletedWishlistItem?.product?.mobile?._id === obj?.product?.mobile?._id && displayDeleteWishlistItemMessage) && <div className="alert bg-danger col-md-4">
                                        <p className="fw-medium text-center text-light">Cart item deleted from wishlist</p>
                                    </div> }
                                   { (Object.keys(obj.product).includes("laptop") && addedWishlistItem?.product?.laptop?._id === obj?.product?.laptop?._id && displayAddToWishlistMessage) && <div className="alert bg-success col-md-4">
                                      <p className="text-light fw-medium text-center">Cart item added to wishlist</p>
                                    </div>}
                                    { (Object.keys(obj.product).includes("laptop") && deletedWishlistItem?.product?.laptop?._id === obj?.product?.laptop?._id && displayDeleteWishlistItemMessage) && <div className="alert bg-danger col-md-4">
                                        <p className="fw-medium text-center text-light">Cart item deleted from wishlist</p>
                                    </div> }
                                    { ( Object.keys(obj.product).includes("mobile") && updatedCartItem?.product?.mobile?._id === obj?.product?.mobile?._id && displayItemCountIncrementMessage) && <div className="alert bg-success col-md-4">
                                          <p className="fw-medium text-center text-light">Cart item increased</p>
                                        </div>}
                                        { ( Object.keys(obj.product).includes("mobile") && updatedCartItem?.product?.mobile?._id === obj?.product?.mobile?._id && displayItemCountDecrementMessage) && <div className="alert bg-danger col-md-4">
                                          <p className="fw-medium text-center text-light">Cart item decreased</p>
                                        </div>}
                                        { ( Object.keys(obj.product).includes("laptop") && updatedCartItem?.product?.laptop?._id === obj?.product?.laptop?._id && displayItemCountIncrementMessage) && <div className="alert bg-success col-md-4">
                                          <p className="fw-medium text-center text-light">Cart item increased</p>
                                        </div>}
                                        { ( Object.keys(obj.product).includes("laptop") && updatedCartItem?.product?.laptop?._id === obj?.product?.laptop?._id && displayItemCountDecrementMessage) && <div className="alert bg-danger col-md-4">
                                          <p className="fw-medium text-center text-light">Cart item decreased</p>
                                        </div>}
                                <div className="row d-flex align-items-center ">
                                    {Object.keys(obj.product).includes("mobile") && <>
                                      {sharedWishlist?.wishlistItems?.filter((ele) => Object.keys(ele.product).includes("mobile")).find((ele) => ele.product.mobile._id === obj.product.mobile._id)? <i className="bi bi-heart-fill py-4" style={{ fontSize: "30px", cursor: "pointer", color: "red"}} onClick={() => {
                                        deleteWishlistItemHandler(sharedWishlist?.wishlistItems?.filter((ele) => Object.keys(ele.product).includes("mobile")).find((ele) => ele.product.mobile._id === obj.product.mobile._id)["_id"])
                                      }}></i> : <i className="bi bi-heart py-4" style={{ fontSize: "30px", cursor: "pointer"}} onClick={() => {
                                        addToWishlistHandler(obj.product)
                                    }}></i>}
                                    </>}
                                    {Object.keys(obj.product).includes("laptop") && <>
                                      {sharedWishlist?.wishlistItems?.filter((ele) => Object.keys(ele.product).includes("laptop")).find((ele) => ele.product.laptop._id === obj.product.laptop._id)? <i className="bi bi-heart-fill py-4" style={{ fontSize: "30px", cursor: "pointer", color: "red"}} onClick={() => {
                                        deleteWishlistItemHandler(sharedWishlist?.wishlistItems?.filter((ele) => Object.keys(ele.product).includes("laptop")).find((ele) => ele.product.laptop._id === obj.product.laptop._id)["_id"])
                                      }}></i> : <i className="bi bi-heart py-4" style={{ fontSize: "30px", cursor: "pointer"}} onClick={() => {
                                        addToWishlistHandler(obj.product)
                                    }}></i>}
                                    </>}
                                    <div className="col-md-3">
                                        <input
                                        type="checkbox"
                                        className="form-check-input border border-black"
                                        value={obj}
                                        style={{ fontSize: "30px", cursor: "pointer"}}
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
                            
                        </div>)
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