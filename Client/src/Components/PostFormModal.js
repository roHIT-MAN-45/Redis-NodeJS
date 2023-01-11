import React from "react";

// Components
import Modal from "./Modal";
import PostForm from "./PostForm";

const PostFormModal = ({ closeModalHandler, getUserPosts }) => {
  return (
    <Modal
      children={
        <PostForm
          getUserPosts={getUserPosts}
          closeModalHandler={closeModalHandler}
        />
      }
    />
  );
};

export default PostFormModal;
