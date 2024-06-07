import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const CreateOrder = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="返回" />
          </IonButtons>
          <IonTitle>新增订单</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen color="light">
        <IonList>
          <IonItem>
            <IonInput type="text" label="订单名称" />
          </IonItem>
        </IonList>

        <IonButton fill="clear" expand="block">
          创建订单
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default CreateOrder;
