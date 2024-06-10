import { IonItem, IonLabel, IonList } from "@ionic/react";

type TypesBarProps = {
  types: string[];
};

const TypesBar = ({ types }: TypesBarProps) => {
  return (
    <IonList>
      {types.map((type) => {
        return (
          <IonItem key={type}>
            <IonLabel className="text-nowrap">{type}</IonLabel>
          </IonItem>
        );
      })}
    </IonList>
  );
};

export default TypesBar;
