import { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col } from "react-router-bootstrap";
import LinkContainer from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  return <div>ProfileScreen</div>;
};
export default ProfileScreen;
