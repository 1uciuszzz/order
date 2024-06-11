import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import OrderList from "./OrderList";

const OrderMng = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>订单管理</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen color="light">
        <OrderList />
      </IonContent>
    </IonPage>
  );
};

export default OrderMng;
