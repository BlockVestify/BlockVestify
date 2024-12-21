import React from 'react';
import { LucideIcon } from 'lucide-react';

interface WidgetProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  color?: string;
}

const Widget = ({ title, value, description, icon: Icon, color = '#2563eb' }: WidgetProps) => {
  return (
    <div className="widget">
      <div className="widget-header">
        <h3 className="widget-title">{title}</h3>
        <Icon size={24} color={color} />
      </div>
      <div className="widget-value" style={{ color }}>{value}</div>
      <p className="widget-description">{description}</p>
    </div>
  );
};

export default Widget;