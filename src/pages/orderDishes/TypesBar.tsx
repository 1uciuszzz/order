import {
  IonItem,
  IonLabel,
  IonList,
  IonRouterLink,
  IonText,
} from "@ionic/react";

type TypesBarProps = {
  types: string[];
};

const TypesBar = ({ types }: TypesBarProps) => {
  return (
    <IonList className="w-24 overflow-y-auto">
      {types.map((type) => {
        return (
          <IonItem key={type} routerLink={`#${type}`}>
            <IonText>{type}</IonText>
          </IonItem>
        );
      })}
    </IonList>
  );
};

export default TypesBar;
