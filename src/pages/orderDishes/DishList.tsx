import {
  IonButton,
  IonButtons,
  IonCol,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonListHeader,
  IonRow,
  IonThumbnail,
} from "@ionic/react";
import { Dish } from "../../apis/dish";
import { addCircleOutline, removeCircleOutline } from "ionicons/icons";

type DishItemProps = {
  dish: Dish;
};

const DishItem = ({ dish }: DishItemProps) => {
  return (
    <IonItem>
      <IonThumbnail slot="start">
        <img
          className="w-full h-full object-contain"
          alt={dish.name}
          src={dish.cover}
        />
      </IonThumbnail>
      <IonCol>
        <IonLabel>{dish.name}</IonLabel>
        <IonLabel>￥{dish.price}</IonLabel>
      </IonCol>
      <IonRow slot="end">
        <IonButtons>
          <IonButton>
            <IonIcon slot="icon-only" icon={addCircleOutline} />
          </IonButton>
        </IonButtons>
      </IonRow>
    </IonItem>
  );
};

type DishListProps = {
  types: string[];
  dishes: Dish[];
};

const DishList = ({ types, dishes }: DishListProps) => {
  return (
    <IonList className="flex-1">
      {types.map((type) => {
        return (
          <IonItemGroup key={type}>
            <IonItemDivider>
              <IonLabel>{type}</IonLabel>
            </IonItemDivider>
            {dishes
              .filter((dish) => dish.type === type)
              .map((dish) => {
                return <DishItem key={dish.id} dish={dish} />;
              })}
          </IonItemGroup>
        );
      })}
    </IonList>
  );
};

export default DishList;
