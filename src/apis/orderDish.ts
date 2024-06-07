import { v4 as uuid } from "uuid";

export type OrderDish = {
  id: string;
  orderId: string;
  dishId: string;
  count: number;
};

export type OrderDishList = OrderDish[];

const ORDER_DISHES: OrderDishList = [];

export type AddOrderDish = {
  orderId: string;
  dishId: string;
  count: number;
};

export const API_ORDER_DISH = {
  ADD: (payload: AddOrderDish) => {
    return new Promise<OrderDish>((resolve) => {
      setTimeout(() => {
        const newOrderDish: OrderDish = {
          id: uuid(),
          dishId: payload.dishId,
          orderId: payload.orderId,
          count: payload.count,
        };
        ORDER_DISHES.push(newOrderDish);
        resolve(newOrderDish);
      }, 1000);
    });
  },
  List: (orderId: string) => {
    return new Promise<OrderDishList>((resolve) => {
      setTimeout(() => {
        resolve(
          ORDER_DISHES.filter((orderDish) => orderDish.orderId === orderId)
        );
      }, 1000);
    });
  },
  DELETE: (id: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const index = ORDER_DISHES.findIndex(
          (orderDish) => orderDish.id === id
        );
        if (index > -1) {
          ORDER_DISHES.splice(index, 1);
          resolve();
        }
      }, 1000);
    });
  },
  ADD_COUNT: (id: string) => {
    return new Promise<OrderDish>((resolve) => {
      setTimeout(() => {
        const index = ORDER_DISHES.findIndex(
          (orderDish) => orderDish.id === id
        );
        if (index > -1) {
          ORDER_DISHES[index].count += 1;
          resolve(ORDER_DISHES[index]);
        }
      }, 1000);
    });
  },
  SUB_COUNT: (id: string) => {
    return new Promise<OrderDish>((resolve) => {
      setTimeout(() => {
        const index = ORDER_DISHES.findIndex(
          (orderDish) => orderDish.id === id
        );
        if (index > -1) {
          ORDER_DISHES[index].count -= 1;
          resolve(ORDER_DISHES[index]);
        }
      }, 1000);
    });
  },
};
