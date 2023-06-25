import { withLayoutContext } from "expo-router";
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import { Text } from 'react-native'

const DrawerNavigator = createDrawerNavigator().Navigator;
//it returns navigator ans screen so only take navigator

const Drawer = withLayoutContext(DrawerNavigator);

export const unstable_settings = {
    //when i refrrsh the first thing i wanna see is tabs , so i did this, otherwise it is index
    initialRouteName: '(tabs)',
};
function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <Text style={{ alignSelf: 'center', fontSize: 20 }}>Karthik</Text>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

export default function DrawerLayout() {
    return (
        <>
            <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
                <Drawer.Screen name="(tabs)" options={{ headerShown: false, title: "Home" }} />
                <Drawer.Screen name="bookmarks" options={{ title: "Bookmarks" }} />
                <Drawer.Screen name="twitter-blue" options={{ headerShown: false, title: "Twitter Blue" }} />
            </Drawer >
        </>
    );
}

