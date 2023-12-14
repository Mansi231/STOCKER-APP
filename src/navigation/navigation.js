import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import React, { useRef, useEffect, useState, useContext, useCallback } from 'react';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartPortFolio from '../auth/comp/StartPortFolio';
import Register from '../auth/comp/Register';
import Routes from '../services/Routes';
import OtpNumber from '../auth/comp/OtpNumber';
import UserType from '../screens/userType/UserType';
import Trader from '../screens/trader/Trader';
import AccountDone from '../screens/accountDone/AccountDone';
import Broker from '../screens/broker/Broker';
import AccountTypeDetail from '../screens/broker/AccountTypeDetail';
import KycDetail from '../screens/broker/KycDetail';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screens/profile/Profile';
import Dashboard from '../screens/dashboard/Dashboard';
import { removeBackHandler } from '../../permission';
import CustomDrawer from './CustomDrawer';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../pixel';
import { Color, Fonts } from '../utils';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons
    from 'react-native-vector-icons/MaterialCommunityIcons'
import Home from '../screens/home/Home';
import Message from '../screens/message/Message';
import Plans from '../screens/plans/Plans';
import PlanDetail from '../screens/plans/PlanDetail';
import CreatePlan from '../screens/plans/CreatePlan';
import GiveAdvice from '../screens/plans/GiveAdvice';
import { getSteps, getUserDetail, getUserType, userTypes } from '../services/Storage';
import { ValContext } from '../context/ContextProvider';
import SplashScreen from '../screens/splashScreen/SplashScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();


const DrawerScreen = ({ navigation }) => {

    const routes = [
        { name: Routes.ROUTE.Home, icon: 'person-sharp' },
        { name: Routes.ROUTE.Dashboard, icon: 'stats-chart', iconBorder: true },
        { name: Routes.ROUTE.Settings, icon: 'settings-outline', borderTop: true },
        { name: Routes.ROUTE.HelpSupport, icon: 'help-circle' },
    ];

    const focusEffectCallback = useCallback(() => {
        const backHandler = removeBackHandler();

        return () => {
            backHandler.remove();
        };
    }, []);

    useFocusEffect(focusEffectCallback);

    const renderDrawerItem = ({ name, icon, borderTop, iconBorder }) => (
        <Drawer.Screen
            key={name}
            name={name}
            component={BottomTabScreen}
            options={{
                title: name,
                drawerIcon: ({ color }) => (
                    <View style={[styles.drawerItem, borderTop && {
                        borderTopColor: Color.COLOR.textGrey, borderTopWidth: 1, paddingTop: hp(3)
                    }]}>
                        {
                            name == Routes.ROUTE.HelpSupport ?
                                <MaterialCommunityIcons name={icon} size={hp(2.9)} color={Color.COLOR.primaryBlue} />
                                :
                                <Ionicons name={icon} size={hp(2.6)} color={Color.COLOR.primaryBlue}
                                    style={[iconBorder && {
                                        borderBottomColor: Color.COLOR.primaryBlue,
                                        borderBottomWidth: wp(.5)
                                    }]}
                                />
                        }

                        <Text style={[styles.drawerText, {}]}>{name}</Text>
                    </View>
                ),
                drawerLabel: '',
                drawerActiveTintColor: Color.COLOR.screenBg,
                drawerInactiveTintColor: Color.COLOR.screenBg,
                headerShown: false
            }}
        />
    );

    return (
        <Drawer.Navigator
            drawerStyle={{}}
            screenOptions={{
                drawerStyle: { backgroundColor: Color.COLOR.screenBg, width: wp(70) }
            }}
            drawerContent={(props) => <CustomDrawer {...props} drawerType="slide"
            />}>
            {routes.map((route) => renderDrawerItem(route))}
        </Drawer.Navigator>
    )
};

const BottomTabScreen = () => {

    return (
        <BottomTab.Navigator
            initialRouteName={Routes.ROUTE.Home}
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    // position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: hp(10),
                    paddingVertical: hp(.5),
                    paddingBottom: hp(1),
                },
            }}

        >
            <BottomTab.Screen name={Routes.ROUTE.Home} component={Home} options={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarIcon: ({ focused }) => {
                    return <View style={[styles?.tabIconContainer]}>
                        <Octicons name={'home'} style={[{ color: focused ? Color.COLOR.primaryBlue : Color.COLOR.lightGrey70 }, styles?.tabIcon]} />
                        <Text style={[styles?.tabBarLabel, { color: focused ? Color.COLOR.primaryBlue : Color.COLOR.lightGrey70 }]}>{Routes.ROUTE.Home}</Text>
                    </View>
                },

            }} />
            <BottomTab.Screen name={Routes.ROUTE.Plans} component={Plans} options={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarIcon: ({ focused }) => {
                    return <View style={styles?.tabIconContainer}>
                        <MaterialCommunityIcons name={'format-list-checkbox'} style={[{ color: focused ? Color.COLOR.primaryBlue : Color.COLOR.lightGrey70 }, styles?.tabIcon]} />
                        <Text style={[styles?.tabBarLabel, { color: focused ? Color.COLOR.primaryBlue : Color.COLOR.lightGrey70 }]}>{Routes.ROUTE.Plans}</Text>
                    </View>
                },
            }} />
            <BottomTab.Screen name={Routes.ROUTE.Message} component={Message} options={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarIcon: ({ focused }) => {
                    return <View style={styles?.tabIconContainer}>
                        <MaterialCommunityIcons name={'message-outline'} style={[{ color: focused ? Color.COLOR.primaryBlue : Color.COLOR.lightGrey70 }, styles?.tabIcon]} />
                        <Text style={[styles?.tabBarLabel, { color: focused ? Color.COLOR.primaryBlue : Color.COLOR.lightGrey70 }]}>{Routes.ROUTE.Message}</Text>
                    </View>
                },
            }} />

            <BottomTab.Screen name={Routes.ROUTE.Profile} component={Profile} options={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarIcon: ({ focused }) => {
                    return <View style={styles?.tabIconContainer}>
                        <Ionicons name={'person-outline'} style={[{ color: focused ? Color.COLOR.primaryBlue : Color.COLOR.lightGrey70 }, styles?.tabIcon]} />
                        <Text style={[styles?.tabBarLabel, { color: focused ? Color.COLOR.primaryBlue : Color.COLOR.lightGrey70 }]}>{Routes.ROUTE.Profile}</Text>
                    </View>
                },
            }} />
        </BottomTab.Navigator>
    )
}

const Navigation = ({ navigation }) => {
    const navigationRef = useRef();

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>


                <Stack.Screen
                    name={Routes.ROUTE.SplashScreen}
                    component={SplashScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name={Routes.ROUTE.StartPortFolio}
                    component={StartPortFolio}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={Routes.ROUTE.OtpNumber}
                    component={OtpNumber}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={Routes.ROUTE.Register}
                    component={Register}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={Routes.ROUTE.UserType}
                    component={UserType}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={Routes.ROUTE.Trader}
                    component={Trader}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={Routes.ROUTE.Broker}
                    component={Broker}
                    options={{ headerShown: false }}
                />

                {/* AccountTypeDetail */}
                <Stack.Screen
                    name={Routes.ROUTE.AccountTypeDetail}
                    component={AccountTypeDetail}
                    options={{ headerShown: false }}
                />

                {/* KycDetail */}
                <Stack.Screen
                    name={Routes.ROUTE.KycDetail}
                    component={KycDetail}
                    options={{ headerShown: false }}
                />

                {/* AccountDone */}
                <Stack.Screen
                    name={Routes.ROUTE.AccountDone}
                    component={AccountDone}
                    options={{ headerShown: false }}
                />

                {/* DrawerScreen */}
                <Stack.Screen
                    name={Routes.ROUTE.Drawer}
                    component={DrawerScreen}
                    options={{ headerShown: false }}
                />

                {/* PlanDetail */}
                <Stack.Screen
                    name={Routes.ROUTE.PlanDetail}
                    component={PlanDetail}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={Routes.ROUTE.CreatePlan}
                    component={CreatePlan}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={Routes.ROUTE.GiveAdvice}
                    component={GiveAdvice}
                    options={{ headerShown: false }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;

const styles = StyleSheet.create({
    drawerItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: wp(2.4),
        gap: wp(3), width: '100%'
    },
    drawerText: {
        fontSize: hp(1.9),
        fontFamily: Fonts.FONTS.InterSemiBold,
        color: Color.COLOR.primaryBlue,
    },
    tabIconContainer: {
        alignSelf: 'center', justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'column'
    },
    tabIcon: {
        width: '100%',
        fontSize: hp(3.3),

    },
    tabBarLabel: {
        color: Color.COLOR.lightGrey70,
        fontSize: hp(1.48),
        fontFamily: Fonts.FONTS.InterMedium, width: '100%',
        justifyContent: 'center', alignItems: 'center', alignSelf: 'center', height: hp(3), textAlignVertical: 'center'
    }
});
