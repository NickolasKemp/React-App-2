import React, { createContext, useEffect, useState } from 'react';
import ProviderWrapper from './ProviderWrapper';
export const AppContext = createContext<any>(null)
const Context = () => {

  return (
    <AppContext.Provider value={ { } }>
      <ProviderWrapper/>
    </AppContext.Provider>
  );
};

export default Context;