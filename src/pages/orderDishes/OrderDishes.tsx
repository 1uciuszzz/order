import {
  IonAlert,
  IonBackButton,
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_DISH } from "../../apis/dish";
import TypesBar from "./TypesBar";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import DishList from "./DishList";
import { cartOutline, close } from "ionicons/icons";
import { useImmer } from "use-immer";
import { API_ORDER, OrderDish } from "../../apis/order";

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
    queryKey: ["dishList"],
    queryFn: () => API_DISH.LIST(),
  });

  if (isPending) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return <IonText color="danger">{error.message}</IonText>;
  }

  return (
    <div className="mb-24">
      <DishList
        types={data.type}
        dishes={data.list}
        orderDishes={orderDishes}
        addDish={addDish}
        removeDish={removeDish}
      />
    </div>
  );
};

const OrderDishPage = () => {
  const router = useIonRouter();

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

  const queryClient = useQueryClient();

  const {
    isPending: orderIsPending,
    mutate: order,
    isError: orderIsError,
    error: orderError,
  } = useMutation({
    mutationFn: () => API_ORDER.ADD({ dishes: orderDish }),
    onSuccess: (res) => {
      setOrderDish(() => []);
      queryClient.invalidateQueries({
        queryKey: ["orderList"],
      });
      router.push(`/orderDetail/${res.id}`, "forward", "push");
    },
  });

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
          <IonItem className="w-full fixed bottom-0 z-10 ">
            <IonMenuToggle>
              <IonButton className="h-full w-16" fill="solid" expand="full">
                <IonIcon slot="icon-only" icon={cartOutline} />
              </IonButton>
            </IonMenuToggle>

            {orderIsError && (
              <IonText color="danger">{orderError.message}</IonText>
            )}

            <IonButton
              slot="end"
              className="h-full"
              fill="solid"
              expand="full"
              id="submitOrder"
              disabled={orderIsPending}
            >
              提交订单
            </IonButton>
            <IonAlert
              header="确定下单？"
              trigger="submitOrder"
              buttons={[
                {
                  text: "取消",
                  role: "cancel",
                },
                {
                  text: "确定",
                  role: "confirm",
                  handler: () => order(),
                },
              ]}
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
                  <IonLabel>{dish.dishName}</IonLabel>
                  <IonBadge slot="end">{dish.quantity}</IonBadge>
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
