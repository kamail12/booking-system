import styled from 'styled-components';
import Logo from './Logo';
import MainNav from './MainNav';
import { useState } from 'react';

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledSidebarMobile = styled.aside`
  background-color: var(--color-grey-0);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  flex-direction: column;
  gap: 3.2rem;
  z-index: 10;
`;

const StyledButton = styled.button`
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 999;
  padding: 4px 8px;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  outline: none;
  &:focus {
    outline: none;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <StyledButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '❌' : '🟰'}
      </StyledButton>
      <StyledSidebar>
        <Logo />
        <MainNav closeSidebar={closeSidebar} />
      </StyledSidebar>
      <StyledSidebarMobile isOpen={isOpen}>
        <Logo />
        <MainNav closeSidebar={closeSidebar} />
      </StyledSidebarMobile>
    </>
  );
};

export default Sidebar;
