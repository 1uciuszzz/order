export type Dish = {
  id: string;
  name: string;
  description: string;
  cover: string;
  price: string;
  type: string;
  createdAt: string;
};

export type DishList = Dish[];

import { Directory, Filesystem } from "@capacitor/filesystem";
import { v4 as uuid } from "uuid";

export type AddDish = {
  name: string;
  description: string;
  cover: string;
  price: string;
  type: string;
};

export type UpdateDish = AddDish & { id: string };

type ListDishResponse = {
  list: DishList;
  type: string[];
};

export const API_DISH = {
  LIST: async (): Promise<ListDishResponse> => {
    try {
      const dir = await Filesystem.readdir({
        path: `dishes`,
        directory: Directory.Data,
      });
      const files = await Promise.all(
        dir.files.map((file) => {
          console.log(file);
          return Filesystem.readFile({
            path: `dishes/${file.name}`,
            directory: Directory.Data,
          });
        })
      );
      const list = files.map((file) => JSON.parse(file.data as string) as Dish);
      const type = Array.from(new Set(list.map((dish) => dish.type)));
      return { list, type };
    } catch {
      throw new Error("获取菜品列表失败");
    }
  },
  ADD: async (payload: AddDish): Promise<Dish> => {
    console.log(payload);

    try {
      const id = uuid();
      const newDish: Dish = {
        id: id,
        name: payload.name,
        description: payload.description,
        price: payload.price,
        cover: payload.cover,
        type: payload.type,
        createdAt: new Date().toISOString(),
      };
      const path = `dishes/${id}.json`;
      await Filesystem.writeFile({
        path,
        data: JSON.stringify(newDish),
        directory: Directory.Data,
      });
      return newDish;
    } catch {
      throw new Error("添加菜品失败");
    }
  },
  UPDATE: async (payload: UpdateDish) => {
    try {
      const updatedDish: Dish = {
        id: payload.id,
        name: payload.name,
        description: payload.description,
        price: payload.price,
        cover: payload.cover,
        type: payload.type,
        createdAt: new Date().toISOString(),
      };
      const path = `dishes/${payload.id}.json`;
      await Filesystem.writeFile({
        path,
        data: JSON.stringify(updatedDish),
        directory: Directory.Data,
      });
      return updatedDish;
    } catch {
      throw new Error("更新菜品失败");
    }
  },
  DELETE: async (id: string): Promise<boolean> => {
    try {
      const path = `dishes/${id}.json`;
      await Filesystem.deleteFile({
        path,
        directory: Directory.Data,
      });
      return true;
    } catch {
      throw new Error("删除菜品失败");
    }
  },
  GET: async (id: string): Promise<Dish> => {
    try {
      const path = `dishes/${id}.json`;
      const file = await Filesystem.readFile({
        path,
        directory: Directory.Data,
      });
      return JSON.parse(file.data as string) as Dish;
    } catch {
      throw new Error("获取菜品失败");
    }
  },
};
