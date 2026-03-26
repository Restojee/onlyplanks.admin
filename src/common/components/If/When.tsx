import React from 'react';

interface WhenProps {
   
  condition: boolean;
   
  children: React.ReactNode;
}










 
export const When: React.FC<WhenProps> = ({ condition, children }) => {
  return <>{condition ? children : null}</>;
};
