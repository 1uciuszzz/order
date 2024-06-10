import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  useIonRouter,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";
import OrderList from "./pages/orderList/OrderList";
import Settings from "./pages/settings/Settings";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import AppInfo from "./pages/appInfo/AppInfo";
import DishMng from "./pages/dishMng/DishMng";
import UpdateDish from "./pages/dishMng/UpdateDish";
import CreateDish from "./pages/dishMng/CreateDish";
import CreateOrder from "./pages/orderList/CreateOrder";
import OrderDetail from "./pages/orderList/OrderDetail";
import OrderMng from "./pages/orderList/OrderMng";
import OrderDishPage from "./pages/orderDishes/OrderDishes";

setupIonicReact();

const Routes = () => {
  const router = useIonRouter();

  console.log(router.routeInfo);

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/orderList">
          <OrderMng />
        </Route>
        <Route exact path="/addOrder">
          <CreateOrder />
        </Route>
        <Route exact path="/orderDetail/:id">
          <OrderDetail />
        </Route>
        <Route exact path="/orderDishes/:id">
          <OrderDishPage />
        </Route>
        <Route exact path="/settings">
          <Settings />
        </Route>
        <Route exact path="/appInfo">
          <AppInfo />
        </Route>
        <Route exact path="/dishMng">
          <DishMng />
        </Route>
        <Route exact path="/addDish">
          <CreateDish />
        </Route>
        <Route exact path="/updateDish/:id">
          <UpdateDish />
        </Route>
        <Route exact path="/">
          <Redirect to="/orderList" />
        </Route>
      </IonRouterOutlet>
      <IonTabBar
        slot="bottom"
        hidden={router.routeInfo.pathname.startsWith(`/orderDishes`)}
      >
        <IonTabButton tab="tab1" href="/orderList">
          <IonIcon aria-hidden="true" icon={triangle} />
          <IonLabel>订单</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/settings">
          <IonIcon aria-hidden="true" icon={ellipse} />
          <IonLabel>设置</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

const App = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <Routes />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
