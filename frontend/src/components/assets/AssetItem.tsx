import React from 'react';
import { FileText, Image, File, MoreVertical } from 'lucide-react';
import { Asset } from '../../types/asset';

interface AssetItemProps {
  asset: Asset;
}

const AssetItem = ({ asset }: AssetItemProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText size={20} className="asset-icon document" />;
      case 'image':
        return <Image size={20} className="asset-icon image" />;
      default:
        return <File size={20} className="asset-icon default" />;
    }
  };

  return (
    <div className="asset-item">
      <div className="asset-name">
        {getIcon(asset.type)}
        <span>{asset.name}</span>
      </div>
      <div className="asset-owner">{asset.owner}</div>
      <div className="asset-date">{asset.lastModified}</div>
      <div className="asset-size">{asset.size}</div>
      <button className="asset-actions">
        <MoreVertical size={16} />
      </button>
    </div>
  );
};

export default AssetItem;