import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import qs from "qs"
import Header from "./components/Header";

const Products = ({ sharedAscOrderProducts, setSharedAscOrderProducts, sharedDescOrderProducts, setSharedDescOrderProducts}) => {

    const { category } = useParams();
    const { brand } = useParams();
    const[products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterValues, setFilterValues] = useState([]);
    const [enableFilterCriteria, setEnableFilterCriteria] = useState("");
    const [laptopFilterValues, setLaptopFilterValues] = useState([]);
    const [laptopFilterEnableCriteria, setLaptopEnableFilterCriteria] = useState(null);
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


    const filterHandler = (event) => {
        if (event.target.checked) {
            setFilter((prevFilter) => ({
                ...prevFilter, [event.target.name]: [...prevFilter[event.target.name], event.target.value]
            }));
            setProducts(null);
            setFilterValues((prevArray) => [...prevArray, event.target.value]);
            setEnableFilterCriteria(Date.now());
        } else {
            setFilter((prevFilter) => ({
                ...prevFilter, [event.target.name]: prevFilter[event.target.name].filter((ele) => ele !== event.target.value)
            }));
            setProducts(null);
            setFilterValues((prevArray) => prevArray.filter((value) => value !== event.target.value));
            setEnableFilterCriteria(Date.now());
        }
    }

    const laptopsFilterHandler = (event) => {
        if (event.target.checked) {
            setLaptopFilters((prevFilter) => ({
                ...prevFilter, [event.target.name]: [...prevFilter[event.target.name], event.target.value]
            }));
            setProducts(null);
            setLaptopFilterValues((prevArray) => [...prevArray, event.target.value]);
            setLaptopEnableFilterCriteria(Date.now());
        } else {
            setLaptopFilters((prevFilter) => ({
                ...prevFilter, [event.target.name]: prevFilter[event.target.name].filter((ele) => ele !== event.target.value)
            }));
            setProducts(null);
            setLaptopFilterValues((prevArray) => prevArray.filter((value) => value !== event.target.value));
            setLaptopEnableFilterCriteria(Date.now());
        }
    }

    const lowToHighSortHandler = (event) => {
        if (category === "mobiles") {
            let shallowCopy = products.mobiles.slice();
            shallowCopy.sort((obj1, obj2) => obj1.discountedPrice - obj2.discountedPrice);
            if (event.target.checked) {
                setSharedAscOrderProducts((prevArray) => [...prevArray, ...shallowCopy]);
                setSharedDescOrderProducts([]);
            }
        } else if (category === "laptops") {
            let shallowCopy = products.laptops.slice();
            shallowCopy.sort((obj1, obj2) => obj1.discountedPrice - obj2.discountedPrice);
            if (event.target.checked) {
                setSharedAscOrderProducts((prevArray) => [...prevArray, ...shallowCopy]);
                setSharedDescOrderProducts([]);
            }
        }
    }

    const highToLowSortHandler = (event) => {
        if (category === "mobiles") {
            let shallowCopy = products.mobiles.slice();
            shallowCopy.sort((obj1, obj2) => obj2.discountedPrice - obj1.discountedPrice)
            if (event.target.checked) {
                setSharedDescOrderProducts((prevArray) => [...prevArray, ...shallowCopy]);
                setSharedAscOrderProducts([]);
            }
        } else if (category === "laptops") {
            let shallowCopy = products.laptops.slice();
            shallowCopy.sort((obj1, obj2) => obj2.discountedPrice - obj1.discountedPrice);
            if (event.target.checked) {
                setSharedDescOrderProducts((prevArray) => [...prevArray, ...shallowCopy]);
                setSharedAscOrderProducts([]);
            }
        }
    }

    const unsortHandler = (event) => {
        if (event.target.checked) {
            setSharedAscOrderProducts([]);
            setSharedDescOrderProducts([]);
        }
    }

    

    useEffect(() => {
        if (category === "mobiles" && filterValues.length === 0) {
            if (brand === "all") {
                setLoading(true);
                setError(null);
                setProducts(null);
                fetch("https://tech-mart-backend-five.vercel.app/mobiles")
                .then((response) => {
                    if (! response.ok) {
                        throw new Error("Failed to fetch data");
                    }
                    return response.json();
                }).then((responseData) => {
                    setProducts(responseData)
                })
                .catch(() => {
                    setError(error.message);
                })
                .finally(() => {
                    setLoading(false)
                })
            } else {
                setLoading(true);
                setError(null);
                fetch(`https://tech-mart-backend-five.vercel.app/mobiles/brand/${brand}`)
                .then((response) => {
                    if (! response.ok) {
                        throw new Error("Failed to fetch data");
                    }
                    return response.json()
                })
                .then((responseData) => {
                    setProducts(responseData);
                })
                .catch((error) => {
                    setError(error.message)
                })
                .finally(() => {
                    setLoading(false)
                })
            }
        } else if (category === "laptops" && laptopFilterValues.length === 0) {
            if (brand === "all") {
                setProducts(null);
                setLoading(true);
                setError(null);
                fetch("https://tech-mart-backend-five.vercel.app/laptops")
                .then((response) => {
                    if (! response.ok) {
                        throw new Error("Failed to fetch data");
                    }
                    return response.json();
                })
                .then((responseData) => {
                    setProducts(responseData);
                })
                .catch((error) => {
                    setError(error.message);
                })
                .finally(() => {
                    setLoading(false)
                })
            } else {
                setLoading(true);
                setError(null);
                fetch(`https://tech-mart-backend-five.vercel.app/laptops/brand/${brand}`)
                .then((response) => {
                    if (! response.ok) {
                        throw new Error("Failed to fetch data");
                    }
                    return response.json();
                })
                .then((responseData) => {
                    setProducts(responseData);
                })
                .catch((error) => {
                    setError(error.message);
                })
                .finally(() => {
                    setLoading(false);
                })
            }
        }
    }, [category, brand, enableFilterCriteria, laptopFilterEnableCriteria])
    
    useEffect(() => {
        if (category === "mobiles" && filterValues.length > 0) {
            setLoading(true);
            setError(null)
            axios.get("https://tech-mart-backend-five.vercel.app/mobiles/filter", {
                params: filter,
                paramsSerializer: (params => qs.stringify(params, { arrayFormat: "repeat" }))
            })
            .then((res) => {
                setProducts(res.data);
                console.log(res.data);
            })
            .catch((error) => {
                setError(error.message)
            })
            .finally(() => {
                setLoading(false);
            })
        } else if (category === "laptops" && laptopFilterValues.length > 0) {
            setLoading(true);
            setError(null);
            axios.get("https://tech-mart-backend-five.vercel.app/laptops/filter", {
                params: laptopFilters,
                paramsSerializer: (params => qs.stringify(params, { arrayFormat: "repeat" }))
            })
            .then((res) => {
                setProducts(res.data)
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            })
        }
    }, [enableFilterCriteria, filter, laptopFilterEnableCriteria, laptopFilters])


    return (
        <div>
            <div className="ms-4 mt-4">
                <div className="row">
                    <div className="col-md-3">
                        { category === "mobiles" && <div className="card">

                            <div className="card-body overflow-y-scroll" style={{ maxHeight: '600px' }}>
                                <label className="fs-4 fw-medium form-label">Sort By Price</label>
                                 <div className="form-check">
                            <input
                            type="radio"
                            className="form-check-input"
                            id="low to high"
                            name="sort"
                            onChange={lowToHighSortHandler}
                            />
                            <label htmlFor="low to high" className="form-check-label fs-5 fw-normal">low to high</label>
                        </div>
                        <div className="form-check">
                            <input
                            type="radio"
                            className="form-check-input"
                            id="high to low"
                            name="sort"
                            onChange={highToLowSortHandler}
                            />
                            <label htmlFor="high to low" className="form-check-label fs-5 fw-normal">high to low</label>
                        </div>
                        <div className="form-check">
                            <input
                            type="radio"
                            className="form-check-input"
                            id="unsort"
                            name="sort"
                            onChange={unsortHandler}
                            />
                            <label htmlFor="unsort" className="form-check-label fs-5 fw-normal">unsort</label>
                        </div>
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
                                    />
                                    <label htmlFor="0-9999" className="form-check-label fs-5 fw-normal"><i className="bi bi-currency-rupee"></i>0-<i className="bi bi-currency-rupee"></i>9999</label>
                                    <br/>
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="price"
                                    id="10000-19999"
                                    value="10000-19999"
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
                        {category === "laptops" && <div className="card">
                              <div className="card-body overflow-y-scroll" style={{ maxHeight: "600px"}}>
                                <label className="form-label fs-4 fw-medium">Sort By Price</label>
                                 <div className="form-check">
                            <input
                            type="radio"
                            className="form-check-input"
                            id="low to high"
                            name="sort"
                            onChange={lowToHighSortHandler}
                            />
                            <label htmlFor="low to high" className="form-check-label fs-5 fw-normal">low to high</label>
                        </div>
                        <div className="form-check">
                            <input
                            type="radio"
                            className="form-check-input"
                            id="high to low"
                            name="sort"
                            onChange={highToLowSortHandler}
                            />
                            <label htmlFor="high to low" className="form-check-label fs-5 fw-normal">high to low</label>
                        </div>
                        <div className="form-check">
                            <input
                            type="radio"
                            className="form-check-input"
                            id="unsort"
                            name="sort"
                            onChange={unsortHandler}
                            />
                            <label htmlFor="unsort" className="form-check-label fs-5 fw-normal">unsort</label>
                        </div>
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
                                    />
                                    <label htmlFor="ms-office" className="form-check-label fs-5 fw-normal">MS Office</label>
                                </div>
                              </div>
                            </div>}
                    </div>
                    <div className="col position-relative">
                        <label className="form-label fs-5 fw-medium">Sort By Price:</label>
                        
                       {loading && <div className="position-absolute top-50 start-50 translate-middle">
                          <div className="spinner-border text-primary" role="status"></div>
                        </div>}
                        {error && <p className="fs-5 fw-normal">{error}</p>}
                        {products && <div>
                              {Object.keys(products).includes("mobiles") && <div>
                               
                                  {(sharedAscOrderProducts.length === 0 && sharedDescOrderProducts.length === 0) && <ul className="list-group py-4">
                                    {products.mobiles.map((ele) => {
                                        return (
                                            <li className="list-group-item" key={ele._id}>
                                                <Link className="link-offset-2 link-underline link-underline-opacity-0" to={`/productDetails/mobiles/${ele._id}`}>
                                                   <div className="row">
                                                    <div className="col-md-2">
                                                        <img src={ele.thumbnailImage} className="img-fluid mt-4" style={{ height: "200px", width: "200px"}}/>
                                                    </div>
                                                    <div className="col-md-6 py-4 ms-5">
                                                        <div>
                                                            <p className="fs-3 fw-medium text-black mt-2">{ele.generalFeatures.name}</p>
                                                            <p className="fs-5 fw-medium mt-2" style={{ color: "grey"}}>{ele.ratings} Ratings & {ele.reviews} Reviews</p>
                                                            <span className="badge text-bg-success">{ele.averageRating}<i className="bi bi-star-fill"></i></span>
                                                            <ul style={{ color: "grey"}} className="fw-normal py-2">
                                                               <li>{ele.generalFeatures.ram} RAM | {ele.generalFeatures.internalStorage.map((element) => element + "GB").join(", ")}</li>
                                                               <li>{ele.displayFeatures.attributes["Display Size"]} {ele.displayFeatures.attributes["Resolution Type"]}</li>
                                                               <li>{ele.cameraFeatures.attributes["Primary Camera"]} | {ele.cameraFeatures.attributes["Secondary Camera"]} Front Camera</li>
                                                               <li>{ele.generalFeatures.batteryCapacity}mAh Battery</li>
                                                               <li>{ele.osAndProcessorFeatures.attributes["Processor Brand"]} {ele.osAndProcessorFeatures.attributes["Primary Clock Speed"]} processor</li>
                                                               <li>{ele.warranty.warrantySummary}</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="col text-black">
                                                        <p className="fs-3 fw-normal mt-4"><i className="bi bi-currency-rupee"></i>{ele.discountedPrice}</p>
                                                        <div className="d-flex">
                                                            <p style={{ color: "grey"}} className="fs-5 me-3"><del><i className="bi bi-currency-rupee"></i>{ele.orignalPrice}</del></p>
                                                            <p className="text-success fw-medium fs-5">{ele.discount}% off</p>
                                                        </div>
                                                    </div>
                                                   </div>
                                                </Link>
                                            </li>
                                        )
                                    })}
                                  </ul>}
                                  {sharedAscOrderProducts.length > 0 && <ul className="list-group py-4">
                                    {sharedAscOrderProducts.map((ele) => {
                                        return (
                                            <li className="list-group-item" key={ele._id}>
                                                <Link className="link-offset-2 link-underline link-underline-opacity-0" to={`/productDetails/mobiles/${ele._id}`}>
                                                   <div className="row">
                                                    <div className="col-md-2">
                                                        <img src={ele.thumbnailImage} className="img-fluid mt-4" style={{ height: "200px", width: "200px"}}/>
                                                    </div>
                                                    <div className="col-md-6 py-4 ms-5">
                                                        <div>
                                                            <p className="fs-3 fw-medium text-black mt-2">{ele.generalFeatures.name}</p>
                                                            <p className="fs-5 fw-medium mt-2" style={{ color: "grey"}}>{ele.ratings} Ratings & {ele.reviews} Reviews</p>
                                                            <span className="badge text-bg-success">{ele.averageRating}<i className="bi bi-star-fill"></i></span>
                                                            <ul style={{ color: "grey"}} className="fw-normal py-2">
                                                               <li>{ele.generalFeatures.ram} RAM | {ele.generalFeatures.internalStorage.map((element) => element + "GB").join(", ")}</li>
                                                               <li>{ele.displayFeatures.attributes["Display Size"]} {ele.displayFeatures.attributes["Resolution Type"]}</li>
                                                               <li>{ele.cameraFeatures.attributes["Primary Camera"]} | {ele.cameraFeatures.attributes["Secondary Camera"]} Front Camera</li>
                                                               <li>{ele.generalFeatures.batteryCapacity}mAh Battery</li>
                                                               <li>{ele.osAndProcessorFeatures.attributes["Processor Brand"]} {ele.osAndProcessorFeatures.attributes["Primary Clock Speed"]} processor</li>
                                                               <li>{ele.warranty.warrantySummary}</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="col text-black">
                                                        <p className="fs-3 fw-normal mt-4"><i className="bi bi-currency-rupee"></i>{ele.discountedPrice}</p>
                                                        <div className="d-flex">
                                                            <p style={{ color: "grey"}} className="fs-5 me-3"><del><i className="bi bi-currency-rupee"></i>{ele.orignalPrice}</del></p>
                                                            <p className="text-success fw-medium fs-5">{ele.discount}% off</p>
                                                        </div>
                                                    </div>
                                                   </div>
                                                </Link>
                                            </li>
                                        )
                                    })}
                                  </ul>}
                                  {sharedDescOrderProducts.length > 0 && <ul className="list-group py-4">
                                    {sharedDescOrderProducts.map((ele) => {
                                        return (
                                            <li className="list-group-item" key={ele._id}>
                                                <Link className="link-offset-2 link-underline link-underline-opacity-0" to={`/productDetails/mobiles/${ele._id}`}>
                                                   <div className="row">
                                                    <div className="col-md-2">
                                                        <img src={ele.thumbnailImage} className="img-fluid mt-4" style={{ height: "200px", width: "200px"}}/>
                                                    </div>
                                                    <div className="col-md-6 py-4 ms-5">
                                                        <div>
                                                            <p className="fs-3 fw-medium text-black mt-2">{ele.generalFeatures.name}</p>
                                                            <p className="fs-5 fw-medium mt-2" style={{ color: "grey"}}>{ele.ratings} Ratings & {ele.reviews} Reviews</p>
                                                            <span className="badge text-bg-success">{ele.averageRating}<i className="bi bi-star-fill"></i></span>
                                                            <ul style={{ color: "grey"}} className="fw-normal py-2">
                                                               <li>{ele.generalFeatures.ram} RAM | {ele.generalFeatures.internalStorage.map((element) => element + "GB").join(", ")}</li>
                                                               <li>{ele.displayFeatures.attributes["Display Size"]} {ele.displayFeatures.attributes["Resolution Type"]}</li>
                                                               <li>{ele.cameraFeatures.attributes["Primary Camera"]} | {ele.cameraFeatures.attributes["Secondary Camera"]} Front Camera</li>
                                                               <li>{ele.generalFeatures.batteryCapacity}mAh Battery</li>
                                                               <li>{ele.osAndProcessorFeatures.attributes["Processor Brand"]} {ele.osAndProcessorFeatures.attributes["Primary Clock Speed"]} processor</li>
                                                               <li>{ele.warranty.warrantySummary}</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="col text-black">
                                                        <p className="fs-3 fw-normal mt-4"><i className="bi bi-currency-rupee"></i>{ele.discountedPrice}</p>
                                                        <div className="d-flex">
                                                            <p style={{ color: "grey"}} className="fs-5 me-3"><del><i className="bi bi-currency-rupee"></i>{ele.orignalPrice}</del></p>
                                                            <p className="text-success fw-medium fs-5">{ele.discount}% off</p>
                                                        </div>
                                                    </div>
                                                   </div>
                                                </Link>
                                            </li>
                                        )
                                    })}
                                  </ul>}
                                </div>}
                                {Object.keys(products).includes("laptops") && <div>
                        
                                      {(sharedAscOrderProducts.length === 0 && sharedDescOrderProducts.length === 0) && <ul className="list-group py-4">
                                        {products.laptops.map((ele) => {
                                            return (
                                                <li className="list-group-item" key={ele._id}>
                                                    <Link className="link-offset-2 link-underline link-underline-opacity-0" to={`/productDetails/laptops/${ele._id}`}>
                                                       <div className="row">
                                                        <div className="col-md-2">
                                                            <img src={ele.thumbnailImage} className="img-fluid mt-4" style={{ width: "200px", height: "200px"}}/>
                                                        </div>
                                                        <div className="col-md-6 py-4">
                                                            <div className="ms-5">
                                                                <p className="fs-3 fw-medium text-black ms-2">{ele.generalFeatures.name}</p>
                                                                <div className="d-flex">
                                                                    <span className="badge text-bg-success m-2">{ele.averageRating}<i className="bi bi-star-fill"></i></span>
                                                                    <p className="fs-5 fw-normal ms-2" style={{ color: "grey"}}>{ele.ratings} Ratings & {ele.reviews} Reviews</p>
                                                                </div>
                                                                <ul>
                                                                    {ele.highlights.map((element) => {
                                                                        return (
                                                                            <li className="fw-normal text-secondary">{element.highlightName}</li>
                                                                        ) 
                                                                    })}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <p className="fs-3 fw-normal text-black mt-4"><i className="bi bi-currency-rupee"></i>{ele.discountedPrice}</p>
                                                            <div className="d-flex">
                                                                <p className="fs-5 fw-normal" style={{ color: "grey" }}><del><i className="bi bi-currency-rupee"></i>{ele.orignalPrice}</del></p>
                                                                <p className="fs-5 fw-normal text-success ms-3">{ele.discount}% off</p>
                                                            </div>
                                                        </div>
                                                       </div>
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                      </ul>}
                                      {sharedAscOrderProducts.length > 0 && <ul className="list-group py-4">
                                        {sharedAscOrderProducts.map((ele) => {
                                            return (
                                                <li className="list-group-item" key={ele._id}>
                                                    <Link className="link-offset-2 link-underline link-underline-opacity-0" to={`/productDetails/laptops/${ele._id}`}>
                                                       <div className="row">
                                                        <div className="col-md-2">
                                                            <img src={ele.thumbnailImage} className="img-fluid mt-4" style={{ width: "200px", height: "200px"}}/>
                                                        </div>
                                                        <div className="col-md-6 py-4">
                                                            <div className="ms-5">
                                                                <p className="fs-3 fw-medium text-black ms-2">{ele.generalFeatures.name}</p>
                                                                <div className="d-flex">
                                                                    <span className="badge text-bg-success m-2">{ele.averageRating}<i className="bi bi-star-fill"></i></span>
                                                                    <p className="fs-5 fw-normal ms-2" style={{ color: "grey"}}>{ele.ratings} Ratings & {ele.reviews} Reviews</p>
                                                                </div>
                                                                <ul>
                                                                    {ele.highlights.map((element) => {
                                                                        return (
                                                                            <li className="fw-normal text-secondary">{element.highlightName}</li>
                                                                        ) 
                                                                    })}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <p className="fs-3 fw-normal text-black mt-4"><i className="bi bi-currency-rupee"></i>{ele.discountedPrice}</p>
                                                            <div className="d-flex">
                                                                <p className="fs-5 fw-normal" style={{ color: "grey" }}><del><i className="bi bi-currency-rupee"></i>{ele.orignalPrice}</del></p>
                                                                <p className="fs-5 fw-normal text-success ms-3">{ele.discount}% off</p>
                                                            </div>
                                                        </div>
                                                       </div>
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                      </ul>}
                                      {sharedDescOrderProducts.length > 0 && <ul className="list-group py-4">
                                        {sharedDescOrderProducts.map((ele) => {
                                            return (
                                                <li className="list-group-item" key={ele._id}>
                                                    <Link className="link-offset-2 link-underline link-underline-opacity-0" to={`/productDetails/laptops/${ele._id}`}>
                                                       <div className="row">
                                                        <div className="col-md-2">
                                                            <img src={ele.thumbnailImage} className="img-fluid mt-4" style={{ width: "200px", height: "200px"}}/>
                                                        </div>
                                                        <div className="col-md-6 py-4">
                                                            <div className="ms-5">
                                                                <p className="fs-3 fw-medium text-black ms-2">{ele.generalFeatures.name}</p>
                                                                <div className="d-flex">
                                                                    <span className="badge text-bg-success m-2">{ele.averageRating}<i className="bi bi-star-fill"></i></span>
                                                                    <p className="fs-5 fw-normal ms-2" style={{ color: "grey"}}>{ele.ratings} Ratings & {ele.reviews} Reviews</p>
                                                                </div>
                                                                <ul>
                                                                    {ele.highlights.map((element) => {
                                                                        return (
                                                                            <li className="fw-normal text-secondary">{element.highlightName}</li>
                                                                        ) 
                                                                    })}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <p className="fs-3 fw-normal text-black mt-4"><i className="bi bi-currency-rupee"></i>{ele.discountedPrice}</p>
                                                            <div className="d-flex">
                                                                <p className="fs-5 fw-normal" style={{ color: "grey" }}><del><i className="bi bi-currency-rupee"></i>{ele.orignalPrice}</del></p>
                                                                <p className="fs-5 fw-normal text-success ms-3">{ele.discount}% off</p>
                                                            </div>
                                                        </div>
                                                       </div>
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                      </ul>}
                                    </div>}
                            </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

const DisplayProducts = () => {
    const [cart, setCart] = useState(null);
    const [wishlist, setWishlist] = useState(null);
    const [inputQuery, setInputQuery] = useState("");
    const [ascOrderProducts, setAscOrderProducts] = useState([]);
    const [descOrderProducts, setDescOrderProducts] = useState([]);

    useEffect(() => {
        fetch("https://tech-mart-backend-five.vercel.app/cart")
        .then((response) => {
            if (! response.ok) {
                throw new Error("Failed to fetch data");
            }
            return response.json();
        })
        .then((responseData) => {
            setCart(responseData);
        })
        .catch((error) => {
            console.error('Error', error);
        })
    }, []);

    useEffect(() => {
        fetch("https://tech-mart-backend-five.vercel.app/wishlist")
        .then((response) => {
            if (!response.ok) {
                throw new Error("failed to fetch data");
            }
            return response.json()
        })
        .then((responseData) => {
            setWishlist(responseData);
        })
        .catch((error) => {
            console.error('Error', error)
        })
    }, []);

    return (
        <div>
            <Header sharedCart={cart} sharedWishlist={wishlist} sharedInputQuery={inputQuery} setSharedInputQuery={setInputQuery} sharedAscOrderProducts={ascOrderProducts} setSharedAscOrderProducts={setAscOrderProducts} sharedDescOrderProducts={descOrderProducts} setSharedDescOrderProducts={setDescOrderProducts}/>
            <Products sharedAscOrderProducts={ascOrderProducts} setSharedAscOrderProducts={setAscOrderProducts} sharedDescOrderProducts={descOrderProducts} setSharedDescOrderProducts={setDescOrderProducts}/>
        </div>
    )
}

export default DisplayProducts