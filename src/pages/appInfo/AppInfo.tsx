import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const AppInfo = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="返回" />
          </IonButtons>
          <IonTitle>应用信息</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen color="light"></IonContent>
    </IonPage>
  );
};

export default AppInfo;
