import { useState, useEffect } from "react";
import Header from "./components/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import qs from "qs"

const SearchProducts = ({ sharedLoading, setSharedLoading, sharedSearchResults, setSharedSearchResults}) => {

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
    const [laptopFilters, setLaptopFilters] = useState({
    brand: [],
    laptopType: [],
    processorType: [],
    processorGeneration: [],
    processorBrand: [],
    ramCapacity: [],
    ramType: [],
    storageCapacity: [],
    storageType: [],
    screenSize: [],
    operatingSystem: [],
    weight: [],
    isTouchScreen: [],
    usage: [],
    graphicsMemoryCapacity: [],
    graphicsMemoryType: [],
    graphicsProcessorName: [],
    features: [],
    price: []
    });
    const [mobileFilterValues, setMobileFilterValues] = useState([]);
    const [laptopFilterValues, setLaptopFilterValues] = useState([]);

    const filterHandler = (event) => {
       if (event.target.checked) {
         setFilter((prevData) => ({
            ...prevData, [event.target.name]: [...prevData[event.target.name], event.target.value]
        }));
        setMobileFilterValues((prevArray) => [...prevArray, event.target.value]);
        setSharedSearchResults(null);
       } else {
        setFilter((prevData) => ({
            ...prevData, [event.target.name]: prevData[event.target.name].filter((ele) => ele !== event.target.value)
        }));
        setMobileFilterValues((prevArray) => prevArray.filter((ele) => ele !== event.target.value));
        setSharedSearchResults(null)
       }
    }

    const laptopsFilterHandler = (event) => {
        if (event.target.checked) {
            setLaptopFilters((prevData) => ({
                ...prevData, [event.target.name]: [...prevData[event.target.name], event.target.value]
            }));
            setLaptopFilterValues((prevArray) => [...prevArray, event.target.value]);
        } else {
            setLaptopFilters((prevData) => ({
                ...prevData, [event.target.name]: prevData[event.target.name].filter((ele) => ele !== event.target.value)
            }));
            setLaptopFilterValues((prevArray) => prevArray.filter((ele) => ele !== event.target.value));
        }
    }

    useEffect(() => {
        if (mobileFilterValues.length > 0) {
            setSharedLoading(true);
            axios.get("https://tech-mart-backend-five.vercel.app/mobiles/filter", {
                params: filter,
                paramsSerializer: (params => qs.stringify(params, { arrayFormat: "repeat" }))
            })
            .then((res) => {
                setSharedSearchResults(res.data);
            })
            .catch((error) => {
                console.error('Error: ', error)
            })
            .finally(() => {
                setSharedLoading(false);
            })
        }
    }, [mobileFilterValues]);

    useEffect(() => {
        if (laptopFilterValues.length > 0) {
            setSharedLoading(true);
            axios.get("https://tech-mart-backend-five.vercel.app/laptops/filter", {
                params: laptopFilters,
                paramsSerializer: (params => qs.stringify(params, { arrayFormat: "repeat" }))
            })
            .then((res) => {
                setSharedSearchResults(res.data);
            })
            .catch((error) => {
                console.error('Error: ', error);
            })
            .finally(() => {
                setSharedLoading(false);
            })
        }
    }, [laptopFilterValues])

    return (
        <div className="container">
            <div className="row py-4">
                <div className="col-md-4">
                    { sharedSearchResults && <>
                                         { (((Array.isArray(sharedSearchResults.products)) && sharedSearchResults.products[0] && sharedSearchResults.products[0].category === "Mobiles") || Object.keys(sharedSearchResults).includes("mobiles") )&& <div className="card overflow-y-scroll" style={{ maxHeight: "600px"}}>
                      <div className="card-body">
                         <p className="fs-2 fw-medium">Filters</p>
                                <Link className="fs-5 fw-normal" onClick={() => window.location.reload()}></Link>
                                <hr/>
                                <label className="fs-4 fw-normal">Price</label>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="price"
                                    id="0-9999"
                                    value="0-9999"
                                    onChange={filterHandler}
                                    checked={mobileFilterValues.includes("0-9999")}
                                    />
                                    <label htmlFor="0-9999" className="form-check-label fs-5 fw-normal"><i className="bi bi-currency-rupee"></i>0-<i className="bi bi-currency-rupee"></i>9999</label>
                                    <br/>
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="price"
                                    id="10000-19999"
                                    value="10000-19999"
                                    checked={mobileFilterValues.includes("10000-19999")}
                                    onChange={filterHandler}
                                    />
                                    <label htmlFor="10000-19999" className="form-check-label fs-5 fw-normal"><i className="bi bi-currency-rupee"></i>10000-<i className="bi bi-currency-rupee"></i>19999</label>
                                    <br/>
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="price"
                                    id="20000-29999"
                                    value="20000-29999"
                                    onChange={filterHandler}
                                    checked={mobileFilterValues.includes("20000-29999")}
                                    />
                                    <label htmlFor="20000-29999" className="form-check-label fs-5 fw-normal"><i className="bi bi-currency-rupee"></i>20000-<i className="bi bi-currency-rupee"></i>29999</label>
                                    <br/>
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="price"
                                    id="30000-39999"
                                    value="30000-39999"
                                    onChange={filterHandler}
                                    checked={mobileFilterValues.includes("30000-39999")}
                                    />
                                    <label htmlFor="30000-39999" className="form-check-label fs-5 fw-normal"><i className="bi bi-currency-rupee"></i>30000-<i className="bi bi-currency-rupee"></i>39999</label>
                                    <br/>
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="price"
                                    id="40000-49999"
                                    value="40000-49999"
                                    onChange={filterHandler}
                                    checked={mobileFilterValues.includes("40000-49999")}
                                    />
                                    <label htmlFor="40000-49999" className="form-check-label fs-5 fw-normal"><i className="bi bi-currency-rupee"></i>40000-<i className="bi bi-currency-rupee"></i>49999</label>
                                    <br/>
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="price"
                                    id="50000-59990"
                                    value="50000-59990"
                                    onChange={filterHandler}
                                    checked={mobileFilterValues.includes("50000-59990")}
                                    />
                                    <label htmlFor="50000-59990" className="form-check-label fs-5 fw-normal"><i className="bi bi-currency-rupee"></i>50000-<i className="bi bi-currency-rupee"></i>59999</label>
                                    <br/>
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="price"
                                    id="60000-69999"
                                    value="60000-69999"
                                    onChange={filterHandler}
                                    checked={mobileFilterValues.includes("60000-69999")}
                                    />
                                    <label htmlFor="60000-69999" className="form-check-label fs-5 fw-normal"><i className="bi bi-currency-rupee"></i>60000-<i className="bi bi-currency-rupee"></i>69999</label>
                                    <br/>
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="price"
                                    id="70000-79999"
                                    value="70000-79999"
                                    onChange={filterHandler}
                                    checked={mobileFilterValues.includes("70000-79999")}
                                    />
                                    <label htmlFor="70000-79999" className="form-check-label fs-5 fw-normal"><i className="bi bi-currency-rupee"></i>70000-<i className="bi bi-currency-rupee"></i>79999</label>
                                    <br/>
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="price"
                                    id="80000-89999"
                                    value="80000-89999"
                                    onChange={filterHandler}
                                    checked={mobileFilterValues.includes("80000-89999")}
                                    />
                                    <label htmlFor="80000-89999" className="form-check-label fs-5 fw-normal"><i className="bi bi-currency-rupee"></i>80000-<i className="bi bi-currency-rupee"></i>89999</label>
                                    <br/>
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="price"
                                    id="90000-100000"
                                    value="90000-100000"
                                    onChange={filterHandler}
                                    checked={mobileFilterValues.includes("90000-100000")}
                                    />
                                    <label htmlFor="90000-100000" className="form-check-label fs-5 fw-normal"><i className="bi bi-currency-rupee"></i>90000-<i className="bi bi-currency-rupee"></i>100000</label>
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
                                    checked={mobileFilterValues.includes("Apple")}
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
                                    checked={mobileFilterValues.includes("Samsung")}
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
                                    checked={mobileFilterValues.includes("Oppo")}
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
                                    checked={mobileFilterValues.includes("Vivo")}
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
                                    checked={mobileFilterValues.includes("Google")}
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
                                    checked={mobileFilterValues.includes("Realme")}
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
                                    checked={mobileFilterValues.includes("Motorola")}
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
                                    checked={mobileFilterValues.includes("8-15.9")}
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
                                    checked={mobileFilterValues.includes("16-31.9")}
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
                                    checked={mobileFilterValues.includes("32-63.9")}
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
                                    checked={mobileFilterValues.includes("64-127.9")}
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
                                    checked={mobileFilterValues.includes("128-256")}
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
                                    checked={mobileFilterValues.includes(4)}
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
                                    checked={mobileFilterValues.includes(6)}
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
                                    checked={mobileFilterValues.includes(8)}
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
                                    checked={mobileFilterValues.includes(12)}
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
                                    checked={mobileFilterValues.includes("1000-1999")}
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
                                    checked={mobileFilterValues.includes("2000-2999")}
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
                                    checked={mobileFilterValues.includes("3000-3999")}
                                    />
                                    <label htmlFor="3000mah-3999mah" className="form-check-label fs-5 fw-normal">3000mah-3999mah</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="4000mah-4999mah"
                                    name="batteryCapacity"
                                    value="4000mah-4999mah"
                                    onChange={filterHandler}
                                    checked={mobileFilterValues.includes("4000mah-4999mah")}
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
                                    checked={mobileFilterValues.includes("5000-5999")}
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
                                    checked={mobileFilterValues.includes("6000-6999")}
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
                                    checked={mobileFilterValues.includes("7000-8000")}
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
                                    checked={mobileFilterValues.includes("4-4.4")}
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
                                    checked={mobileFilterValues.includes("4.5-4.9")}
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
                                    checked={mobileFilterValues.includes("5-5.4")}
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
                                    checked={mobileFilterValues.includes("5.5-5.9")}
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
                                    checked={mobileFilterValues.includes("6-6.4")}
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
                                    checked={mobileFilterValues.includes("6.5-7")}
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
                                    checked={mobileFilterValues.includes("5-7.9")}
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
                                    checked={mobileFilterValues.includes("8-11.9")}
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
                                    checked={mobileFilterValues.includes("12-12.9")}
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
                                    checked={mobileFilterValues.includes("13-15.9")}
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
                                    checked={mobileFilterValues.includes("16-20.9")}
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
                                    checked={mobileFilterValues.includes("21-31.9")}
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
                                    checked={mobileFilterValues.includes("21-31.9")}
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
                                    checked={mobileFilterValues.includes("32-47.")}
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
                                    checked={mobileFilterValues.includes("48-64")}
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
                                    checked={mobileFilterValues.includes("5-7.9")}
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
                                    checked={mobileFilterValues.includes("8-11.9")}
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
                                    checked={mobileFilterValues.includes("12-12.9")}
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
                                    checked={mobileFilterValues.includes("13.15.9")}
                                    />
                                    <label htmlFor="13mp-15.9mp" className="fs-5 fw-normal form-check-label">13MP-15.9MP</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="16mp-21mp"
                                    name="secondaryCamera"
                                    value="16-21"
                                    onChange={filterHandler}
                                    checked={mobileFilterValues.includes("16-21")}
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
                                    checked={mobileFilterValues.includes("Exynos")}
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
                                    checked={mobileFilterValues.includes("Apple")}
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
                                    checked={mobileFilterValues.includes("Qualcomm")}
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
                                    checked={mobileFilterValues.includes("Mediatek")}
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
                                    checked={mobileFilterValues.includes("Snapdragon")}
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
                                    checked={mobileFilterValues.includes("Intel")}
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
                                    checked={mobileFilterValues.includes("Google")}
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
                                    checked={mobileFilterValues.includes("Big Storage")}
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
                                    checked={mobileFilterValues.includes("Higher Performance")}
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
                                    checked={mobileFilterValues.includes("Long-Lasting Battery")}
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
                                    checked={mobileFilterValues.includes("Selfie Camera")}
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
                                    checked={mobileFilterValues.includes("Full HD")}
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
                                    checked={mobileFilterValues.includes("Full HD+")}
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
                                    checked={mobileFilterValues.includes("Android")}
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
                                    checked={mobileFilterValues.includes("Firefox")}
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
                                    checked={mobileFilterValues.includes("iOS")}
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
                                    checked={mobileFilterValues.includes("2G")}
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
                                    checked={mobileFilterValues.includes("3G")}
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
                                    checked={mobileFilterValues.includes("4G")}
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
                                    checked={mobileFilterValues.includes("4G Volte")}
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
                                    checked={mobileFilterValues.includes("5G")}
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
                                    checked={mobileFilterValues.includes("Dual Sim")}
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
                                    checked={mobileFilterValues.includes("Dual Sim (Nano + eSIM)")}
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
                                    checked={mobileFilterValues.includes("Dual Sim (Physical + eSIM)")}
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
                                    checked={mobileFilterValues.includes("Single Sim")}
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
                                    checked={mobileFilterValues.includes("Wifi")}
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
                                    checked={mobileFilterValues.includes("HD Recording")}
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
                                    checked={mobileFilterValues.includes("FM Player")}
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
                                    checked={mobileFilterValues.includes("NFC")}
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
                                    checked={mobileFilterValues.includes("Music Player")}
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
                                    checked={mobileFilterValues.includes("Bluetooth")}
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
                                    checked={mobileFilterValues.includes("USB")}
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
                                    checked={mobileFilterValues.includes("GPRS")}
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
                                    checked={mobileFilterValues.includes("Featured Phones")}
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
                                    checked={mobileFilterValues.includes("Smartphones")}
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
                                    checked={mobileFilterValues.includes("Dual Core")}
                                    onChange={filterHandler}
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
                                    checked={mobileFilterValues.includes("Quad Core")}
                                    onChange={filterHandler}
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
                                    checked={mobileFilterValues.includes("Octa Core")}
                                    onChange={filterHandler}
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
                                    checked={mobileFilterValues.includes("Single Core")}
                                    onChange={filterHandler}
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
                                    checked={mobileFilterValues.includes("1GHz-1.9GHz")}
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
                    </>}
                    { sharedSearchResults && <>
                      { (((Array.isArray(sharedSearchResults?.products) && sharedSearchResults?.products[0] && sharedSearchResults?.products[0]?.category === "Laptops")) || (Object.keys(sharedSearchResults).includes("laptops"))) && <div className="card overflow-y-scroll" style={{ maxHeight: "600px"}}>
                            <div className="card-body">
                                <p className="fs-2 fw-medium">Filters</p>
                                <Link className="fs-5 fw-normal" onClick={() => window.location.reload()}>Clear</Link>
                                <hr/>
                                <label className="fs-3 fw-normal">Price</label>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="30000-39999"
                                    name="price"
                                    value="30000-39999"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("30000-39999")}
                                    />
                                    <label htmlFor="30000-39999" className="form-check-label fs-5 fw-normal"><i className="bi bi-currency-rupee"></i>30000-<i className="bi bi-currency-rupee"></i>39999</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="40000-49999"
                                    name="price"
                                    value="40000-49999"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("40000-49999")}
                                    />
                                    <label htmlFor="40000-49999" className="form-check-label fs-5 fw-normal"><i className="bi bi-currency-rupee"></i>40000-<i className="bi bi-currency-rupee"></i>49999</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="50000-59999"
                                    name="price"
                                    value="50000-59999"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("50000-59999")}
                                    />
                                    <label htmlFor="50000-59999" className="form-check-label fs-5 fw-normal"><i className="bi bi-currency-rupee"></i>50000-<i className="bi bi-currency-rupee"></i>59999</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="60000-69999"
                                    name="price"
                                    value="60000-69999"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("60000-69999")}
                                    />
                                    <label htmlFor="60000-69999" className="form-check-label fs-5 fw-normal"><i className="bi bi-currency-rupee"></i>60000-<i className="bi bi-currency-rupee"></i>69999</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="70000-79999"
                                    name="price"
                                    value="70000-79999"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("70000-79999")}
                                    />
                                    <label htmlFor="70000-79999" className="form-check-label fs-5 fw-normal"><i className="bi bi-currency-rupee"></i>70000-<i className="bi bi-currency-rupee"></i>79999</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="80000-89999"
                                    name="price"
                                    value="80000-89999"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("80000-89999")}
                                    />
                                    <label htmlFor="80000-89999" className="form-check-label fs-5 fw-normal"><i className="bi bi-currency-rupee"></i>80000-<i className="bi bi-currency-rupee"></i>89999</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="90000-99999"
                                    name="price"
                                    value="90000-99999"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("90000-99999")}
                                    />
                                    <label htmlFor="90000-99999" className="form-check-label fs-5 fw-normal"><i className="bi bi-currency-rupee"></i>90000-<i className="bi bi-currency-rupee"></i>99999</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="100000-149999"
                                    name="price"
                                    value="100000-149999"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("100000-149999")}
                                    />
                                    <label htmlFor="100000-149999" className="form-check-label fs-5 fw-normal"><i className="bi bi-currency-rupee"></i>100000-<i className="bi bi-currency-rupee"></i>149999</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="150000-199999"
                                    name="price"
                                    value="150000-199999"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("150000-199999")}
                                    />
                                    <label htmlFor="150000-199999" className="form-check-label fs-5 fw-normal"><i className="bi bi-currency-rupee"></i>150000-<i className="bi bi-currency-rupee"></i>199999</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="200000-500000"
                                    name="price"
                                    value="200000-500000"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("200000-500000")}
                                    />
                                    <label htmlFor="200000-500000" className="form-check-label fs-5 fw-normal"><i className="bi bi-currency-rupee"></i>200000 and above</label>
                                </div>
                                <hr/>
                                <label className="fs-3 fw-normal">Brand</label>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="hp"
                                    name="brand"
                                    value="HP"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("HP")}
                                    />
                                    <label htmlFor="hp" className="fs-5 fw-normal form-check-label">HP</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="dell"
                                    name="brand"
                                    value="Dell"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("Dell")}
                                    />
                                    <label htmlFor="dell" className="fs-5 fw-normal form-check-label">Dell</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="lenovo"
                                    name="brand"
                                    value="Lenovo"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("Lenovo")}
                                    />
                                    <label htmlFor="lenovo" className="fs-5 fw-normal form-check-label">Lenovo</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="accer"
                                    name="brand"
                                    value="Accer"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("Accer")}
                                    />
                                    <label htmlFor="accer" className="fs-5 fw-normal form-check-label">Accer</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="asus"
                                    name="brand"
                                    value="Asus"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("Asus")}
                                    />
                                    <label htmlFor="asus" className="fs-5 fw-normal form-check-label">Asus</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="msi"
                                    name="brand"
                                    value="MSI"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("MSI")}
                                    />
                                    <label htmlFor="msi" className="fs-5 fw-normal form-check-label">MSI</label>
                                </div>
                                <hr/>
                                <label className="fs-5 fw-normal">Laptop Type</label>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="gaming laptop"
                                    name="laptopType"
                                    value="Gaming Laptop"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("Gaming Laptop")}
                                    />
                                    <label htmlFor="gaming laptop" className="form-check-label fs-5 fw-normal">Gaming Laptop</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="business laptop"
                                    name="laptopType"
                                    value="Business Laptop"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("Business Laptop")}
                                    />
                                    <label htmlFor="business laptop" className="form-check-label fs-5 fw-normal">Business Laptop</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="thin and light laptop"
                                    name="laptopType"
                                    value="Thin and Light Laptop"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("Thin and Light Laptop")}
                                    />
                                    <label htmlFor="thin and light laptop" className="form-check-label fs-5 fw-normal">Thin and Light Laptop</label>
                                </div>
                                <hr/>
                                <label className="fs-5 fw-normal form-label">Processor Type</label>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="core i3"
                                    name="processorType"
                                    value="Core i3"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("Core i3")}
                                    />
                                    <label htmlFor="core i3" className="fs-5 fw-normal form-check-label">Core i3</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="core i5"
                                    name="processorType"
                                    value="Core i5"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("Core i5")}
                                    />
                                    <label htmlFor="core i5" className="fs-5 fw-normal form-check-label">Core i5</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="core i7"
                                    name="processorType"
                                    value="Core i7"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("Core i7")}
                                    />
                                    <label htmlFor="core i7" className="fs-5 fw-normal form-check-label">Core i7</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="core i9"
                                    name="processorType"
                                    value="Core i9"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("Core i9")}
                                    />
                                    <label htmlFor="core i9" className="fs-5 fw-normal form-check-label">Core i9</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="ryzen 5"
                                    name="processorType"
                                    value="Ryzen 5"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("Ryzen 5")}
                                    />
                                    <label htmlFor="ryzen 5" className="fs-5 fw-normal form-check-label">Ryzen 5</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="ryzen 7"
                                    name="processorType"
                                    value="Ryzen 7"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("Ryzen 7")}
                                    />
                                    <label htmlFor="ryzen 7" className="fs-5 fw-normal form-check-label">Ryzen 7</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="ryzen 9"
                                    name="processorType"
                                    value="Ryzen 9"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("Ryzen 9")}
                                    />
                                    <label htmlFor="Ryzen 9" className="fs-5 fw-normal form-check-label">Ryzen 9</label>
                                </div>
                                <hr/>
                                <label className="form-label fs-5 fw-normal">Processor Generation</label>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="1st gen"
                                    name="processorGeneration"
                                    value="1st Gen"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("1st Gen")}
                                    />
                                    <label htmlFor="1st gen" className="fs-5 fw-normal form-check-label">1st Gen</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="2nd gen"
                                    name="processorGeneration"
                                    value="2nd Gen"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("2nd Gen")}
                                    />
                                    <label htmlFor="2nd gen" className="fs-5 fw-normal form-check-label">2nd Gen</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="3rd gen"
                                    name="processorGeneration"
                                    value="3rd Gen"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("3rd Gen")}
                                    />
                                    <label htmlFor="3rd gen" className="fs-5 fw-normal form-check-label">3rd Gen</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="4th gen"
                                    name="processorGeneration"
                                    value="4th Gen"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("4th Gen")}
                                    />
                                    <label htmlFor="4th gen" className="fs-5 fw-normal form-check-label">4th Gen</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="5th gen"
                                    name="processorGeneration"
                                    value="5th Gen"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("5th Gen")}
                                    />
                                    <label htmlFor="5th gen" className="fs-5 fw-normal form-check-label">5th Gen</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="6th gen"
                                    name="processorGeneration"
                                    value="6th Gen"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("6th Gen")}
                                    />
                                    <label htmlFor="6th gen" className="fs-5 fw-normal form-check-label">6th Gen</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="7th gen"
                                    name="processorGeneration"
                                    value="7th Gen"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("7th Gen")}
                                    />
                                    <label htmlFor="7th gen" className="fs-5 fw-normal form-check-label">7th Gen</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="8th gen"
                                    name="processorGeneration"
                                    value="8th Gen"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("8th Gen")}
                                    />
                                    <label htmlFor="8th gen" className="fs-5 fw-normal form-check-label">8th Gen</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="9th gen"
                                    name="processorGeneration"
                                    value="9th Gen"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("9th Gen")}
                                    />
                                    <label htmlFor="9th gen" className="fs-5 fw-normal form-check-label">9th Gen</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="10th gen"
                                    name="processorGeneration"
                                    value="10th Gen"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("10th Gen")}
                                    />
                                    <label htmlFor="10th gen" className="fs-5 fw-normal form-check-label">10th Gen</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="11th gen"
                                    name="processorGeneration"
                                    value="11th Gen"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("11th Gen")}
                                    />
                                    <label htmlFor="11th gen" className="fs-5 fw-normal form-check-label">11th Gen</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="12th gen"
                                    name="processorGeneration"
                                    value="12th Gen"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("12th Gen")}
                                    />
                                    <label htmlFor="12th gen" className="fs-5 fw-normal form-check-label">12th Gen</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="13th gen"
                                    name="processorGeneration"
                                    value="13th Gen"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("13th Gen")}
                                    />
                                    <label htmlFor="13th gen" className="fs-5 fw-normal form-check-label">13th Gen</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="14th gen"
                                    name="processorGeneration"
                                    value="14th Gen"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("14th Gen")}
                                    />
                                    <label htmlFor="14th gen" className="fs-5 fw-normal form-check-label">14th Gen</label>
                                </div>
                                <hr/>
                                <label className="fs-3 fw-normal form-label">Processor Brand</label>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="intel"
                                    name="processorBrand"
                                    value="Intel"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("Intel")}
                                    />
                                    <label htmlFor="intel" className="form-check-label fs-5 fw-normal">Intel</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="amd"
                                    name="processorBrand"
                                    value="AMD"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("AMD")}
                                    />
                                    <label htmlFor="amd" className="form-check-label fs-5 fw-normal">AMD</label>
                                </div>
                                <hr/>
                                <label className="form-label fs-3 fw-normal">Ram Capacity</label>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="4gb"
                                    name="ramCapacity"
                                    value={4}
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes(4)}
                                    />
                                    <label htmlFor="4gb" className="form-check-label fs-5 fw-normal">4 GB</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="8gb"
                                    name="ramCapacity"
                                    value={8}
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes(8)}
                                    />
                                    <label htmlFor="8gb" className="form-check-label fs-5 fw-normal">8 GB</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="16gb"
                                    name="ramCapacity"
                                    value={16}
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes(16)}
                                    />
                                    <label htmlFor="16gb" className="form-check-label fs-5 fw-normal">16 GB</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="32gb"
                                    name="ramCapacity"
                                    value={32}
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes(32)}
                                    />
                                    <label htmlFor="32gb" className="form-check-label fs-5 fw-normal">32 GB</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="64gb"
                                    name="ramCapacity"
                                    value={64}
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes(64)}
                                    />
                                    <label htmlFor="64gb" className="form-check-label fs-5 fw-normal">64 GB</label>
                                </div>
                                <hr/>
                                <label className="form-label fs-3 fw-normal">RAM Type</label>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="ddr4"
                                    name="ramType"
                                    value="DDR4"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("DDR4")}
                                    />
                                    <label htmlFor="ddr4" className="form-check-label fs-5 fw-normal">DDR4</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="lpddr4"
                                    name="ramType"
                                    value="LPDDR4"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("LPDDR4")}
                                    />
                                    <label htmlFor="lpddr4" className="form-check-label fs-5 fw-normal">LPDDR4</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="ddr3"
                                    name="ramType"
                                    value="DDR3"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("DDR3")}
                                    />
                                    <label htmlFor="ddr3" className="form-check-label fs-5 fw-normal">DDR3</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="lpddr5x"
                                    name="ramType"
                                    value="LPDDR5X"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("LPDDR5X")}
                                    />
                                    <label htmlFor="lpddr5x" className="form-check-label fs-5 fw-normal">LPDDR5X</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="lpddr4x"
                                    name="ramType"
                                    value="LPDDR4X"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("LPDDR4X")}
                                    />
                                    <label htmlFor="lpddr4x" className="form-check-label fs-5 fw-normal">LPDDR4X</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="ddr5"
                                    name="ramType"
                                    value="DDR5"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("DDR5")}
                                    />
                                    <label htmlFor="ddr5" className="form-check-label fs-5 fw-normal">DDR5</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="lpddr5"
                                    name="ramType"
                                    value="LPDDR5"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("LPDDR5")}
                                    />
                                    <label htmlFor="lpddr5" className="form-check-label fs-5 fw-normal">LPDDR5</label>
                                </div>
                                <hr/>
                                <label className="form-label fs-3 fw-normal">Storage Capacity</label>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="512gb"
                                    name="storageCapacity"
                                    value={512}
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes(512)}
                                    />
                                    <label htmlFor="512gb" className="form-check-label fs-5 fw-normal">512 GB</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="1tb"
                                    name="storageCapacity"
                                    value={1000}
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes(1000)}
                                    />
                                    <label htmlFor="1tb" className="form-check-label fs-5 fw-normal">1 TB</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="2 tb"
                                    name="storageCapacity"
                                    value={2000}
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes(2000)}
                                    />
                                    <label htmlFor="2tb" className="form-check-label fs-5 fw-normal">2000 GB</label>
                                </div>
                                <hr/>
                                <label className="form-label fs-3 fw-normal">Storage Type</label>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="ssd"
                                    name="storageType"
                                    value="SSD"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("SSD")}
                                    />
                                    <label htmlFor="ssd" className="form-check-label fs-5 fw-normal">SSD</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="hdd"
                                    name="storageType"
                                    value="HDD"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("HDD")}
                                    />
                                    <label htmlFor="hdd" className="form-check-label fs-5 fw-normal">HDD</label>
                                </div>
                                <hr/>
                                <label className="fs-3 fw-normal">Screen Size</label>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="13inch-13.9inch"
                                    name="screenSize"
                                    value="13-13.9"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("13-13.9")}
                                    />
                                    <label htmlFor="13inch-13.9inch" className="form-label fs-5 fw-normal">13inch-13.9inch</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="14inch-14.9inch"
                                    name="screenSize"
                                    value="14-14.9"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("14-14.9")}
                                    />
                                    <label htmlFor="14inch-14.9inch" className="form-label fs-5 fw-normal">14inch-14.9inch</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="15inch-15.9inch"
                                    name="screenSize"
                                    value="15-15.9"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("15-15.9")}
                                    />
                                    <label htmlFor="15inch-15.9inch" className="form-label fs-5 fw-normal">15inch-15.9inch</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="16inch-20inch"
                                    name="screenSize"
                                    value="16-20"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("16-20")}
                                    />
                                    <label htmlFor="16inch-20inch" className="form-label fs-5 fw-normal">16inch and above</label>
                                </div>
                                <hr/>
                                <label className="form-label fs-3 fw-normal">Operating System</label>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="windows 10"
                                    name="operatingSystem"
                                    value="Windows 10"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("Windows 10")}
                                    />
                                    <label htmlFor="windows 10" className="form-check-label fs-5 fw-normal">Windows 10</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="windows 11"
                                    name="operatingSystem"
                                    value="Windows 11"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("Windows 11")}
                                    />
                                    <label htmlFor="windows 11" className="form-check-label fs-5 fw-normal">Windows 11</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="windows 11 home"
                                    name="operatingSystem"
                                    value="Windows 11 Home"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("Windows 11 Home")}
                                    />
                                    <label htmlFor="windows 11 home" className="form-check-label fs-5 fw-normal">Windows 11 Home</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="macos"
                                    name="operatingSystem"
                                    value="Mac OS"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("Mac OS")}
                                    />
                                    <label htmlFor="macos" className="form-check-label fs-5 fw-normal">Mac OS</label>
                                </div>
                                <hr/>
                                <label className="form-label fs-5 fw-normal">Weight</label>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="1.2kg-1.5kg"
                                    name="weight"
                                    value="1.2-1.5"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("1.2-1.5")}
                                    />
                                    <label htmlFor="1.2kg-1.5kg" className="form-check-label fs-5 fw-normal">1.2KG-1.5KG</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="1.6kg-1.8kg"
                                    name="weight"
                                    value="1.6-1.8"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("1.6-1.8")}
                                    />
                                    <label htmlFor="1.6kg-1.8kg" className="form-check-label fs-5 fw-normal">1.6KG-1.8KG</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="1.9kg-2.1kg"
                                    name="weight"
                                    value="1.9-2.1"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("1.9-2.1")}
                                    />
                                    <label htmlFor="1.9kg-2.1kg" className="form-check-label fs-5 fw-normal">1.9KG-2.1KG</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="2.2kg-2.6kg"
                                    name="weight"
                                    value="2.2-2.6"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("2.2-2.6")}
                                    />
                                    <label htmlFor="2.2kg-2.6kg" className="form-check-label fs-5 fw-normal">2.2KG-2.6KG</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="2.6kg-5kg"
                                    name="weight"
                                    value="2.6-5"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("2.6-5")}
                                    />
                                    <label htmlFor="2.6kg-5kg" className="form-check-label fs-5 fw-normal">2.6KG and above</label>
                                </div>
                                <hr/>
                                <label className="form-label fs-3 fw-normal">Touch Screen</label>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="yes"
                                    name="isTouchScreen"
                                    value={true}
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes(true)}
                                    />
                                    <label htmlFor="yes" className="form-check-label fs-5 fw-normal">Yes</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="no"
                                    name="isTouchScreen"
                                    value={false}
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes(false)}
                                    />
                                    <label htmlFor="no" className="form-check-label fs-5 fw-normal">No</label>
                                </div>
                                <hr/>
                                <label className="form-label fs-3 fw-normal">Usage</label>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="gaming"
                                    name="usage"
                                    value="Gaming"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("Gaming")}
                                    />
                                    <label htmlFor="gaming" className="form-check-label fs-5 fw-normal">Gaming</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="business"
                                    name="usage"
                                    value="Business"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("Business")}
                                    />
                                    <label htmlFor="business" className="form-check-label fs-5 fw-normal">Business</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="student"
                                    name="usage"
                                    value="Student"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("Student")}
                                    />
                                    <label htmlFor="student" className="form-check-label fs-5 fw-normal">Student</label>
                                </div>
                                <hr/>
                                <label className="form-label fs-3 fw-normal">Graphics Memory Capacity</label>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="4-gb"
                                    name="graphicsMemoryCapacity"
                                    value={4}
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes(4)}
                                    />
                                    <label htmlFor="4-gb" className="form-check-label fs-5 fw-normal">4 GB</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="6-gb"
                                    name="graphicsMemoryCapacity"
                                    value={6}
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes(6)}
                                    />
                                    <label htmlFor="6-gb" className="form-check-label fs-5 fw-normal">6 GB</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="8-gb"
                                    name="graphicsMemoryCapacity"
                                    value={8}
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes(8)}
                                    />
                                    <label htmlFor="8-gb" className="form-check-label fs-5 fw-normal">8 GB</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="12-gb"
                                    name="graphicsMemoryCapacity"
                                    value={12}
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes(12)}
                                    />
                                    <label htmlFor="12-gb" className="form-check-label fs-5 fw-normal">12 GB</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="16-gb"
                                    name="graphicsMemoryCapacity"
                                    value={16}
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes(16)}
                                    />
                                    <label htmlFor="16-gb" className="form-check-label fs-5 fw-normal">16 GB</label>
                                </div>
                                <hr/>
                                <label className="form-label fs-3 fw-normal">Graphics Memory Type</label>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="lpddr5"
                                    name="graphicsMemoryType"
                                    value="LPDDR5"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("LPDDR5")}
                                    />
                                    <label htmlFor="lpddr5" className="form-check-label fs-5 fw-normal">LPDDR5</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="ddr5"
                                    name="graphicsMemoryType"
                                    value="DDR5"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("DDR5")}
                                    />
                                    <label htmlFor="ddr5" className="form-check-label fs-5 fw-normal">DDR5</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="ddr4"
                                    name="graphicsMemoryType"
                                    value="DDR4"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("DDR4")}
                                    />
                                    <label htmlFor="ddr4" className="form-check-label fs-5 fw-normal">DDR4</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="gddr5"
                                    name="graphicsMemoryType"
                                    value="GDDR5"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("GDDR5")}
                                    />
                                    <label htmlFor="gddr5" className="form-check-label fs-5 fw-normal">GDDR5</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="gddr6"
                                    name="graphicsMemoryType"
                                    value="GDDR6"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("GDDR6")}
                                    />
                                    <label htmlFor="gddr6" className="form-check-label fs-5 fw-normal">GDDR6</label>
                                </div>
                                <hr/>
                                <label className="form-label fs-3 fw-normal">Graphics Processor Name</label>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="intel integrated"
                                    name="graphicsProcessorName"
                                    value="Intel Integrated"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("Intel Integrated")}
                                    />
                                    <label htmlFor="intel integrated" className="form-check-label fs-5 fw-normal">Intel Integrated</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="amd radeon"
                                    name="graphicsProcessorName"
                                    value="amd radeon"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("amd radeon")}
                                    />
                                    <label htmlFor="amd radeon" className="form-check-label fs-5 fw-normal">AMD Radeon</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="nvidia geforce rtx"
                                    name="graphicsProcessorName"
                                    value="NVIDIA GeForce RTX"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("NVIDIA GeForce RTX")}
                                    />
                                    <label htmlFor="nvidia geforce rtx" className="form-check-label fs-5 fw-normal">NVIDIA GeForce RTX</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="amd radeon rdna 3"
                                    name="graphicsProcessorName"
                                    value="AMD Radeon RDNA 3"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("AMD Radeon RDNA 3")}
                                    />
                                    <label htmlFor="amd radeon rdna 3" className="form-check-label fs-5 fw-normal">AMD Radeon RDNA 3</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="nvidia quadro"
                                    name="graphicsProcessorName"
                                    value="NVIDIA Quadro"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("NVIDIA Quadro")}
                                    />
                                    <label htmlFor="nividia quadro" className="form-check-label fs-5 fw-normal">NVIDIA Quadro</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="qualcomm adreno"
                                    name="graphicsProcessorName"
                                    value="Qualcomm Adreno"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("Qualcomm Adreno")}
                                    />
                                    <label htmlFor="qualcomm adreno" className="form-check-label fs-5 fw-normal">Qualcomm Adreno</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="mediatek integrated"
                                    name="graphicsProcessorName"
                                    value="MediaTek Integrated"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("MediaTek Integrated")}
                                    />
                                    <label htmlFor="mediatek integrated" className="form-check-label fs-5 fw-normal">MediaTek Integrated</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="qualcomm"
                                    name="graphicsProcessorName"
                                    value="Qualcomm"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("Qualcomm")}
                                    />
                                    <label htmlFor="qualcomm" className="form-check-label fs-5 fw-normal">Qualcomm</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="nvidia geforce"
                                    name="graphicsProcessorName"
                                    value="NVIDIA GeForce"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("NVIDIA GeForce")}
                                    />
                                    <label htmlFor="nvidia geforce" className="form-check-label fs-5 fw-normal">NVIDIA GeForce</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="nvidia geforce gtx"
                                    name="graphicsProcessorName"
                                    value="NVIDIA GeForce GTX"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("NVIDIA GeForce GTX")}
                                    />
                                    <label htmlFor="nvidia geforce gtx" className="form-check-label fs-5 fw-normal">NVIDIA Geforce GTX</label>
                                </div>
                                <hr/>
                                <label className="form-label fs-3 fw-normal">Features</label>
                                <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="backlit-keyboard"
                                    name="features"
                                    value="Backlit Keyboard"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("Backlit Keyboard")}
                                    />
                                    <label htmlFor="backlit-keyboard" className="form-check-label fs-5 fw-normal">Backlit Keyboard</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="full-hd-display"
                                    name="features"
                                    value="Full HD Display"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("Full HD Display")}
                                    />
                                    <label htmlFor="full-hd-display" className="form-check-label fs-5 fw-normal">Full HD Display</label>
                                </div>
                                 <div className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="ms-office"
                                    name="features"
                                    value="MS Office"
                                    onChange={laptopsFilterHandler}
                                    checked={laptopFilterValues.includes("MS Office")}
                                    />
                                    <label htmlFor="ms-office" className="form-check-label fs-5 fw-normal">MS Office</label>
                                </div>
                            </div>
                        </div>}
                    </>}
                </div>
                <div className="col">
                    {(mobileFilterValues.length === 0 && laptopFilterValues.length === 0 && sharedSearchResults?.products[0].category === "Mobiles") && <ul className="list-group py-4">
                           {sharedSearchResults?.products.map((obj) => {
                            return (
                                <Link className="link-offset-2 link-underline link-underline-opacity-0" key={obj._id} to={`/productDetails/mobiles/${obj._id}`}>
                                   <li className="list-group-item" key={obj._id}>
                                        <div className="row d-flex justify-content-between">
                                           <div className="col-md-4">
                                              <img src={obj.thumbnailImage} className="img-fluid" style={{ width: "200px", height: "200px"}}/>
                                           </div>
                                           <div className="col">
                                              <p className="fs-4 fw-medium">{obj.generalFeatures.name}</p>
                                              <p className="fs-5 fw-medium" style={{ color: "grey"}}>{obj.ratings} Ratings & {obj.reviews} Reviews</p>
                                              <span className="badge text-bg-success"><i className="bi bi-star-fill"></i>{obj.averageRating}</span>
                                              <ul style={{ color: "grey"}}>
                                                  <li className="fs-6 fw-normal">{obj.generalFeatures.ram} GB | {obj.generalFeatures.internalStorage.join(", ")}</li>
                                                  <li className="fs-6 fw-normal">{obj.displayFeatures.attributes["Display Size"]} {obj.displayFeatures.attributes["Resolution Type"]}</li>
                                                  <li className="fs-6 fw-normal">{obj.cameraFeatures.attributes["Primary Camera"]} | {obj.cameraFeatures.attributes["Secondary Camera"]}</li>
                                                  <li className="fs-6 fw-normal">{obj.generalFeatures.batteryCapacity} mAh</li>
                                                  <li className="fs-6 fw-normal">{obj.generalFeatures.processorBrand} Processor</li>
                                                  <li className="fs-6 fw-normal">{obj.warranty.warrantySummary}</li>
                                                </ul>
                                           </div>
                                           <div className="col">
                                            <p className="fs-5 fw-medium"><i className="bi bi-currency-rupee"></i>{obj.discountedPrice}</p>
                                            <div className="d-flex">
                                                <p className="fs-normal" style={{ color: "grey"}}><del><i className="bi bi-currency-rupee"></i>{obj.orignalPrice}</del></p>
                                                <p className="fs-normal ms-5" style={{ color: "green"}}>{obj.discount}% Off</p>
                                            </div>
                                           </div>
                                        </div>
                                    </li>
                                </Link>
                            )
                           })}
                        </ul>}
                        {(mobileFilterValues.length === 0 && laptopFilterValues.length === 0 && sharedSearchResults?.products[0].category === "Laptops") && <ul className="list-group">
                               {sharedSearchResults?.products?.map((obj) => {
                                return (
                                    <Link className="link-offset-2 link-underline link-underline-opacity-0" key={obj._id} to={`/productDetails/laptops/${obj._id}`}>
                                       <li className="list-group-item">
                                        <div className="row d-flex justify-content-between">
                                            <div className="col-md-4">
                                                <img src={obj.thumbnailImage} className="img-fluid" style={{ width: "200px", height: "200px"}}/>
                                            </div>
                                            <div className="col">
                                                <p className="fs-4 fw-medium">{obj.generalFeatures.name}</p>
                                                <p className="fs-5 fw-medium">{obj.ratings} Ratings & {obj.reviews} Reviews</p>
                                                <span className="badge text-bg-success"><i className="bi bi-star-fill"></i>{obj.averageRating}</span>
                                                <ul style={{ color: "grey"}}>
                                                    {obj.highlights.map((ele) => {
                                                        return (
                                                            <li className="fw-normal">{ele.highlightName}</li>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                            <div className="col">
                                                <p className="fs-5 fw-medium"><i className="bi bi-currency-rupee"></i>{obj.discountedPrice}</p>
                                                <div className="d-flex">
                                                  <p className="fs-normal" style={{ color: "grey"}}><del><i className="bi bi-currency-rupee"></i>{obj.orignalPrice}</del></p>
                                                  <p className="fs-normal ms-5" style={{ color: "green"}}>{obj.discount}% Off</p>
                                                </div>
                                            </div>
                                        </div>
                                       </li>
                                    </Link>
                                )
                               })}
                            </ul>}
                            {sharedSearchResults && <>
                              {(mobileFilterValues.length > 0 && Object.keys(sharedSearchResults).includes("mobiles")) && <ul className="list-group">
                                   {sharedSearchResults?.mobiles?.map((obj) => {
                                    return (
                                        <Link className="link-offset-2 link-underline link-underline-opacity-0" key={obj._id} to={`/productDetails/mobiles/${obj._id}`}>
                                            <li className="list-group-item">
                                                <div className="row d-flex justify-content-between">
                                                    <div className="col-md-4">
                                                        <img src={obj.thumbnailImage} className="img-fluid" style={{ width: "200px", height: "200px" }}/>
                                                    </div>
                                                    <div className="col">
                                                        <p className="fs-4 fw-medium">{obj.generalFeatures.name}</p>
                                                        <p className="fs-5 fw-medium" style={{ color: "grey"}}>{obj.ratings} Ratings & {obj.reviews} Reviews</p>
                                                        <span className="badge text-bg-success"><i className="bi bi-star-fill"></i>{obj.averageRating}</span>
                                                        <ul style={{ color: "grey"}}>
                                                            <li className="fs-6 fw-normal">{obj.generalFeatures.ram} GB | {obj.generalFeatures.internalStorage.join(", ")}</li>
                                                            <li className="fs-6 fw-normal">{obj.displayFeatures.attributes["Display Size"]} {obj.displayFeatures.attributes["Resolution Type"]}</li>
                                                            <li className="fs-6 fw-normal">{obj.cameraFeatures.attributes["Primary Camera"]} | {obj.cameraFeatures.attributes["Secondary Camera"]}</li>
                                                            <li className="fs-6 fw-normal">{obj.generalFeatures.batteryCapacity} mAh</li>
                                                            <li className="fs-6 fw-normal">{obj.generalFeatures.processorBrand} Processor</li>
                                                            <li className="fs-6 fw-normal">{obj.warranty.warrantySummary}</li>
                                                        </ul>
                                                    </div>
                                                    <div className="col">
                                                        <p className="fs-5 fw-medium">{obj.discountedPrice}</p>
                                                        <div className="d-flex">
                                                            <p className="fs-5 fw-normal" style={{ color: "grey"}}><del><i className="bi bi-currency-rupee"></i>{obj.orignalPrice}</del></p>
                                                            <p className="fs-5 fw-normal ms-5" style={{ color: "green"}}>{obj.discount}% Off</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </Link>
                                    )
                                   })}
                                </ul>}
                                {(laptopFilterValues.length > 0 && Object.keys(sharedSearchResults).includes("laptops")) && <ul className="list-group">
                                      {sharedSearchResults?.laptops?.map((obj) => {
                                        return (
                                            <Link className="link-offset-2 link-underline link-underline-opacity-0" key={obj._id} to={`/productDetails/laptops/${obj._id}`}>
                                                <li className="list-group-item">
                                                    <div className="row d-flex justify-content-between">
                                                        <div className="col-md-4">
                                                            <img src={obj.thumbnailImage} className="img-fluid" style={{ width: "200px", height: "200px"}}/>
                                                        </div>
                                                        <div className="col">
                                                            <p className="fs-4 fw-medium">{obj.generalFeatures.name}</p>
                                                            <p className="fs-5 fw-medium" style={{ color: "grey"}}>{obj.ratings} Ratings & {obj.reviews} Reviews</p>
                                                            <span className="badge text-bg-success"><i className="bi bi-star-fill"></i>{obj.averageRating}</span>
                                                            <ul style={{ color: "grey"}}>
                                                                {obj.highlights.map((ele) => {
                                                                    return (
                                                                        <li className="fw-normal" key={ele.id}>{ele.highlightName}</li>
                                                                    )
                                                                })}
                                                            </ul>
                                                        </div>
                                                        <div className="col">
                                                            <p className="fs-5 fw-medium"><i className="bi bi-currency-rupee"></i>{obj.discountedPrice}</p>
                                                            <div className="d-flex">
                                                                <p className="fs-5 fw-normal" style={{ color: "grey"}}><del><i className="bi bi-currency-rupee"></i>{obj.orignalPrice}</del></p>
                                                                <p className="fs-5 fw-normal ms-5" style={{ color: "green"}}>{obj.discount}% Off</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </Link>
                                        )
                                      })}
                                    </ul>}
                            </>}
                </div>
            </div>
        </div>
    )
}

const DisplaySearchProducts = () => {
    const [cart, setCart] = useState(null);
    const [wishlist, setWishlist] = useState(null);
    const [inputQuery, setInputQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [searchResults, setSearchResults] = useState(null);

    const searchBtnHandler = async () => {
        setLoading(true);
        try {
            let response = await fetch(`https://tech-mart-backend-five.vercel.app/search?q=${inputQuery}`);
            if (! response.ok) {
                throw new Error("failed to fetch search results");
            }
            let responseData = await response.json();
            setSearchResults(responseData);
            setLoading(false);
        } catch(error) {
            console.error('Error: ', error);
        }
    }

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
                throw new Error("failed to fetch wishlist details");
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

    useEffect(() => {
        setLoading(true);
        const fetchSearchResults = async () => {
            try {
                let response = await fetch(`https://tech-mart-backend-five.vercel.app/search?q=${JSON.parse(sessionStorage.getItem("inputQuery"))}`);
                if (! response.ok) {
                    throw new Error("failed to fetch search results");
                }
                let responseData = await response.json();
                setSearchResults(responseData);
                setLoading(false); 
            } catch(error) {
                console.error('Error: ', error)
            }
        }
        fetchSearchResults();
    }, []);

    console.log(searchResults)

    return (
        <div>
            <Header sharedCart={cart} sharedWishlist={wishlist} sharedInputQuery={inputQuery} setSharedInputQuery={setInputQuery} searchBtnHandler={searchBtnHandler}/>
            <SearchProducts sharedLoading={loading} setSharedLoading={setLoading} sharedSearchResults={searchResults} setSharedSearchResults={setSearchResults}/>
        </div>
    )
}

export default DisplaySearchProducts