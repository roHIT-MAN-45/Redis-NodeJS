import React, { useState, useContext } from "react";

// Styled Components
import styled from "styled-components";

// Twin Macro
import tw from "twin.macro";

// React Icons
import { ImCross } from "react-icons/im";

// Axios
import axios from "axios";

// Context API
import { AuthContext } from "../Context/AuthContext";
import { ToastContext } from "../Context/ToastContext";

// Components
import Input from "./Input";
import Button from "./Button";

const PostForm = ({ closeModalHandler, getUserPosts }) => {
  // States
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
  });

  // Accessing context functions
  const { userDetails } = useContext(AuthContext);
  const { showErrorToast } = useContext(ToastContext);

  // Function that validates input fields
  const validate = () => {
    let valid = true;

    if (!inputs.title) {
      showErrorToast("Please enter a title.");
      valid = false;
    } else if (inputs.title.length > 30) {
      showErrorToast("Please enter a title with 30 characters or fewer.");
      valid = false;
    }

    if (!inputs.description) {
      showErrorToast("Please enter a description.");
      valid = false;
    } else if (inputs.description.length < 50) {
      showErrorToast("Please enter a description with at least 50 characters.");
      valid = false;
    }

    if (valid) {
      createNewPost();
    }
  };

  // Creates new post in DB
  const createNewPost = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/v1/post/create`,
        {
          title: inputs.title,
          description: inputs.description,
          author: userDetails?._id,
        }
      );

      if (response.status === 201) {
        // Closing Modal
        closeModalHandler();

        // Getting all user posts along with newly created one
        getUserPosts();
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
        <Heading>Create New Post</Heading>

        {/* Cross Icon  */}
        <CrossIconContainer onClick={closeModalHandler}>
          <ImCross className="text-darkGray" />
        </CrossIconContainer>

        <Input
          id="title"
          name="title"
          type="text"
          placeholder="Title"
          value={inputs.title}
          handleOnChange={handleOnChange}
        />

        <Input
          id="Description"
          name="description"
          type="description"
          placeholder="Description"
          value={inputs.description}
          handleOnChange={handleOnChange}
        />

        <Button text={"Create Post"} onClick={validate} />
      </Form>
    </Container>
  );
};

const Container = styled.div`
  ${tw`
block
p-6
rounded-lg
shadow-lg
bg-white
max-w-full
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

const CrossIconContainer = styled.div`
  ${tw`
  absolute
  cursor-pointer
  top-5
  right-5
`}
`;

export default PostForm;
