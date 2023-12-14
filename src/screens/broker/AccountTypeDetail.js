import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect, useContext, useCallback } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../pixel'
import { Color, Fonts } from '../../utils'
import { BackArrow, UserInfoHeading, UserInfoText } from '../../components/CommonComponents'
import TextInput from '../../components/InputComponents/TextInput'
import EditImage from '../../assets/userType/edit.png'
import Camera from '../../assets/userType/camera.png'
import { FilledButton } from '../../components/InputComponents/Buttons'
import ImagePicker from 'react-native-image-crop-picker';
import Routes from '../../services/Routes'
import styles from './styles'
import { Formik } from 'formik'
import * as yup from 'yup';
import { getBrokerAccountType, getUserDetail, setSteps, setUserDetail } from '../../services/Storage'
import { ValContext } from '../../context/ContextProvider'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native'
import { backHandlerNavigation } from '../../../permission'

const AccountTypeDetail = ({ navigation, route }) => {


    const validationSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        email: yup.string().email('Invalid email format').required('Email is required'),
        address: yup.string().required('Address is required'),
        dec: yup.string().required('Description is required'),
        photo: yup.mixed().required('Photo is required'),
        certificatePhoto: yup.mixed().required('Certificate photo is required'),
        // Add more validation rules for other fields if needed
    });
    let accType = { company: 'Company', individual: 'Individual' }

    const [companyDetails, setCompanyDetails] = useState({ name: '', email: '', address: '', dec: '', photo: '', certificatePhoto: '' })
    const [brokerAccType, setBrokerAccType] = useState('')

    const isEmpty = () => {
        return Object.values(companyDetails).some(value => value == '')
    }
    // const { params: { accountType } } = route;

    const { type, userDetail, setType } = useContext(ValContext)

    const handleSendCode = (values) => {
        setSteps(2)
        setUserDetail({ ...userDetail, ...values })
        navigation.navigate(Routes.ROUTE.KycDetail)
    }

    const handleSelectePhoto = (number, setFieldValue) => {
        ImagePicker.openPicker({
            width: 1000,
            height: 1000,
            cropping: true,
            mediaType: "photo",
            compressImageMaxWidth: 1000,
            compressImageMaxHeight: 1000,
            compressImageQuality: Platform.OS == 'android' ? 0.8 : 1
        }).then(async image => {
            if (number == 1) {
                setCompanyDetails({ ...companyDetails, photo: image });
                setFieldValue('photo', image);
            }
            else if (number == 2) {
                setCompanyDetails({ ...companyDetails, certificatePhoto: image });
                setFieldValue('certificatePhoto', image);
            }
        }).catch((err)=>console.log(err));
    }

    const focusEffectCallback = useCallback(() => {
        getBrokerAccountType()
            .then((t) => {
                setBrokerAccType(t)
            })
            .catch((error) => {
                console.error('Error fetching user detail:', error);
            });

        const backHandler = backHandlerNavigation(Routes.ROUTE.Broker, navigation)

        return () => {
            backHandler.remove();
        };
    }, [navigation]);

    useFocusEffect(focusEffectCallback);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles?.container}>
                <BackArrow onPress={() => navigation.navigate(Routes.ROUTE.Broker)} />
                <UserInfoHeading text={brokerAccType == accType?.company ? 'About your company' : 'About you'} />
                <UserInfoText text={`Please enter your details.`} />
                <Formik
                    initialValues={{
                        name: userDetail?.name ? userDetail?.name : '',
                        email: userDetail?.email ? userDetail?.email : '', address: userDetail?.address ? userDetail?.address : '',
                        dec: userDetail?.dec ? userDetail?.dec : '',
                        photo: userDetail?.photo ? userDetail?.photo : '',
                        certificatePhoto: userDetail?.certificatePhoto ? userDetail?.certificatePhoto : ''
                    }}
                    onSubmit={values => { console.log(values); handleSendCode(values) }}
                    validationSchema={validationSchema}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                        <>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                scrollEnabled={true}
                                keyboardShouldPersistTaps="handled"
                                contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(15) }} style={{ width: '100%' }}>
                                <View style={{
                                    justifyContent: 'flex-start', width: '100%', flexDirection: 'column', gap: hp(1.8), alignSelf: 'flex-start',
                                    marginTop: hp(3)
                                }}>
                                    <TextInput
                                        style={{ fontSize: hp(1.68) }}
                                        editable={true}
                                        placeholder={'Enter Name'}
                                        require={true}
                                        onChangeText={handleChange('name')}
                                        keyboardType={'default'}
                                        value={values?.name}
                                        onBlur={handleBlur('name')}
                                    />
                                    {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

                                    <TextInput
                                        style={{ fontSize: hp(1.68) }}
                                        editable={true}
                                        placeholder={'Enter Email'}
                                        require={true}
                                        onChangeText={handleChange('email')}
                                        keyboardType={'default'}
                                        value={values?.email}
                                        onBlur={handleBlur('email')}
                                    />
                                    {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                                    <TextInput
                                        style={{ fontSize: hp(1.68) }}
                                        editable={true}
                                        placeholder={'Enter Address'}
                                        require={true}
                                        onChangeText={handleChange('address')}
                                        keyboardType={'default'}
                                        value={values?.address}
                                        onBlur={handleBlur('address')}
                                    />
                                    {touched.address && errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

                                    <TextInput
                                        style={{ fontSize: hp(1.68), height: hp(12) }}
                                        editable={true}
                                        placeholder={brokerAccType == accType?.company ? 'Description About Your Company' : 'Description About You'}
                                        require={true}
                                        onChangeText={handleChange('dec')}
                                        keyboardType={'default'}
                                        value={values?.dec}
                                        onBlur={handleBlur('dec')}
                                        multiline={true}
                                        numberOfLines={4}
                                        placeholderContainerStyle={{ top: Platform?.OS == 'ios' ? hp(1.5) : hp(1.7) }}
                                    />
                                    {touched.dec && errors.dec && <Text style={styles.errorText}>{errors.dec}</Text>}

                                    <View style={{ width: '100%', justifyContent: 'flex-start', gap: hp(1.8) }}>
                                        <Text style={styles?.label}>{brokerAccType == accType?.company ? 'Select company logo' : 'Select your photo'}
                                            {values?.photo == '' && <Text style={{ color: Color.COLOR.errorColor }}>{' '}*</Text>}
                                        </Text>

                                        <TouchableOpacity
                                            activeOpacity={1}
                                            style={[styles.imageBox]}
                                            onPress={() => {
                                                handleSelectePhoto(1, setFieldValue)
                                            }}>
                                            {(values?.photo != '') ? (
                                                <>
                                                    <Image
                                                        source={{ uri: values?.photo?.path }}
                                                        style={styles.imageStyle}
                                                    />
                                                    <TouchableOpacity
                                                        activeOpacity={1}
                                                        onPress={() => { handleSelectePhoto(1, setFieldValue) }}
                                                        style={styles.editView}>
                                                        <Image source={EditImage} style={styles.editIcon} />
                                                    </TouchableOpacity>
                                                </>
                                            ) : (
                                                <Image source={Camera} style={styles.cameraIcon} />
                                            )}
                                        </TouchableOpacity>

                                        {touched.photo && errors.photo && <Text style={styles.errorText}>{errors.photo}</Text>}

                                        <Text style={styles?.label}>{'Certificate Related To Your Work'}
                                            {values?.certificatePhoto == '' && <Text style={{ color: Color.COLOR.errorColor }}>{' '}*</Text>}
                                        </Text>

                                        <TouchableOpacity
                                            activeOpacity={1}
                                            style={[styles.imageBox]}
                                            onPress={() => {
                                                handleSelectePhoto(2, setFieldValue)
                                            }}>
                                            {(values?.certificatePhoto != '') ? (
                                                <>
                                                    <Image
                                                        source={{ uri: values?.certificatePhoto?.path }}
                                                        style={styles.imageStyle}
                                                    />
                                                    <TouchableOpacity
                                                        activeOpacity={1}
                                                        onPress={() => { handleSelectePhoto(2, setFieldValue) }}
                                                        style={styles.editView}>
                                                        <Image source={EditImage} style={styles.editIcon} />
                                                    </TouchableOpacity>
                                                </>
                                            ) : (
                                                <Image source={Camera} style={styles.cameraIcon} />
                                            )}
                                        </TouchableOpacity>
                                        {touched.certificatePhoto && errors.certificatePhoto && <Text style={styles.errorText}>{errors.certificatePhoto}</Text>}
                                    </View>
                                </View>
                            </ScrollView>
                            <View style={styles?.bottomBtn}>
                                <FilledButton btnText={'Next'}
                                    // disabled={isEmpty() ? true : false}
                                    onPress={() =>
                                        // handleSendCode()
                                        handleSubmit()
                                    } btnStyle={{
                                        backgroundColor: Color.COLOR.primaryBlue,
                                    }}
                                    textStyle={{ color: Color.COLOR.white }}
                                />
                            </View></>
                    )}
                </Formik>

            </View>
        </SafeAreaView>
    )
}

export default AccountTypeDetail
