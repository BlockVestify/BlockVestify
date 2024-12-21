export interface Asset {
  id: string;
  name: string;
  type: 'document' | 'image' | 'spreadsheet' | string;
  size: string;
  lastModified: string;
  owner: string;
}