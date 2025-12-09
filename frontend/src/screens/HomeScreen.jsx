import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
// import { useEffect, useState } from "react";
//import axios from "axios";
// useEffect to fetch data
// useState bc products are a part of the state
// future will be redux
const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  // empty state at first
  // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const { data } = await axios.get("/api/products");
  //     console.log(typeof data);
  //     setProducts(data);
  //     console.log(data);
  //   };
  //   fetchProducts();
  //   // dependency will only run once at the start of page load, so empty dependency array
  // }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          {" "}
          <h1>Latest Products</h1>
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
        </>
      )}
    </>
  );
};

export default HomeScreen;
