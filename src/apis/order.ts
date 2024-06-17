import { Directory, Encoding, Filesystem } from "@capacitor/filesystem";
import { v4 as uuid } from "uuid";

export type OrderDish = {
  dishId: string;
  dishName: string;
  quantity: number;
};

export type Order = {
  id: string;
  dishes: OrderDish[];
  createdAt: string;
};

export type OrderList = Order[];

export type AddOrder = {
  dishes: OrderDish[];
};

export const API_ORDER = {
  LIST: async (): Promise<OrderList> => {
    try {
      const dir = await Filesystem.readdir({
        path: `orders`,
        directory: Directory.Data,
      });
      const files = await Promise.all(
        dir.files.map((file) => {
          return Filesystem.readFile({
            path: `orders/${file.name}`,
            directory: Directory.Data,
            encoding: Encoding.UTF8,
          });
        })
      );
      const list = files.map(
        (file) => JSON.parse(file.data as string) as Order
      );
      list.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
      return list;
    } catch {
      throw new Error("获取订单列表失败");
    }
  },
  ADD: async (payload: AddOrder) => {
    try {
      const id = uuid();
      const newOrder: Order = {
        id,
        dishes: payload.dishes,
        createdAt: new Date().toISOString(),
      };
      await Filesystem.writeFile({
        path: `orders/${id}`,
        data: JSON.stringify(newOrder),
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      });
      return newOrder;
    } catch {
      throw new Error("新增订单失败");
    }
  },
  DELETE: async (id: string) => {
    try {
      await Filesystem.deleteFile({
        path: `orders/${id}`,
        directory: Directory.Data,
      });
      return true;
    } catch {
      throw new Error("删除订单失败");
    }
  },
  GET: async (id: string) => {
    try {
      const file = await Filesystem.readFile({
        path: `orders/${id}`,
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      });
      return JSON.parse(file.data as string) as Order;
    } catch {
      throw new Error("获取订单失败");
    }
  },
};
