import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./components/Header";

const Order = ({ sharedCart, setSharedCart, sharedLoading, setSharedLoading, sharedError, setSharedError}) => {
    let { category } = useParams();
    let itemsIds = null;
    let orderItem = null;
    let orderItems = [];
    let checkedCartItems = null;
    let orderDetails = null
    let [itemQuantity, setItemQuantity] = useState(1);
    let [orderPlaced, setOrderPlaced] = useState(false);
    let [addedOrders, setAddedOrders] = useState(null);
    if (category === "cart") {
      itemsIds = JSON.parse(sessionStorage.getItem("cartItemsIds"));
      checkedCartItems = JSON.parse(sessionStorage.getItem("checkedCartItems"));
    } else if (category === "item") {
        orderItem = JSON.parse(sessionStorage.getItem("itemDetails"));
         if (Object.keys(orderItem).includes("mobile")) {
        orderDetails = {
            order: orderItem,
            orderQuantity: itemQuantity,
            orderOrignalPrice: orderItem.mobile.orignalPrice * itemQuantity,
            orderDiscountedPrice: orderItem.mobile.discountedPrice * itemQuantity,
            discountPercentage: orderItem.mobile.discount,
            discount: (orderItem.mobile.orignalPrice - orderItem.mobile.discountedPrice) * itemQuantity
        }
    } else if (Object.keys(orderItem).includes("laptop")) {
        orderDetails = {
            order: orderItem,
            orderQuantity: itemQuantity,
            orderOrignalPrice: orderItem.laptop.orignalPrice * itemQuantity,
            orderDiscountedPrice: orderItem.laptop.discountedPrice * itemQuantity,
            discountPercentage: orderItem.laptop.discount,
            discount: (orderItem.laptop.orignalPrice - orderItem.laptop.discountedPrice) * itemQuantity
        }
    }
    }
    checkedCartItems = sharedCart?.cartItems?.filter((obj) => itemsIds?.includes(obj._id));
    orderItems = checkedCartItems?.map((obj) => {
         if (Object.keys(obj.product).includes("mobile")) {
                                   return { order: obj.product, orderQuantity: obj.quantity, orderOrignalPrice: obj.product.mobile.orignalPrice * obj.quantity, orderDiscountedPrice:obj.product.mobile.discountedPrice * obj.quantity, discountPercentage: obj.product.mobile.discount, discount: ((obj.product.mobile.orignalPrice - obj.product.mobile.discountedPrice) * obj.quantity)}
                                } else if (Object.keys(obj.product).includes("laptop")) {
                                   return { order: obj.product, orderQuantity: obj.quantity, orderOrignalPrice: obj.product.laptop.orignalPrice * obj.quantity, orderDiscountedPrice: obj.product.laptop.discountedPrice * obj.quantity, discountPercentage: obj.product.laptop.discount, discount: ((obj.product.laptop.orignalPrice - obj.product.laptop.discountedPrice) * obj.quantity)}
                                }
    });

    

    const itemsIncrementHandler = async (itemId) => {
       if (category === "cart") {
         setSharedLoading(true);
        try {
            let updatedCartItem = await fetch(`https://tech-mart-backend-five.vercel.app/cart/update/${itemId}`, {
            method: "POST",
            body: JSON.stringify({$inc: {quantity: 1 } }),
            headers: {
                "content-type": "application/json"
            }
        });
        if (! updatedCartItem.ok) {
            throw new Error("failed to update cart item");
        } 
        let response = await fetch("https://tech-mart-backend-five.vercel.app/cart");
        if (! response.ok) {
            throw new Error("failed to fetch cart details");
        }
        let responseData = await response.json();
        setSharedCart(responseData);
        setSharedLoading(false);
        } catch(error) {
            setSharedError(error.message);
        }
       } else if (category === "item") {
        setItemQuantity(itemQuantity + 1);
       }
    }  

    const itemsDecrementHandler = async (itemId) => {
        if (category === "cart") {
            setSharedLoading(true);
        try {
            let updatedCartItem = await fetch(`https://tech-mart-backend-five.vercel.app/cart/update/${itemId}`, {
            method: "POST",
            body: JSON.stringify({ $inc: { quantity: - 1 } }),
            headers: {
                "content-type": "application/json"
            }
        });
        if (!updatedCartItem.ok) {
            throw new Error("failed to update cart item");
        }
        let response = await fetch("https://tech-mart-backend-five.vercel.app/cart");
        if (! response.ok) {
            throw new Error("failed to fetch cart details");
        }
        let responseData = await response.json();
        setSharedCart(responseData);
        setSharedLoading(false);
        } catch(error) {
            setSharedError(error.message);
        }
        } else if (category === "item") {
            setItemQuantity(itemQuantity - 1);
        }
    } 

    const placeOrderBtnHandler = async () => {
        
       if (category === "cart") {
         setSharedLoading(true);
         try {
            let ordersAddingResponse = await fetch("https://tech-mart-backend-five.vercel.app/orders/new", {
            method: "POST",
            body: JSON.stringify(orderItems),
            headers: {
                "content-type": "application/json"
            }
         });
         if (! ordersAddingResponse.ok) {
            throw new Error("failed to add new orders");
         }
         let ordersData = await fetch(`https://tech-mart-backend-five.vercel.app/orders/recent/${itemsIds.length}`);
         if (! ordersData) {
            throw new Error("failed to fetch order details");
         }
         let ordersDetails = await ordersData.json();
         let cartItemsDeletingResponse = await fetch("https://tech-mart-backend-five.vercel.app/cart/delete/items", {
            method: "POST",
            body: JSON.stringify({ _id: { $in: itemsIds } }),
            headers: {
                "content-type": "application/json"
            }
         });
         if (! cartItemsDeletingResponse.ok) {
            throw new Error("failed to delete cart items");
         }
         let updatedCartResponse = await fetch("https://tech-mart-backend-five.vercel.app/cart");
         if (! updatedCartResponse) {
            throw new Error("failed to fetch cart details");
         }
         let updatedCartData = await updatedCartResponse.json();
         setOrderPlaced(true);
         setAddedOrders(ordersDetails);
         setSharedCart(updatedCartData);
         setSharedLoading(false);
         alert("Order placed successfully");
         } catch(error) {}
       } else if (category === "item") {
        setSharedLoading(true);
        fetch("https://tech-mart-backend-five.vercel.app/orders/new", {
            method: "POST",
            body: JSON.stringify(orderDetails),
            headers: {
                "content-type": "application/json"
            }
        })
        .then((response) => {
            if (! response.ok) {
                alert("failed to place order")
            }
            return response.json();
        })
        .then((responseData) => {
            if (responseData) {
                setSharedLoading(false);
                alert("Order placed successfully");
            }
        })
        .catch((error) => {
            setSharedError(error.message)
        })
         
       }
    }


    

    return (
        <div className="bg-light">
            <div className="container">
                <p className="fs-3 fw-medium py-4">Order Details</p>
                <div className="row pb-4">
                    <div className="col-md-7 position-relative">
                        {sharedLoading && <div className="spinner-border text-primary position-absolute top-50 start-100 translate-middle"></div>}
                        <div className="card">
                            <div className="card-body"></div>
                        </div>
                        {(category === "cart" && ! orderPlaced) && <ul className="list-group mt-4">
                               {checkedCartItems?.map((obj) => {
                                return (
                                    <li className="list-group-item py-4" key={obj._id}>
                                        <div className="row d-flex-align-items-center">
                                            <div className="col-md-4">
                                                {Object.keys(obj.product).includes("laptop") && <img src={obj.product.laptop.thumbnailImage} className="img-fluid" style={{ width: "100px", height: "100px"}}/>}
                                                {Object.keys(obj.product).includes("mobile") && <img src={obj.product.mobile.thumbnailImage} className="img-fluid" style={{ width: "100px", height: "100px"}}/>}
                                            </div>
                                            <div className="col">
                                                {Object.keys(obj.product).includes("mobile") && <p className="fs-5 fw-medium">{obj.product.mobile.generalFeatures.name}</p>}
                                                {Object.keys(obj.product).includes("laptop") && <p className="fs-5 fw-medium">{obj.product.laptop.generalFeatures.name}</p>}
                                                <div className="d-flex">
                                                    {Object.keys(obj.product).includes("mobile") && <p className="fs-5 fw-medium" style={{ color: "grey"}}><del><i className="bi bi-currency-rupee"></i>{obj.product.mobile.orignalPrice}</del></p>}
                                                    {Object.keys(obj.product).includes("laptop") && <p className="fs-5 fw-medium" style={{ color: "grey"}}><del><i className="bi bi-currency-rupee"></i>{obj.product.laptop.orignalPrice}</del></p>}
                                                    {Object.keys(obj.product).includes("mobile") && <p className="fs-5 fw-medium ms-5"><i className="bi bi-currency-rupee"></i>{obj.product.mobile.discountedPrice * obj.quantity}</p>}
                                                    {Object.keys(obj.product).includes("laptop") && <p className="fs-5 fw-medium ms-5"><i className="bi bi-currency-rupee"></i>{obj.product.laptop.discountedPrice * obj.quantity}</p>}
                                                    {Object.keys(obj.product).includes("mobile") && <p className="fs-5 fw-medium ms-5" style={{ color: "green"}}>{obj.product.mobile.discount}% Off</p>}
                                                    {Object.keys(obj.product).includes("laptop") && <p className="fs-5 fw-medium ms-5" style={{ color: "green"}}>{obj.product.laptop.discount}% Off</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-4">
                                            <div className="col-md-3">
                                                <div className="input-group">
                                                    {obj.quantity === 1 ? <button className="btn btn-danger" disabled>-</button> : <button className="btn btn-danger" onClick={() => {
                                                        itemsDecrementHandler(obj._id)
                                                    }}>-</button>}
                                                    <input type="text" className="form-control text-center" value={obj.quantity} readOnly/>
                                                    <button className="btn btn-primary" onClick={() => {
                                                        itemsIncrementHandler(obj._id)
                                                    }}>+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )
                               })}
                            </ul>}
                            { (category === "cart" && orderPlaced) && <ul className="list-group">
                                  {addedOrders?.orders?.map((obj) => {
                                    return (
                                        <li className="list-group-item">
                                            <div className="row d-flex align-items-center">
                                                <div className="col-md-4">
                                                    {Object.keys(obj.order).includes("mobile") && <img src={obj.order.mobile.thumbnailImage} className="img-fluid" style={{ width: "100px", height: "100px"}}/>}
                                                    {Object.keys(obj.order).includes("laptop") && <img src={obj.order.laptop.thumbnailImage} className="img-fluid" style={{ width: "100px", height: "100px"}}/>}
                                                </div>
                                                <div className="col">
                                                    {Object.keys(obj.order).includes("mobile") && <p className="fs-5 fw-medium">{obj.order.mobile.generalFeatures.name}</p>}
                                                    {Object.keys(obj.order).includes("laptop") && <p className="fs-5 fw-medium">{obj.order.laptop.generalFeatures.name}</p>}
                                                    <div className="d-flex">
                                                        <p className="fs-5 fw-medium" style={{ color: "grey"}}><del><i className="bi bi-currency-rupee"></i>{obj.orderOrignalPrice}</del></p>
                                                        <p className="fs-5 fw-medium ms-5"><i className="bi bi-currency-rupee"></i>{obj.orderDiscountedPrice}</p>
                                                        <p className="fs-5 fw-medium ms-5" style={{ color: "green"}}>{obj.discountPercentage} % Off</p>
                                                    </div>
                                                    <p className="fs-5 fw-medium">Quantity: {obj.order.orderQuantity}</p>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                  })}
                                </ul>}
                            {category === "item" && <div className="card my-5">
                                   <div className="card-body py-4">
                                    <div className="row d-flex align-items-center">
                                        <div className="col-md-4">
                                            {Object.keys(orderItem).includes("mobile") && <img src={orderItem.mobile.thumbnailImage} className="img-fluid" style={{ width: "100px", height: "100px"}}/>}
                                            {Object.keys(orderItem).includes("laptop") && <img src={orderItem.laptop.thumbnailImage} className="img-fluid" style={{ width: "100px", height: "100px"}}/>}
                                        </div>
                                        <div className="col">
                                            <p className="fs-4 fw-medium">{Object.keys(orderItem).includes("mobile") && orderItem.mobile.generalFeatures.name}</p>
                                            <p className="fs-4 fw-medium">{Object.keys(orderItem).includes("laptop") && orderItem.laptop.generalFeatures.name}</p>
                                            <div className="d-flex">
                                                {Object.keys(orderItem).includes("mobile") && <p className="fs-5 fw-medium" style={{ color: "grey"}}><del><i className="bi bi-currency-rupee"></i>{orderItem.mobile.orignalPrice}</del></p>}
                                                {Object.keys(orderItem).includes("laptop") && <p className="fs-5 fw-medium" style={{ color: "grey"}}><del><i className="bi bi-currency-rupee"></i>{orderItem.laptop.orignalPrice}</del></p>}
                                                {Object.keys(orderItem).includes("mobile") && <p className="fs-4 fw-medium ms-4"><i className="bi bi-currency-rupee"></i>{orderItem.mobile.discountedPrice}</p>}
                                                {Object.keys(orderItem).includes("laptop") && <p className="fs-4 fw-medium ms-4"><i className="bi bi-currency-rupee"></i>{orderItem.laptop.discountedPrice}</p>}
                                                {Object.keys(orderItem).includes("mobile") && <p className="fs-5 fw-medium ms-4" style={{ color: "green"}}>{orderItem.mobile.discount}% Off</p>}
                                                {Object.keys(orderItem).includes("laptop") && <p className="fs-5 fw-medium ms-4" style={{ color: "green"}}>{orderItem.laptop.discount}% Off</p>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="input-group">
                                                <button className="btn btn-danger fs-5 fw-medium" onClick={itemsDecrementHandler}>-</button>
                                                <input type="text" className="form-control text-center fs-5 fw-medium" value={itemQuantity} readOnly/>
                                                <button className="btn btn-primary fs-5 fw-medium" onClick={itemsIncrementHandler}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                   </div>
                                </div>}
                    </div>
                    <div className="col px-5">
                        <div className="card">
                            <div className="card-header">
                                <p className="fs-4 fw-medium">Price Details</p>
                            </div>
                            <div className="card-body">
                                {(category === "cart" && !orderPlaced) && <><p className="fs-5 fw-medium">Total Items: {orderItems?.length}</p>
                                <p className="fs-5 fw-medium"> Price: <i className="bi bi-currency-rupee"></i>{orderItems?.reduce((acc, curr) => {
                                    return acc + curr.orderOrignalPrice
                                }, 0)}</p>
                                <p className="fs-5 fw-medium">Total Discount: -<i className="bi bi-currency-rupee"></i>{orderItems?.reduce((acc, curr) => {
                                    return acc + curr.discount
                                }, 0)}</p>
                                <p className="fs-5 fw-medium">Final Price: <i className="bi bi-currency-rupee"></i>{orderItems?.reduce((acc, curr) => {
                                    return acc + curr.orderDiscountedPrice
                                }, 0)}</p>
                                </>}
                                {(category === "cart" && orderPlaced) && <>
                                  <p className="fs-5 fw-medium">Total Items: {addedOrders?.orders?.length}</p>
                                  <p className="fs-5 fw-medium">Price: <i className="bi bi-currency-rupee"></i>{addedOrders?.orders?.reduce((acc, curr) => {
                                    return acc + curr.orderOrignalPrice 
                                  }, 0)}</p>
                                  <p className="fs-5 fw-medium">Total Discount: <i className="bi bi-currency-rupee"></i>{addedOrders?.orders?.reduce((acc, curr) => {
                                    return acc + curr.discount
                                  }, 0)}</p>
                                  <p className="fs-5 fw-medium">Final Price: <i className="bi bi-currency-rupee"></i>{addedOrders?.orders?.reduce((acc, curr) => {
                                    return acc + curr.orderDiscountedPrice
                                  }, 0)}</p>
                                </>}
                                {category === "item" && <>
                                <p className="fs-5 fw-medium">Price: <i className="bi bi-currency-rupee"></i>{orderDetails.orderOrignalPrice * itemQuantity}</p>
                                <p className="fs-5 fw-medium">Discount: <i className="bi bi-currency-rupee"></i>{orderDetails.discount * itemQuantity}</p>
                                <p className="fs-5 fw-medium">Final Price: <i className="bi bi-currency-rupee"></i>{orderDetails.orderDiscountedPrice * itemQuantity}</p>
                                </>}
                            </div>
                        </div>
                        <div className="py-2 text-center">
                            {!orderPlaced && <button className="btn btn-success" style={{ width: "300px"}} onClick={placeOrderBtnHandler}>Place Order</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const DisplayOrderDetails = () => {
    const [cart, setCart] = useState(null);
    const [wishlist, setWishlist] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch("https://tech-mart-backend-five.vercel.app/cart")
        .then((response) => {
            if (! response.ok) {
                throw new Error("failed to fetch cart items");
            }
            return response.json()
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
            setError(error.message);
        })
        .finally(() => {
            setLoading(false);
        })
        
    }, [])
    return (
        <div>
            <Header sharedCart={cart} sharedWishlist={wishlist}/>
            <Order sharedCart={cart} setSharedCart={setCart} sharedLoading={loading} setSharedLoading={setLoading} sharedError={error} setSharedError={setError}/>
        </div>
    )
}

export default DisplayOrderDetails