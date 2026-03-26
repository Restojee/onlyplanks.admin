import React from 'react';

interface ChooseProps {
   
  children: React.ReactNode;
}

interface WhenProps {
  condition: boolean;
  children: React.ReactNode;
}

interface OtherwiseProps {
  children: React.ReactNode;
}






















 
export const Choose: React.FC<ChooseProps> = ({ children }) => {
  const childrenArray = React.Children.toArray(children);

  for (const child of childrenArray) {
    if (React.isValidElement<WhenProps>(child) && child.type === When) {
      if (child.props.condition) {
        return <>{child.props.children}</>;
      }
    }
  }

  for (const child of childrenArray) {
    if (React.isValidElement<OtherwiseProps>(child) && child.type === Otherwise) {
      return <>{child.props.children}</>;
    }
  }
  
  return null;
};



 
export const When: React.FC<WhenProps> = ({ children }) => {
  return <>{children}</>;
};
export const Otherwise: React.FC<OtherwiseProps> = ({ children }) => {
  return <>{children}</>;
};
