import React from "react";

// React Router
import { NavLink } from "react-router-dom";

// Styled Components
import styled from "styled-components";

// Twin Macro
import tw from "twin.macro";

// Assets
import HomeImage from "../assets/Images/hero.svg";

function Home() {
  return (
    <Container>
      <SubContainer>
        <Heading>
          <Mark>Ultimate</Mark> combo for
          <br className="hidden lg:inline-block" />
          building fast, scalable apps
        </Heading>

        <Paragraph>
          Redis-powered app for superior speed and reliability. Get things done
          faster and more efficiently with this top-performing architecture.
        </Paragraph>

        <ButtonContainer>
          <NavLink
            to="/"
            className="inline-flex text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-darkPrimary rounded text-lg"
          >
            Get Started
          </NavLink>

          <NavLink
            to="/signup"
            className="ml-4 inline-flex text-dark bg-gray border-0 py-2 px-6 focus:outline-none hover:bg-darkGray hover:text-white rounded text-lg"
          >
            Signup
          </NavLink>
        </ButtonContainer>
      </SubContainer>

      <ImageContainer>
        <Image alt="hero" src={HomeImage} />
      </ImageContainer>
    </Container>
  );
}

const Container = styled.div`
  ${tw`
container
mx-auto
flex
px-5
py-16
md:flex-row
flex-col
items-center
`}
`;

const SubContainer = styled.div`
  ${tw`
lg:flex-grow
md:w-1/2
lg:pr-24
md:pr-16
flex
flex-col
md:items-start
md:text-left
mb-16
md:mb-0
items-center
text-center
`}
`;

const Heading = styled.h1`
  ${tw`
sm:text-4xl
text-3xl
mb-4
font-semibold
text-dark
`}
`;

const Mark = styled.span`
  ${tw`
text-primary
`}
`;

const Paragraph = styled.div`
  ${tw`
text-lg
mb-8
leading-relaxed
text-darkGray
`}
`;

const ButtonContainer = styled.div`
  ${tw`
flex
justify-center
`}
`;

const ImageContainer = styled.div`
  ${tw`
lg:max-w-lg
lg:w-full
md:w-1/2
w-5/6
`}
`;

const Image = styled.img`
object-cover
object-center
rounded
`;

export default Home;
