import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./components/Header";
import { Link } from "react-router-dom";

const Order = ({ sharedCart, setSharedCart, sharedLoading, setSharedLoading, sharedAddress, setSharedAddress, sharedError, setSharedError}) => {
    let { category } = useParams();
    let itemsIds = null;
    let orderItem = null;
    let orderItems = [];
    let checkedCartItems = null;
    let orderDetails = null
    let [itemQuantity, setItemQuantity] = useState(1);
    let [orderPlaced, setOrderPlaced] = useState(false);
    let [addedOrders, setAddedOrders] = useState(null);
    let [itemOrder, setItemOrder] = useState(null);
    const [displayOrderPlacedMessage, setDisplayOrderPlacedMessage] = useState(false);
    const [addressId, setAddressId] = useState("");
    const [updatedAddressId, setUpdatedAddressId] = useState("");
    const [updatedAddresssInfo, setUpdatedAddressInfo] = useState(null);

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
            discount: (orderItem.mobile.orignalPrice - orderItem.mobile.discountedPrice) * itemQuantity,
            shippingAddress: addressId
        }
    } else if (Object.keys(orderItem).includes("laptop")) {
        orderDetails = {
            order: orderItem,
            orderQuantity: itemQuantity,
            orderOrignalPrice: orderItem.laptop.orignalPrice * itemQuantity,
            orderDiscountedPrice: orderItem.laptop.discountedPrice * itemQuantity,
            discountPercentage: orderItem.laptop.discount,
            discount: (orderItem.laptop.orignalPrice - orderItem.laptop.discountedPrice) * itemQuantity,
            shippingAddress: addressId
        }
    }
    }
    checkedCartItems = sharedCart?.cartItems?.filter((obj) => itemsIds?.includes(obj._id));
    orderItems = checkedCartItems?.map((obj) => {
         if (Object.keys(obj.product).includes("mobile")) {
                                   return { order: obj.product, orderQuantity: obj.quantity, orderOrignalPrice: obj.product.mobile.orignalPrice * obj.quantity, orderDiscountedPrice:obj.product.mobile.discountedPrice * obj.quantity, discountPercentage: obj.product.mobile.discount, discount: ((obj.product.mobile.orignalPrice - obj.product.mobile.discountedPrice) * obj.quantity), shippingAddress: addressId}
                                } else if (Object.keys(obj.product).includes("laptop")) {
                                   return { order: obj.product, orderQuantity: obj.quantity, orderOrignalPrice: obj.product.laptop.orignalPrice * obj.quantity, orderDiscountedPrice: obj.product.laptop.discountedPrice * obj.quantity, discountPercentage: obj.product.laptop.discount, discount: ((obj.product.laptop.orignalPrice - obj.product.laptop.discountedPrice) * obj.quantity), shippingAddress: addressId}
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
         setDisplayOrderPlacedMessage(true);
         setTimeout(() => setDisplayOrderPlacedMessage(false), 5000);
         setSharedLoading(false);
         
         } catch(error) {}
       } else if (category === "item") {
        setSharedLoading(true);
       try {
        let addedOrderResponse = await fetch("https://tech-mart-backend-five.vercel.app/orders/new", {
            method: "POST",
            body: JSON.stringify(orderDetails),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!addedOrderResponse.ok) {
            throw new Error("Failed to add order");
        }
        let addedOrder = await addedOrderResponse.json();
        setItemOrder(addedOrder);
        setOrderPlaced(true);
        setSharedLoading(false);
        setDisplayOrderPlacedMessage(true);
        setTimeout(() => setDisplayOrderPlacedMessage(false), 5000)
       } catch(error) {
        console.error('Error: ', error);
       }
       }
    }

    console.log(itemOrder)

    const updateAddressHandler = async(event) => {
        event.preventDefault();
        let updatedAddressResponse = await fetch(`https://tech-mart-backend-five.vercel.app/address/update/${updatedAddressId}`, {
            method: "POST",
            body: JSON.stringify({ address: updatedAddresssInfo }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (! updatedAddressResponse.ok) {
            throw new Error("Failed to update address");
        }
        let response = await fetch("https://tech-mart-backend-five.vercel.app/addresses");
        if (! response.ok) {
            throw new Error("Failed to fetch address");
        }
        let responseData = await response.json();
        setSharedAddress(responseData);
        setUpdatedAddressId("");
    }


    return (
        <div className="bg-light">
            <div className="container">
                {!orderPlaced ? <p className="fs-3 fw-medium py-4">Order Details</p> : <p className="fs-3 fw-medium py-4">Order Summary</p>}
                {displayOrderPlacedMessage && <div className="alert bg-success col-md-4">
                    <p className="fs-5 fw-medium text-light">Order placed successfully</p>
                </div>}
                
                <div className="row pb-4">
                    <div className="col-md-7 position-relative">
                        {sharedLoading && <div className="spinner-border text-primary position-absolute top-50 start-100 translate-middle"></div>}
                        {!orderPlaced && <div className="card">
                            <div className="card-header bg-primary text-light">
                                <p className="fs-3 fw-medium">Delivery Addresses</p>
                            </div>
                            <div className="card-body">
                                <ul className="list-group">
                                    {sharedAddress?.addresses?.map((obj) => {
                                        return (
                                            <li className="list-group-item" key={obj._id}>
                                              {(obj._id !== updatedAddressId) ?  <div className="form-check">
                                                 <input
                                                 type="radio"
                                                 className="form-check-input border-black"
                                                 name="address"
                                                 value={obj._id}
                                                 onChange={(event) => {
                                                    if (event.target.checked) {
                                                        setAddressId(obj._id)
                                                    }
                                                   }}
                                                  style={{ cursor: "pointer"}}
                                                  />
                                                  <label className="form-check-label fw-medium">
                                                      <div className="d-flex">
                                                         <p className="fw-medium">{obj.address.name}</p>
                                                         <p className="fw-medium ms-4">{obj.address.phoneNumber}</p>
                                                         <span className="badge text-bg-secondary ms-4" style={{ width: "50px", height: "20px"}}>{obj.address.addressType}</span>
                                                        </div>
                                                        <div className="d-flex">
                                                            <p>{obj.address.address}, {obj.address.locality}, {obj.address.city}, {obj.address.state}, {obj.address.pincode}</p>
                                                            <i className="bi bi-pencil ms-4" style={{ fontSize: "20px", cursor: "pointer"}} onClick={() => {
                                                                setUpdatedAddressInfo(obj.address);
                                                                setUpdatedAddressId(obj._id)
                                                            }}></i>
                                                        </div>
                                                    </label>
                                                </div> : <form onSubmit={updateAddressHandler}>
                                                        <input
                                                        type="text"
                                                        className="form-control col-md-4"
                                                        placeholder="Name"
                                                        value={updatedAddresssInfo.name}
                                                        onChange={(event) => setUpdatedAddressInfo((prevData) => ({...prevData, name: event.target.value}))}
                                                        />
                                                        <br/>
                                                        <input
                                                        type="text"
                                                        className="form-control col-md-4"
                                                        placeholder="Phone Number"
                                                        value={updatedAddresssInfo.phoneNumber}
                                                        onChange={(event) => setUpdatedAddressInfo((prevData) => ({...prevData, phoneNumber: event.target.value}))}
                                                        />
                                                        <br/>
                                                        <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="locality"
                                                        value={updatedAddresssInfo.locality}
                                                        onChange={(event) => setUpdatedAddressInfo((prevData) => ({...prevData, locality: event.target.value}))}
                                                        />
                                                        <br/>
                                                        <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Pincode"
                                                        value={updatedAddresssInfo.pincode}
                                                        onChange={(event) => setUpdatedAddressInfo((prevData) => ({...prevData, pincode: event.target.value}))}
                                                        />
                                                        <br/>
                                                        <textarea className="form-control" rows={4} cols={50}
                                                        placeholder="Address"
                                                        value={updatedAddresssInfo.address}
                                                        onChange={(event) => setUpdatedAddressInfo((prevData) => ({...prevData, address: event.target.value}))}
                                                        ></textarea>
                                                        <br/>
                                                        <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="City"
                                                        value={updatedAddresssInfo.city}
                                                        onChange={(event) => setUpdatedAddressInfo((prevData) => ({...prevData, city: event.target.value}))}
                                                        />
                                                        <br/>
                                                        <select 
                                                        className="form-select"
                                                        onChange={(event) => setUpdatedAddressInfo((prevData) => ({...prevData, state: event.target.value}))}
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
                                                        <br/>
                                                        <button type="submit" className="btn btn-primary">Save</button>
                                                        <button className="btn btn-primary ms-5" onClick={() => setAddressId("")}>Cancel</button>
                                                    </form>}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>}
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
                                </ul>
                                }


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
                                {(category === "cart" && addedOrders)&& <div className="card my-4">
                                      <div className="card-body">
                                        <p className="fw-medium">Deliver To,</p>
                                        <p className="fw-medium">{addedOrders.orders[0].shippingAddress.address.name}</p>
                                        <p className="fw-medium">{addedOrders.orders[0].shippingAddress.address.phoneNumber}</p>
                                        <p className="fw-medium">{addedOrders.orders[0].shippingAddress.address.address}</p>
                                        <p className="fw-medium">{addedOrders.orders[0].shippingAddress.address.city}</p>
                                        <p className="fw-medium">{addedOrders.orders[0].shippingAddress.address.state}</p>
                                        <p className="fw-medium">{addedOrders.orders[0].shippingAddress.address.pincode}</p>
                                      </div>
                                    </div>}
                                    {(category === "item" && itemOrder)&& <div className="card my-4">
                                      <div className="card-body">
                                        <p className="fw-medium">Deliver To,</p>
                                        <p className="fw-medium">{itemOrder[0].shippingAddress.address.name}</p>
                                        <p className="fw-medium">{itemOrder[0].shippingAddress.address.phoneNumber}</p>
                                        <p className="fw-medium">{itemOrder[0].shippingAddress.address.address}</p>
                                        <p className="fw-medium">{itemOrder[0].shippingAddress.address.city}</p>
                                        <p className="fw-medium">{itemOrder[0].shippingAddress.address.state}</p>
                                        <p className="fw-medium">{itemOrder[0].shippingAddress.address.pincode}</p>
                                      </div>
                                    </div>}
                                 {orderPlaced && <div className="text-center"><Link className="btn btn-primary text-center" style={{ width: "300px"}} to="/">Continue Shopping</Link></div>}
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
                            {!orderPlaced ? <button className="btn btn-success" style={{ width: "300px"}} onClick={placeOrderBtnHandler}>Place Order</button> : <Link className="btn btn-warning" style={{ width: "300px"}} to="/user/orders">Review Orders</Link>}
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
    const [inputQuery, setInputQuery] = useState("");
    const [address, setAddress] = useState(null);

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
        
    }, []);

    useEffect(() => {
        fetch("https://tech-mart-backend-five.vercel.app/addresses")
        .then((response) => {
            if (! response.ok) {
                throw new Error("Failed to fetch addresses");
            }
            return response.json();
        })
        .then((responseData) => {
            setAddress(responseData);
        })
        .catch((error) => {
            console.error('Error: ', error);
        })
    }, []);
    return (
        <div>
            <Header sharedCart={cart} sharedWishlist={wishlist} sharedInputQuery={inputQuery} setSharedInputQuery={setInputQuery}/>
            <Order sharedCart={cart} setSharedCart={setCart} sharedLoading={loading} setSharedLoading={setLoading} sharedAddress={address} setSharedAddress={setAddress} sharedError={error} setSharedError={setError}/>
        </div>
    )
}

export default DisplayOrderDetails