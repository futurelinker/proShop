import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { addToCart } from '../actions/cartActions'
import Message from '../components/Message'
import Loader from '../components/Loader'



const CartScreen = ({ match, history, location }) => {

    const productId = match.params.id

    // location.search = ?qty=1
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    console.log(qty)

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [ dispatch, productId, qty ])


    return (
        <div className='cart-screen'>
            Cart
        </div>
    )
}

export default CartScreen
