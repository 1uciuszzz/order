import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

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
      <IonContent fullscreen color="light"></IonContent>
    </IonPage>
  );
};

export default OrderDetail;
