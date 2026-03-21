export interface ItemInfo {
  barcode: string;
  productName: string;
  genericName: GenericNameInfo[];
  unitSize: number;
  unitType: string;
}

export interface GenericNameInfo {
  id: string;
  name: string;
}

export interface BarcodeLookupResponse {
  doesItemExist: boolean;
  item: ItemInfo
}
