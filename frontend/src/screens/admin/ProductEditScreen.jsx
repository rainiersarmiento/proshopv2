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
  const { id: productId } = useParams();
  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductQuery(productId);

  const [name, setName] = useState(product.name || "");
  const [price, setPrice] = useState(product.price || 0);
  const [image, setImage] = useState(product.image || "");
  const [brand, setBrand] = useState(product.brand || "");
  const [category, setCategory] = useState(product.category || "");
  const [countInStock, setCountInStock] = useState(product.countInStock || 0);
  const [description, setDescription] = useState(product.description || "");

  const [upateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();
  const navigate = useNavigate();

  return (
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
              <Form.label>
                Name
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.label>
            </Form.Group>
          </Form>
        )}
      </FormContainer>
    </>
  );
};
export default ProductEditScreen;
