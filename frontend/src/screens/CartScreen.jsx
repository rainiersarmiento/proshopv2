import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart);
  const cartItems = cart.cartItems;
  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: "20px" }}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">Items</ListGroup>
        )}
      </Col>
    </Row>
  );
};

export default CartScreen;
