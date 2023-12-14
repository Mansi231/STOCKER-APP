import { Image, StyleSheet, Text, TouchableOpacity, View ,BackHandler} from 'react-native'
import React, { useCallback, useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../pixel'
import { Color, Fonts } from '../../utils'
import { BackArrow, UserInfoHeading, UserInfoText } from '../../components/CommonComponents'
import TextInput from '../../components/InputComponents/TextInput'
import EditImage from '../../assets/userType/edit.png'
import Camera from '../../assets/userType/camera.png'
import { FilledButton } from '../../components/InputComponents/Buttons'
import ImagePicker from 'react-native-image-crop-picker';
import styles from './styles'
import Routes from '../../services/Routes'
import { Formik } from 'formik'
import * as yup from 'yup';
import { setSteps } from '../../services/Storage'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native'
import { backHandlerNavigation } from '../../../permission'

const KycDetail = ({ navigation }) => {

    const focusEffectCallback = useCallback(() => {
        const backHandler = backHandlerNavigation(Routes.ROUTE.AccountTypeDetail,navigation)

        return () => {
            backHandler.remove();
        };
    }, [navigation]);

    useFocusEffect(focusEffectCallback);


    const validationSchema = yup.object().shape({
        frontPhoto: yup.mixed().required('Photo is required'),
        backPhoto: yup.mixed().required('Photo is required'),
        // Add more validation rules for other fields if needed
    });

    const [kycDetails, setKycDetails] = useState({ frontPhoto: '', backPhoto: '' });

    const handleSelecteKycPhoto = (from, setFieldValue) => {
        ImagePicker.openPicker({
            width: 1000,
            height: 1000,
            cropping: true,
            mediaType: "photo",
            compressImageMaxWidth: 1000,
            compressImageMaxHeight: 1000,
            compressImageQuality: Platform.OS == 'android' ? 0.8 : 1
        }).then(async image => {
            if (from == 'front') {
                setKycDetails({ ...kycDetails, frontPhoto: image })
                setFieldValue('frontPhoto', image)
            }
            else if (from == 'back') {
                setKycDetails({ ...kycDetails, backPhoto: image })
                setFieldValue('backPhoto', image)
            }
        });
    }

    const handleSendCode = (values) => {
        setSteps(3)
        navigation.navigate(Routes.ROUTE.AccountDone, {
            heading: 'Your Profile Ready!',
            text: `Your company account has been created ${'\n'}successfully.`
        })
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles?.container}>
                <BackArrow onPress={() => { navigation.navigate(Routes.ROUTE.AccountTypeDetail) }} />
                <UserInfoHeading text={'Kyc Detail'} onPress={() => navigation.goBack()} />
                <UserInfoText text={`Add Aadhaar Card Photo`} />
                <Formik
                    initialValues={{ frontPhoto: '', backPhoto: '' }}
                    onSubmit={values => {
                        console.log(values);
                        handleSendCode(values)
                    }}
                    validationSchema={validationSchema}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                        <>
                            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-start', alignItems: 'center', gap: wp(4.2), marginTop: hp(3.3) }}>
                                <View style={{ flexDirection: 'column', gap: hp(1.8) }}>
                                    <Text style={styles?.label}>{'Front Photo'} </Text>
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        style={[styles.imageBox]}
                                        onPress={() => {
                                            handleSelecteKycPhoto('front', setFieldValue)
                                        }}>
                                        {(kycDetails?.frontPhoto != '') ? (
                                            <>
                                                <Image
                                                    source={{ uri: kycDetails?.frontPhoto?.path }}
                                                    style={styles.imageStyle}
                                                />
                                                <TouchableOpacity
                                                    activeOpacity={1}
                                                    onPress={() => { handleSelecteKycPhoto('front', setFieldValue) }}
                                                    style={styles.editView}>
                                                    <Image source={EditImage} style={styles.editIcon} />
                                                </TouchableOpacity>
                                            </>
                                        ) : (
                                            <Image source={Camera} style={styles.cameraIcon} />
                                        )}
                                    </TouchableOpacity>
                                    {<Text style={styles.errorText}>{touched.frontPhoto && errors.frontPhoto ? errors.frontPhoto : ''}</Text>}
                                </View>
                                <View style={{ flexDirection: 'column', gap: hp(1.8) }}>
                                    <Text style={styles?.label}>{'Back Photo'}</Text>
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        style={[styles.imageBox]}
                                        onPress={() => {
                                            handleSelecteKycPhoto('back', setFieldValue)
                                        }}>
                                        {(kycDetails?.backPhoto != '') ? (
                                            <>
                                                <Image
                                                    source={{ uri: kycDetails?.backPhoto?.path }}
                                                    style={styles.imageStyle}
                                                />
                                                <TouchableOpacity
                                                    activeOpacity={1}
                                                    onPress={() => { handleSelecteKycPhoto('back', setFieldValue) }}
                                                    style={styles.editView}>
                                                    <Image source={EditImage} style={styles.editIcon} />
                                                </TouchableOpacity>
                                            </>
                                        ) : (
                                            <Image source={Camera} style={styles.cameraIcon} />
                                        )}
                                    </TouchableOpacity>
                                    {<Text style={styles.errorText}>{touched.backPhoto && errors.backPhoto ? errors.backPhoto : ''}</Text>}
                                </View>
                            </View>
                            <View style={[styles?.bottomBtn, { position: 'absolute', bottom: hp(5) }]}>
                                <FilledButton btnText={'Next'}
                                    // disabled={isEmpty() ? true : false}
                                    onPress={() =>
                                        //  handleSendCode()
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

export default KycDetail
