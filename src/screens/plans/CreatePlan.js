import { Platform, ScrollView, StatusBar, StyleSheet, Text, View, TouchableOpacity, Image, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../pixel'
import { Color, Fonts } from '../../utils'
import { BackArrow } from '../../components/CommonComponents'
import { Formik } from 'formik'
import * as yup from 'yup';
import TextInput from '../../components/InputComponents/TextInput'
import { FilledButton, OutLinedButton } from '../../components/InputComponents/Buttons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Tooltip } from 'react-native-elements';
import Routes from '../../services/Routes'
import { SafeAreaView } from 'react-native-safe-area-context'

const CreatePlan = ({ navigation }) => {


    const [validationSchemaObj, setValidationSchemaObj] = useState({
        planTitle: yup.string().required('Title is required'),
        planDesc: yup.string().required('description is required'),
        freeDays: yup.number().required('Number of free days are required'),
    });

    const [validationSchema, setValidationSchema] = useState(yup.object().shape(validationSchemaObj))

    const [planCheckList, setPlanCheckList] = useState([
        { title: 'One Day plan', checked: false, name: '', price: '' },
        { title: 'Monthly Plan', checked: false, name: '', price: '' },
        { title: 'Yearly Plan', checked: false, name: '', price: '' },
    ])

    const [freeTrial, setFreeTrial] = useState(true);


    const updateValidationSchema = (index, isChecked, setFieldError) => {
        // Create a copy of the current validation schema
        let updatedSchema = { ...validationSchemaObj };
        if (isChecked) {
            updatedSchema[`planName${index}`] = yup.string().required('Plan Name is required');
            updatedSchema[`price${index}`] = yup.string().required('Price is required');
        } else {
            delete updatedSchema[`planName${index}`];
            delete updatedSchema[`price${index}`];
            setFieldError(`price${index}`, '');
            setFieldError(`planName${index}`, '');
        }
        setValidationSchema(yup.object().shape(updatedSchema))
        setValidationSchemaObj(updatedSchema)
    };

    const handleFreeTrialSchema = (setFieldError) => {
        let updatedSchema = { ...validationSchemaObj };

        setFreeTrial(!freeTrial);
        console.log(freeTrial)
        if (!freeTrial) updatedSchema['freeDays'] = yup.string().required('Number of free days are required');
        else { delete updatedSchema[`freeDays`]; setFieldError(`freeDays`, ''); }

        setValidationSchemaObj(updatedSchema);
        setValidationSchema(yup.object().shape(updatedSchema))

    }

    return (
        <SafeAreaView style={{flex:1}}>
            <View style={styles?.container}>
                <View style={[styles?.headingBox,]}>
                    <BackArrow onPress={() => navigation.navigate(Routes.ROUTE.Plans)} />
                    <Text style={styles?.heading}>Create Plan</Text>
                    <View />
                </View>
                <Formik
                    initialValues={{ planTitle: '', planDesc: '', planName0: '', price0: '', planName1: '', price1: '', planName2: '', price2: '', freeDays: '' }}
                    onSubmit={values => { console.log(values); handleSendCode() }}
                    validationSchema={validationSchema}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, setFieldError, setFieldValue, errors, touched }) => (
                        <>
                            {/* {console.log(errors,'-===errors')} */}
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                scrollEnabled={true}
                                contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(15) }}
                                style={{ width: '100%' }}
                            >
                                <View style={styles?.inputContainer}>
                                    <TextInput
                                        style={styles?.input}
                                        editable={true}
                                        placeholder={'Enter Plan Title '}
                                        require={true}
                                        keyboardType={'default'}
                                        onChangeText={handleChange('planTitle')}
                                        value={values?.planTitle}
                                        onBlur={handleBlur('planTitle')}
                                    />
                                    {touched.planTitle && errors.planTitle && <Text style={styles.errorText}>{errors.planTitle}</Text>}

                                    <TextInput
                                        style={styles?.input}
                                        numberOfLines={4}
                                        placeholderContainerStyle={{ top: Platform?.OS == 'ios' ? hp(1.5) : hp(1.7) }}
                                        editable={true}
                                        placeholder={'Enter Plan Description'}
                                        require={true}
                                        keyboardType={'default'}
                                        onChangeText={handleChange('planDesc')}
                                        value={values?.planDesc}
                                        onBlur={handleBlur('planDesc')}
                                    />
                                    {touched.planDesc && errors.planDesc && <Text style={styles.errorText}>{errors.planDesc}</Text>}

                                    {
                                        planCheckList?.map(({ title, checked, name, price }, index) => {
                                            return (
                                                <>
                                                    <TouchableOpacity
                                                        key={index}
                                                        onPress={() => {
                                                            let arr = [...planCheckList];
                                                            arr[index] = { ...arr[index], checked: !arr[index]?.checked };
                                                            setPlanCheckList(arr);
                                                            updateValidationSchema(index, arr[index]?.checked, setFieldError);
                                                        }}
                                                        activeOpacity={1} style={styles?.checkBox}
                                                    >
                                                        <Ionicons name={checked ? 'checkbox' : 'square-outline'} size={hp(2.2)} color={checked ? Color.COLOR.primaryBlue : Color.COLOR.textGrey} />
                                                        <Text style={styles?.checkboxText}>{title}</Text>
                                                    </TouchableOpacity>

                                                    {checked &&
                                                        <>
                                                            <View style={styles?.checkedInputBox}>
                                                                <View style={{ width: '47.5%' }}>
                                                                    <TextInput
                                                                        style={styles?.input}
                                                                        editable={true}
                                                                        placeholder={'Name'}
                                                                        require={true}
                                                                        keyboardType={'default'}
                                                                        onChangeText={handleChange(`planName${index}`)}
                                                                        value={values[`planName${index}`]}
                                                                        onBlur={handleBlur(`planName${index}`)}
                                                                    />
                                                                </View>
                                                                <View style={{ width: '47.5%' }}>
                                                                    <TextInput
                                                                        style={styles?.input}
                                                                        editable={true}
                                                                        placeholder={'Price'}
                                                                        require={true}
                                                                        keyboardType={'number-pad'}
                                                                        onChangeText={handleChange(`price${index}`)}
                                                                        value={values[`price${index}`]}
                                                                        onBlur={handleBlur(`price${index}`)}
                                                                    />
                                                                </View>
                                                            </View>
                                                            {(errors[`planName${index}`] || errors[`price${index}`]) && <View style={styles?.checkedInputBox}>
                                                                {<Text style={[styles.errorText, { width: '47%' }]}>{touched[`planName${index}`] && errors[`planName${index}`] && errors[`planName${index}`]}</Text>}
                                                                {<Text style={[styles.errorText, { width: '47%' }]}>{touched[`price${index}`] && errors[`price${index}`] && errors[`price${index}`]}</Text>}
                                                            </View>}
                                                        </>
                                                    }
                                                </>
                                            )
                                        })
                                    }

                                    <View style={styles?.freeTrialBox}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                handleFreeTrialSchema(setFieldError)
                                            }}
                                            activeOpacity={1} style={styles?.checkBox}
                                        >
                                            <Ionicons name={freeTrial ? 'checkbox' : 'square-outline'} size={hp(2.2)} color={freeTrial ? Color.COLOR.primaryBlue : Color.COLOR.textGrey} />
                                            <Text style={styles?.checkboxText}>{'Allow free trail to user'}</Text>
                                        </TouchableOpacity>

                                        {/* ToolTip */}

                                        <Tooltip
                                            overlayColor={Color.COLOR.primaryBlue14}
                                            backgroundColor={Color.COLOR.primaryBlue}
                                            width={Platform?.OS == 'android' ? wp(65) : wp(65)}
                                            height={Platform?.OS == 'ios' ? hp(15) : hp(10)}
                                            popover={<Text numberOfLines={4} style={styles?.tooltipText}>Depending on the additional days you include, users will enjoy the privilege of accessing your plan at no cost.</Text>}>
                                            <View style={styles?.tooltipBtn}>
                                                <MaterialIcons name='question-mark' size={hp(2)} color={Color.COLOR.white} />
                                            </View>

                                        </Tooltip>
                                    </View>

                                    {
                                        freeTrial &&
                                        <View style={{ width: '100%' }}>
                                            <TextInput
                                                style={styles?.input}
                                                editable={true}
                                                placeholder={'Number Of Free Days'}
                                                require={true}
                                                keyboardType={'number-pad'}
                                                onChangeText={handleChange('freeDays')}
                                                value={values['freeDays']}
                                                onBlur={handleBlur('freeDays')}
                                            />
                                            {touched?.freeDays && errors?.freeDays && <Text style={[styles.errorText, { marginVertical: hp(1.2) }]}>{errors?.freeDays}</Text>}
                                        </View>
                                    }

                                </View>
                            </ScrollView>
                            <View style={styles?.bottomBtn}>
                                <FilledButton btnText={'Create Plan'}
                                    disabled={false}
                                    onPress={() =>
                                        // handleSendCode()
                                        handleSubmit()
                                    } btnStyle={{
                                        backgroundColor: Color.COLOR.primaryBlue,
                                        width: '49%', height: hp(6), paddingVertical: hp(0.4)
                                    }}
                                    textStyle={{ fontSize: hp(1.7) }}
                                />
                                <OutLinedButton
                                    style={{
                                        width: '49%', marginBottom: 0, borderWidth: hp(.1),
                                        height: hp(6), paddingVertical: hp(0.4)
                                    }}
                                    onPress={() => { }}
                                    btnText={'Cancel'}
                                    textStyle={{ fontSize: hp(1.7) }}
                                />

                            </View>
                        </>
                    )}
                </Formik>
            </View>
        </SafeAreaView>
    )
}

export default CreatePlan

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'flex-start', alignItems: 'center',
        paddingTop: hp(1),
        backgroundColor: Color.COLOR.screenBg,
        paddingHorizontal: wp(4)
    },
    marginY: {
        marginVertical: hp(1.7)
    },
    inputContainer: { justifyContent: 'flex-start', width: '100%', flexDirection: 'column', gap: hp(1.8), marginTop: hp(5), flex: 1 }
    ,
    fontSizeCheckbox: { fontSize: hp(1.68) },
    headingBox: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center'},
    heading: {
        color: Color.COLOR.primaryBlue, fontFamily: Fonts.FONTS.PoppinsMedium, fontSize: hp(2.1), textAlign: 'center', textAlignVertical: 'center',
        marginTop: hp(1.5)
    },
    checkBox: {
        flexDirection: 'row', gap: wp(1), justifyContent: 'flex-start',
        alignItems: 'center'
    },
    checkboxText: {
        color: Color.COLOR.textGrey, fontFamily: Fonts.FONTS.PoppinsRegular,
        fontSize: hp(1.6), textAlignVertical: 'center'
    },
    checkedInputBox: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', width: '100%'
    },
    errorText: {
        color: Color.COLOR.errorColor,
        fontFamily: Fonts.FONTS.PoppinsRegular,
        fontSize: hp(1.68), lineHeight: hp(2.3)
    },
    freeTrialBox: { flexDirection: 'row', justifyContent: 'space-between' },
    tooltipBtn: {
        backgroundColor: Color.COLOR.primaryBlue, borderRadius: hp(4),
        padding: hp(.2)
    },
    tooltipText: { color: Color.COLOR.white, fontFamily: Fonts.FONTS.PoppinsRegular, fontSize: hp(1.6) },
    bottomBtn: {
        flexDirection: 'row', justifyContent: 'space-between',
        width: '100%', alignItems: 'center', marginVertical: hp(3)
    },
    input: { borderWidth: hp(.17), fontSize: hp(1.68) }

})