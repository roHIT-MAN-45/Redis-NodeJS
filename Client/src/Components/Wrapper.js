import React from "react";

// Styled Components
import styled from "styled-components";

// Twin Macro
import tw from "twin.macro";

function Wrapper({ children }) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  ${tw`
w-screen
h-screen
lg:px-16
md:px-10
px-6
`}
`;

export default Wrapper;
