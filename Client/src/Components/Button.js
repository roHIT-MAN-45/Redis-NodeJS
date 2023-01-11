import React from "react";

// Styled Components
import styled from "styled-components";

// Twin Macro
import tw from "twin.macro";

function Button({ disable, text, onClick, styles }) {
  return (
    <Container
      type="button"
      onClick={onClick}
      customStyles={styles}
      disabled={disable}
    >
      {text}
    </Container>
  );
}

const Container = styled.button`
  ${tw`
w-full
px-6
py-3
bg-primary
text-white
font-medium
text-lg
leading-tight
uppercase
rounded
shadow-md
hover:bg-darkPrimary hover:shadow-lg
focus:bg-darkPrimary focus:shadow-lg focus:outline-none focus:ring-0
active:bg-darkPrimary active:shadow-lg
transition
duration-150
ease-in-out
`}

  ${(props) => props.customStyles && props.customStyles}
`;

export default Button;
