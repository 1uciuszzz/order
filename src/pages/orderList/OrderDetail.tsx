import {
  IonBackButton,
  IonBadge,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { API_ORDER } from "../../apis/order";
import LoadingSkeleton from "../../components/LoadingSkeleton";

const OrderContent = () => {
  const { id } = useParams<{ id: string }>();

  const { isPending, data, isError, error } = useQuery({
    queryKey: ["order", id],
    queryFn: () => API_ORDER.GET(id),
  });

  if (isPending) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return <IonText color="danger">{error.message}</IonText>;
  }

  return (
    <IonList>
      <IonItem>
        <IonLabel>订单号</IonLabel>
        <IonLabel slot="end">{data.id}</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>下单时间</IonLabel>
        <IonLabel slot="end">
          {new Date(data.createdAt).toLocaleString()}
        </IonLabel>
      </IonItem>
      <IonItemGroup>
        <IonItemDivider>
          <IonLabel>菜品</IonLabel>
        </IonItemDivider>
        {data.dishes.map((dish) => {
          return (
            <IonItem key={dish.dishId}>
              <IonLabel>{dish.dishName}</IonLabel>
              <IonBadge slot="end">{dish.quantity}</IonBadge>
            </IonItem>
          );
        })}
      </IonItemGroup>
    </IonList>
  );
};

const OrderDetail = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="返回" />
          </IonButtons>
          <IonTitle>订单详情</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen color="light">
        <OrderContent />
      </IonContent>
    </IonPage>
  );
};

export default OrderDetail;
