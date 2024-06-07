import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { alertCircleOutline, listOutline } from "ionicons/icons";

const Settings = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>设置</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen color="light">
        <IonList inset>
          <IonItem button routerLink="/appInfo">
            <IonIcon slot="start" icon={alertCircleOutline} />
            <IonLabel>应用信息</IonLabel>
          </IonItem>
          <IonItem button routerLink="/dishMng">
            <IonIcon slot="start" icon={listOutline} />
            <IonLabel>菜品管理</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
