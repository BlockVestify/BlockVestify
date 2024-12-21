import React from 'react';
import { FileText, Image, File, MoreVertical } from 'lucide-react';
import { Asset } from '../../types/asset';
import AssetItem from './AssetItem';
import '../../styles/assets.css';

const mockAssets: Asset[] = [
  {
    id: '1',
    name: 'Q4 Financial Report.pdf',
    type: 'document',
    size: '2.4 MB',
    lastModified: '2024-03-10',
    owner: 'John Doe'
  },
  {
    id: '2',
    name: 'Marketing Banner.png',
    type: 'image',
    size: '4.1 MB',
    lastModified: '2024-03-09',
    owner: 'Jane Smith'
  },
  {
    id: '3',
    name: 'Product Roadmap.xlsx',
    type: 'spreadsheet',
    size: '1.8 MB',
    lastModified: '2024-03-08',
    owner: 'Mike Johnson'
  }
];

const AssetsList = () => {
  return (
    <div className="assets-container">
      <div className="assets-header">
        <h3>Recent Assets</h3>
        <button className="upload-button">Upload New</button>
      </div>
      
      <div className="assets-list">
        <div className="assets-list-header">
          <span>Name</span>
          <span>Owner</span>
          <span>Last Modified</span>
          <span>Size</span>
          <span></span>
        </div>
        
        {mockAssets.map(asset => (
          <AssetItem key={asset.id} asset={asset} />
        ))}
      </div>
    </div>
  );
};

export default AssetsList;