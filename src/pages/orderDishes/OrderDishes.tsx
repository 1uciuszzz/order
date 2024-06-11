import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import { API_DISH } from "../../apis/dish";
import { useParams } from "react-router";
import TypesBar from "./TypesBar";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import DishList from "./DishList";
import {
  cartOutline,
  close,
  closeCircle,
  closeCircleOutline,
} from "ionicons/icons";
import { useImmer } from "use-immer";
import { OrderDish } from "../../apis/order";

type OrderDishesProps = {
  orderDishes: OrderDish[];
  addDish: (dish: OrderDish) => void;
  removeDish: (dishId: string) => void;
};

const OrderDishes = ({
  orderDishes,
  addDish,
  removeDish,
}: OrderDishesProps) => {
  const { isPending, data, isError, error } = useQuery({
    queryKey: ["dishes"],
    queryFn: () => API_DISH.LIST(),
  });

  if (isPending) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return <IonText color="danger">{error.message}</IonText>;
  }

  return (
    <IonRow>
      <TypesBar types={data.type} />
      <DishList
        types={data.type}
        dishes={data.list}
        orderDishes={orderDishes}
        addDish={addDish}
        removeDish={removeDish}
      />
    </IonRow>
  );
};

const OrderDishPage = () => {
  const [orderDish, setOrderDish] = useImmer<OrderDish[]>([]);

  const addDish = (dish: OrderDish) => {
    const index = orderDish.findIndex((d) => d.dishId == dish.dishId);
    if (index != -1) {
      setOrderDish((draft) => {
        draft[index].quantity += 1;
      });
    } else {
      setOrderDish((draft) => {
        draft.push(dish);
      });
    }
  };

  const removeDish = (dishId: string) => {
    const index = orderDish.findIndex((d) => d.dishId == dishId);
    if (index != -1) {
      setOrderDish((draft) => {
        draft[index].quantity -= 1;
        if (draft[index].quantity == 0) {
          draft.splice(index, 1);
        }
      });
    }
  };

  const clearDish = () => {
    setOrderDish(() => []);
  };

  return (
    <>
      <IonPage id="orderDishes">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton text="返回" />
            </IonButtons>
            <IonTitle>点菜</IonTitle>
            <IonButton slot="end" fill="clear" onClick={() => clearDish()}>
              清空
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen color="light">
          <OrderDishes
            addDish={addDish}
            removeDish={removeDish}
            orderDishes={orderDish}
          />

          <IonItem className="w-full fixed bottom-0 z-10">
            <IonMenuToggle>
              <IonButton className="h-full w-16" fill="solid" expand="full">
                <IonIcon slot="icon-only" icon={cartOutline} />
              </IonButton>
            </IonMenuToggle>
            <IonLabel className="mx-4">
              合计：￥
              {orderDish.reduce(
                (acc, dish) => acc + dish.dishPrice * dish.quantity,
                0
              )}
            </IonLabel>
            <IonButton slot="end" className="h-full" fill="solid" expand="full">
              提交订单
            </IonButton>
            <IonAlert
              header="Alert!"
              trigger="present-alert"
              buttons={[
                {
                  text: "Cancel",
                  role: "cancel",
                  handler: () => {
                    console.log("Alert canceled");
                  },
                },
                {
                  text: "OK",
                  role: "confirm",
                  handler: () => {
                    console.log("Alert confirmed");
                  },
                },
              ]}
              onDidDismiss={({ detail }) =>
                console.log(`Dismissed with role: ${detail.role}`)
              }
            ></IonAlert>
          </IonItem>
        </IonContent>
      </IonPage>

      <IonMenu contentId="orderDishes">
        <IonHeader>
          <IonToolbar>
            <IonTitle>已点菜品</IonTitle>
            <IonMenuToggle slot="end">
              <IonButton fill="clear">
                <IonIcon slot="icon-only" icon={close} />
              </IonButton>
            </IonMenuToggle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {orderDish.map((dish) => {
              return (
                <IonItem key={dish.dishId}>
                  <IonLabel>
                    {dish.quantity} × {dish.dishName}
                  </IonLabel>
                  <IonLabel slot="end">
                    ￥{dish.dishPrice * dish.quantity}
                  </IonLabel>
                </IonItem>
              );
            })}
          </IonList>
        </IonContent>
      </IonMenu>
    </>
  );
};

export default OrderDishPage;
