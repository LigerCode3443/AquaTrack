import styled from "styled-components";

const WrapperForPublicRoutes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  @media only screen and (min-width: 1440px) {
    flex-direction: row;
    gap: 32px;
  }
`;

export default WrapperForPublicRoutes;
