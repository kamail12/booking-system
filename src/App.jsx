import React from 'react';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';

const H1 = styled.h1`
  font-size: xx-large;
  font-weight: bold;
  color: var(--color-brand-500);
`;

const App = () => {
  return (
    <>
      <GlobalStyles />
      <div>
        <H1>App</H1>
      </div>
    </>
  );
};

export default App;
