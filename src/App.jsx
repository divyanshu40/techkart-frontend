import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./components/Header"

const App = () => {
   
    return (
        <div>
            <Header/>
            <div className="container py-4">
                <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="card text-bg-secondary">
                                        <div className="card-body position-relative">
                                           <div>
                                            <img src="https://ik.imagekit.io/nzdd0osbmn/wallpaper_1.jpeg?updatedAt=1748158088115" className="img-fluid" style={{ width: "1300.00px", height: "534.2px"}}/>
                                            <div className="position-absolute top-50 start-50 translate-middle">
                                                <img src="https://ik.imagekit.io/nzdd0osbmn/iPhone16_1.jpeg?updatedAt=1748103530…" className="img-fluid" style={{ width: "200px", height: "200px"}}/>
                                                <p className="fs-2 fw-normal">iPhone 16</p>
                                                <p className="fs-2 fw-normal">Starting from<i className="bi bi-currency-rupee"></i>63000</p>
                                            </div>
                                           </div>
                                        </div>
                                    </div>
                        </div>
                         <div className="carousel-item">
                             <div className="card text-bg-secondary">
                                 <div className="card-body position-relative">
                                    <img src="https://ik.imagekit.io/nzdd0osbmn/wallpaper_2.jpeg?updatedAt=1748172590686" className="img-fluid" style={{ width: "1300.00px", height: "534.2px"}}/>    
                                    <div className="position-absolute top-50 start-50 translate-middle">
                                        <img src="https://ik.imagekit.io/nzdd0osbmn/SamsungM35_1.jpeg?updatedAt=17481110…" style={{ width: "200px", height: "200px"}} className="img-fluid"/>
                                        <p className="fs-2 fw-normal">Samsung Galaxy M 35</p>
                                        <p className="fs-2 fw-normal">Starts from <i className="bi bi-currency-rupee"></i>13000</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="card" style={{ backgroundImage: `url("https://ik.imagekit.io/nzdd0osbmn/wallpaper_3.jpeg?updatedAt=1748173503987")`, backgroundSize: "cover", backgroundPosition: "center", width: "1300px", height: "534.2px"}}>
                              <div className="card-body d-flex align-items-center">
                                <div className="row" style={{ width: "1300px"}}>
                                    <div className="col-md-4 position-relative">
                                        <img src="https://ik.imagekit.io/nzdd0osbmn/asus_rog_strix_3.jpeg?updatedAt=1747753952517" style={{ width: "200px", height: "200px"}} className="img-fluid position-absolute top-50 start-100 translate-middle"/>
                                    </div>
                                    <div className="col-md-6 position-relative">
                                        <p className="fs-2 fw-normal text-light position-absolute top-50 start-50 translate-middle">Upto 50% discount on gaming laptops</p>
                                    </div>
                                </div>
                              </div>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                         <span className="carousel-control-next-icon" aria-hidden="true"></span>
                         <span className="visually-hidden">Next</span>
                    </button>
                </div>
                <h4 className="display-5 fw-normal mt-5">Best of Mobiles</h4>
                <div className="py-4 row">
                    <div className="col-md-3">
                        <Link className="link-offset-2 link-underline link-underline-opacity-0" to="/productDetails/mobiles/6821f6918555b0e30271b26c">
                          <img src="https://ik.imagekit.io/nzdd0osbmn/iPhone16_1.jpeg?updatedAt=1748103530136" className="img-fluid" style={{ width: "200px", height: "200px"}}/>
                          <p className="fs-4 fw-normal ms-5 text-black">Apple iPhone 16</p>
                          <p className="fs-4 fw-normal ms-5 text-black"><i className="bi bi-currency-rupee"></i>63000</p>
                        </Link>
                    </div>
                    <div className="col-md-3">
                        <Link className="link-offset-2 link-underline link-underline-opacity-0" to="/productDetails/mobiles/68222e1ea394359292f44d2d">
                          <img src="https://ik.imagekit.io/nzdd0osbmn/iPhone13_1.jpeg?updatedAt=1748104392569" className="img-fluid" style={{ width: "200px", height: "200px"}}/>
                          <p className="fs-4 fw-normal ms-5 text-black">Apple iPhone 13</p>
                          <p className="fs-4 fw-normal ms-5 text-black"><i className="bi bi-currency-rupee"></i>49990</p>
                        </Link>
                    </div>
                     <div className="col-md-3">
                        <Link className="link-offset-2 link-underline link-underline-opacity-0" to="/productDetails/mobiles/6822578fc53c07130d393c93">
                          <img src="https://ik.imagekit.io/nzdd0osbmn/SamsungM35_1.jpeg?updatedAt=1748111046294" className="img-fluid" style={{ width: "200px", height: "200px"}}/>
                          <p className="fs-4 fw-normal ms-5 text-black">Samsung Galaxy M35</p>
                          <p className="fs-4 fw-normal ms-5 text-black"><i className="bi bi-currency-rupee"></i>13885</p>
                        </Link>
                    </div>
                    <div className="col-md-3">
                        <Link className="link-offset-2 link-underline link-underline-opacity-0" to="/productDetails/mobiles/682ca330a2d34e90749fd51f">
                          <img src="https://ik.imagekit.io/nzdd0osbmn/vivo_t4_1.jpeg?updatedAt=1747755744742" className="img-fluid" style={{ width: "200px", height: "200px"}}/>
                          <p className="fs-4 fw-normal ms-5 text-black">Vivo T4x 5G</p>
                          <p className="fs-4 fw-normal ms-5 text-black"><i className="bi bi-currency-rupee"></i>13990</p>
                        </Link>
                    </div>
                </div>
                <h4 className="mt-4 display-5 fw-normal">Best of Laptops</h4>
                <div className="row py-4">
                    <div className="col-md-3">
                        <Link className="link-offset-2 link-underline link-underline-opacity-0" to="/productDetails/laptops/682b5c3603e91f5b8772a61f">
                          <img src="https://ik.imagekit.io/nzdd0osbmn/hp_victus_laptop1.jpeg?updatedAt=1747671712977" className="img-fluid" style={{ width: "200px", height: "200px"}}/>
                          <p className="fs-4 fw-normal ms-5 text-black">HP Victus</p>
                          <p className="fs-4 fw-normal ms-5 text-black"><i className="bi bi-currency-rupee"></i>65990</p>
                        </Link>
                    </div>
                    <div className="col-md-3">
                        <Link className="link-offset-2 link-underline link-underline-opacity-0" to="productDetails/laptops/682b8fd893634ec98f3ce07c">
                          <img src="https://ik.imagekit.io/nzdd0osbmn/asus_tuf_gaming_1.jpeg?updatedAt=1747685259067" className="img-fluid" style={{ width: "300px", height: "200px"}}/>
                          <p className="fs-4 fw-normal text-black text-center">Asus TUF Gaming</p>
                          <p className="fs-4 fw-normal text-center text-black"><i className="bi bi-currency-rupee"></i>52990</p>
                        </Link>
                    </div>
                    <div className="col-md-3">
                        <Link className="link-offset-2 link-underline link-underline-opacity-0" to="productDetails/laptops/682b98db588f56ff79c2eac5">
                          <img src="https://ik.imagekit.io/nzdd0osbmn/dell_g15_1.jpeg?updatedAt=1747687422431" className="img-fluid" style={{ width: "200px", height: "200px"}}/>
                          <p className="fs-4 fw-normal text-black ms-5">Dell G15</p>
                          <p className="fs-4 fw-normal ms-5 text-black"><i className="bi bi-currency-rupee"></i>74990</p>
                        </Link>
                    </div>
                    <div className="col-md-3">
                        <Link className="link-offset-2 link-underline link-underline-opacity-0" to="/productDetails/laptops/682ba3471755df1f7b524e20">
                          <img src="https://ik.imagekit.io/nzdd0osbmn/msi_1.jpeg?updatedAt=1747689139709" className="img-fluid" style={{ width: "250px", height: "200px"}}/>
                          <p className="fs-4 fw-normal text-black ms-5">MSI Intel Core i7</p>
                          <p className="fs-4 fw-normal ms-5 text-black"><i className="bi bi-currency-rupee"></i>174590</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App