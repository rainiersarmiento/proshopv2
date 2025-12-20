import { useState, useEffect } from "react";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
// import LinkContainer from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import Message from "../components/Message";
// import Loader from "../components/Loader";
// import { toast } from "react-toastify";
// import { useProfileMutation } from "../slices/usersApiSlice";
// import { setCredentials } from "../slices/authSlice";
const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [name, setName] = useState(userInfo?.name || "");
  const [email, setEmail] = useState(userInfo?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     if (userInfo) {
  //       setName(userInfo.name);
  //       setEmail(userInfo.email);
  //     }
  //   }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Submit Clicked");
  };
  return (
    <Row>
      {/* Contains user data */}
      <Col md={3}>
        <h2>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form>
        </h2>
      </Col>
      {/* Contains the orders */}
      <Col md={9}>Column</Col>
    </Row>
  );
};
export default ProfileScreen;
