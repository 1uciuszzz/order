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
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useImmer } from "use-immer";
import { AddDish } from "../../apis/dish";

const initialData: AddDish = {
  cover: "/temp/covers/defaultCover.png",
  name: "",
  description: "",
  price: "",
  type: "",
};

const CreateDish = () => {
  const [dish, setDish] = useImmer<AddDish>(initialData);

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
        <IonImg src={dish.cover} className="h-64 object-cover" />

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
              onIonInput={(e) => {}}
            />
          </IonItem>
        </IonList>

        <IonItem>
          <IonLabel>菜品图片:</IonLabel>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default CreateDish;
