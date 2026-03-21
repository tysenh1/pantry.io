export interface ItemInfo {
  barcode: string;
  productName: string;
  genericName: GenericNameInfo | GenericNameInfo[];
  unitSize: number;
  unitType: string;
}

export interface GenericNameInfo {
  id: string;
  name: string;
}
