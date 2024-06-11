import { v4 as uuid } from "uuid";

export type OrderStatus = "pending" | "completed" | "cancelled";

export type Order = {
  id: string;
  name: string;
  status: OrderStatus;
  createdAt: string;
};

export type OrderList = Order[];

export type AddOrder = {
  name: string;
  status: OrderStatus;
};

const ORDER_LIST: OrderList = [
  {
    id: "1",
    name: "订单1",
    status: "pending",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "订单2",
    status: "completed",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "订单3",
    status: "cancelled",
    createdAt: new Date().toISOString(),
  },
];

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
          name: payload.name,
          status: payload.status,
          createdAt: new Date().toISOString(),
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
