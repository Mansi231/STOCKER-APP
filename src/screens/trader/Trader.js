import { Alert, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Color, Fonts } from '../../utils'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../pixel'
import { BackArrow, UserInfoHeading, UserInfoText } from '../../components/CommonComponents'
import TextInput from '../../components/InputComponents/TextInput'
import camera from '../../assets/userType/camera.png'
import Edit from '../../assets/userType/edit.png'
import { FilledButton } from '../../components/InputComponents/Buttons'
import Routes from '../../services/Routes'
import ImagePicker from 'react-native-image-crop-picker';
import { androidCameraPermission, backHandlerNavigation } from '../../../permission'
import styles from '../broker/styles'
import { Formik } from 'formik'
import * as yup from 'yup';
import { getUserDetail, setSteps, setUserDetail } from '../../services/Storage'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native'

const Trader = ({ navigation }) => {

    const focusEffectCallback = useCallback(() => {
        const backHandler = backHandlerNavigation(Routes.ROUTE.UserType, navigation)

        return () => {
            backHandler.remove();
        };
    }, [navigation]);

    useFocusEffect(focusEffectCallback);

    const [basicInfo, setBasicInfo] = useState({ name: '', email: '', address: '', photo: '' })
    const [detail, setDetail] = useState(null);

    const validationSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        email: yup.string().email('Invalid email format').required('Email is required'),
        address: yup.string().required('Address is required'),
        photo: yup.mixed().required('Photo is required'),
        // Add more validation rules for other fields if needed
    });

    const isEmpty = () => {
        return Object.values(basicInfo).some(value => value == '')
    }

    useEffect(() => {
        getUserDetail()
            .then((t) => {
                setDetail(t)
            })
            .catch((error) => {
                console.error('Error fetching user detail:', error);
            });
    }, []);


    const handleSendCode = (values) => {
        setUserDetail({ ...detail, ...values })
        navigation.navigate(Routes.ROUTE.AccountDone, {
            heading: 'Ready to trade!', text: `Your account has been created  ${'\n'}successfully.`
        })
        setSteps(2)
    }

    const onSelectImage = async (setFieldValue) => {
        // const permissionStatus = await androidCameraPermission()
        ImagePicker.openPicker({
            width: 1000,
            height: 1000,
            cropping: true,
            mediaType: "photo",
            compressImageMaxWidth: 1000,
            compressImageMaxHeight: 1000,
            compressImageQuality: Platform.OS == 'android' ? 0.8 : 1
        }).then(async image => {
            setFieldValue('photo', image)
        });

    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles?.container}>
                <BackArrow onPress={() => navigation.navigate(Routes.ROUTE.UserType)} />
                <UserInfoHeading text={'Almost Done!'} onPress={() => navigation.goBack()} />
                <UserInfoText text={`Please enter your details.`} />
                <Formik
                    initialValues={{
                        name: detail?.name ? detail?.name : '', email: detail?.email ? detail?.email : '', address: detail?.address ? detail?.address : '',
                        photo: detail?.photo ? detail?.photo : ''
                    }}
                    onSubmit={values => { console.log(values); handleSendCode(values) }}
                    validationSchema={validationSchema}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors, touched }) => (
                        <>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                scrollEnabled={true}
                                contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(15) }}
                                style={{ width: '100%' }}
                            >
                                <View style={{ justifyContent: 'flex-start', width: '100%', flexDirection: 'column', gap: hp(1.8), marginTop: hp(5), flex: 1 }}>
                                    <TextInput
                                        style={{ fontSize: hp(1.68) }}
                                        editable={true}
                                        placeholder={'Enter Name'}
                                        require={true}
                                        keyboardType={'default'}
                                        onChangeText={handleChange('name')}
                                        value={values?.name}
                                        onBlur={handleBlur('name')}
                                    />
                                    {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

                                    <TextInput
                                        style={{ fontSize: hp(1.68) }}
                                        editable={true}
                                        placeholder={'Enter Email'}
                                        require={true}
                                        keyboardType={'default'}
                                        onChangeText={handleChange('email')}
                                        value={values?.email}
                                        onBlur={handleBlur('email')}
                                    />
                                    {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                                    <TextInput
                                        style={{ fontSize: hp(1.68) }}
                                        editable={true}
                                        placeholder={'Enter Address'}
                                        require={true}
                                        keyboardType={'default'}
                                        onChangeText={handleChange('address')}
                                        value={values?.address}
                                        onBlur={handleBlur('address')}
                                    />
                                    {touched.address && errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

                                    <View style={{ width: '100%', justifyContent: 'flex-start', gap: hp(1.8) }}>
                                        <Text style={styles?.label}>{'Select your photo'}
                                            {values?.photo == '' && <Text style={{ color: Color.COLOR.errorColor }}>{' '}*</Text>}
                                        </Text>
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            style={[styles.imageBox]}
                                            onPress={() => {
                                                onSelectImage(setFieldValue);
                                            }}>
                                            {(values?.photo != '') ? (
                                                <>
                                                    <Image
                                                        source={{ uri: values?.photo?.path }}
                                                        style={styles.imageStyle}
                                                    />
                                                    <TouchableOpacity
                                                        activeOpacity={1}
                                                        onPress={() => { onSelectImage(setFieldValue) }}
                                                        style={styles.editView}>
                                                        <Image source={Edit} style={styles.editIcon} />
                                                    </TouchableOpacity>
                                                </>
                                            ) : (
                                                <Image source={camera} style={styles.cameraIcon} />
                                            )}
                                        </TouchableOpacity>
                                        {touched.photo && errors.photo && <Text style={styles.errorText}>{errors.photo}</Text>}
                                    </View>
                                </View>
                            </ScrollView>
                            <View style={styles?.bottomBtn}>
                                <FilledButton btnText={'Create account'}
                                    disabled={false}
                                    onPress={() =>
                                        // handleSendCode()
                                        handleSubmit()
                                    } btnStyle={{
                                        backgroundColor: Color.COLOR.primaryBlue,
                                    }}
                                    textStyle={{ color: Color.COLOR.white }}
                                />
                            </View>
                        </>
                    )}
                </Formik>
            </View>
        </SafeAreaView>
    )
}

export default Trader
