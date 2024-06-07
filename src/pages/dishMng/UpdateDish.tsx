import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { API_DISH } from "../../apis/dish";
import LoadingSkeleton from "../../components/LoadingSkeleton";

const UpdateDish = () => {
  const { id } = useParams<{ id: string }>();

  const { isPending, data, isError, error } = useQuery({
    queryKey: ["dish", id],
    queryFn: () => API_DISH.GET(id),
  });

  if (isPending) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return <IonText color="danger">{error.message}</IonText>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="返回" />
          </IonButtons>
          <IonTitle>更新菜品</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen color="light">
        <IonImg src={data?.cover} className="h-64 object-cover" />

        <IonList>
          <IonItem>
            <IonInput label="菜品名称" value={data?.name} />
          </IonItem>

          <IonItem>
            <IonTextarea label="菜品描述" value={data?.description} rows={6} />
          </IonItem>

          <IonItem>
            <IonInput label="菜品价格" value={data?.price} />
          </IonItem>

          <IonItem>
            <IonInput label="菜品种类" value={data?.type} />
          </IonItem>
        </IonList>

        <IonItem>
          <IonLabel>菜品图片:</IonLabel>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default UpdateDish;
