export interface Item {
  id?: string;
  barcode: string;
  productName: string;
  genericName: string;
  unitSize: number;
  unitType: string
  allergens?: string[];
}
