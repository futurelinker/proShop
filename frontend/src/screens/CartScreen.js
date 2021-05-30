import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, FormControl, Button, Card, ListGroupItem } from 'react-bootstrap'
import { addToCart, removeFromCart } from '../actions/cartActions'
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

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }


    return (
      <div className='cart-screen'>
        <Row>
          <Col md={8}>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
              <Message>
                Your cart is empty <Link to='/'>Go back</Link>
              </Message>
            ) : (
              <ListGroup variant='flush'>
                {cartItems.map((item) => (
                  <ListGroupItem key={item.product}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={3}>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>
                        ${item.price}
                      </Col>
                      <Col md={3}>
                        <FormControl
                          as='select'
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {/* [0,1,2,3, etc] */}
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </FormControl>
                      </Col>
                      <Col md={2}>
                        <Button
                          variant='light'
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <i className='fas fa-trash'></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
          </Col>
          <Col md={4}>
              <Card>
                  <ListGroup>
                      <ListGroupItem>
                          <h4>Subtotal ({cartItems.reduce((count, item) => count + item.qty, 0 )}) items</h4>
                          $ {cartItems.reduce((subTotal, item) => subTotal + item.qty * item.price, 0).toFixed(2)}
                      </ListGroupItem>
                      <ListGroupItem>
                          <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>Prodceed to checkout</Button>
                      </ListGroupItem>
                  </ListGroup>
              </Card>
          </Col>
          
        </Row>
      </div>
    )
}

export default CartScreen
