import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { API_DISH } from "../../apis/dish";
import LoadingSkeleton from "../../components/LoadingSkeleton";

const CoverDisplay = ({ cover }: { cover: string }) => {
  const {
    isPending: coverIsPending,
    data: coverContent,
    isError: coverIsError,
    error: coverError,
  } = useQuery({
    queryKey: ["cover", cover],
    queryFn: () => API_DISH.GET_COVER(cover),
  });

  if (coverIsPending) {
    return <LoadingSkeleton />;
  }

  if (coverIsError) {
    return <IonText color="danger">{coverError.message}</IonText>;
  }

  return (
    <>
      <img
        src={
          cover
            ? `data:image/jpeg;base64,${coverContent}`
            : `/temp/covers/defaultCover.png`
        }
        className="w-full aspect-square object-cover"
      />
    </>
  );
};

const DishDetail = () => {
  const { id } = useParams<{ id: string }>();

  const {
    isPending: dishIsPending,
    data: dish,
    isError: dishIsError,
    error: dishError,
  } = useQuery({
    queryKey: ["dish", id],
    queryFn: () => API_DISH.GET(id),
  });

  if (dishIsPending) {
    return <LoadingSkeleton />;
  }

  if (dishIsError) {
    return <IonText color="danger">{dishError.message}</IonText>;
  }

  return (
    <IonList>
      <CoverDisplay cover={dish.cover} />
      <IonItem>
        <IonText>
          <h1>{dish.name}</h1>
        </IonText>
      </IonItem>
      <IonItem>
        <IonText>
          <h3>{dish.type}</h3>
        </IonText>
      </IonItem>
      <IonItem>
        <IonText>
          <p>{dish.description}</p>
        </IonText>
      </IonItem>
    </IonList>
  );
};

const DishDetailPage = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="返回" />
          </IonButtons>
          <IonTitle>菜品详情</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen color="light">
        <DishDetail />
      </IonContent>
    </IonPage>
  );
};

export default DishDetailPage;
