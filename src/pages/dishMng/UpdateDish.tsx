import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { API_DISH, UpdateDish } from "../../apis/dish";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import { useImmer } from "use-immer";
import getCover from "../../utils/getCover";

type DishFormProps = {
  initialData: UpdateDish;
};

const DishForm = ({ initialData }: DishFormProps) => {
  const router = useIonRouter();

  const queryClient = useQueryClient();

  const [dish, setDish] = useImmer<UpdateDish>(initialData);

  const {
    isPending: saveIsPending,
    mutate: save,
    isError: saveIsError,
    error: saveError,
  } = useMutation({
    mutationFn: () => API_DISH.UPDATE(dish),
    onSuccess: () => {
      router.push(`/dishMng`, "back");
      queryClient.invalidateQueries({
        queryKey: ["dishList"],
      });
      queryClient.invalidateQueries({
        queryKey: ["dish", dish.id],
      });
    },
  });

  const {
    isPending: uploadCoverIsPending,
    mutate: uploadCover,
    isError: uploadCoverIsError,
    error: uploadCoverError,
  } = useMutation({
    mutationFn: () => getCover(),
    onSuccess: (dataUrl) => {
      setDish((d) => {
        d.cover = dataUrl;
      });
    },
  });

  return (
    <>
      <img
        src={dish.cover ? dish.cover : "/temp/covers/defaultCover.png"}
        className="w-full h-64 aspect-square object-cover"
      />

      {uploadCoverIsError && (
        <IonText color="danger">{uploadCoverError.message}</IonText>
      )}

      <IonButton
        fill="clear"
        expand="full"
        onClick={() => uploadCover()}
        disabled={uploadCoverIsPending}
      >
        上传菜品封面
      </IonButton>

      <IonList>
        <IonItem>
          <IonInput
            label="菜品名称"
            value={dish.name}
            onIonInput={(e) => {
              setDish((d) => {
                d.name = e.target.value as string;
              });
            }}
          />
        </IonItem>

        <IonItem>
          <IonTextarea
            label="菜品描述"
            value={dish.description}
            rows={6}
            onIonInput={(e) => {
              setDish((d) => {
                d.description = e.target.value as string;
              });
            }}
          />
        </IonItem>

        <IonItem>
          <IonInput
            label="菜品种类"
            value={dish.type}
            onIonInput={(e) => {
              setDish((d) => {
                d.type = e.target.value as string;
              });
            }}
          />
        </IonItem>
      </IonList>

      {saveIsError && <IonText color="danger">{saveError.message}</IonText>}

      <IonButton
        fill="clear"
        expand="full"
        onClick={() => save()}
        disabled={saveIsPending}
      >
        保存信息
      </IonButton>
    </>
  );
};

type UpdateDishForm2Props = {
  dish: UpdateDish;
};

const UpdateDishForm2 = ({ dish }: UpdateDishForm2Props) => {
  const {
    isPending: coverIsPending,
    data: cover,
    isError: coverIsError,
    error: coverError,
  } = useQuery({
    queryKey: ["cover", dish.cover],
    queryFn: () => API_DISH.GET_COVER(dish.cover),
  });

  if (coverIsPending) {
    return <LoadingSkeleton />;
  }

  if (coverIsError) {
    return <IonText color="danger">{coverError.message}</IonText>;
  }

  return (
    <DishForm
      initialData={{
        id: dish.id,
        name: dish.name,
        cover: `data:image/jpeg;base64,${cover}`,
        description: dish.description,
        type: dish.type,
      }}
    />
  );
};

const UpdateDishForm = () => {
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
    <>
      <UpdateDishForm2 dish={dish} />
    </>
  );
};

const UpdateDishPage = () => {
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
        <UpdateDishForm />
      </IonContent>
    </IonPage>
  );
};

export default UpdateDishPage;
