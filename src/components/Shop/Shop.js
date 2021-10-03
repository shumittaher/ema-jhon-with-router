import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import { addToDb } from '../../utilities/fakedb';
import useProducts from './../../hooks/userProducts';

import useCart from './../../hooks/userCarts';
import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products] = useProducts([]);
    const [cart, setCart] = useCart(products);
    // products to be rendered on the UI
    const [displayProducts, setDisplayProducts] = useState([]);


    useEffect(() => {
        setDisplayProducts(products);

    }, [products]);



    const handleAddToCart = (product) => {
        let newCart = []
        const exists = cart.find((item) => item.key === product.key)

        if (exists) {
            product.quantity++
            const otherItems = cart.filter((item) => item.key !== product.key)
            newCart = [...otherItems, product];          
        } else{
            product.quantity = 1
            newCart = [...cart, product];   
        }

        setCart(newCart);
        // save to local storage (for now)
        addToDb(product.key);
    }

    const handleSearch = event => {
        const searchText = event.target.value;

        const matchedProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));

        setDisplayProducts(matchedProducts);
    }

    return (
        <>
            <div className="search-container">
                <input
                    type="text"
                    onChange={handleSearch}
                    placeholder="Search Product" />
            </div>
            <div className="shop-container">
                <div className="product-container">
                    {
                        displayProducts.map(product => <Product
                            key={product.key}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        >
                        </Product>)
                    }
                </div>
                <div className="cart-container">
                    <Cart cart={cart}>
                        <Link to="/Orders" >
                            <button className="btn-regular">Order Review</button>
                        </Link>
                    </Cart>
                </div>
            </div>
        </>
    );
};

export default Shop;