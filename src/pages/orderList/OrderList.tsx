import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { beerOutline } from "ionicons/icons";

const OrderList = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>历史订单</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen color="light">
        <IonButton size="large" routerLink="/orderDishes">
          <IonIcon slot="start" icon={beerOutline} />
          创建订单
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default OrderList;
