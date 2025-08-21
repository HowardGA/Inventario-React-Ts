export interface Item {
  itemName: string;
  itemDescription: string;
  itemPrice: number;
  itemSku: string;
  itemImage: string;
  itemStock: number;
  quantity?: number; 
}