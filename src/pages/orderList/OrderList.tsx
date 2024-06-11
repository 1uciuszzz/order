import {
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonSpinner,
  IonText,
} from "@ionic/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { trashOutline } from "ionicons/icons";
import { API_ORDER, Order } from "../../apis/order";
import LoadingSkeleton from "../../components/LoadingSkeleton";

type OrderItemProps = {
  order: Order;
};

const OrderItem = ({ order }: OrderItemProps) => {
  const queryClient = useQueryClient();

  const {
    isPending: delIsPending,
    mutate: del,
    isError: delIsError,
    error: delError,
  } = useMutation({
    mutationFn: (id: string) => API_ORDER.DELETE(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orderList"],
      });
    },
  });

  return (
    <>
      {delIsError && <IonText color="danger">{delError.message}</IonText>}

      <IonItemSliding>
        <IonItem button routerLink={`/orderDetail/${order.id}`}>
          <IonLabel>{new Date(order.createdAt).toLocaleString()}</IonLabel>
        </IonItem>
        <IonItemOptions side="end">
          <IonItemOption color="danger">
            {delIsPending ? (
              <IonSpinner />
            ) : (
              <IonIcon
                slot="icon-only"
                icon={trashOutline}
                onClick={() => del(order.id)}
              />
            )}
          </IonItemOption>
        </IonItemOptions>
      </IonItemSliding>
    </>
  );
};

const OrderList = () => {
  const { isPending, data, isError, error } = useQuery({
    queryKey: ["orderList"],
    queryFn: () => API_ORDER.LIST(),
  });

  if (isPending) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return <IonText color="danger">{error.message}</IonText>;
  }

  return (
    <>
      {data.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </>
  );
};

export default OrderList;
