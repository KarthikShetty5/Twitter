import { withLayoutContext } from "expo-router";
import { createDrawerNavigator } from "@react-navigation/drawer";

const DrawerNavigator = createDrawerNavigator().Navigator;
//it returns navigator ans screen so only take navigator

const Drawer = withLayoutContext(DrawerNavigator);

export default function DrawerLayout() {
    return <Drawer />
}

