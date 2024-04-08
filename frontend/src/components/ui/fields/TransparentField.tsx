import React, { forwardRef, InputHTMLAttributes } from 'react';

type TypeTransparentField = InputHTMLAttributes<HTMLInputElement>


export const TransparentField = forwardRef<
  HTMLInputElement,
  TypeTransparentField
>(({ className, ...rest }, ref) => {
  return (
    <input
      className={`bg-transparent border-none focus:outline-0 focus:shadow-transparent w-full ${className}`}
      autoComplete="off"
      {...rest}
      ref={ref}
    />
  )
})

TransparentField.displayName = 'TransparentField'
