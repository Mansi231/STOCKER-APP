import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { xt, useEffect, useState } from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { Color, Fonts } from '../utils'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../pixel'
import user from '../assets/drawer/person.jpeg'
import LogoutIcon from '../assets/drawer/logout_icon.png'
import { getUserDetail, getUserType } from '../services/Storage'
import { ValContext } from '../context/ContextProvider'
import Routes from '../services/Routes'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CustomDrawer = (props) => {

    // const [userDetail,setUserDetail] = useState(null)
    // const [type,setType] = useState(null)

    const { type, userDetail, setUserDetail, setType } = useContext(ValContext)

    useEffect(() => {
        getUserDetail()
            .then((t) => {
                setUserDetail(t);
                console.log(t,'-----tt-t-t-t-t')
            })
            .catch((error) => {
                console.error('Error fetching user type:', error);
            });

        getUserType()
            .then((t) => {
                setType(t);
            })
            .catch((error) => {
                console.error('Error fetching user type:', error);
            });
    }, []);


    return (
        <View style={styles?.container}>
            <DrawerContentScrollView>
                <View style={styles?.headerContainer}>
                    <Image source={user} style={{ height: hp(5.5), width: hp(5.5), borderRadius: hp(8) }} />
                    <View style={{ flexDirection: 'column', gap: hp(.1), }}>
                        <Text style={styles?.nameText}>{userDetail?.name}</Text>
                        <Text style={styles?.userTypeText}>{type}</Text>
                    </View>
                </View>

                <View style={{ paddingVertical: hp(2), }}>
                    <DrawerItemList {...props}
                        activeBackgroundColor="transparent"
                        inactiveBackgroundColor="transparent"
                    />
                </View>
            </DrawerContentScrollView>
            <View style={styles?.bottomTextContainer}>
                <TouchableOpacity
                    onPress={() => {
                        AsyncStorage.clear();
                        props.navigation.navigate(Routes.ROUTE.StartPortFolio)
                    }}
                    style={styles?.logoutContainer}>
                    <Image source={LogoutIcon} style={styles?.logoutIcon} />
                    <Text style={styles?.logoutText}>Log Out</Text>
                </TouchableOpacity>
                <Text style={styles?.version}>Version 1.170</Text>
            </View>
        </View>
    )
}

export default CustomDrawer

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Color.COLOR.screenBg, paddingVertical: hp(3), width: wp(70) },
    nameText: { fontSize: hp(1.9), color: Color.COLOR.primaryBlue, fontFamily: Fonts.FONTS.InterSemiBold },
    userTypeText: { fontSize: hp(1.75), color: Color.COLOR.textGrey, fontFamily: Fonts.FONTS.InterSemiBold },
    headerContainer: {
        width: '100%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', gap: wp(1.2), marginTop: hp(2),
        marginHorizontal: Platform?.OS == 'android' ? wp(1) : wp(2), paddingHorizontal: wp(2.4)
    },
    bottomTextContainer: { paddingVertical: hp(2), flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: hp(1), width: '100%' },
    logoutIcon: { height: hp(1.9), width: hp(2), tintColor: Color.COLOR.primaryGreen, alignSelf: 'center' },
    logoutContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: wp(.5), width: '100%', marginLeft: -hp(1.3) },
    logoutText: { fontFamily: Fonts.FONTS.InterMedium, fontSize: hp(1.8), color: Color.COLOR.primaryGreen, textAlign: 'left' },
    version: { fontFamily: Fonts.FONTS.InterMedium, fontSize: hp(1.68), color: Color.COLOR.textGrey, width: '100%', textAlign: 'center' }
})