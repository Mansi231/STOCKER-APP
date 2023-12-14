import { Image, StyleSheet, Text, Touchable, View, TouchableOpacity } from 'react-native'
import React, { useCallback, useContext, useEffect } from 'react'
import Clouds from '../../assets/auth/clouds.png'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../pixel'
import { Color, Fonts } from '../../utils'
import { FilledButton, OutLinedButton } from '../../components/InputComponents/Buttons'
import Routes from '../../services/Routes'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ValContext } from '../../context/ContextProvider'
import { getSteps, getUserDetail, getUserType, userTypes } from '../../services/Storage'
import { removeBackHandler } from '../../../permission'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native'

const StartPortFolio = ({ navigation }) => {
  const { type, userDetail, setUserDetail, setType } = useContext(ValContext)

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
        <View style={styles?.contentContainer}>
          <View style={styles?.welcomeTextContainer}>
            <Text style={styles?.welcomeHeading}>Welcome to Stocker</Text>
            <Text style={styles?.welcomeText}>Build your portfolio</Text>
          </View>
          <FilledButton onPress={() => { navigation.navigate(Routes.ROUTE.Register) }} btnText={'Get Started'} />
          <OutLinedButton onPress={() => navigation.navigate(Routes.ROUTE.Register)} btnText={'Log in'} />
          <Text style={styles?.continueGreyText}>
            By continuing you accept our{' '}
            <Text style={styles?.continueBlueText}>Terms of Service</Text>
            {' '}
            Also learn how we process your data in our{'\n'}
            <Text style={styles?.continueBlueText}>Privacy Policy</Text>
            {' and '}
            <Text style={styles?.continueBlueText}>Cookies policy</Text>
            {'.'}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default StartPortFolio

const styles = StyleSheet.create({
  mainView: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.COLOR.screenBg
  },
  contentContainer: {
    flex: 1, width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
    paddingHorizontal: wp(5.2), paddingVertical: hp(3.2)
  },
  welcomeTextContainer: { flex: 1, justifyContent: 'flex-start', flexDirection: 'column', alignItems: 'center' },
  welcomeHeading: {
    fontSize: hp(3.06), color: Color.COLOR.primaryBlue, textAlign: 'center', fontFamily: Fonts.FONTS.PoppinsSemiBold
  },
  welcomeText: {
    fontFamily: Fonts.FONTS.PoppinsMedium, fontSize: hp(1.9), color: Color.COLOR.textGrey, textAlignVertical: 'center', textAlign: 'center'
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

})