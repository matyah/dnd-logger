import React, { ComponentPropsWithoutRef, FC, ReactNode } from 'react';

export interface SignLayoutProps extends ComponentPropsWithoutRef<'div'> {
  imgSrc?: string;
  brand?: ReactNode;
  description?: ReactNode;
}

export const SignLayout: FC<SignLayoutProps> = ({
  imgSrc,
  brand = 'Dungeon Logger',
  description,
  children,
  ...props
}) => {
  return (
    <div className="bg-white dark:bg-gray-900" {...props}>
      <div className="flex justify-center h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage: `url(${imgSrc})`,
          }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              {brand && (
                <h2 className="text-4xl font-bold text-white">{brand}</h2>
              )}

              {description && (
                <p className="max-w-xl mt-3 text-gray-300">{description}</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
};
