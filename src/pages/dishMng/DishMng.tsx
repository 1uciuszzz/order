import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import DishList from "./DishList";
import { addOutline } from "ionicons/icons";

const DishMng = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="返回" />
          </IonButtons>
          <IonTitle>菜品管理</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/addDish">
              <IonIcon slot="icon-only" icon={addOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen color="light">
        <DishList />
      </IonContent>
    </IonPage>
  );
};

export default DishMng;
