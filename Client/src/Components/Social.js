import React, { useState, useEffect, useContext, useCallback } from "react";

// Styled Components
import styled from "styled-components";

// Twin Macro
import tw from "twin.macro";

// React Icons
import { AiOutlinePlus } from "react-icons/ai";

// Axios
import axios from "axios";

// Context API
import { AuthContext } from "../Context/AuthContext";

// Components
import Post from "./Post";
import NoPosts from "./NoPosts";
import PostFormModal from "./PostFormModal";
import RoundIconButton from "./RoundIconButton";

const Social = () => {
  const [posts, setPosts] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  // Accessing context functions
  const { userDetails } = useContext(AuthContext);

  // Fetches all the posts created by current user
  const getUserPosts = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/api/v1/post/social/${userDetails?._id}`
      );

      if (response.status === 200) {
        setPosts(response.data.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [userDetails]);

  // Deletes post by id
  const deletePostHandler = async (id) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_ENDPOINT}/api/v1/post/${id}`,
      { data: { author: userDetails?._id } }
    );

    if (response.status === 200) {
      // Filtering posts to remove deleted post from UI
      const filteredPosts = posts.filter((post) => post._id !== id);

      setPosts(filteredPosts);
    }
  };

  // Running on component mount
  useEffect(() => {
    if (userDetails) {
      getUserPosts();
    } else {
      return;
    }
  }, [getUserPosts, userDetails]);

  // Open modal handler
  const openModalHandler = () => {
    setOpenModal(true);
  };

  // Close modal handler
  const closeModalHandler = () => {
    setOpenModal(false);
  };

  // Returning NoPosts component if there are no posts
  if (posts.length === 0) {
    return <NoPosts getUserPosts={getUserPosts} />;
  }

  return (
    <Container>
      {/* Add Post Icon */}
      <RoundIconButton Icon={AiOutlinePlus} onClick={openModalHandler} />

      {posts.map((post) => (
        <Post
          key={`post-${post._id}`}
          id={post._id}
          title={post.title}
          description={post.description}
          deletePostHandler={deletePostHandler}
        />
      ))}

      {/* Modal */}
      {openModal && (
        <PostFormModal
          getUserPosts={getUserPosts}
          closeModalHandler={closeModalHandler}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  ${tw`
  grid
  lg:grid-cols-3
  sm:grid-cols-2
  grid-cols-1
  gap-4
  py-6
  `}
`;

export default Social;
