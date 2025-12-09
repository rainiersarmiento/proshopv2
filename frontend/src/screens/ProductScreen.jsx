import React from "react";
// This is to get the params from the URL
import { useParams } from "react-router-dom";
import Products from "../products";
import { Link } from "react-router-dom";
import { useGetProductQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

// import { useEffect, useState } from "react";
// import axios from "axios";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from "react-bootstrap";
import Rating from "../components/Rating";
const ProductScreen = () => {
  const { id: productId } = useParams();
  // The data is being renamed product
  // Redux will return isLoading and error itself!
  const { data: product, isLoading, error } = useGetProductQuery(productId);
  console.log(product);
  // Initialize product. product does not have prior data so [] is empty
  // const [product, setProduct] = useState([]);
  // params are sent as object so destructure the data and product id is the variable for the urlparam from now on

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     // fetch data using axios
  //     const { data } = await axios.get(`/api/products/${productId}`);
  //     setProduct(data);
  //   };
  //   fetchProduct();
  //   // productId is now part of the dependency array because if it changes, the data must be changed
  // }, [productId]);

  // IMPORTANT : Destructuring the urlparam and renaming it productId for
  // Syntax purposes
  // const product = products.find((p) => p._id === productId);

  return (
    <>
      {/* NOTICE THE LINK IS OUTSIDE THE CONTENT LOGIC */}
      <Link className="btn btn-light my-3" to={"/"}>
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Row>
            <Col md={5}>
              {/* Fluid makes the column dynamic - will shape itself to the screen */}
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: ${product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      className="btn-black"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
