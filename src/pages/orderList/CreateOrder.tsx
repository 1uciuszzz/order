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
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useMutation } from "@tanstack/react-query";
import { API_ORDER, AddOrder } from "../../apis/order";
import { useImmer } from "use-immer";

const initialData: AddOrder = {
  name: "",
  status: "pending",
};

const CreateOrder = () => {
  const router = useIonRouter();

  const [order, setOrder] = useImmer<AddOrder>(initialData);

  const { isPending, mutate, isError, error } = useMutation({
    mutationFn: () => API_ORDER.ADD(order),
    onSuccess: (res) => {
      router.push(`/orderDishes/${res.id}`, "forward", "replace");
    },
  });

  const handleAddOrder = () => {
    mutate();
  };

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
            <IonInput
              type="text"
              label="订单名称"
              value={order.name}
              onIonChange={(e) => {
                setOrder((draft) => {
                  draft.name = e.target.value as string;
                });
              }}
            />
          </IonItem>
        </IonList>

        {isError && <IonText color="danger">{error.message}</IonText>}

        <IonButton
          fill="clear"
          expand="block"
          disabled={isPending}
          onClick={handleAddOrder}
        >
          创建订单
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default CreateOrder;
