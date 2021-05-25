import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  FormControl,
} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductsDetails } from '../actions/productActions'

const ProductScreen = ({ history, match }) => {
  //   console.log(match.params.id)

  const [qty, setQty] = useState(0)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(listProductsDetails(match.params.id))
  }, [dispatch, match])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  //   Find single product where _id is equal to id in the URL
  //   const product = products.find((x) => x._id === match.params.id)

  return (
    <div className='product-screen'>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader>Loading</Loader>
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h4>{product.name}</h4>
              </ListGroupItem>
              <ListGroupItem>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color='#f8e825'
                />
              </ListGroupItem>
              <ListGroupItem>Price: ${product.price}</ListGroupItem>
              <ListGroupItem>Description: {product.description}</ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <Row>
                    <Col>Price</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Status</Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'Out Stock'}
                    </Col>
                  </Row>
                </ListGroupItem>

                {product.countInStock > 0 && (
                    <ListGroupItem>
                        <Row>
                            <Col>Qty</Col>
                            <Col>
                                <FormControl as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                    {/* [0,1,2,3, etc] */}
                                    {[...Array(product.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                    ))}
                                </FormControl>
                            </Col>
                        </Row>
                    </ListGroupItem>
                )}

                <ListGroupItem>
                  <Button
                    onClick={addToCartHandler}
                    className='btn w-100'
                    type='button'
                    disabled={product.countInStock === 0}
                  >
                    ADD TO CART
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  )
}

export default ProductScreen
