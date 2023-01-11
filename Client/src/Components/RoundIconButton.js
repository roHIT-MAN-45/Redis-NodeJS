import React from "react";

// Styled Components
import styled from "styled-components";

// Twin Macro
import tw from "twin.macro";

const RoundIconButton = ({ Icon, onClick }) => {
  return (
    <IconContainer onClick={onClick}>
      <Icon className="font-bold text-white sm:text-3xl text-2xl" />
    </IconContainer>
  );
};

const IconContainer = styled.div`
  ${tw`
sm:h-14
sm:w-14
md:h-16
md:w-16
h-11
w-11
flex
justify-center
items-center
fixed
right-12
bottom-10
cursor-pointer
bg-primary
rounded-full
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

export default RoundIconButton;
