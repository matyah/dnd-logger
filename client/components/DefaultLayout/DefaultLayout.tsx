import classNames from 'classnames';
import React, { ComponentPropsWithoutRef, FC } from 'react';
import { NavBar } from '../NavBar';

interface DefaultLayoutProps extends ComponentPropsWithoutRef<'div'> {}

export const DefaultLayout: FC<DefaultLayoutProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <>
      <NavBar border>
        <NavBar.Brand>Brand !</NavBar.Brand>
        <NavBar.Toggle />
        <NavBar.Collapse>
          <NavBar.Link href="#">Home</NavBar.Link>
          <NavBar.Link href="#">About</NavBar.Link>
        </NavBar.Collapse>
      </NavBar>
      <div className={classNames('container m-auto', className)} {...rest}>
        {children}
      </div>
    </>
  );
};
