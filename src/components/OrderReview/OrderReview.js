import React from 'react';
import useProducts from './../../hooks/userProducts';
import useCart from './../../hooks/userCarts';
import Cart from './../Cart/Cart';
import Reviewitem from '../Reviewitem/Reviewitem';
import { deleteFromDb, clearTheCart } from '../../utilities/fakedb';
import { useHistory } from 'react-router';


const OrderReview = () => {
    const [products] = useProducts();
    const [cart, setCart] = useCart(products);
    const history = useHistory()

    const handleRemove = (key) => {
        const newCart = cart.filter(item => item.key !== key)
        setCart(newCart)
        deleteFromDb(key)
    }

    const handleOrderPlace = () => {
        history.push('/placeOrder')
        setCart([])
        clearTheCart()
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
                    <Cart cart={cart}>
                        <button onClick={handleOrderPlace} className="btn-regular">Place Order</button>
                    </Cart>
                </div>
            </div>

        </div>
    );
};

export default OrderReview;