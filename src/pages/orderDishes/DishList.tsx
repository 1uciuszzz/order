import {
  IonButton,
  IonButtons,
  IonCol,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonListHeader,
  IonRow,
  IonText,
  IonThumbnail,
} from "@ionic/react";
import { API_DISH, Dish } from "../../apis/dish";
import { addCircleOutline, removeCircleOutline } from "ionicons/icons";
import { useImmer } from "use-immer";
import { OrderDish } from "../../apis/order";
import { useQuery } from "@tanstack/react-query";
import LoadingSkeleton from "../../components/LoadingSkeleton";

type DishItemProps = {
  dish: Dish;
  orderDishes: OrderDish[];
  addDish: (dish: OrderDish) => void;
  removeDish: (dishId: string) => void;
};

const DishItem = ({
  dish,
  orderDishes,
  addDish,
  removeDish,
}: DishItemProps) => {
  const {
    isPending: coverIsPending,
    data: cover,
    isError: coverIsError,
    error: coverError,
  } = useQuery({
    queryKey: ["cover", dish.cover],
    queryFn: () => API_DISH.GET_COVER(dish.cover),
  });

  if (coverIsPending) {
    return <LoadingSkeleton />;
  }

  if (coverIsError) {
    return <IonText color="danger">{coverError.message}</IonText>;
  }

  return (
    <IonItem>
      <img
        slot="start"
        className="w-20 h-20 object-cover"
        src={`data:image/png;base64,${cover}`}
      />
      <IonCol>
        <IonLabel>{dish.name}</IonLabel>
        <IonLabel>￥{dish.price}</IonLabel>
      </IonCol>
      <IonRow slot="end">
        <IonButtons>
          {orderDishes.findIndex(
            (orderDish) => orderDish.dishId === dish.id
          ) !== -1 && (
            <>
              <IonButton onClick={() => removeDish(dish.id)}>
                <IonIcon slot="icon-only" icon={removeCircleOutline} />
              </IonButton>
              <IonLabel>
                {
                  orderDishes.find((orderDish) => orderDish.dishId === dish.id)
                    ?.quantity
                }
              </IonLabel>
            </>
          )}
          <IonButton
            onClick={() =>
              addDish({
                dishId: dish.id,
                dishName: dish.name,
                dishPrice: +dish.price,
                quantity: 1,
              })
            }
          >
            <IonIcon slot="icon-only" icon={addCircleOutline} />
          </IonButton>
        </IonButtons>
      </IonRow>
    </IonItem>
  );
};

type DishListProps = {
  types: string[];
  dishes: Dish[];
  orderDishes: OrderDish[];
  addDish: (dish: OrderDish) => void;
  removeDish: (dishId: string) => void;
};

const DishList = ({
  types,
  dishes,
  orderDishes,
  addDish,
  removeDish,
}: DishListProps) => {
  return (
    <IonList className="flex-1">
      {types.map((type) => {
        return (
          <IonItemGroup key={type}>
            <IonItemDivider>
              <IonLabel>{type}</IonLabel>
            </IonItemDivider>
            {dishes
              .filter((dish) => dish.type === type)
              .map((dish) => {
                return (
                  <DishItem
                    key={dish.id}
                    dish={dish}
                    orderDishes={orderDishes}
                    addDish={addDish}
                    removeDish={removeDish}
                  />
                );
              })}
          </IonItemGroup>
        );
      })}
    </IonList>
  );
};

export default DishList;
