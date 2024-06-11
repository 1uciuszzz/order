import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_DISH, Dish } from "../../apis/dish";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonSpinner,
  IonText,
  IonThumbnail,
} from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import LoadingSkeleton from "../../components/LoadingSkeleton";

type DishItemProps = {
  dish: Dish;
};

const DishItem = ({ dish }: DishItemProps) => {
  const queryClient = useQueryClient();

  const {
    isPending: coverIsPending,
    data: cover,
    isError: coverIsError,
    error: coverError,
  } = useQuery({
    queryKey: ["cover", dish.cover],
    queryFn: () => API_DISH.GET_COVER(dish.cover),
  });

  const {
    isPending: delIsPending,
    mutate: del,
    isError: delIsError,
    error: delError,
  } = useMutation({
    mutationFn: (id: string) => API_DISH.DELETE(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dishList"],
      });
    },
  });

  return (
    <>
      {delIsError && <IonText color="danger">{delError.message}</IonText>}

      <IonItemSliding>
        <IonItem button routerLink={`/updateDish/${dish.id}`}>
          <IonThumbnail slot="start">
            {coverIsPending && <IonSpinner />}
            {coverIsError && (
              <IonText color="danger">{coverError.message}</IonText>
            )}
            <img
              className="w-full h-full object-cover"
              alt={dish.name}
              src={
                dish.cover
                  ? `data:image/png;base64,${cover}`
                  : `/temp/covers/defaultCover.png`
              }
            />
          </IonThumbnail>
          <IonLabel>{dish.name}</IonLabel>
          <IonLabel slot="end">￥{dish.price}</IonLabel>
        </IonItem>
        <IonItemOptions side="end">
          <IonItemOption color="danger">
            {delIsPending ? (
              <IonSpinner />
            ) : (
              <IonIcon
                slot="icon-only"
                icon={trashOutline}
                onClick={() => del(dish.id)}
              />
            )}
          </IonItemOption>
        </IonItemOptions>
      </IonItemSliding>
    </>
  );
};

const DishList = () => {
  const {
    isPending: dishListIsPending,
    data: dishListRes,
    isError: dishListIsError,
    error: dishListError,
  } = useQuery({
    queryKey: ["dishList"],
    queryFn: () => API_DISH.LIST(),
  });

  if (dishListIsPending) {
    return <LoadingSkeleton />;
  }

  if (dishListIsError) {
    return <IonText color="danger">{dishListError.message}</IonText>;
  }

  return (
    <IonList>
      {dishListRes.type.map((type) => {
        return (
          <IonCard key={type}>
            <IonCardHeader>
              <IonCardTitle>{type}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                {dishListRes.list
                  .filter((dish) => dish.type === type)
                  .map((dish) => {
                    return <DishItem key={dish.id} dish={dish} />;
                  })}
              </IonList>
            </IonCardContent>
          </IonCard>
        );
      })}
    </IonList>
  );
};

export default DishList;
