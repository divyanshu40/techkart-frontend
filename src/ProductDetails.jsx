import { useState, useEffect } from "react";
import Header from "./components/Header";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ProductDetails = ({ sharedCart, setSharedCart, sharedWishlist, setSharedWishlist}) => {

    const { category, id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [product, setProduct] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [noCostEmiBank, setNoCostEmiBank] = useState("");
    const [standardEmiBank, setStandardEmiBank] = useState("");
    const [displayNoCostEmiBanks, setDisplayNoCostEmiBanks] = useState(false);
    const [displayStandardEmiBanks, setDisplayStandardEmiBanks] = useState(false);
    const [laptopImageUrl, setLaptopImageUrl] = useState("");

    const addCartHandler = async () => {
        let addedCartItem = await fetch("https://tech-mart-backend-five.vercel.app/cart/new", {
            method: "POST",
            body: JSON.stringify({product: product }),
            headers: {
                "content-type": "application/json"
            }
        });
        let response = await fetch("https://tech-mart-backend-five.vercel.app/cart");
        if (!response.ok) {
            throw new Error("failed to fetch data from the cart");
        }
        let responseData = await response.json();
        setSharedCart(responseData)
    }

    const wishlistHandler = async () => {
        let addedWishhlistItem = await fetch("https://tech-mart-backend-five.vercel.app/wishlist/new", {
            method: "POST",
            body: JSON.stringify({ product: product }),
            headers: {
                "content-type": "application/json"
            }
        });
        let response = await fetch("https://tech-mart-backend-five.vercel.app/wishlist");
        if (! response.ok) {
            throw new Error("failed to fetch wishlist items");
        }
        let responseData = await response.json();
        setSharedWishlist(responseData);
    }

    useEffect(() => {
        if (category === "mobiles") {
            fetch(`https://tech-mart-backend-five.vercel.app/mobiles/details/${id}`)
            .then((response) => {
                if (! response.ok) {
                    throw new Error("Failed to fetch data")
                }
                return response.json();
            })
            .then((responseData) => {
                setProduct(responseData);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading (false);
            })
        } else if (category === "laptops") {
            setLoading(true);
            fetch(`https://tech-mart-backend-five.vercel.app/laptops/details/${id}`)
            .then((response) => {
                if (! response.ok) {
                    throw new Error("Failed to fetch data")
                }
                return response.json();
            })
            .then((responseData) => {
                setProduct(responseData);
            })
            .catch((error) => {
                setError(error.message)
            })
            .finally(() => {
                setLoading(false)
            })
        }
        
    }, []);

    console.log(product);

    return (
        <div>
            <div className="row mt-2">
                <div className="col position-relative">
                    {loading && <div className="spinner-border text-primary position-absolute top-50 start-50 translate-middle"></div>}
                    {error && <p className="fs-5 fw-normal">{error}</p>}
                    {(product && category === "mobiles") && <div className="row">
                         <div className="col-md-5 ms-3">
                            <div className="card">
                                <div className="card-body position-relative">
                                    {sharedWishlist?.wishlistItems?.find((obj) => obj?.product?.mobile?._id === product?.mobile?._id) ? <button style={{ cursor: "pointer"}} onClick={wishlistHandler}><i className="bi bi-heart-fill position-absolute top-0 end-0 p-2" style={{fontSize: "30px", color: "red"}}></i></button> : <button style={{ cursor: "pointer"}} onClick={wishlistHandler}><i className="bi bi-heart position-absolute top-0 end-0 p-2" style={{fontSize: "30px", cursor: "pointer"}}></i></button>}
                                    <div className="row">
                                        <div className="col-md-5">
                                            <div className="overflow-y-scroll">
                                                 <ul className="list-group mt-4 " style={{ maxHeight: "500px"}}>
                                              {product.mobile.productImages.map((img) => {
                                                return (
                                                    <li className="list-group-item" key={img} onMouseEnter={() => setImageUrl(img)} onMouseLeave={() => setImageUrl("")}>
                                                       {img === imageUrl ? <img src={imageUrl} className="img-fluid py-4" style={{ width: "400px", height: "200px", cursor: "pointer"}}/> : <img src={img} className="img-fluid py-2" style={{ width: "100px", height: "100px", cursor: "pointer"}}/>}
                                                    </li>
                                                )
                                              })}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col">
                                            {imageUrl === "" ? <img src={product.mobile.thumbnailImage} className="img-fluid" style={{ width: "400px", height: "400px"}}/> : <img src={imageUrl} className="img-fluid" style={{ width: "400px", height: "400px" }}/>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {sharedCart?.cartItems?.find((obj) => obj?.product?.mobile?._id === product?.mobile?._id) ? <button className="btn btn-warning py-2 px-5 mt-3 ms-5"><Link className="link-offset-2 link-underline link-underline-opacity-0" to="/cart">Go To Cart</Link></button> : <button className="btn btn-warning py-2 px-5 mt-3 ms-5" onClick={addCartHandler}>Add to Cart</button>}
                            <button className="btn btn-success py-2 px-5 mt-3 ms-5">Buy Now</button>
                         </div>
                         <div className="col ms-5">
                            <p className="fs-2 fw-medium">{product.mobile.generalFeatures.name} ({product.mobile.generalFeatures.ram} GB RAM)</p>
                            <div className="d-flex">
                                <div><span className="badge text-bg-success">{product.mobile.averageRating}<i className="bi bi-star-fill"></i></span></div>
                                <p className="fs-5 fw-medium ms-4" style={{ color: "grey"}}>{product.mobile.ratings} Ratings  & {product.mobile.reviews} Reviews</p>
                            </div>
                            <div className="d-flex align-items-center">
                                <p className="fs-3 fw-medium"><i className="bi bi-currency-rupee"></i>{product.mobile.discountedPrice}</p>
                                <p className="fs-5 fw-medium ms-4" style={{ color: "grey"}}><del><i className="bi bi-currency-rupee"></i>{product.mobile.orignalPrice}</del></p>
                                <p className="fs-5 fw-medium ms-4" style={{ color: "green"}}>{product.mobile.discount}% Off</p>
                            </div>
                            <p className="fs-4 fw-medium mt-4">Available Offers</p>
                            {product.mobile.offers.bankOffers.map((ele) => {
                                return <p className="fs-5 fw-medium"><strong>Bank Offer: </strong>{ele.summary}</p>
                            })}
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">All EMI Options</button>
                                <ul className="dropdown-menu">
                                   <li className="dropdown-item" style={{ cursor: "pointer"}}>
                                    <select className="form-select" onChange={(event) => {
                                        setNoCostEmiBank(event.target.value);
                                        setStandardEmiBank("");
                                    }}>
                                        <option value="">No-Cost EMI Options</option>
                                        {product.mobile.offers.noCostEmiOffers.map((ele) => {
                                            return (
                                                <option value={ele.bankName} key={ele.bankName}>{ele.bankName}</option>
                                            )
                                        })}
                                    </select>
                                   </li>
                                   <li className="dropdown-item" style={{ cursor: "pointer"}}>
                                     <select className="form-select" onChange={(event) => {
                                        setStandardEmiBank(event.target.value);
                                        setNoCostEmiBank("");
                                     }}>
                                        <option>Standard EMI Options</option>
                                        {product.mobile.emiOptions.map((ele) => {
                                            return (
                                                <option value={ele.bankName} key={ele.bankName}>{ele.bankName}</option>
                                            )
                                        })}
                                    </select>
                                   </li>
                                   {noCostEmiBank && <div className="col">
                                  <div className="card">
                                     <div className="card-body">
                                       <div className="row">
                                        <div className="col">
                                            <p className="fs-6 fw-medium"><u>Total EMIs</u></p>
                                            {product.mobile.offers.noCostEmiOffers.find((ele) => ele.bankName === noCostEmiBank).months.map((totalEmis) => {
                                                return (
                                                    <div className="row" key={totalEmis}>
                                                        <p className="fw-medium">{totalEmis} x {parseInt(product.mobile.discountedPrice / totalEmis)}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div className="col">
                                            <p className="fs-6 fw-medium"><u>Total Cost</u></p>
                                            {product.mobile.offers.noCostEmiOffers.find((ele) => ele.bankName === noCostEmiBank).months.map((totalEmis) => {
                                                return (
                                                    <div className="row" key={totalEmis}>
                                                        <p className="fw-medium">{product.mobile.discountedPrice}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                       </div>
                                     </div>
                                  </div>
                                </div>}
                                {standardEmiBank && <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">
                                                    <p className="fw-medium"><u>EMI Plans</u></p>
                                                </div>
                                                <div className="col">
                                                    <p className="fw-medium"><u>Interest Rate</u></p>
                                                </div>
                                                <div className="col">
                                                    <p className="fw-medium"><u>Total Cost</u></p>
                                                </div>
                                            </div>
                                            {product.mobile.emiOptions.find((bank) => bank.bankName === standardEmiBank).totalEmis.map((ele) => {
                                                return (
                                                    <div className="row" key={ele}>
                                                        <div className="col">
                                                            <p><i className="bi bi-currency-rupee">{parseInt( (product.mobile.discountedPrice * (0.16/12) * ( 1+ (0.16/12))**ele) / ( ((1 + (0.16/12))**ele) - 1 ) )}</i> x {ele}</p>
                                                        </div>
                                                        <div className="col">
                                                            <p>{product.mobile.emiOptions.find((bank) => bank.bankName === standardEmiBank).interestRate}%</p>
                                                        </div>
                                                        <div className="col">
                                                            <p><i className="bi bi-currency-rupee">{parseInt( (product.mobile.discountedPrice * (0.16/12) * ( 1+ (0.16/12))**ele) / ( ((1 + (0.16/12))**ele) - 1 ) ) * ele}</i></p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>}
                                </ul>
                            </div>
                            <div className="mt-5">
                                <p className="fs-4 fw-medium">Highlights</p>
                                <ul>
                                    <li className="fs-5 fw-medium" style={{ color: "grey"}}>{product.mobile.generalFeatures.ram} GB RAM | {product.mobile.generalFeatures.internalStorage.map((ele) => ele + "GB").join(", ")}</li>
                                    <li className="fs-5 fw-medium" style={{ color: "grey"}}>{product.mobile.displayFeatures.attributes["Display Size"]} Display</li>
                                    <li className="fs-5 fw-medium" style={{ color: "grey"}}>{product.mobile.cameraFeatures.attributes["Primary Camera"]} | {product.mobile.cameraFeatures.attributes["Secondary Camera"]}</li>
                                    <li className="fs-5 fw-medium" style={{ color: "grey"}}>{product.mobile.generalFeatures.batteryCapacity}mAh</li>
                                    {product.mobile.osAndProcessorFeatures.attributes["Processor Type"] && <li className="fs-5 fw-medium" style={{ color: "grey"}}>{product.mobile.osAndProcessorFeatures.attributes["Processor Type"]}</li>}
                                    {product.mobile.osAndProcessorFeatures.attributes["Processor Brand"] && <li className="fs-5 fw-medium" style={{ color: "grey"}}>{product.mobile.osAndProcessorFeatures.attributes["Processor Brand"]}</li>}
                                </ul>
                            </div>
                            <div className="py-4 me-4">
                                <p className="fs-2 fw-medium">Specifications</p>
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <p className="fs-3 fw-medium">General</p>
                                        {Object.keys(product.mobile.generalFeatures.otherGeneralFeatures.attributes).map((ele) => {
                                            return (
                                                <div className="row" key={ele}>
                                                    <div className="col">
                                                        <p className="fw-medium">{ele}</p>
                                                    </div>
                                                    <div className="col">
                                                        <p className="fw-medium" style={{ color: "grey"}}>{product.mobile.generalFeatures.otherGeneralFeatures.attributes[ele]}</p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </li>
                                    {Object.keys(product.mobile.displayFeatures.attributes).length > 0 && <li className="list-group-item">
                                          <p className="fs-3 fw-medium">Display Features</p>
                                          {Object.keys(product.mobile.displayFeatures.attributes).map((ele) => {
                                            return (
                                                <div className="row" key={ele}>
                                                    <div className="col">
                                                        <p className="fw-medium">{ele}</p>
                                                    </div>
                                                    <div className="col">
                                                        <p className="fw-medium" style={{ color: "grey"}}>{product.mobile.displayFeatures.attributes[ele]}</p>
                                                    </div>
                                                </div>
                                            )
                                          })}
                                        </li>}
                                        {Object.keys(product.mobile.osAndProcessorFeatures.attributes).length > 0 && <li className="list-group-item">
                                              <p className="fs-3 fw-medium">OS & Processor Features</p>
                                              {Object.keys(product.mobile.osAndProcessorFeatures.attributes).map((ele) => {
                                                return (
                                                    <div className="row" key={ele}>
                                                        <div className="col">
                                                            <p className="fw-medium">{ele}</p>
                                                        </div>
                                                        <div className="col">
                                                            <p className="fw-medium" style={{ color: "grey"}}>{product.mobile.osAndProcessorFeatures.attributes[ele]}</p>
                                                        </div>
                                                    </div>
                                                )
                                              })}
                                            </li>}
                                            {Object.keys(product.mobile.memoryAndStorageFeatures.attributes).length > 0 && <li className="list-group-item">
                                                   <p className="fs-3 fw-medium">Memory & Storage Features</p>
                                                   {Object.keys(product.mobile.memoryAndStorageFeatures.attributes).map((ele) => {
                                                    return (
                                                        <div className="row" key={ele}>
                                                            <div className="col">
                                                                <p className="fw-medium">{ele}</p>
                                                            </div>
                                                            <div className="col">
                                                                <p className="fw-medium" style={{ color: "grey"}}>{product.mobile.memoryAndStorageFeatures.attributes[ele]}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                   })}
                                                </li>}
                                                {Object.keys(product.mobile.cameraFeatures.attributes).length > 0 && <li className="list-group-item">
                                                       <p className="fs-3 fw-medium">Camera Features</p>
                                                       {Object.keys(product.mobile.cameraFeatures.attributes).map((ele) => {
                                                        return (
                                                            <div className="row" key={ele}>
                                                                <div className="col">
                                                                    <p className="fw-medium">{ele}</p>
                                                                </div>
                                                                <div className="col">
                                                                    <p className="fw-medium" style={{ color: "grey"}}>{product.mobile.cameraFeatures.attributes[ele]}</p>
                                                                </div>
                                                            </div>
                                                        )
                                                       })}
                                                    </li>}
                                                    {Object.keys(product.mobile.callFeatures.attributes).length > 0 && <li className="list-group-item">
                                                           <p className="fs-3 fw-medium">Call Features</p>
                                                           {Object.keys(product.mobile.callFeatures.attributes).map((ele) => {
                                                            return (
                                                                <div className="row" key={ele}>
                                                                    <div className="col">
                                                                        <p className="fw-medium">{ele}</p>
                                                                    </div>
                                                                    <div className="col">
                                                                        <p className="fw-medium" style={{ color: "grey"}}>{product.mobile.callFeatures.attributes[ele]}</p>
                                                                    </div>
                                                                </div>
                                                            )
                                                           })}
                                                        </li>}
                                                        {Object.keys(product.mobile.connectivityFeatures.attributes).length > 0 && <li className="list-group-item">
                                                               <p className="fs-3 fw-medium">Connectivity Features</p>
                                                               {Object.keys(product.mobile.connectivityFeatures.attributes).map((ele) => {
                                                                return (
                                                                    <div className="row" key={ele}>
                                                                        <div className="col">
                                                                            <p className="fw-medium">{ele}</p>
                                                                        </div>
                                                                        <div className="col">
                                                                            <p className="fw-medium" style={{ color: "grey"}}>{product.mobile.connectivityFeatures.attributes[ele]}</p>
                                                                        </div>
                                                                    </div>
                                                                )
                                                               })}
                                                            </li>}
                                                            {Object.keys(product.mobile.multimediaFeatures.attributes).length > 0 && <li className="list-group-item">
                                                                   <p className="fs-3 fw-medium">Multimedia Features</p>
                                                                   {Object.keys(product.mobile.multimediaFeatures.attributes).map((ele) => {
                                                                    return (
                                                                        <div className="row" key={ele}>
                                                                            <div className="col">
                                                                                <p className="fw-medium">{ele}</p>
                                                                            </div>
                                                                            <div className="col">
                                                                                <p className="fw-medium" style={{ color: "grey"}}>{product.mobile.multimediaFeatures.attributes[ele]}</p>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                   })}
                                                                </li>}
                                                                {Object.keys(product.mobile.batteryAndPowerFeatures.attributes).length > 0 && <li className="list-group-item">
                                                                      <p className="fs-3 fw-medium">Battery & Power Features</p>
                                                                      {Object.keys(product.mobile.batteryAndPowerFeatures.attributes).map((ele) => {
                                                                        return (
                                                                            <div className="row" key={ele}>
                                                                                <div className="col">
                                                                                    <p className="fw-medium">{ele}</p>
                                                                                </div>
                                                                                <div className="col">
                                                                                    <p className="fw-medium" style={{ color: "grey"}}>{product.mobile.batteryAndPowerFeatures.attributes[ele]}</p>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                      })}
                                                                    </li>}
                                                                    {Object.keys(product.mobile.dimensions.attributes).length > 0 && <li className="list-group-item">
                                                                           <p className="fs-3 fw-medium">Dimensions</p>
                                                                           {Object.keys(product.mobile.dimensions.attributes).map((ele) => {
                                                                            return (
                                                                                <div className="row" key={ele}>
                                                                                    <div className="col">
                                                                                        <p className="fw-medium">{ele}</p>
                                                                                    </div>
                                                                                    <div className="col">
                                                                                        <p className="fw-medium" style={{ color: "grey"}}>{product.mobile.dimensions.attributes[ele]}</p>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                           })}
                                                                        </li>}
                                                                        {Object.keys(product.mobile.warranty).length > 0 && <li className="list-group-item">
                                                                               <p className="fs-3 fw-medium">Warranty</p>
                                                                               {Object.keys(product.mobile.warranty).map((ele) => {
                                                                                return (
                                                                                    <div>
                                                                                        {product.mobile.warranty[ele] && <div className="row" key={ele}>
                                                                                              <div className="col">
                                                                                                <p className="fw-medium">{ele}</p>
                                                                                              </div>
                                                                                              <div className="col">
                                                                                                <p className="fw-medium" style={{ color: "grey"}}>{product.mobile.warranty[ele]}</p>
                                                                                              </div>
                                                                                            </div>}
                                                                                    </div>
                                                                                )
                                                                               })}
                                                                            </li>}
                                </ul>
                            </div>
                         </div>
                        </div>}
                        {(category === "laptops" && product) && <div className="row">
                               <div className="col-md-5 mt-2 ms-2">
                                   <div className="card">
                                       <div className="card-body position-relative">
                                        {(sharedWishlist?.wishlistItems?.find((obj) => obj?.product?.laptop?._id === product?.laptop?._id)) ? <button style={{ cursor: "pointer"}} onClick={wishlistHandler}><i className="bi bi-heart-fill position-absolute top-0 end-0 p-2" style={{fontSize: "30px", color: "red"}}></i></button> : <button style={{ cursor: "pointer"}} onClick={wishlistHandler}><i className="bi bi-heart position-absolute top-0 end-0 p-2" style={{fontSize: "30px", cursor: "pointer"}}></i></button>}
                                            <div className="row">
                                                <div className="col-md-5">
                                                    <ul className="list-group overflow-y-scroll" style={{ maxHeight: "500px"}}>
                                                        {product.laptop.productImages.map((image) => {
                                                            return (
                                                                <li className="list-group-item" style={{ cursor: "pointer"}} onMouseEnter={() => setLaptopImageUrl(image.imageUrl)} onMouseLeave={() => setLaptopImageUrl("")} key={image._id}>
                                                                    {image.imageUrl === laptopImageUrl ? <img src={image.imageUrl} className="img-fluid" style={{ width: "300px", height: "200px"}}/> : <img src={image.imageUrl} className="img-fluid" style={{ width: "100px", height: "100px"}}/>}
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                </div>
                                                <div className="col position-relative">
                                                    {laptopImageUrl ? <img src={laptopImageUrl} className="img-fluid position-absolute top-50 start-50 translate-middle" style={{ width: "300px", height: "300px"}}/> : <img src={product.laptop.thumbnailImage} className="img-fluid position-absolute top-50 start-50 translate-middle" style={{ width: "350px", height: "300px"}}/>}
                                                </div>
                                            </div>
                                       </div>
                                   </div>
                                   <div className="d-flex ms-5 mt-4">
                                    {sharedCart?.cartItems.find((obj) => obj?.product?.laptop?._id === product?.laptop?._id) ? <button className="btn btn-warning px-5 py-4 fs-5 fw-medium"><Link className="link-offset-2 link-underline link-underline-opacity-0" to="/cart">Go To Cart</Link></button> : <button className="btn btn-warning px-5 py-4 fs-5 fw-medium" onClick={addCartHandler}>Add To Cart</button>}
                                    <button className="btn btn-success ms-5 px-5 py-4 fs-5 fw-medium">Buy Now</button>
                                   </div>
                                </div>
                                <div className="col ms-5 me-2 overflow-y-scroll" style={{ maxHeight: "700px"}}>
                                    <p className="fs-2 fw-medium">{product.laptop.generalFeatures.name} {product.laptop.generalFeatures.processor.processorBrand} {product.laptop.generalFeatures.processor.processorType} {product.laptop.generalFeatures.processor.processorGeneration} {product.laptop.processorAndMemoryFeatures.attributes.find((obj) => Object.keys(obj).includes("Processor Variant"))["Processor Variant"]} ({product.laptop.generalFeatures.ram.ramCapacity} GB / {product.laptop.generalFeatures.storage.storageCapacity} GB {product.laptop.generalFeatures.storage.storageType} / {product.laptop.generalFeatures.operatingSystem} / {product.laptop.generalFeatures.graphicsMemory.capacity} GB Graphics / {product.laptop.generalFeatures.graphicsProcessorName})</p>
                                    <div className="d-flex align-items-center">
                                        <div><span className="badge text-bg-success p-2">{product.laptop.averageRating}<i className="bi bi-star-fill"></i></span></div>
                                        <p className="fs-4 fw-medium ms-4" style={ { color: "grey"}}>{product.laptop.ratings} ratings & {product.laptop.reviews} reviews</p>
                                    </div>
                                    <div className="d-flex align-items-center mt-4">
                                        <p className="fs-2 fw-medium"><i className="bi bi-currency-rupee"></i>{product.laptop.discountedPrice}</p>
                                        <p className="fs-3 fw-medium ms-4" style={{ color: "grey"}}><del><i className="bi bi-currency-rupee"></i>{product.laptop.orignalPrice}</del></p>
                                        <p className="fs-4 fw-medium ms-4" style={{ color: "green"}}>{product.laptop.discount}% Off</p>
                                    </div>
                                    <div className="mt-4">
                                        <p className="fs-3 fw-medium">Available Offers</p>
                                        <div>
                                            {product.laptop.offers.bankOffers.map((obj) => {
                                                return <p className="fs-4 fw-medium"><strong>Bank Offer </strong>{obj.summary}</p>
                                            })}
                                        </div>
                                    </div>
                                    <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">All EMI Options</button>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" onClick={() => {
                                                setDisplayNoCostEmiBanks(true);
                                                setDisplayStandardEmiBanks(false);
                                                setStandardEmiBank("");
                                            }}>No-Cost EMIs</Link></li>
                                            <li><Link className="dropdown-item" onClick={() => {
                                                setDisplayStandardEmiBanks(true);
                                                setDisplayNoCostEmiBanks(false);
                                                setNoCostEmiBank("");
                                            }}>Standard EMIs</Link></li>
                                        </ul>
                                    </div>
                                    <div className="col-md-3">
                                        {displayNoCostEmiBanks && <select className="form-select" onChange={(event) => {
                                            setNoCostEmiBank(event.target.value);
                                            setDisplayNoCostEmiBanks(false);
                                            setStandardEmiBank("");
                                        }}>
                                            <option value="">---Select Bank---</option>
                                            {product.laptop.offers.noCostEmiOffers.map((obj) => {
                                                return (
                                                    <option value={obj.bankName} key={obj._id}>{obj.bankName}</option>
                                                )
                                            })}
                                        </select>}
                                        {displayStandardEmiBanks && <select className="form-select" onChange={(event) => {
                                            setStandardEmiBank(event.target.value);
                                            setDisplayStandardEmiBanks(false);
                                            setNoCostEmiBank("");
                                        }}>
                                                <option value="">---Select Bank---</option>
                                                {product.laptop.standardEmis.map((obj) => {
                                                    return <option value={obj.bankName} key={obj._id}>{obj.bankName}</option>
                                                })}
                                            </select>}
                                    </div>
                                    <div className="col-md-6 mt-2">
                                        {noCostEmiBank && <div className="card">
                                                <div className="card-body position-relative">
                                                    <button className="btn btn-close position-absolute top-0 end-0" onClick={() => setNoCostEmiBank("")}></button>
                                                    <div className="row">
                                                        <div className="col">
                                                            <p>EMI Plans</p>
                                                        </div>
                                                        <div className="col">
                                                            <p>Total Cost</p>
                                                        </div>
                                                    </div>
                                                    {product.laptop.offers.noCostEmiOffers.find((ele) => ele.bankName === noCostEmiBank).months.map((ele) => {
                                                        return (
                                                            <div className="row" key={ele}>
                                                                <div className="col">
                                                                    <p>{ele} x <i className="bi bi-currency-rupee"></i>{parseInt(product.laptop.discountedPrice / ele)}</p>
                                                                </div>
                                                                <div className="col">
                                                                    <p><i className="bi bi-currency-rupee"></i>{product.laptop.discountedPrice}</p>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>}
                                            {standardEmiBank && <div className="card">
                                                   <div className="card-body position-relative">
                                                    <button className="btn btn-close position-absolute top-0 end-0" onClick={() => setStandardEmiBank("")}></button>
                                                    <div className="row">
                                                        <div className="col">
                                                            <p>EMI Plans</p>
                                                        </div>
                                                        <div className="col">
                                                            <p>Interest</p>
                                                        </div>
                                                        <div className="col">
                                                            <p>Total Cost</p>
                                                        </div>
                                                    </div>
                                                    {product.laptop.standardEmis.find((obj) => obj.bankName === standardEmiBank).totalEmis.map((ele) => {
                                                        return (
                                                            <div className="row" key={ele}>
                                                                <div className="col">
                                                                    <p>{ele} x <i className="bi bi-currency-rupee"></i>{parseInt( (product.laptop.discountedPrice * (0.16/12) * ( 1+ (0.16/12))**ele) / ( ((1 + (0.16/12))**ele) - 1 ) )}</p>
                                                                </div>
                                                                <div className="col">
                                                                    <p>{product.laptop.standardEmis.find((obj) => obj.bankName === standardEmiBank).interestRate}%</p>
                                                                </div>
                                                                <div className="col">
                                                                    <p><i className="bi bi-currency-rupee"></i>{parseInt( (product.laptop.discountedPrice * (0.16/12) * ( 1+ (0.16/12))**ele) / ( ((1 + (0.16/12))**ele) - 1 ) ) * ele}</p>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                   </div>
                                                </div>}
                                    </div>
                                    <div className="py-4">
                                        <p className="fs-2 fw-medium">Specifications</p>
                                        <ul className="list-group">
                                            <li className="list-group-item">
                                                <p className="fs-3 fw-medium">General</p>
                                                {product.laptop.generalFeatures.otherGeneralFeatures.attributes.map((obj) => {
                                                    let keys = Object.keys(obj);
                                                    let featureName = keys.find(ele => ele !== "id");
                                                    return (
                                                        <div className="row" key={obj.id}>
                                                            <div className="col">
                                                                <p className="fs-5 fw-medium">{featureName}</p>
                                                            </div>
                                                            <div className="col">
                                                                <p className="fs-5 fw-medium" style={{ color: "grey"}}>{obj[featureName]}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </li>
                                            {(product.laptop.processorAndMemoryFeatures.attributes.length > 0) && <li className="list-group-item">
                                                   <p className="fs-3 fw-medium">Processor & Memory Features</p>
                                                   {product.laptop.processorAndMemoryFeatures.attributes.map((obj) => {
                                                    let keys = Object.keys(obj);
                                                    let featureName = keys.find(ele => ele !== "id");
                                                    return (
                                                        <div className="row" key={obj.id}>
                                                            <div className="col">
                                                                <p className="fs-5 fw-medium">{featureName}</p>
                                                            </div>
                                                            <div className="col">
                                                                <p className="fs-5 fw-medium" style={{ color: "grey"}}>{obj[featureName]}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                   })}
                                                </li>}
                                                {(product.laptop.operatingSystem.attributes.length > 0) && <li className="list-group-item">
                                                     <p className="fs-3 fw-medium">Operating System</p>
                                                     {product.laptop.operatingSystem.attributes.map((obj) => {
                                                        let keys = Object.keys(obj);
                                                        let featureName = keys.find(ele => ele !== "id");
                                                        return (
                                                            <div className="row" key={obj.id}>
                                                                <div className="col">
                                                                    <p className="fs-5 fw-medium">{featureName}</p>
                                                                </div>
                                                                <div className="col">
                                                                    <p className="fs-5 fw-medium" style={{ color: "grey"}}>{obj[featureName]}</p>
                                                                </div>
                                                            </div>
                                                        )
                                                     })}
                                                    </li>}
                                                {(product.laptop.portAndSlotFeatures.attributes.length > 0) && <li className="list-group-item">
                                                      <p className="fs-3 fw-medium">Port & Slot Features</p>
                                                      {product.laptop.portAndSlotFeatures.attributes.map((obj) => {
                                                        let keys = Object.keys(obj);
                                                        let featureName = keys.find(ele => ele !== "id");
                                                        return (
                                                            <div className="row" key={obj.id}>
                                                                <div className="col">
                                                                    <p className="fs-5 fw-medium">{featureName}</p>
                                                                </div>
                                                                <div className="col">
                                                                    <p className="fs-5 fw-medium" style={{ color: "grey"}}>{obj[featureName]}</p>
                                                                </div>
                                                            </div>
                                                        )
                                                      })}
                                                    </li>}
                                                {(product.laptop.displayAndAudioFeatures.attributes.length > 0) && <li className="list-group-item">
                                                      <p className="fs-3 fw-medium">Display & Audio Features</p>
                                                      {product.laptop.displayAndAudioFeatures.attributes.map((obj) => {
                                                        let keys = Object.keys(obj);
                                                        let featureName = keys.find(ele => ele !== "id");
                                                        return (
                                                            <div className="row" key={obj.id}>
                                                                <div className="col">
                                                                    <p className="fs-5 fw-medium">{featureName}</p>
                                                                </div>
                                                                <div className="col">
                                                                    <p className="fs-5 fw-medium" style={{ color: "grey"}}>{obj[featureName]}</p>
                                                                </div>
                                                            </div>
                                                        )
                                                      })}
                                                    </li>}
                                                {(product.laptop.connectivityFeatures.attributes.length > 0) && <li className="list-group-item">
                                                       <p className="fs-3 fw-medium">Connectivity Features</p>
                                                       {product.laptop.connectivityFeatures.attributes.map((obj) => {
                                                        let keys = Object.keys(obj);
                                                        let featureName = keys.find(ele => ele !== "id");
                                                        return (
                                                            <div className="row" key={obj.id}>
                                                                <div className="col">
                                                                    <p className="fs-5 fw-medium">{featureName}</p>
                                                                </div>
                                                                <div className="col">
                                                                    <p className="fs-5 fw-medium" style={{ color: "grey"}}>{obj[featureName]}</p>
                                                                </div>
                                                            </div>
                                                        )
                                                       })}
                                                    </li>}
                                                {(product.laptop.additionalFeatures.attributes.length > 0) && <li className="list-group-item">
                                                       <p className="fs-3 fw-medium">Additional Features</p>
                                                       {product.laptop.additionalFeatures.attributes.map((obj) => {
                                                        let keys = Object.keys(obj);
                                                        let featureName = keys.find(ele => ele !== "id");
                                                        return (
                                                            <div className="row" key={obj.id}>
                                                                <div className="col">
                                                                    <p className="fs-5 fw-medium">{featureName}</p>
                                                                </div>
                                                                <div className="col">
                                                                    <p className="fs-5 fw-medium" style={{ color: "grey"}}>{obj[featureName]}</p>
                                                                </div>
                                                            </div>
                                                        )
                                                       })}
                                                    </li>}
                                                <li className="list-group-item">
                                                      <p className="fs-3 fw-medium">Warranty</p>
                                                      {Object.keys(product.laptop.warranty).map((ele) => {
                                                        return (
                                                            <div className="row" key={ele}>
                                                                <div className="col">
                                                                    <p className="fs-5 fw-medium">{ele}</p>
                                                                </div>
                                                                <div className="col">
                                                                    <p className="fs-5 fw-medium" style={{ color: "grey"}}>{product.laptop.warranty[ele]} {ele === "domesticWarranty" && "Year"}</p>
                                                                </div>
                                                            </div>
                                                        )
                                                      })}
                                                    </li>    
                                        </ul>
                                    </div>
                                </div>
                            </div>}
                </div>
            </div>
        </div>
    )
}

const DisplayProductDetails = () => {
    const [cart, setCart] = useState(null);
    const [wishlist, setWishlist] = useState(null);
    useEffect(() => {
        fetch("https://tech-mart-backend-five.vercel.app/cart")
        .then((response) => {
            if (! response.ok) {
                throw new Error("failed to fetch cart items");
            }
            return response.json();
        })
        .then((responseData) => {
            setCart(responseData);
        })
        .catch((error) => {
            console.error('Error: ', error);
        })
    }, [])

    useEffect(() => {
        fetch("https://tech-mart-backend-five.vercel.app/wishlist")
        .then((response) => {
            if (! response.ok) {
                throw new Error("falied to fetch items from wishlist");
            }
            return response.json()
        })
        .then((responseData) => {
            setWishlist(responseData)
        })
        .catch((error) => {
            console.error('Error', error)
        })
    }, [])
    return (
        <div>
            <Header sharedCart={cart} sharedWishlist={wishlist}/>
            <ProductDetails sharedCart={cart} setSharedCart={setCart} sharedWishlist={wishlist} setSharedWishlist={setWishlist}/>
        </div>
    )
}

export default DisplayProductDetails