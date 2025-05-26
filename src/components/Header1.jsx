import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ viewMobileBrands, setViewMobileBrands, viewLaptopBrands, setViewLaptopBrands}) => {
    
  return (
    <header className="bg-primary">
       <div className="container">
        <div className="row gx-2 position-relative py-4">
            <div className="col-md-2">
                <NavLink className="fs-2 fw-normal fst-italic text-light">Techmart</NavLink>
            </div>
            <div className="col-md-4">
                <div className="input-group">
                    <input
                    type="text"
                    className="form-control"
                    />
                    <button className="btn btn-light"><i className="bi bi-search"></i></button>
                </div>
            </div>
            <div className="col-md-4 position-absolute top-50 start-100 translate-middle">
                <NavLink><i className="bi bi-cart fs-1 fw-normal text-light me-5">cart</i></NavLink>
                <NavLink><i className="bi bi-heart fs-1 fw-normal text-light ms-5"></i></NavLink>
            </div>
        </div>
        <div className="mt-2">
            <ul className="nav">
                <li className="nav-item me-5">
                    <div className="btn btn-group">
                        <NavLink className="fs-5 fw-normal text-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" onMouseEnter={() => setViewMobileBrands(true)} onMouseLeave={() =>setViewMobileBrands(false)}>Mobiles</NavLink>
                        {viewMobileBrands && <ul className="dropdown-menu">
                             <li><Link className="dropdown-item">Apple</Link></li>
                             <li><Link className="dropdown-item">Samsung</Link></li>
                             <li><Link className="dropdown-item">Google</Link></li>
                             <li><Link className="dropdown-item">Vivo</Link></li>
                             <li><Link className="dropdown-item">Oppo</Link></li>
                             <li><Link className="dropdown-item">Realme</Link></li>
                             <li><Link className="dropdown-item">Motorola</Link></li>
                            </ul>}
                    </div>
                </li>
                <li className="nav-item ms-5">
                    <NavLink className="fs-5 fw-normal text-light">Laptops</NavLink>
                </li>
            </ul>
        </div>
       </div>
    </header>
  )
}

export default Header