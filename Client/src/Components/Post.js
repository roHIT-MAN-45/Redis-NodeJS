import React from "react";

// React Icons
import { AiFillDelete } from "react-icons/ai";

// Styled Components
import styled from "styled-components";

// Twin Macro
import tw from "twin.macro";

const Post = ({ id, title, description, deletePostHandler }) => {
  return (
    <Container>
      {/* Card  */}
      <Card>
        {/* Title  */}
        <Title>{title}</Title>

        {/* Description */}
        <Description>
          {description.length > 80
            ? description.substring(0, 80) + "..."
            : description}
        </Description>

        {/* Button Container  */}
        <ButtonContainer>
          {/* Read More Button */}
          <PostButton type="button">Read More</PostButton>

          {/* Delete Button  */}
          <AiFillDelete
            className="text-xl text-darkGray cursor-pointer"
            onClick={() => deletePostHandler(id)}
          />
        </ButtonContainer>
      </Card>
    </Container>
  );
};

const Container = styled.div`
  ${tw`
  flex
  justify-center
  `}
`;

const Card = styled.div`
  ${tw`
  block
  p-6
  rounded-lg
  shadow-lg
  bg-white
  w-full
  h-full
`}
`;

const Title = styled.h5`
  ${tw`
text-dark
text-xl
leading-tight
font-medium
mb-2
`}
`;

const Description = styled.p`
  ${tw`
 text-darkGray
 text-base
 mb-4
 `}
`;

const ButtonContainer = styled.div`
  ${tw`
 flex
 justify-between
 items-center
`}
`;

const PostButton = styled.button`
  ${tw`
 inline-block
 px-6
 py-2.5
 bg-primary
 text-white
 font-medium
 text-xs
 leading-tight
 uppercase
 rounded
 shadow-md
 hover:bg-darkPrimary
 hover:shadow-lg
 focus:bg-darkPrimary
 focus:shadow-lg
 focus:outline-none
 focus:ring-0
 transition 
 duration-150
 ease-in-out
 `}
`;

export default Post;
