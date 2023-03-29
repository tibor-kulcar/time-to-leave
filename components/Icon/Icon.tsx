import React from 'react';

type IconProps = React.ComponentPropsWithoutRef<'svg'> & {
  icon: string;
};

const Icon = ({ icon, ...svgProps }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      viewBox="0 0 24 24"
      {...svgProps}
    >
      <path d={icon} fill="#fff" />
    </svg>
  );
};

export default Icon;
