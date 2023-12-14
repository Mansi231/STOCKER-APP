import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, Keyboard } from 'react-native'
import React, { useRef, useState } from 'react'
import { Color, Fonts } from '../../utils'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../pixel'
import LeftArrow from '../../assets/auth/LeftArrow.png'
import CountryPicker from 'react-native-country-picker-modal';
import styles from '../style/LoginStyles';
import OtpInputs from 'react-native-otp-textinput';
import { FilledButton } from '../../components/InputComponents/Buttons'
import Routes from '../../services/Routes'
import { BackArrow, UserInfoHeading, UserInfoText } from '../../components/CommonComponents'
import { saveUserDetail } from '../../redux/reducers/Action'
import { useDispatch } from 'react-redux'
import { setSteps, setUserDetail } from '../../services/Storage'
import { SafeAreaView } from 'react-native-safe-area-context';

let countryCodes = '+91'

const OtpNumber = ({ navigation, route, length = 6 }) => {

    const [otp, setOtp] = useState(Array(length).fill(''));
    const otpInputs = Array(length).fill(null);

    const inputRefs = otpInputs.map(() => useRef(null));

    const handleChange = (index, value) => {
        if (isNaN(value)) {
            return; // Ignore non-numeric characters
        }

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (index < length - 1 && value !== '') {
            inputRefs[index + 1].current.focus();
        }
        if (newOtp?.join('')?.length == length) Keyboard.dismiss()
    };

    const handleKeyPress = (index, key) => {
        if (key === 'Backspace' && index > 0 && !otp[index]) {
            const newOtp = [...otp];
            newOtp[index - 1] = '';
            setOtp(newOtp);
            inputRefs[index - 1].current.focus();
        }
    };

    const handleRegister = () => {
        if (otp?.join('')?.length == length) {
            setSteps(0)
            setUserDetail({ phoneNumber: route?.params?.phoneNumber, isLoggedIn: true })
            navigation.navigate(Routes.ROUTE.UserType)
        }
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <View style={styles?.container}>
                <BackArrow onPress={() => navigation.navigate(Routes.ROUTE.Register)} />
                <UserInfoHeading text={'Enter code'} />
                <UserInfoText text={`Enter the verification code we just sent to your ${'\n'}number ${route?.params?.phoneNumber}`} />
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: wp(2) }}>
                    {otpInputs.map((_, index) => (
                        <TextInput
                            key={index}
                            ref={inputRefs[index]}
                            style={[styles.inputCell, { borderColor: !otp[index] ? Color.COLOR.borderGrey : Color.COLOR.primaryBlue }, !otp[index] && {
                                backgroundColor:
                                    Color.COLOR.bgLightGrey
                            }]}
                            maxLength={1}
                            value={otp[index]}
                            keyboardType="numeric"
                            onChangeText={(value) => handleChange(index, value)}
                            onKeyPress={({ nativeEvent: { key } }) =>
                                handleKeyPress(index, key)
                            }
                            textAlignVertical='center'
                        />
                    ))}
                </View>
                <Text style={styles.otpValidtion}>
                    {/* {reEnterOtp ? 'Code Invalid!' : 'Code not received?'} */}
                    Didn’t receive code?
                    {/* {parseInt(timer) <= 0 ? (
                        <Text
                            onPress={() => onResendOtpFunction()}
                            style={styles.resend}>
                            {' '}
                            RESEND
                        </Text>
                    ) : (
                        <Text style={styles.resend}> 00:{timer}</Text>
                    )} */}
                    {' '}
                    <Text
                        onPress={() => { }}
                        style={styles.resend}>

                        RESEND
                    </Text>
                </Text>
                <View style={styles?.bottomBtn}>
                    <FilledButton btnText={'Verify'}
                        disabled={otp?.join('')?.length == length ? false : true}
                        onPress={() => {
                            handleRegister()
                        }} btnStyle={{
                            backgroundColor: otp?.join('')?.length == length ? Color.COLOR.primaryBlue : Color.COLOR.bgGrey,
                        }}
                        textStyle={{ color: otp?.join('')?.length == length ? Color.COLOR.white : Color.COLOR.textGrey }}
                    />
                </View>

            </View >
        </SafeAreaView>
    )
}

export default OtpNumber

