export type Dish = {
  id: string;
  name: string;
  description: string;
  cover: string;
  type: string;
  createdAt: string;
};

export type DishList = Dish[];

import { Directory, Encoding, Filesystem } from "@capacitor/filesystem";
import { v4 as uuid } from "uuid";
import getSha256 from "../utils/getSha256";

export type AddDish = {
  name: string;
  description: string;
  cover: string;
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
          return Filesystem.readFile({
            path: `dishes/${file.name}`,
            directory: Directory.Data,
            encoding: Encoding.UTF8,
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
    try {
      const id = uuid();
      const sha256 = await getSha256(payload.cover);
      const coverContent = payload.cover.split(",")[1];
      await Filesystem.writeFile({
        path: `covers/${sha256}`,
        data: coverContent,
        directory: Directory.Data,
      });
      const newDish: Dish = {
        id: id,
        name: payload.name,
        description: payload.description,
        cover: sha256,
        type: payload.type,
        createdAt: new Date().toISOString(),
      };
      const path = `dishes/${id}`;
      await Filesystem.writeFile({
        path,
        data: JSON.stringify(newDish),
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      });
      return newDish;
    } catch {
      throw new Error("新增菜品失败");
    }
  },
  UPDATE: async (payload: UpdateDish) => {
    try {
      const sha256 = await getSha256(payload.cover);
      const coverContent = payload.cover.split(",")[1];
      await Filesystem.writeFile({
        path: `covers/${sha256}`,
        data: coverContent,
        directory: Directory.Data,
      });
      const updatedDish: Dish = {
        id: payload.id,
        name: payload.name,
        description: payload.description,
        cover: sha256,
        type: payload.type,
        createdAt: new Date().toISOString(),
      };
      const path = `dishes/${payload.id}`;
      await Filesystem.writeFile({
        path,
        data: JSON.stringify(updatedDish),
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      });
      return updatedDish;
    } catch {
      throw new Error("更新菜品失败");
    }
  },
  DELETE: async (id: string): Promise<boolean> => {
    try {
      const path = `dishes/${id}`;
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
      const path = `dishes/${id}`;
      const file = await Filesystem.readFile({
        path,
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      });
      return JSON.parse(file.data as string) as Dish;
    } catch {
      throw new Error("获取菜品失败");
    }
  },
  GET_COVER: async (sha256: string) => {
    try {
      const file = await Filesystem.readFile({
        path: `covers/${sha256}`,
        directory: Directory.Data,
      });
      return file.data as string;
    } catch {
      throw new Error("读取图片失败");
    }
  },
};
