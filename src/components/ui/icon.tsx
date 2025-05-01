
import React from 'react';
import * as LucideIcons from 'lucide-react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: keyof typeof LucideIcons;
  size?: number;
  strokeWidth?: number;
  fallback?: keyof typeof LucideIcons;
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, size = 24, strokeWidth = 2, className, fallback = "CircleAlert", ...props }, ref) => {
    const IconComponent = LucideIcons[name] || LucideIcons[fallback];

    return (
      <IconComponent
        ref={ref}
        size={size}
        strokeWidth={strokeWidth}
        className={className}
        {...props}
      />
    );
  }
);

Icon.displayName = "Icon";

export default Icon;
