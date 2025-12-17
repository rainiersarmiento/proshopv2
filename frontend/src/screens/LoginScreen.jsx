import { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const LoginScreen = () => {
  // State for form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   Tools for Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to check credentials
  const [login, { isLoading }] = useLoginMutation();

  // Data stored in localStorage - checks to see if logged in
  const { userInfo } = useSelector((state) => state.auth);

  //  useLocation is a react router hook that provides access to the current
  // location object - gives access to the current URL - and perform side effects

  const { search } = useLocation();
  /**
     * const location = useLocation();

  // You can now access properties of the location object
  console.log(location.pathname); // e.g., '/products'
  console.log(location.search);   // e.g., '?id=123&sort=asc'
  console.log(location.hash);     // e.g., '#section-2'
  console.log(location.state);    // e.g., { fromDashboard: true }
     */
  // This line provides utility methods to work with the URL search params
  const sp = new URLSearchParams(search);

  // Gets the first value of the search param mentioned - if doesnt exist redirect to home screen
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    // checks to see if there's data in userInfo
    // If there is, then you are logged in
    if (userInfo) {
      navigate(redirect);
    }
    // Dependencies will need whatever can be changed in the useEffect
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log("submit");
    // Handles the frontend redirects and localStorage
    try {
      // unwrap will wait for the promise to resolve and
      // allows u to use the contents of the promise
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="my-2"
          disabled={isLoading}
        >
          Sign In
        </Button>
        {isLoading && <Loader />}
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register here.
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
