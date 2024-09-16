import styled from "styled-components";
import mob1x from "../../img/homeLoginRegister/mobile/women@1x.png";
import mob2x from "../../img/homeLoginRegister/mobile/women@2x.png";
import tab1x from "../../img/homeLoginRegister/tablet/women@1x.png";
import tab2x from "../../img/homeLoginRegister/tablet/women@2x.png";
import desk1x from "../../img/homeLoginRegister/desk/women@1x.png";
import desk2x from "../../img/homeLoginRegister/desk/women@2x.png";

const WrapperAdvantages = styled.div`
  background-image: url(${mob1x});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  max-width: 343px;
  padding: 209px 16px 32px 16px;
  flex-grow: 1;
  border-radius: 30px;

  @media screen and (min-resolution: 192dpi) {
    background-image: url(${mob2x});
  }

  @media only screen and (min-width: 768px) {
    background-image: url(${tab1x});
    max-width: 704px;
    padding: 283px 32px 32px 32px;

    @media screen and (min-resolution: 192dpi) {
      background-image: url(${tab2x});
    }
  }

  @media only screen and (min-width: 1440px) {
    background-image: url(${desk1x});
    max-width: 672px;
    padding: 537px 32px 64px 32px;

    @media screen and (min-resolution: 192dpi) {
      background-image: url(${desk2x});
    }
  }
`;

export default WrapperAdvantages;
