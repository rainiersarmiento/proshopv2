import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
const Product = ({ product }) => {
  return (
    // Defines a card with margin 3 padding 3 and rounded corners
    <Card className="my-3 p-3 rounded">
      {/* The card is selectable and will link to the product's page */}
      <Link to={`/product/${product._id}`}>
        {/* Bootstrap component contains Card.Img, Card.Body, and Card.Title */}
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
