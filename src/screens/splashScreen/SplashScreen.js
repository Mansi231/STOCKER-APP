import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Color, Fonts } from '../../utils'
import SplashImage from '../../assets/auth/splashLogo.png'
import clouds from '../../assets/auth/clouds.png'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../pixel'
import LinearGradient from 'react-native-linear-gradient'
import { ImageBackground } from 'react-native'
import { getSteps, getUserDetail, getUserType, userTypes } from '../../services/Storage'
import { ValContext } from '../../context/ContextProvider'
import Routes from '../../services/Routes'

const SplashScreen = ({navigation}) => {
    const { type, userDetail, setUserDetail, setType } = useContext(ValContext)

    const handleNavigation = (routeName) =>{
        return setTimeout(()=> {navigation.navigate(routeName)},2000)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const t = await getUserDetail();
                if (t) {
                    setUserDetail(t);

                    const type = await getUserType();
                    const step = await getSteps();

                    if (type === userTypes?.Trader) {
                        if (step === 1) handleNavigation(Routes.ROUTE.Trader);
                        else if (step === 2) handleNavigation(Routes.ROUTE.Drawer);
                        else handleNavigation(Routes.ROUTE.UserType);
                    } else if (type === userTypes?.Broker) {
                        if (step === 0) handleNavigation(Routes.ROUTE.Broker);
                        else if (step === 1) handleNavigation(Routes.ROUTE.AccountTypeDetail);
                        else if (step === 2) handleNavigation(Routes.ROUTE.KycDetail);
                        else if (step === 3) handleNavigation(Routes.ROUTE.Drawer);
                        else handleNavigation(Routes.ROUTE.UserType);
                    } else if (t.isLoggedIn) {
                        handleNavigation(Routes.ROUTE.UserType);
                    }

                } else {
                    handleNavigation(Routes.ROUTE.StartPortFolio)
                    // Handle the case where t is null (e.g., show a loading screen).
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <View style={[styles?.container, {}]}>
            <StatusBar backgroundColor={'transparent'} />
            {/* <LinearGradient
                colors={['rgba(21, 115, 254, 0.20)', 'rgba(21, 115, 254, 0.4)', 'rgba(21, 115, 254, 0.30)']}
                // colors={[Color.COLOR.lightBlue10, Color.COLOR.bgLightGrey, Color.COLOR.lightBlue10]}
                style={styles.splash}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <Image source={SplashImage} style={{ width: wp(60), height: hp(10)}} />
                <Text style={{
                    marginTop: hp(2), fontSize: hp(3),
                    fontFamily: Fonts.FONTS.PoppinsSemiBold,
                    color:Color.COLOR.white
                }}>Stocker</Text>
            </LinearGradient> */}
            <ImageBackground source={clouds} style={{ width: '100%', height: '100%' }}></ImageBackground>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.COLOR.lightBlue10 },
    splash: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

})