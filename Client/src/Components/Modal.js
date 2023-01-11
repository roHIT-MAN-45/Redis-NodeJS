import React from "react";

// Styled Components
import styled from "styled-components";

// Twin Macro
import tw from "twin.macro";

const Modal = ({ children }) => {
  return (
    <Container>
      {/* Overlay */}
      <Overlay />

      {/* Modal Container  */}
      <ModalContainer>
        {/* Modal Wrapper  */}
        <ModalWrapper>
          {/* Children Wrapper */}
          <ChildrenWrapper>{children}</ChildrenWrapper>
        </ModalWrapper>
      </ModalContainer>
    </Container>
  );
};

const Container = styled.div`
  ${tw`
  relative
  z-10
  `}
`;

const Overlay = styled.div`
  ${tw`
fixed
inset-0
bg-overlay
bg-opacity-60
transition-opacity
`}
`;

const ModalContainer = styled.div`
  ${tw`
fixed
inset-0
z-10
overflow-y-auto
`}
`;

const ModalWrapper = styled.div`
  ${tw`
flex
min-h-full
items-center
justify-center
p-4
text-center
sm:items-center
sm:p-0
`}
`;

const ChildrenWrapper = styled.div`
  ${tw`
relative
transform
overflow-hidden
rounded-lg
bg-white
text-left
shadow-xl
transition-all
sm:my-8
sm:w-full
sm:max-w-lg
`}
`;

export default Modal;
