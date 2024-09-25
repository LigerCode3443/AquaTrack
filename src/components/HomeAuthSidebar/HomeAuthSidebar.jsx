import styled from "styled-components";

const HomeAuthSidebar = styled.div`
  border-radius: 30px;
  background-color: #f0eff4;
  max-width: 343px;
  height: 780px;

  @media only screen and (min-width: 768px) {
    max-width: 704px;
    height: 960px;
  }

  @media only screen and (min-width: 1440px) {
    max-width: 672px;
    height: 736px;
  }
`;

export default HomeAuthSidebar;
