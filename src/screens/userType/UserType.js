import { StyleSheet, Text, View, TouchableOpacity, Image, BackHandler } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../pixel'
import { Color, Fonts } from '../../utils'
import { BackArrow, UserInfoHeading, UserInfoText, UserTypeFilledBtn, UserTypeOutlinedBtn } from '../../components/CommonComponents'
import Person from '../../assets/userType/person.png'
import Brokerage from '../../assets/userType/brokerage.png'
import Routes from '../../services/Routes'
import { removeBackHandler } from '../../../permission'
import { useFocusEffect } from '@react-navigation/native'
import { setSteps, setUserType, userTypes } from '../../services/Storage'
import { SafeAreaView } from 'react-native-safe-area-context';

const UserType = ({ navigation }) => {

    const focusEffectCallback = useCallback(() => {
        const backHandler = removeBackHandler();
        return () => {
            backHandler.remove();
        };
    }, []);

    useFocusEffect(focusEffectCallback);
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={styles?.container}>
                <BackArrow hidden={true} />
                <UserInfoHeading text={'Who are you?'} />
                <UserInfoText text={`Select your account type`} />
                <View style={{ flex: 1, marginTop: hp(4), justifyContent: 'flex-start', width: "100%" }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingHorizontal: wp(3), marginTop: hp(3.3) }}>
                        <UserTypeFilledBtn image={Person} text={'Trader'} onPress={() => { setSteps(1); setUserType(userTypes?.Trader); navigation.navigate(Routes.ROUTE.Trader) }} />
                        <UserTypeOutlinedBtn image={Brokerage} text={'Broker'} onPress={() => { setSteps(0); setUserType(userTypes?.Broker); navigation.navigate(Routes.ROUTE.Broker) }} />
                    </View>

                </View>
            </View>
        </SafeAreaView>
    )
}

export default UserType

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'flerx-start', alignItems: 'center', paddingVertical: hp(1), paddingHorizontal: wp(5.2), backgroundColor: Color.COLOR.screenBg
    },
})