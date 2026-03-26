import { AutoClassOptions, getAutoClasses } from "@common/themes/common/utils";
import * as React from "react";




 
interface WithAutoClassesOptions<Props extends {} = {}> extends Pick<AutoClassOptions, 'bindings' | 'root' | 'styles'> {
  

 
  defaults?: Partial<Props>
}

export type WithAutoClassProps<T> = { autoClasses?: string } & T;





















 
const withAutoClasses = <Props extends Record<string, any>>(
  Component: React.ComponentType<Props>,
  options: WithAutoClassesOptions
) => {
  return React.forwardRef<HTMLElement, WithAutoClassProps<Props>>(
    (props: Props, ref) => {
      const propsForAutoClasses = { ...options.defaults, ...props }
      const autoClasses = getAutoClasses({
        props: propsForAutoClasses,
        bindings: options.bindings,
        root: options.root,
        styles: options.styles,
      });

       return <Component ref={ref} {...props} autoClasses={`${autoClasses} ${props.className}`} />;
    }
  );
};

export default withAutoClasses;
