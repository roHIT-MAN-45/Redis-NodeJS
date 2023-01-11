import React from "react";

// Styled Components
import styled from "styled-components";

// Twin Macro
import tw from "twin.macro";

function Input({
  id,
  name,
  type,
  placeholder,
  value,
  handleOnChange,
  error,
  styles,
}) {
  return (
    <InputContainer customStyles={styles}>
      {error ? (
        <InputField
          id={id}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleOnChange}
          showError={true} // Error prop
        />
      ) : (
        <InputField
          id={id}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleOnChange}
        />
      )}

      {error && <Message>{error}</Message>}
    </InputContainer>
  );
}

const InputContainer = styled.div`
  ${tw`
mb-6
`}

  ${(props) => props.customStyles && props.customStyles}
`;

const InputField = styled.input`
  ${tw`
block
w-full
px-3
py-1.5
text-base
font-normal
text-black
bg-white
bg-clip-padding
border 
border-solid 
border-gray
rounded
transition
ease-in-out
m-0
focus:text-black
focus:bg-white
focus:border-primary
focus:outline-none
`}

  border-color : ${(props) => props.showError && "rgb(239 68 68);"}
`;

const Message = styled.p`
  ${tw`
text-sm
my-1
text-red
`}
`;

export default Input;
