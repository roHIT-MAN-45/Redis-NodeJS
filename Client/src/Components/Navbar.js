import React, { useContext } from "react";

// React Router
import { NavLink } from "react-router-dom";

// React Icons
import { AiFillThunderbolt } from "react-icons/ai";

// Context API
import { AuthContext } from "../Context/AuthContext";

// Styled Components
import styled from "styled-components";

// Twin Macro
import tw from "twin.macro";

const Navbar = () => {
  // Accessing state from context
  const { userDetails } = useContext(AuthContext);
  return (
    <Container>
      <Logo>
        <BrandIcon>
          <AiFillThunderbolt size={25} />
        </BrandIcon>

        <BrandName>RedNode</BrandName>
      </Logo>

      <Nav>
        <NavLink to="/" className="mr-5 text-dark hover:text-primary">
          Home
        </NavLink>
        {userDetails?._id && (
          <NavLink to="/social" className="mr-5 text-dark hover:text-primary">
            Social
          </NavLink>
        )}
      </Nav>

      <NavLink
        to="/login"
        className="text-white inline-flex items-center bg-primary border-0 py-1 px-3 focus:outline-none hover:bg-darkPrimary rounded text-base mt-4 md:mt-0"
      >
        Login
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="w-4 h-4 ml-1"
          viewBox="0 0 24 24"
        >
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </NavLink>
    </Container>
  );
};

const Container = styled.div`
  ${tw`
container
mx-auto
flex
flex-wrap
p-5
flex-col
md:flex-row
items-center
z-10
`}
`;

const Logo = styled.a`
  ${tw`
flex
text-gray
font-medium
items-center
mb-4
md:mb-0
`}
`;

const BrandIcon = styled.span`
  ${tw`
  w-10
  h-10
  text-white
  p-2
  bg-primary
  rounded-full
`}
`;

const BrandName = styled.span`
  ${tw`
text-black
ml-3
font-semibold
text-2xl
`}
`;

const Nav = styled.nav`
  ${tw`
md:ml-auto
flex
flex-wrap
items-center
text-base
justify-center
`}
`;

export default Navbar;
