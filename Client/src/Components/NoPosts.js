import React, { useState } from "react";

// Styled Components
import styled from "styled-components";

// Twin Macro
import tw from "twin.macro";

// React Icons
import { AiOutlinePlus } from "react-icons/ai";

// Components
import RoundIconButton from "./RoundIconButton";
import PostFormModal from "./PostFormModal";

// Assets
import NoPostsImage from "../assets/Images/noposts.svg";

const NoPosts = ({ openModalHandler, getUserPosts }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Container onClick={openModalHandler}>
      {/* Image  */}
      <Image src={NoPostsImage} />

      {/* Text  */}
      <Paragraph>
        It looks like you <Mark>don't have any posts</Mark> yet. Add one to see{" "}
        <Mark>Redis</Mark> in action
      </Paragraph>

      {/* Add Post Icon */}
      <RoundIconButton
        Icon={AiOutlinePlus}
        onClick={() => setOpenModal(true)}
      />

      {/* Modal */}
      {openModal && (
        <PostFormModal
          getUserPosts={getUserPosts}
          closeModalHandler={() => setOpenModal(false)}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  ${tw`
w-full
flex
flex-col
justify-center
overflow-auto
  `}
`;

const Image = styled.img`
  ${tw`
  mx-auto
  my-auto
  md:w-2/6
  sm:w-2/4
  w-3/4
 `}
`;

const Paragraph = styled.p`
  ${tw`
  text-xl
  text-center
  text-darkGray
`}
`;

const Mark = styled.span`
  ${tw`
  text-primary
`}
`;

export default NoPosts;
