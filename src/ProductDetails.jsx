import { useState, useEffect } from "react";
import Header from "./components/Header";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const DisplayProductDetails = () => {

    const { category, id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [product, setProduct] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [noCostEmiBank, setNoCostEmiBank] = useState("");
    const [standardEmiBank, setStandardEmiBank] = useState("");

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
        }
        
    }, []);

    console.log(product);

    return (
        <div>
            <Header/>
            <div className="row mt-2">
                <div className="col position-relative">
                    {loading && <div className="spinner-border text-primary position-absolute top-50 start-50 translate-middle"></div>}
                    {error && <p className="fs-5 fw-normal">{error}</p>}
                    {(product && category === "mobiles") && <div className="row">
                         <div className="col-md-5 ms-3">
                            <div className="card">
                                <div className="card-body">
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
                            <button className="btn btn-warning py-2 px-5 mt-3 ms-5">Add to Cart</button>
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
                </div>
            </div>
        </div>
    )
}

export default DisplayProductDetails