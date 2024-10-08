import { Link } from '@lib/navigation';
import cx from 'classnames';
import React, { PropsWithChildren } from 'react';

export type ButtonAsLinkProps = {
  link?: {
    href: string;
    external?: boolean;
  };
};

export type ButtonProps = {
  className?: string;
  variant?: 'primary' | 'danger' | 'success' | 'warning';
  square?: boolean;
  fullSize?: boolean;
  paddingLess?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonAsLinkProps;

const Button = React.forwardRef<HTMLElement, PropsWithChildren<ButtonProps>>(function Button(
  { className, variant, square, fullSize, paddingLess, type = 'button', link, children, ...props },
  ref
) {
  const getVariant = () => {
    switch (variant) {
      case 'primary':
        return 'bg-violet-500 hover:bg-violet-700 text-white';
      case 'danger':
        return 'bg-red-500 hover:bg-red-700 text-white';
      case 'success':
        return 'bg-green-500 hover:bg-green-700 text-white';
      case 'warning':
        return 'bg-amber-500 hover:bg-amber-700 text-white';
      default:
        return 'bg-transparent text-black';
    }
  };

  let Component: any = 'button';
  if (link) {
    if (link.external) {
      Component = 'a';
    } else {
      Component = Link;
    }
  }

  return (
    <Component
      ref={ref}
      href={link?.href}
      type={type}
      className={cx(
        {
          'min-w-full': fullSize,
          'min-w-max': !fullSize,
          'py-2 px-4': !paddingLess,
          'rounded-md': !square,
        },
        getVariant(),
        'transition duration-500 active:scale-95',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
});



export default Button;
