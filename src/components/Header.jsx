import { NavLink, Link } from "react-router-dom";
import { useState } from "react";

const Header = ({ sharedCart, sharedWishlist}) => {
    const [viewMobileBrands, setViewMobileBrands] = useState(false);
    const [viewLaptopBrands, setViewLaptopBrands] = useState(false);
  return (
    <header className="bg-primary">
      <div className="container">
        <div className="row gx-2 position-relative py-2">
          <div className="col-md-2">
            <NavLink className="fs-2 fw-normal fst-italic text-light" to="/">
              Techmart
            </NavLink>
          </div>
          <div className="col-md-4">
            <div className="input-group mt-2 ms-2">
              <input type="text" className="form-control" />
              <button className="btn btn-light">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
          <div className="col-md-6 position-absolute top-50 start-100 translate-middle mt-5">
            <NavLink to="/cart">
              <i className="bi bi-cart p-2 fs-1 fw-normal text-light me-5 position-relative">
                {sharedCart?.cartItems?.length > 0 && <span className="badge rounded-pill text-bg-light position-absolute top-0 start-100 translate-middle" style={{ fontSize: "20px"}}>{sharedCart.cartItems.length}</span>}
              </i>
            </NavLink>
            <NavLink to="/wishlist">
              <i className="bi bi-heart fs-1 fw-normal text-light ms-4 position-relative">
                {sharedWishlist?.wishlistItems?.length > 0 && <span className="badge rounded-pill text-bg-light position-absolute top-0 start-100 translate-middle" style={{ fontSize: "20px"}}>{sharedWishlist.wishlistItems.length}</span>}
              </i>
            </NavLink>
            <NavLink to="/user">
              <i className="bi bi-person-circle p-2 fs-1 fw-normal text-light ms-5"></i>
            </NavLink>
          </div>
        </div>

        <div className="mt-2">
          <ul className="nav">
            <li
              className="nav-item me-5"
              onMouseEnter={() => setViewMobileBrands(true)}
              onMouseLeave={() => setViewMobileBrands(false)}
            >
              <div className="btn btn-group">
                <NavLink
                  className="fs-5 fw-normal text-light dropdown-toggle link-offset-2 link-underline link-underline-opacity-0"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Mobiles
                </NavLink>
                {viewMobileBrands && (
                  <ul className="dropdown-menu show">
                    <li><Link className="dropdown-item" to="/products/mobiles/all">All Mobiles</Link></li>
                    <li><Link className="dropdown-item" to="/products/mobiles/Apple">Apple</Link></li>
                    <li><Link className="dropdown-item" to="/products/mobiles/Samsung">Samsung</Link></li>
                    <li><Link className="dropdown-item" to="/products/mobiles/Google">Google</Link></li>
                    <li><Link className="dropdown-item" to="/products/mobiles/Vivo">Vivo</Link></li>
                    <li><Link className="dropdown-item" to="/products/mobiles/Oppo">Oppo</Link></li>
                    <li><Link className="dropdown-item" to="/products/mobiles/Realme">Realme</Link></li>
                    <li><Link className="dropdown-item" to="/products/mobiles/Motorola">Motorola</Link></li>
                  </ul>
                )}
              </div>
            </li>

            <li
              className="nav-item ms-5"
              onMouseEnter={() => setViewLaptopBrands(true)}
              onMouseLeave={() => setViewLaptopBrands(false)}
            >
              <div className="btn btn-group">
                <NavLink
                  className="fs-5 fw-normal text-light dropdown-toggle link-offset-2 link-underline link-underline-opacity-0"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Laptops
                </NavLink>
                {viewLaptopBrands && (
                  <ul className="dropdown-menu show">
                    <li><Link className="dropdown-item" to="/products/laptops/all">All Laptops</Link></li>
                    <li><Link className="dropdown-item" to="/products/laptops/Apple">Apple</Link></li>
                    <li><Link className="dropdown-item" to="/products/laptops/HP">HP</Link></li>
                    <li><Link className="dropdown-item" to="/products/laptops/Dell">Dell</Link></li>
                    <li><Link className="dropdown-item" to="/products/laptops/Lenovo">Lenovo</Link></li>
                    <li><Link className="dropdown-item" to="/products/laptops/Asus">Asus</Link></li>
                    <li><Link className="dropdown-item" to="/products/laptops/Accer">Acer</Link></li>
                    <li><Link className="dropdown-item" to="/products/laptops/MSI">MSI</Link></li>
                  </ul>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;