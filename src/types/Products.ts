import type { User } from "./User";// Importamos el tipo user

export interface Item {
  id: number;// Agregamos id, ya que ese es su identificador dentro de la BD y sobre el haremos los metodos update, delete y get (particular)
  itemName: string;
  itemDescription: string;
  itemPrice: number;
  itemSku: string;
  itemImage: string;
  itemStock: number;
  quantity?: number; 
  categoryId?: number;
  user: User; // Utilizamos user
  category: Category // Utilizamos el tipo category
}

export interface Category {
  id: number;
  name: string;
}