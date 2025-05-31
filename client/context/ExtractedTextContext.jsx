'use client';

import { createContext, useContext, useState } from 'react';

const ExtractedTextContext = createContext();

export const ExtractedTextProvider = ({ children }) => {
  const [extractedText, setExtractedText] = useState('');

  return (
    <ExtractedTextContext.Provider value={{ extractedText, setExtractedText }}>
      {children}
    </ExtractedTextContext.Provider>
  );
};

export const useExtractedText = () => {
  const context = useContext(ExtractedTextContext);
  if (!context) {
    throw new Error('useExtractedText must be used within an ExtractedTextProvider');
  }
  return context;
};
