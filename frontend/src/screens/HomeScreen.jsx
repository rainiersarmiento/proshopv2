import { Row, Col } from "react-bootstrap";
import products from "../products";
import Product from "../components/Product";
import React from "react";

const HomeScreen = () => {
  return (
    <>
      <h1>
        Latest Products
        {/* Bootstrap Component Row */}
        <Row>
          {products.map((product) => (
            // Loop through the products array and provide a Products component for each
            // Bootstrap Component Col can take in how many cols in a row depending on screen size
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              {/* Responsive design - 12 cols on sm screens 6 items for md etc etc */}
              <Product product={product} />
            </Col>
          ))}
        </Row>
      </h1>
    </>
  );
};

export default HomeScreen;
