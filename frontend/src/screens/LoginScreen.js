import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";
import { callAction } from "../actions/userActions";
import axios from "axios";
import CallApi from "../apiClient";

const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const redirect = location.search ? location.search.split("=")[1] : "/";

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        login(email, password);
        // dispatch(login(email, password));
    };

    const login = async(email, password) => {
        console.log("Email===", email, password);
        try {
            dispatch(callAction("USER_LOGIN_REQUEST"));

            const data = await CallApi("post", "/api/users/login", {
                email,
                password,
            });
            console.log("data", data);
            if (data) {
                dispatch(callAction("USER_LOGIN_SUCCESS", data));
                localStorage.setItem("userInfo", JSON.stringify(data));
            }
        } catch (error) {
            dispatch(
                callAction(
                    "USER_LOGIN_FAIL",
                    error.response && error.response.data.message ?
                    error.response.data.message :
                    error.message
                )
            );
        }
    };

    return ( <
            FormContainer >
            <
            h1 > Sign In < /h1>{" "} {
            error && < Message variant = "danger" > { error } < /Message>}{" "} { loading && < Loader / >
        } { " " } <
        Form onSubmit = { submitHandler } >
        <
        Form.Group controlId = "email" >
        <
        Form.Label > Email Address < /Form.Label>{" "} <
    Form.Control
    type = "email"
    placeholder = "Enter email"
    value = { email }
    onChange = {
            (e) => setEmail(e.target.value)
        } >
        <
        /Form.Control>{" "} < /
    Form.Group > { " " } <
        Form.Group controlId = "password" >
        <
        Form.Label > Password < /Form.Label>{" "} <
    Form.Control
    type = "password"
    placeholder = "Enter password"
    value = { password }
    onChange = {
            (e) => setPassword(e.target.value)
        } >
        <
        /Form.Control>{" "} < /
    Form.Group > { " " } <
        Button type = "submit"
    variant = "primary" >
        Sign In { " " } <
        /Button>{" "} < /
    Form > { " " } <
        Row className = "py-3" >
        <
        Col >
        New Customer ? { " " } <
        Link to = { redirect ? `/register?redirect=${redirect}` : "/register" } >
        Register { " " } <
        /Link>{" "} < /
    Col > { " " } <
        /Row>{" "} < /
    FormContainer >
);
};

export default LoginScreen;