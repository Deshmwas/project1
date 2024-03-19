export interface OrderViewModel {
 productId: number;
  userId: number;
  productName: string;
  userName: string;
  quantity?: number;
  totalPrice?: number;
  status?: string;
  shippingDate?: string;
  shippingAddress?: string;
  orderDate?: string;
}

