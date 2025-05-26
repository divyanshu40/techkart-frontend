import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./components/Header";

const DisplayProducts = () => {

    const { category } = useParams();
    const { brand } = useParams();
    const [productCategory, setProductCategory] = useState("");
    const [mobileBrand, setMobileBrand] = useState("");
    const[data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState({
        brand: [],
        ram: [], 
        internalStorage: [],
        batteryCapacity: [],
        screenSize: [],
        primaryCamera: [],
        secondaryCamera: [],
        processorBrand: [],
        speciality: [],
        resolutionType: [],
        operatingSystem: [],
        networkType: [],
        simType: [],
        features: [],
        mobileType: [],
        numberOfCores: [],
        operatingSystemVersionName: [],
        clockSpeed: [],
        price: []  
    });


    const filterHandler = (event) => {
        if (event.target.checked) {
            setFilter((prevFilter) => ({
                ...prevFilter, [event.target.name]: [...prevFilter[event.target.name], event.target.value]
            }))
        } else {
            setFilter((prevFilter) => ({
                ...prevFilter, [event.target.name]: prevFilter[event.target.name].filter((ele) => ele !== event.target.value)
            }))
        }
    }

    useEffect(() => {
        if (category === "mobiles") {
            if (brand === "all") {
                setLoading(true);
                fetch("https://tech-mart-backend-five.vercel.app/mobiles")
                .then((response) => {
                    if (! response.ok) {
                        throw new Error("Failed to fetch data");
                    }
                    return response.json();
                }).then((responseData) => {
                    setData(responseData)
                })
                .catch(() => {
                    setError(error.message);
                })
                .finally(() => {
                    setLoading(false)
                })
                console.log(data)
            } else {
                setLoading(true);
                fetch(`https://tech-mart-backend-five.vercel.app/mobiles/brand/${brand}`)
                .then((response) => {
                    if (! response.ok) {
                        throw error
                    }
                    return response.json()
                })
                .then((responseData) => {
                    setData(responseData);
                })
                .catch((error) => {
                    setError(error.message)
                })
                .finally(() => {
                    setLoading(false)
                })
                console.log(data)
            }
        }
    }, )

    return (
        <div>
            <Header/>
            <div className="ms-4 mt-4">
                <div className="row">
                    <div className="col-md-3">
                        { category === "mobiles" && <div className="card">
                            <div className="card-body overflow-y-scroll" style={{ maxHeight: '600px' }}>
                                <p className="fs-2 fw-medium">Filters</p>
                                <hr/>
                                <label className="fs-4 fw-normal">Price</label>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="price"
                                    id="0-10000"
                                    value="0-10000"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="0-10000" className="form-check-label fs-5 fw-normal"><i className="bi bi-currency-rupee"></i>0-<i className="bi bi-currency-rupee"></i>10000</label>
                                    <br/>
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="price"
                                    id="0-20000"
                                    value="0-20000"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="0-20000" className="form-check-label fs-5 fw-normal"><i className="bi bi-currency-rupee"></i>0-<i className="bi bi-currency-rupee"></i>20000</label>
                                    <br/>
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="price"
                                    id="0-30000"
                                    value="0-30000"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="0-30000" className="form-check-label fs-5 fw-normal"><i className="bi bi-currency-rupee"></i>0-<i className="bi bi-currency-rupee"></i>30000</label>
                                    <br/>
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="price"
                                    id="0-40000"
                                    value="0-40000"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="0-40000" className="form-check-label fs-5 fw-normal"><i className="bi bi-currency-rupee"></i>0-<i className="bi bi-currency-rupee"></i>40000</label>
                                    <br/>
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="price"
                                    id="0-50000"
                                    value="0-50000"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="0-50000" className="form-check-label fs-5 fw-normal"><i className="bi bi-currency-rupee"></i>0-<i className="bi bi-currency-rupee"></i>50000</label>
                                    <br/>
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="price"
                                    id="0-60000"
                                    value="0-60000"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="0-60000" className="form-check-label fs-5 fw-normal"><i className="bi bi-currency-rupee"></i>0-<i className="bi bi-currency-rupee"></i>60000</label>
                                    <br/>
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="price"
                                    id="0-70000"
                                    value="0-70000"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="0-70000" className="form-check-label fs-5 fw-normal"><i className="bi bi-currency-rupee"></i>0-<i className="bi bi-currency-rupee"></i>70000</label>
                                    <br/>
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="price"
                                    id="0-80000"
                                    value="0-80000"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="0-80000" className="form-check-label fs-5 fw-normal"><i className="bi bi-currency-rupee"></i>0-<i className="bi bi-currency-rupee"></i>80000</label>
                                    <br/>
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="price"
                                    id="0-90000"
                                    value="0-90000"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="0-90000" className="form-check-label fs-5 fw-normal"><i className="bi bi-currency-rupee"></i>0-<i className="bi bi-currency-rupee"></i>90000</label>
                                    <br/>
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="price"
                                    id="0-100000"
                                    value="0-100000"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="0-100000" className="form-check-label fs-5 fw-normal"><i className="bi bi-currency-rupee"></i>0-<i className="bi bi-currency-rupee"></i>100000</label>
                                </div>
                                <hr/>
                                <label className="fs-4 fw-normal form-label">Brand:</label>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="apple"
                                    name="brand"
                                    value="Apple"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="apple" className="form-check-label fs-5 fw-normal">Apple</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="samsung"
                                    name="brand"
                                    value="Samsung"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="samsung" className="form-check-label fs-5 fw-normal">Samsung</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="oppo"
                                    name="brand"
                                    value="Oppo"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="oppo" className="form-check-label fs-5 fw-normal">Oppo</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="vivo"
                                    name="brand"
                                    value="Vivo"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="vivo" className="form-check-label fs-5 fw-normal">Vivo</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="google"
                                    name="brand"
                                    value="Google"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="google" className="form-check-label fs-5 fw-normal">Google</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="realme"
                                    name="brand"
                                    value="Realme"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="realme" className="form-check-label fs-5 fw-normal">Realme</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="motorola"
                                    name="brand"
                                    value="Motorola"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="motorola" className="form-check-label fs-5 fw-normal">Motorola</label>
                                </div>
                                <hr/>
                                <label className="form-label fs-4 fw-normal">Internal Storage</label>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="8gb-15.9gb"
                                    name="internalStorage"
                                    value="8-15.9"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="8gb-15.9gb" className="form-check-label fs-5 fw-normal">8GB-15.9GB</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="16gb-31.9gb"
                                    name="internalStorage"
                                    value="16-31.9"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="16gb-31.9gb" className="form-check-label fs-5 fw-normal">16GB-31.9GB</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="32gb-63.9gb"
                                    name="internalStorage"
                                    value="32-63.9"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="32gb-63.9gb" className="form-check-label fs-5 fw-normal">32GB-63.9GB</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="64gb-127.9gb"
                                    name="internalStorage"
                                    value="64-127.9"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="64gb-127.9gb" className="form-check-label fs-5 fw-normal">64GB-127.9GB</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="128gb-256gb"
                                    name="internalStorage"
                                    value="128-256"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="128gb-256gb" className="form-check-label fs-5 fw-normal">128GB-256GB</label>
                                </div>
                                <hr/>
                                <label className="form-label fs-4 fw-normal">Ram:</label>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="4gb"
                                    name="ram"
                                    value={4}
                                    onChange={filterHandler}
                                    />
                                    <label className="form-check-label fs-5 fw-normal">4GB</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="6gb"
                                    name="ram"
                                    value={6}
                                    onChange={filterHandler}
                                    />
                                    <label className="form-check-label fs-5 fw-normal">6GB</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="8gb"
                                    name="ram"
                                    value={8}
                                    onChange={filterHandler}
                                    />
                                    <label className="form-check-label fs-5 fw-normal">8GB</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="12gb"
                                    name="ram"
                                    value={12}
                                    onChange={filterHandler}
                                    />
                                    <label className="form-check-label fs-5 fw-normal">12GB</label>
                                </div>
                                <hr/>
                                <label className="form-label fs-4 fw-normal">Battery Capacity</label>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="1000mah-1999mah"
                                    name="batteryCapacity"
                                    value="1000-1999"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="1000mah-1999mah" className="form-check-label fs-5 fw-normal">1000mah-1999</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="2000mah-2999mah"
                                    name="batteryCapacity"
                                    value="2000-2999"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="2000mah-2999mah" className="form-check-label fs-5 fw-normal">2000mah-2999mah</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="3000mah-3999mah"
                                    name="batteryCapacity"
                                    value="3000-3999"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="3000mah-3999mah" className="form-check-label fs-5 fw-normal">3000mah-3999mah</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="4000mah-4999mah"
                                    name="batteryCapacity"
                                    value="4000-4999"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="4000mah-4999mah" className="form-check-label fs-5 fw-normal">4000mah-4999mah</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="5000mah-5999mah"
                                    name="batteryCapacity"
                                    value="5000-5999"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="5000mah-5999mah" className="form-check-label fs-5 fw-normal">5000mah-5999mah</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="6000mah-6999mah"
                                    name="batteryCapacity"
                                    value="6000-6999"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="6000mah-6999mah" className="form-check-label fs-5 fw-normal">6000mah-6999mah</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="7000mah-8000mah"
                                    name="batteryCapacity"
                                    value="7000-8000"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="7000mah-7000mah" className="form-check-label fs-5 fw-normal">7000mah-8000mah</label>
                                </div>
                                <hr/>
                                <label className="fs-4 fw-normal">Screen Size:</label>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="4inch-4.4inch"
                                    name="screenSize"
                                    value="4-4.4"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="4inch-4.4inch" className="form-check-label fs-5 fw-normal">4Inch-4.4Inch</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="4.5inch-4.9inch"
                                    name="screenSize"
                                    value="4.5-4.9"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="4.5inch-4.9inch" className="form-check-label fs-5 fw-normal">4.5Inch-4.9Inch</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="5inch-5.4inch"
                                    name="screenSize"
                                    value="5-5.4"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="5inch-5.4inch" className="form-check-label fs-5 fw-normal">5Inch-5.4Inch</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="5.5inch-5.9inch"
                                    name="screenSize"
                                    value="5.5-5.9"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="5.4inch-5.9inch" className="form-check-label fs-5 fw-normal">5.4Inch-5.9Inch</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="6inch-6.4inch"
                                    name="screenSize"
                                    value="6-6.4"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="6inch-6.4inch" className="form-check-label fs-5 fw-normal">6Inch-6.4Inch</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="6.5inch-7inch"
                                    name="screenSize"
                                    value="6.5-7"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="6.5inch-7inch" className="form-check-label fs-5 fw-normal">6.5Inch-7Inch</label>
                                </div>
                                <hr/>
                                <label className="form-label fs-4 fw-normal">Primary Camera</label>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="5mp-7.9mp"
                                    name="primaryCamera"
                                    value="5-7.9"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="5-7.9" className="form-check-label fs-5 fw-normal">5MP-7.9MP</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="8mp-11.9mp"
                                    name="primaryCamera"
                                    value="8-11.9"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="8-11.9" className="form-check-label fs-5 fw-normal">8MP-11.9MP</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="12mp-12.9mp"
                                    name="primaryCamera"
                                    value="12-12.9"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="12-12.9" className="form-check-label fs-5 fw-normal">12MP-12.9MP</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="13mp-15.9mp"
                                    name="primaryCamera"
                                    value="13-15.9"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="13-15.9" className="form-check-label fs-5 fw-normal">13MP-15.9MP</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="16mp-20.9mp"
                                    name="primaryCamera"
                                    value="16-20.9"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="16-20.9" className="form-check-label fs-5 fw-normal">16MP-20.9MP</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="21mp-31.9mp"
                                    name="primaryCamera"
                                    value="21-31.9"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="21-31.9" className="form-check-label fs-5 fw-normal">21MP-31.9MP</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="21mp-31.9mp"
                                    name="primaryCamera"
                                    value="21-31.9"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="21-31.9" className="form-check-label fs-5 fw-normal">21MP-31.9MP</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="32mp-47.9mp"
                                    name="primaryCamera"
                                    value="32-47.9"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="32-47.9" className="form-check-label fs-5 fw-normal">32MP-47.9MP</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="48mp-64mp"
                                    name="primaryCamera"
                                    value="48-64"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="48-64" className="form-check-label fs-5 fw-normal">48MP-64MP</label>
                                </div>
                                <hr/>
                                <label className="form-label fs-4 fw-normal">Secondary Camera</label>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="5mp-7.9mp"
                                    name="secondaryCamera"
                                    value="5-7.9"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="5mp-7.9mp" className="fs-5 fw-normal form-check-label">5MP-7.9MP</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="8mp-11.9mp"
                                    name="secondaryCamera"
                                    value="8-11.9"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="8mp-11.9mp" className="fs-5 fw-normal form-check-label">8MP-11.9MP</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="12mp-12.9mp"
                                    name="secondaryCamera"
                                    value="12-12.9"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="12mp-12.9mp" className="fs-5 fw-normal form-check-label">12MP-12.9MP</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="13mp-15.9mp"
                                    name="secondaryCamera"
                                    value="13.15.9"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="13mp-15.9mp" className="fs-5 fw-normal form-check-label">13MP-15.9MP</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="16mp-21mp"
                                    name="secondaryCamera"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="16mp-21mp" className="fs-5 fw-normal form-check-label">16MP-21MP</label>
                                </div>
                                <hr/>
                                <label className="form-label fs-4 fw-normal">Processor Brand</label>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="exynos"
                                    name="processorBrand"
                                    value="Exynos"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="exynos" className="form-check-label fs-5 fw-normal">Exynos</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="apple"
                                    name="processorBrand"
                                    value="Apple"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="apple" className="form-check-label fs-5 fw-normal">Apple</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="qualcomm"
                                    name="processorBrand"
                                    value="Qualcomm"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="qualcomm" className="form-check-label fs-5 fw-normal">Qualcomm</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="mediatek"
                                    name="processorBrand"
                                    value="Mediatek"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="mediatek" className="form-check-label fs-5 fw-normal">Mediatek</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="snapdragon"
                                    name="processorBrand"
                                    value="Snapdragon"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="snapdragon" className="form-check-label fs-5 fw-normal">Snapdragon</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="intel"
                                    name="processorBrand"
                                    value="Intel"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="intel" className="form-check-label fs-5 fw-normal">Intel</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="google"
                                    name="processorBrand"
                                    value="Google"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="google" className="form-check-label fs-5 fw-normal">Google</label>
                                </div>
                                <hr/>
                                <label className="form-label fs-4 fw-normal">Speciality</label>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="big storage"
                                    name="speciality"
                                    value="Big Storage"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="big storage" className="form-check-label fs-5 fw-normal">Big Storage</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="higher performance"
                                    name="speciality"
                                    value="Higher Performance"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="higher performance" className="form-check-label fs-5 fw-normal">Higher Performance</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="long-lasting battery"
                                    name="speciality"
                                    value="Long-Lasting Battery"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="long-lasting battery" className="form-check-label fs-5 fw-normal">Long-Lasting Battery</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="selfie camera"
                                    name="speciality"
                                    value="Selfie Camera "
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="selfie camera" className="form-check-label fs-5 fw-normal">Selfie Camera</label>
                                </div>
                                <hr/>
                                <label className="form-label fs-4 fw-normal">Resolution Type</label>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="full hd"
                                    name="resolutionType"
                                    value="Full HD"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="full hd" className="form-check-label fs-5 fw-normal">Full HD</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="full hd+"
                                    name="resolutionType"
                                    value="Full HD+"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="full hd+" className="form-check-label fs-5 fw-normal">Full HD+</label>
                                </div>
                                <hr/>
                                <label className="form-label fs-4 fw-normal">Operating System</label>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="android"
                                    name="operatingSystem"
                                    value="Android"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="android" className="form-check-label fs-5 fw-normal">Android</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="firefox"
                                    name="operatingSystem"
                                    value="Firefox"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="firefox" className="form-check-label fs-5 fw-normal">Firefox</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="ios"
                                    name="operatingSystem"
                                    value="iOS"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="ios" className="form-check-label fs-5 fw-normal">iOS</label>
                                </div>
                                <hr/>
                                <label className="form-label fs-4 fw-normal">Network Type</label>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="2g"
                                    name="networkType"
                                    value="2G"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="2g" className="form-check-label fs-5 fw-normal">2G</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="3g"
                                    name="networkType"
                                    value="3G"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="3g" className="form-check-label fs-5 fw-normal">3G</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="4g"
                                    name="networkType"
                                    value="4G"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="4g" className="form-check-label fs-5 fw-normal">4G</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="4g volte"
                                    name="networkType"
                                    value="4G Volte"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="4g volte" className="form-check-label fs-5 fw-normal">4G Volte</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="5g"
                                    name="networkType"
                                    value="5G"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="5g" className="form-check-label fs-5 fw-normal">5G</label>
                                </div>
                                <hr/>
                                <label className="form-label fs-4 fw-normal">Sim Type</label>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="dual sim"
                                    name="simType"
                                    value="Dual Sim"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="dual sim" className="form-check-label fs-5 fw-normal">Dual Sim</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="dual sim(nano+esim)"
                                    name="simType"
                                    value="Dual Sim (Nano + eSIM)"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="dual sim(nano+esim)" className="form-check-label fs-5 fw-normal">Dual Sim (Nano + eSIM)</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="dual sim (physical + esim)"
                                    name="simType"
                                    value="Dual Sim (Physical + eSIM)"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="dual sim (physical + esim)" className="form-check-label fs-5 fw-normal">Dual Sim (Physical + eSIM)</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="single sim"
                                    name="simType"
                                    value="Single Sim"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="single sim" className="form-check-label fs-5 fw-normal">Single Sim</label>
                                </div>
                                <hr/>
                                <label className="form-label fs-4 fw-nomal">Features</label>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="wifi"
                                    name="features"
                                    value="Wifi"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="wifi" className="form-check-label fs-5 fw-normal">Wifi</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="hd recording"
                                    name="features"
                                    value="HD Recording"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="hd recording" className="form-check-label fs-5 fw-normal">HD Recording</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="fm player"
                                    name="features"
                                    value="FM Player"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="fm player" className="form-check-label fs-5 fw-normal">FM Player</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="nfc"
                                    name="features"
                                    value="NFC"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="nfc" className="form-check-label fs-5 fw-normal">NFC</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="music player"
                                    name="features"
                                    value="Music Player"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="music player" className="form-check-label fs-5 fw-normal">Music Player</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="bluetooth"
                                    name="features"
                                    value="Bluetooth"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="bluetooth" className="form-check-label fs-5 fw-normal">Bluetooth</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="usb"
                                    name="features"
                                    value="USB"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="usb" className="form-check-label fs-5 fw-normal">USB</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="gprs"
                                    name="features"
                                    value="GPRS"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="gprs" className="form-check-label fs-5 fw-normal">GPRS</label>
                                </div>
                                <hr/>
                                <label className="fw-normal fs-4">Mobile Type</label>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="featured phones"
                                    name="mobileType"
                                    value="Featured Phones"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="featured phones" className="fs-5 fw-normal">Featured Phones</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="smartphones"
                                    name="mobileType"
                                    value="Smartphones"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="Smartphones" className="fs-5 fw-normal">Smartphones</label>
                                </div>
                                <hr/>
                                <label className="form-label fs-4 fw-normal">Number of Cores</label>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="dual core"
                                    name="numberOfCores"
                                    value="Dual Core"
                                    />
                                    <label htmlFor="dual core" className="form-check-label fs-5 fw-normal">Dual Core</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="quad core"
                                    name="numberOfCores"
                                    value="Quad Core"
                                    />
                                    <label htmlFor="quad core" className="form-check-label fs-5 fw-normal">Quad Core</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="octa core"
                                    name="numberOfCores"
                                    value="Octa Core"
                                    />
                                    <label htmlFor="octa core" className="form-check-label fs-5 fw-normal">Octa Core</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="single core"
                                    name="numberOfCores"
                                    value="Single Core"
                                    />
                                    <label htmlFor="single core" className="form-check-label fs-5 fw-normal">Single Core</label>
                                </div>
                                <hr/>
                                <label className="form-label fs-4 fw-normal">Clock Speed</label>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="1GHz-1.9GHz"
                                    name="clockSpeed"
                                    value="1GHz-1.9GHz"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="1GHz-1.9GHz" className="form-check-label">1GHz-1.9GHz</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="2GHz-2.9GHz"
                                    name="clockSpeed"
                                    value="2GHz-2.9GHz"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="2GHz-2.9GHz" className="form-check-label">2GHz-2.9GHz</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="3GHz-3.9GHz"
                                    name="clockSpeed"
                                    value="3GHz-3.9GHz"
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="3GHz-3.9GHz" className="form-check-label">3GHz-3.9GHz</label>
                                </div>
                            </div>
                        </div>}
                    </div>
                    <div className="col position-relative">
                       {loading && <div className="position-absolute top-50 start-50 translate-middle">
                          <div className="spinner-border text-primary" role="status"></div>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DisplayProducts