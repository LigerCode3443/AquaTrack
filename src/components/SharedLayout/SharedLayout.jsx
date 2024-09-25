import {Outlet} from "react-router";
import Container from "../Container/Container";

const SharedLayout = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};
export default SharedLayout;
