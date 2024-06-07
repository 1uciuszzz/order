import { v4 as uuid } from "uuid";

export type Order = {
  id: string;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type OrderList = Order[];

const ORDER_LIST: OrderList = [];

export type AddOrder = {
  name: string;
  status: string;
};

export const API_ORDER = {
  LIST: () => {
    return new Promise<OrderList>((resolve) => {
      setTimeout(() => {
        resolve(ORDER_LIST);
      }, 1000);
    });
  },
  ADD: (payload: AddOrder) => {
    return new Promise<Order>((resolve) => {
      setTimeout(() => {
        const newOrder: Order = {
          id: uuid(),
          ...payload,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        ORDER_LIST.push(newOrder);
        resolve(newOrder);
      }, 1000);
    });
  },
  UPDATE: () => {},
  DELETE: (id: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const index = ORDER_LIST.findIndex((order) => order.id === id);
        if (index > -1) {
          ORDER_LIST.splice(index, 1);
          resolve();
        }
      }, 1000);
    });
  },
};
