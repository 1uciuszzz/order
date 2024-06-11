import {
  IonBackButton,
  IonButton,
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
  useIonRouter,
} from "@ionic/react";
import { useImmer } from "use-immer";
import { API_DISH, AddDish } from "../../apis/dish";
import { Camera, CameraResultType } from "@capacitor/camera";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const initialData: AddDish = {
  cover: "",
  name: "",
  description: "",
  price: "",
  type: "",
};

const CreateDish = () => {
  const [dish, setDish] = useImmer<AddDish>(initialData);

  const router = useIonRouter();

  const handleGetDishCover = async () => {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
      });
      setDish((d) => {
        d.cover = photo.base64String!;
      });
    } catch {
      throw new Error("获取图片失败");
    }
  };

  const {
    isPending: getCoverIsPending,
    mutate: getCover,
    isError: getCoverIsError,
    error: getCoverError,
  } = useMutation({
    mutationFn: () => handleGetDishCover(),
  });

  const queryClient = useQueryClient();

  const {
    isPending: saveIsPending,
    mutate: saveDish,
    isError: saveIsError,
    error: saveError,
  } = useMutation({
    mutationFn: () => API_DISH.ADD(dish),
    onSuccess: () => {
      router.push(`/dishMng`, "back");
      queryClient.invalidateQueries({
        queryKey: ["dishList"],
      });
      setDish(() => initialData);
    },
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="返回" />
          </IonButtons>
          <IonTitle>新增菜品</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen color="light">
        {getCoverIsError && (
          <IonText color="danger">{getCoverError.message}</IonText>
        )}

        <IonImg
          src={
            dish.cover
              ? `data:image/jpeg;base64,${dish.cover}`
              : `/temp/covers/defaultCover.png`
          }
          className="h-64 object-cover"
        />

        <IonButton
          fill="clear"
          expand="full"
          onClick={() => getCover()}
          disabled={getCoverIsPending}
        >
          上传菜品封面
        </IonButton>

        <IonList>
          <IonItem>
            <IonInput
              type="text"
              label="菜品名称"
              value={dish.name}
              onIonInput={(e) =>
                setDish((d) => {
                  d.name = e.target.value as string;
                })
              }
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
              type="number"
              label="菜品价格"
              value={dish.price}
              onIonInput={(e) => {
                const value = e.target.value as string;
                const filteredValue = value.replace(/[^0-9]+/g, "");
                setDish((d) => {
                  d.price = filteredValue;
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
          onClick={() => saveDish()}
          disabled={saveIsPending}
        >
          保存
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default CreateDish;
