import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "../../slices/productsApiSlice";

const ProductEditScreen = () => {
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductQuery(productId);

  const [upateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price || 0);
  const [image, setImage] = useState(product?.image || "");
  const [brand, setBrand] = useState(product?.brand || "");
  const [category, setCategory] = useState(product?.category || "");
  const [countInStock, setCountInStock] = useState(product?.countInStock || 0);
  const [description, setDescription] = useState(product?.description || "");

  console.log(product);

  //   useEffect(() => {
  //     if (product) {
  //       setName(product.name);
  //       setPrice(product.price);
  //       setImage(product.image);
  //       setBrand(product.brand);
  //       setCategory(product.category);
  //       setCountInStock(product.countInStock);
  //       setDescription(product.description);
  //     }
  //   }, [product]);
  return (
    <>
      <>
        <Link to="/admin/productlist" className="btn btn-light my-3">
          Go Back
        </Link>
        <FormContainer>
          <h1>Edit Product</h1>
          {loadingUpdate && <Loader />}
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form>
              <Form.Group controlId="name">
                <Form.Label>
                  Name
                  <Form.Control
                    type="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Label>
              </Form.Group>

              <Form.Group controlId="price">
                <Form.Label>
                  Price
                  <Form.Control
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  ></Form.Control>
                </Form.Label>
              </Form.Group>

              <Form.Group controlId="image">
                <Form.Label>
                  Image
                  <Form.Control
                    type="text"
                    placeholder="Enter image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  ></Form.Control>
                </Form.Label>
              </Form.Group>

              <Form.Group controlId="brand">
                <Form.Label>
                  Brand
                  <Form.Control
                    type="text"
                    placeholder="Enter brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  ></Form.Control>
                </Form.Label>
              </Form.Group>

              <Form.Group controlId="category">
                <Form.Label>
                  Category
                  <Form.Control
                    type="text"
                    placeholder="Enter category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  ></Form.Control>
                </Form.Label>
              </Form.Group>

              <Form.Group controlId="countInStock">
                <Form.Label>
                  Count in Stock
                  <Form.Control
                    type="number"
                    placeholder="Enter Count in Stock"
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                  ></Form.Control>
                </Form.Label>
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>
                  Description
                  <Form.Control
                    type="text"
                    placeholder="Enter Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></Form.Control>
                </Form.Label>
              </Form.Group>
            </Form>
          )}
        </FormContainer>
      </>
    </>
  );
};
export default ProductEditScreen;
