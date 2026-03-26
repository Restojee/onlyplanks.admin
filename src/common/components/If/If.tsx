import React from 'react';

interface IfProps {
   
  condition: boolean;
   
  children: React.ReactNode;
   
  else?: React.ReactNode;
}

















 
export const If: React.FC<IfProps> = ({ condition, children, else: elseContent }) => {
  return <>{condition ? children : elseContent ?? null}</>;
};
