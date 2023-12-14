import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../pixel'
import { Color, Fonts } from '../../utils'
import { FilledButton } from '../../components/InputComponents/Buttons'
import Clouds from '../../assets/auth/clouds.png'
import DoneImage from '../../assets/userType/done.png'
import { useFocusEffect } from '@react-navigation/native'
import { removeBackHandler } from '../../../permission'
import Routes from '../../services/Routes'
import { SafeAreaView } from 'react-native-safe-area-context';

const AccountDone = ({ navigation, route }) => {

    const { params: { heading, text} } = route;
    // let heading = 'iruiwroiewr!';
    // let text = 'kdiadiowefr';

    const focusEffectCallback = useCallback(() => {
        const backHandler = removeBackHandler();

        return () => {
            backHandler.remove();
        };
    }, []);

    useFocusEffect(focusEffectCallback);

    return (
        <SafeAreaView style={{flex:1}}>
            <View style={styles?.mainView}>
                <View style={{ flex: 1, width: '100%' }}>
                    <Image source={Clouds} style={{ height: '100%', width: '100%' }} />
                </View>
                <Image source={DoneImage} style={{ height: hp(10.3), width: hp(10.3) }} />
                <View style={styles?.contentContainer}>
                    <View style={styles?.welcomeTextContainer}>
                        <Text style={styles?.doneTextHeading}>{heading}</Text>
                        <Text style={styles?.doneText}>{text}</Text>
                    </View>
                    <View style={styles?.bottomBtn}>
                        <FilledButton btnText={'Explore'}
                            disabled={false}
                            onPress={() => navigation.replace(Routes.ROUTE.Drawer)} btnStyle={{
                                backgroundColor: Color.COLOR.primaryBlue,
                            }}
                            textStyle={{ color: Color.COLOR.white }}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default AccountDone

const styles = StyleSheet.create({
    mainView: {
        flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.COLOR.screenBg
    },
    contentContainer: {
        flex: 1, width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        paddingHorizontal: wp(5.2), paddingVertical: hp(3.2)
    },
    welcomeTextContainer: { flex: 1, justifyContent: 'flex-start', flexDirection: 'column', alignItems: 'center' },
    doneTextHeading: {
        fontSize: hp(3.06), color: Color.COLOR.primaryBlue, textAlign: 'center', fontFamily: Fonts.FONTS.PoppinsSemiBold
    },
    doneText: {
        fontFamily: Fonts.FONTS.PoppinsMedium, fontSize: hp(1.9), color: Color.COLOR.textGrey, textAlignVertical: 'center',
        textAlign: 'center', marginTop: hp(1.2), alignContent: 'center', justifyContent: 'center', width: '100%'
    },
    filledBtn: {
        width: '100%', alignItems: 'center',
        paddingVertical: hp(1.75), backgroundColor: Color.COLOR.primaryBlue, borderRadius: hp(8), paddingHorizontal: wp(2.6),
        justifyContent: 'center', height: hp(7.5), marginTop: hp(2.5)
    },
    btnText: {
        fontFamily: Fonts.FONTS.PoppinsMedium, color: Color.COLOR.white, fontSize: hp(2.56)
    },
    outlinedText: { color: Color.COLOR.white },
    filledText: { color: Color.COLOR.primaryBlue },
    outlinedBtn: {
        width: '100%', height: hp(7.5), alignItems: 'center',
        paddingVertical: hp(1.75), borderRadius: hp(8), paddingHorizontal: wp(2.6),
        justifyContent: 'center', marginTop: hp(2), borderColor: Color.COLOR.primaryBlue, borderWidth: hp(.2), marginBottom: hp(3)
    },
    continueGreyText: {
        color: Color.COLOR.textGrey, fontFamily: Fonts.FONTS.PoppinsRegular, fontSize: hp(1.9), textAlign: 'center', textAlignVertical: 'center', marginTop: hp(3.5)
    },
    continueBlueText: {
        color: Color.COLOR.primaryBlue, textDecorationLine: 'underline'
    },
    bottomBtn: {
        position: 'absolute',
        bottom: hp(6), width: '100%', flex: 1
    },
}) 