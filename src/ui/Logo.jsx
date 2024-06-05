import styled from 'styled-components';
import LogoLight from '../assets/react.svg';

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src={LogoLight} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
