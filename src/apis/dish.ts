export type Dish = {
  id: string;
  name: string;
  description: string;
  cover: string;
  price: string;
  type: string;
  createdAt: string;
  updatedAt: string;
};

export type DishList = Dish[];

import { v4 as uuid } from "uuid";

const DISH_LIST: DishList = [
  {
    id: uuid(),
    name: "拔丝土豆",
    description: "拔丝土豆是一道色香味俱全的特色名菜，属于鲁菜系",
    cover: "/temp/covers/1.jpeg",
    price: "38",
    type: "鲁菜",
    createdAt: "2021-09-01T00:00:00Z",
    updatedAt: "2021-09-01T00:00:00Z",
  },
  {
    id: uuid(),
    name: "白灼菜心",
    description:
      "白灼菜心是经典粤菜，白灼是粤菜的一种烹饪技法，用煮沸的水或汤将生的食物烫熟，称为白灼。这种烹饪手法能保持原有的鲜味，粤菜常用此法烹制虾和蔬菜。",
    cover: "/temp/covers/2.jpg",
    price: "28",
    type: "粤菜",
    createdAt: "2021-09-01T00:00:00Z",
    updatedAt: "2021-09-01T00:00:00Z",
  },
  {
    id: uuid(),
    name: "包菜炒鸡蛋粉丝",
    description: "包菜炒鸡蛋粉丝，是中国的一道日常生活中所熟知的菜品",
    cover: "/temp/covers/3.jpg",
    price: "18",
    type: "川菜",
    createdAt: "2021-09-01T00:00:00Z",
    updatedAt: "2021-09-01T00:00:00Z",
  },
  {
    id: uuid(),
    name: "菠菜炒鸡蛋",
    description: "这道菜难度系数简单，营养丰富。",
    cover: "/temp/covers/4.jpg",
    price: "15",
    type: "川菜",
    createdAt: "2021-09-01T00:00:00Z",
    updatedAt: "2021-09-01T00:00:00Z",
  },
];

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
  LIST: async () => {
    return new Promise<ListDishResponse>((resolve) => {
      const types = new Set(DISH_LIST.map((dish) => dish.type));
      setTimeout(() => {
        resolve({
          list: DISH_LIST,
          type: Array.from(types),
        });
      }, 1000);
    });
  },
  ADD: (payload: AddDish) => {
    return new Promise<Dish>((resolve) => {
      setTimeout(() => {
        const newDish: Dish = {
          id: uuid(),
          ...payload,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        DISH_LIST.push(newDish);
        resolve(newDish);
      }, 1000);
    });
  },
  UPDATE: (payload: UpdateDish) => {
    return new Promise<Dish>((resolve) => {
      setTimeout(() => {
        const index = DISH_LIST.findIndex((dish) => dish.id === payload.id);
        if (index > -1) {
          DISH_LIST[index] = {
            ...DISH_LIST[index],
            ...payload,
            updatedAt: new Date().toISOString(),
          };
          resolve(DISH_LIST[index]);
        }
      }, 1000);
    });
  },
  DELETE: (id: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const index = DISH_LIST.findIndex((dish) => dish.id === id);
        if (index > -1) {
          DISH_LIST.splice(index, 1);
        }
        resolve();
      }, 1000);
    });
  },
  GET: (id: string) => {
    return new Promise<Dish | undefined>((resolve) => {
      setTimeout(() => {
        resolve(DISH_LIST.find((dish) => dish.id === id));
      }, 1000);
    });
  },
};
