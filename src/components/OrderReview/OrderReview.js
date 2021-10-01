import React from 'react';
import useProducts from './../../hooks/userProducts';
import useCart from './../../hooks/userCarts';
import Cart from './../Cart/Cart';
import Reviewitem from '../Reviewitem/Reviewitem';
import { addToDb, getStoredCart, deleteFromDb } from '../../utilities/fakedb';


const OrderReview = () => {
    const [products] = useProducts();
    const [cart, setCart] = useCart(products);

    const handleRemove = (key) => {
        const newCart = cart.filter(item => item.key !== key)
        setCart(newCart)
        deleteFromDb(key)
    }

    return (
        <div>
            <div className="shop-container">
                <div className="product-container">
                    {cart.map(product => <Reviewitem
                        key={product.key}
                        product={product}
                        handleRemove={handleRemove}
                    >
                    </Reviewitem>)
                    }
                </div>
                <div className="cart-container">
                    <Cart cart={cart}></Cart>
                </div>
            </div>

        </div>
    );
};

export default OrderReview;