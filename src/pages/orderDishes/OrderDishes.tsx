import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
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
import { cartOutline } from "ionicons/icons";

const OrderDishes = () => {
  const { id } = useParams<{ id: string }>();

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
      <DishList types={data.type} dishes={data.list} />
    </IonRow>
  );
};

const OrderDishPage = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="返回" />
          </IonButtons>
          <IonTitle>点菜</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen color="light">
        <OrderDishes />

        <IonItem className="w-full fixed bottom-0 z-10">
          <IonButton className="h-full w-16" fill="solid" expand="full">
            <IonIcon slot="icon-only" icon={cartOutline} />
          </IonButton>
          <IonLabel className="mx-4">合计：￥0</IonLabel>
          <IonButton slot="end" className="h-full" fill="solid" expand="full">
            提交订单
          </IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default OrderDishPage;
