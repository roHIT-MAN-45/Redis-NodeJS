import React, { useState, useContext } from "react";

// React Router
import { useNavigate, NavLink } from "react-router-dom";

// Styled Components
import styled from "styled-components";

// Twin Macro
import tw from "twin.macro";

// Axios
import axios from "axios";

// Context API
import { ToastContext } from "../Context/ToastContext";

// Components
import Input from "./Input";
import Button from "./Button";

function Signup() {
  // States
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  // Navigation instance
  const navigate = useNavigate();

  // Accessing context function
  const { showErrorToast } = useContext(ToastContext);

  // Function that validates input fields
  const validate = () => {
    let valid = true;

    if (!inputs.firstName) {
      showErrorToast("Please enter your first name.");
      valid = false;
    }

    if (!inputs.lastName) {
      showErrorToast("Please enter your last name.");
      valid = false;
    }

    if (!inputs.phoneNumber) {
      showErrorToast("Please enter your phone number.");
      valid = false;
    } else if (inputs.phoneNumber.length !== 10) {
      showErrorToast("Please enter a valid 10-digit phone number.");
      valid = false;
    }

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
      createAccountHandler();
    }
  };

  // Creates new user in DB
  const createAccountHandler = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/v1/user/create`,
        {
          firstName: inputs.firstName,
          lastName: inputs.lastName,
          phoneNumber: inputs.phoneNumber,
          email: inputs.email,
          password: inputs.password,
        }
      );
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
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
        <Heading>Create New Account</Heading>
        <Grid>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First name"
            value={inputs.firstName}
            handleOnChange={handleOnChange}
          />
          <Input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last name"
            value={inputs.lastName}
            handleOnChange={handleOnChange}
          />
        </Grid>

        <Input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          placeholder="Phone number"
          value={inputs.phoneNumber}
          handleOnChange={handleOnChange}
        />

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

        <Button text={"Signup"} onClick={validate} />

        <Link>
          Already have account?{" "}
          <NavLink
            to="/login"
            className="text-primary font-medium underline cursor-pointer"
          >
            Login
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

const Grid = styled.div`
  ${tw`
grid
grid-cols-2
gap-4
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

export default Signup;
