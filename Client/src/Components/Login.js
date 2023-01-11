import React, { useState, useContext } from "react";

// Styled Components
import styled from "styled-components";

// Twin Macro
import tw from "twin.macro";

// React Router
import { NavLink } from "react-router-dom";

// Context API
import { AuthContext } from "../Context/AuthContext";
import { ToastContext } from "../Context/ToastContext";

// Components
import Input from "./Input";
import Button from "./Button";

function Login() {
  // States
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  // Accessing context functions
  const { loginUser } = useContext(AuthContext);
  const { showErrorToast } = useContext(ToastContext);

  // Function that validates input fields
  const validate = () => {
    let valid = true;

    if (!inputs.email) {
      showErrorToast("Please enter your email address.");
      valid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      showErrorToast("Please enter a valid email address.");
      valid = false;
    }

    if (!inputs.password) {
      showErrorToast("Please enter your password.");
      valid = false;
    }

    if (valid) {
      loginHandler();
    }
  };

  // Runs function from context
  const loginHandler = () => {
    loginUser(inputs.email, inputs.password);
  };

  // Onchange handler
  const handleOnChange = (event) => {
    // using spread operator
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Container>
      <Form>
        <Heading>Login</Heading>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email address"
          value={inputs.email}
          handleOnChange={handleOnChange}
        />

        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={inputs.password}
          handleOnChange={handleOnChange}
        />

        <RememberContainer>
          <RememberInput
            type="checkbox"
            id="remember"
            aria-describedby="remember"
            required=""
          />
          <Label htmlFor="exampleCheck25">Remember Me</Label>
        </RememberContainer>

        <Button text={"Login"} onClick={validate} />

        <Link>
          Don't have an account?{" "}
          <NavLink
            to="/signup"
            className="text-primary font-medium underline cursor-pointer"
          >
            Signup
          </NavLink>
        </Link>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  ${tw`
  mt-4
  mx-auto
  block
  p-6
  rounded-lg
  shadow-lg
  bg-white
  max-w-md
  border-2
  border-gray
`}
`;

const Form = styled.form`
  ${tw`

`}
`;

const Heading = styled.h1`
  ${tw`
  mt-4
  mb-6
  text-3xl
  font-bold
  text-dark
`}
`;

const RememberContainer = styled.div`
  ${tw`
  flex
  items-center
  mb-6
`}
`;

const RememberInput = styled.input`
  ${tw`
  h-4
  w-4
  border-gray
  rounded 
  bg-gray
`}
`;

const Label = styled.label`
  ${tw`
  ml-2
  inline-block
  text-dark
`}
`;

const Link = styled.p`
  ${tw`
mt-4
text-base
text-dark
`}
`;

export default Login;
