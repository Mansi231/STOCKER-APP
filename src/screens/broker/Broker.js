import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Platform } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../pixel'
import { Color, Fonts } from '../../utils'
import { BackArrow, UserInfoHeading, UserInfoText, UserTypeFilledBtn, UserTypeOutlinedBtn } from '../../components/CommonComponents'
import Person from '../../assets/userType/person.png'
import Brokerage from '../../assets/userType/brokerage.png'
import Routes from '../../services/Routes'
import Swiper from 'react-native-swiper'
import TextInput from '../../components/InputComponents/TextInput'
import EditImage from '../../assets/userType/edit.png'
import Camera from '../../assets/userType/camera.png'
import { FilledButton } from '../../components/InputComponents/Buttons'
import ImagePicker from 'react-native-image-crop-picker';
import * as yup from 'yup'
import { useFormik } from 'formik';
import { getUserDetail, setBrokerAccountType, setSteps, setUserDetail } from '../../services/Storage'
import { SafeAreaView } from 'react-native-safe-area-context';
import { backHandlerNavigation } from '../../../permission'
import { useFocusEffect } from '@react-navigation/native'

const Broker = ({ navigation }) => {

    let accType = { company: 'Company', individual: 'Individual' }
    let totalSteps = 2
    const [index, setIndex] = useState(0);
    // const [steps,setSteps]= useState(1)
    const [accountType, setAccountType] = useState('');
    const [companyDetails, setCompanyDetails] = useState({ name: '', email: '', address: '', dec: '', photo: '', certificatePhoto: '' })
    const [kycDetails, setKycDetails] = useState({ frontPhoto: '', backPhoto: '' });

    const swiperRef = useRef(null);

    const isEmpty = () => {
        return Object.values(index == totalSteps ? kycDetails : companyDetails).some(value => value == '')
    }

    const handleAccountNavigation = async (type) => {
        // setAccountType(type);
        setSteps(1)
        // console.log('type in broker',type)
        setBrokerAccountType(type)
        navigation.navigate(Routes.ROUTE.AccountTypeDetail, {
            accountType: type
        })
    }

    const handleNextPage = () => {
        if (index == totalSteps) {
            navigation.navigate(Routes.ROUTE.AccountDone, {
                heading: 'Your Profile Ready!',
                text: `Your company account has been created ${'\n'}successfully.`
            })
        }
        else if (index < totalSteps && index != 0) {
            swiperRef.current?.scrollBy(1);
        }
    }


    const handleSelectePhoto = (number) => {
        ImagePicker.openPicker({
            width: 1000,
            height: 1000,
            cropping: true,
            mediaType: "photo",
            compressImageMaxWidth: 1000,
            compressImageMaxHeight: 1000,
            compressImageQuality: Platform.OS == 'android' ? 0.8 : 1
        }).then(async image => {
            if (number == 1) setCompanyDetails({ ...companyDetails, photo: image })
            else if (number == 2) setCompanyDetails({ ...companyDetails, certificatePhoto: image })
        });
    }

    const handleSelecteKycPhoto = (from) => {
        ImagePicker.openPicker({
            width: 1000,
            height: 1000,
            cropping: true,
            mediaType: "photo",
            compressImageMaxWidth: 1000,
            compressImageMaxHeight: 1000,
            compressImageQuality: Platform.OS == 'android' ? 0.8 : 1
        }).then(async image => {
            if (from == 'front') setKycDetails({ ...kycDetails, frontPhoto: image })
            else if (from == 'back') setKycDetails({ ...kycDetails, backPhoto: image })
        });
    }

    const focusEffectCallback = useCallback(() => {
        const backHandler = backHandlerNavigation(Routes.ROUTE.UserType,navigation)

        return () => {
            backHandler.remove();
        };
    }, [navigation]);

    useFocusEffect(focusEffectCallback);

    return (
        <SafeAreaView style={{flex:1}}>
            <View style={styles?.container}>
                <BackArrow onPress={() => navigation.navigate(Routes.ROUTE.UserType)} />
                <UserInfoHeading text={'Account Type'} />
                <UserInfoText text={`Select your account type`} />
                <View style={{ flex: 1, marginTop: hp(4), justifyContent: 'flex-start', width: "100%" }}>
                    <View style={styles?.btnContainer}>
                        <UserTypeOutlinedBtn image={Person} text={accType?.company} onPress={() => handleAccountNavigation(accType?.company)} />
                        <UserTypeFilledBtn image={Brokerage} text={accType?.individual} onPress={() => handleAccountNavigation(accType?.individual)} />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Broker

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingVertical: hp(3), paddingHorizontal: wp(5.2),
        backgroundColor: Color.COLOR.screenBg
    },
    btnContainer: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingHorizontal: wp(3),
        marginTop: hp(3.3)
    }
})