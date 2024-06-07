import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { API_DISH } from "../../apis/dish";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonSkeletonText,
  IonSpinner,
  IonText,
  IonThumbnail,
} from "@ionic/react";
import { createOutline, trashOutline } from "ionicons/icons";
import LoadingSkeleton from "../../components/LoadingSkeleton";

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

  const queryClient = useQueryClient();

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
                    return (
                      <IonItemSliding key={dish.id}>
                        <IonItem button routerLink={`/updateDish/${dish.id}`}>
                          <IonThumbnail slot="start">
                            <img
                              className="w-full h-full object-contain"
                              alt={dish.name}
                              src={dish.cover}
                            />
                          </IonThumbnail>
                          <IonLabel>{dish.name}</IonLabel>
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
                    );
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
