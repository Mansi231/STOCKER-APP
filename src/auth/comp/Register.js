import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, Platform, KeyboardAvoidingView, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { Color, Fonts } from '../../utils'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../pixel'
import LeftArrow from '../../assets/auth/LeftArrow.png'
import CountryPicker, { DARK_THEME, getAllCountries } from 'react-native-country-picker-modal';
import styles from '../style/LoginStyles'
import { FilledButton } from '../../components/InputComponents/Buttons'
import Routes from '../../services/Routes'
import { BackArrow, UserInfoHeading, UserInfoText } from '../../components/CommonComponents'
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

const Register = ({ navigation }) => {
    const [safeArea, setSafeArea] = useState(false)
    const [CountryModalVisible, setCountryModalVisible] = useState(false);
    const [countryCode, setCountryCode] = useState('+91');
    const [phoneNumber, setPhoneNumber] = useState(null);
    let phoneNumberLength = 11;

    const onCountrySelect = country => {
        if (country.callingCode[0] != undefined) {
            setCountryCode(`+` + country?.callingCode[0]);
            setCountryModalVisible(!CountryModalVisible);
        }

    };

    const formatPhoneNumber = (value) => {
        const cleanValue = value?.replace(/\D/g, '');

        const firstFive = cleanValue?.slice(0, 5);
        const remainingDigits = cleanValue?.slice(5, 10);
        let newFormattedValue = '';

        if (remainingDigits) {
            newFormattedValue = `${firstFive} ${remainingDigits}`;
        } else {
            newFormattedValue = firstFive;
        }

        setPhoneNumber(newFormattedValue);
        if (newFormattedValue?.length == phoneNumberLength) Keyboard.dismiss()
    };


    const handleSendCode = () => {
        if (phoneNumber?.length == phoneNumberLength) {
            navigation?.navigate(Routes?.ROUTE?.OtpNumber, {
                phoneNumber: `${countryCode} ${phoneNumber}`,
            });
        }

    }
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={styles?.container}>
                <BackArrow onPress={() => { navigation.goBack() }} />
                <UserInfoHeading text={'Phone Number?'} />
                <UserInfoText text={`You will be sent a code on this number to verify if you are the owner of the number. `} />
                <View style={{ width: '100%', height: hp(6.4), justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{
                        width: '100%',
                        height: '100%',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexDirection: 'row',
                        gap: wp(2),
                    }}>
                        <TouchableOpacity
                            style={[styles?.phoneNumber]}
                            activeOpacity={1}
                            onPress={() => {
                                setCountryModalVisible(!CountryModalVisible)
                            }}>
                            <Text style={[styles.numberText]}>
                                {countryCode}
                            </Text>
                            <CountryPicker
                                withFilter
                                withCallingCode
                                withCallingCodeButton
                                countryCode={countryCode}
                                visible={CountryModalVisible}
                                withFlagButton={false}
                                onSelect={onCountrySelect}
                                withModal={true}
                            />
                        </TouchableOpacity>
                        <TextInput style={[styles?.phoneNumber, styles?.numberText, {
                            flex: 1, textAlign: "left",
                            borderColor: phoneNumber?.length == phoneNumberLength ? Color.COLOR.primaryBlue : Color.COLOR.borderGrey
                        }]}
                            editable={true}
                            value={phoneNumber}
                            onChangeText={(value) => { formatPhoneNumber(value) }}
                            onFocus={() => { }}
                            // onBlur={() => { }}
                            placeholder='Enter Phone Number'
                            placeholderTextColor={Color.COLOR.textGrey}
                            keyboardType="numeric"
                            maxLength={phoneNumberLength}
                        />
                    </View>
                </View>
                <View style={styles?.bottomBtn}>
                    <FilledButton btnText={'Send Code'}
                        disabled={phoneNumber?.length == phoneNumberLength ? false : true}
                        onPress={() => handleSendCode()} btnStyle={{
                            backgroundColor: phoneNumber?.length == phoneNumberLength ? Color.COLOR.primaryBlue : Color.COLOR.bgGrey,
                        }}
                        textStyle={{ color: phoneNumber?.length == phoneNumberLength ? Color.COLOR.white : Color.COLOR.textGrey }}
                    />
                </View>
            </View >
        </SafeAreaView>
    )
}

export default Register
