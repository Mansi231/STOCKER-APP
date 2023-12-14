import { Platform, ScrollView, StatusBar, StyleSheet, Text, View, TouchableOpacity, Image, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../pixel'
import { Color, Fonts } from '../../utils'
import { BackArrow } from '../../components/CommonComponents'
import { Formik } from 'formik'
import * as yup from 'yup';
import TextInput from '../../components/InputComponents/TextInput'
import { FilledButton, OutLinedButton } from '../../components/InputComponents/Buttons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import DatePicker from 'react-native-date-picker';
import moment from 'moment'
import Routes from '../../services/Routes'
import { SafeAreaView } from 'react-native-safe-area-context'

const GiveAdvice = ({ navigation }) => {

    const [open, setOpen] = useState(false)
    const [validationSchemaObj, setValidationSchemaObj] = useState({
        stockName: yup.string().required('Title is required'),
        selectedOption: yup.string().required('description is required'),
        purchaseMinPrice: yup.number().required('Minimum price is required'),
        targetMinPrice: yup.number().required('Minimum price is required'),
        purchaseMaxPrice: yup.number().required('Maximum price is required').when(
            'purchaseMinPrice',
            (purchaseMinPrice, schema) => {
                return schema.test({
                    test: function (purchaseMaxPrice) {
                        if (purchaseMaxPrice < purchaseMinPrice) {
                            return this.createError({
                                path: 'purchaseMaxPrice',
                                message: 'Maximum price must be greater than or equal to minimum price',
                            });
                        }
                        return true;
                    },
                });
            }
        ),
        targetMaxPrice: yup.number().required('Maximum price is required').when(
            'targetMinPrice',
            (targetMinPrice, schema) => {
                return schema.test({
                    test: function (targetMaxPrice) {
                        if (targetMaxPrice < targetMinPrice) {
                            return this.createError({
                                path: 'targetMaxPrice',
                                message: 'Maximum price must be greater than or equal to minimum price',
                            });
                        }
                        return true;
                    },
                });
            }
        ),
    });
    const validationSchema = yup.object().shape(validationSchemaObj);

    let stockOptions = [{ name: 'Equity', selected: false }, { name: 'Call Option', selected: false }, { name: 'Put Option', selected: false }]
    let options = { Equity: 'Equity', CallOption: 'Call Option', PutOption: 'Put Option' }

    return (
        <SafeAreaView style={{flex:1}}>
            <View style={styles?.container}>
                <View style={[styles?.headingBox,]}>
                    <BackArrow onPress={() => navigation.navigate(Routes.ROUTE.Plans)} />
                    <Text style={styles?.heading}>Give Advice</Text>
                    <View />
                </View>
                <Formik
                    initialValues={{ stockName: '', selectedOption: options?.Equity, purchaseMinPrice: '', purchaseMaxPrice: '', targetMinPrice: '', targetMaxPrice: '', targetDate: moment() }}
                    onSubmit={values => { console.log(values); handleSendCode() }}
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
                                <View style={styles?.inputContainer}>
                                    <TextInput
                                        style={styles?.input}
                                        editable={true}
                                        placeholder={'Enter Stock Name'}
                                        require={true}
                                        keyboardType={'default'}
                                        onChangeText={handleChange('stockName')}
                                        value={values?.stockName}
                                        onBlur={handleBlur('stockName')}
                                    />
                                    {touched.stockName && errors.stockName && <Text style={styles.errorText}>{errors.stockName}</Text>}

                                    <View style={styles?.radioContainer}>
                                        {
                                            stockOptions?.map(({ name, selected }, index) => {
                                                return (
                                                    <TouchableOpacity
                                                        key={index}
                                                        onPress={() => setFieldValue('selectedOption', name)}
                                                        activeOpacity={.9}
                                                        style={styles?.radioBox} >
                                                        <MaterialCommunityIcons name={values?.selectedOption == name ? 'circle-slice-8' : 'circle-outline'} size={hp(2.2)} color={values?.selectedOption == name ? Color.COLOR.primaryBlue : Color.COLOR.textGrey} />
                                                        <Text style={styles?.radioText}>{name}</Text>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </View>

                                    {/* Purchase Price */}

                                    <Text style={styles?.purchaseText}>
                                        Purchase Price
                                    </Text>

                                    <View style={styles?.priceBox}>
                                        <View style={{ width: '47.5%' }}>
                                            <TextInput
                                                style={styles?.input}
                                                editable={true}
                                                placeholder={'Min Price'}
                                                require={true}
                                                keyboardType={'number-pad'}
                                                onChangeText={handleChange(`purchaseMinPrice`)}
                                                value={values?.purchaseMinPrice}
                                                onBlur={handleBlur(`purchaseMinPrice`)}
                                            />
                                            {/* {touched?.purchaseMinPrice && errors?.purchaseMinPrice && <Text style={styles.errorText}>{errors?.purchaseMinPrice}</Text>} */}
                                        </View>
                                        <View style={{ width: '47.5%' }}>
                                            <TextInput
                                                style={styles?.input}
                                                editable={true}
                                                placeholder={'Max Price'}
                                                require={true}
                                                keyboardType={'number-pad'}
                                                onChangeText={handleChange(`purchaseMaxPrice`)}
                                                value={values?.purchaseMaxPrice}
                                                onBlur={handleBlur(`purchaseMaxPrice`)}
                                            />
                                            {/* {touched?.purchaseMaxPrice && errors?.purchaseMaxPrice && <Text style={styles.errorText}>{errors?.purchaseMaxPrice}</Text>} */}
                                        </View>
                                    </View>

                                    {/* Purchase Price Errors */}

                                    {(touched?.purchaseMinPrice || touched?.purchaseMaxPrice) && <View style={styles?.priceBox}>
                                        {<Text style={styles.errorText}>{touched?.purchaseMinPrice && errors?.purchaseMinPrice && errors?.purchaseMinPrice}</Text>}
                                        {<Text style={styles.errorText}>{touched?.purchaseMaxPrice && errors?.purchaseMaxPrice && errors?.purchaseMaxPrice}</Text>}
                                    </View>}

                                    {/* Target Price  */}

                                    <Text style={styles?.purchaseText}>
                                        Target Price
                                    </Text>

                                    <View style={[styles?.priceBox]}>
                                        <View style={{ width: '47.5%' }}>
                                            <TextInput
                                                style={styles?.input}
                                                editable={true}
                                                placeholder={'Min Price'}
                                                require={true}
                                                keyboardType={'default'}
                                                onChangeText={handleChange(`targetMinPrice`)}
                                                value={values?.targetMinPrice}
                                                onBlur={handleBlur(`targetMinPrice`)}
                                            />
                                            {/* {touched?.targetMinPrice && errors?.targetMinPrice && <Text style={styles.errorText}>{errors?.targetMinPrice}</Text>} */}
                                        </View>
                                        <View style={{ width: '47.5%' }}>
                                            <TextInput
                                                style={styles?.input}
                                                editable={true}
                                                placeholder={'Max Price'}
                                                require={true}
                                                keyboardType={'number-pad'}
                                                onChangeText={handleChange(`targetMaxPrice`)}
                                                value={values?.targetMaxPrice}
                                                onBlur={handleBlur(`targetMaxPrice`)}
                                            />
                                            {/* {touched?.targetMaxPrice && errors?.targetMaxPrice && <Text style={styles.errorText}>{errors?.targetMaxPrice}</Text>} */}
                                        </View>
                                    </View>

                                    {/* Target Price Errors */}

                                    {(touched?.targetMinPrice || touched?.targetMaxPrice) && <View style={styles?.priceBox}>
                                        {<Text style={styles.errorText}>{touched?.targetMinPrice && errors?.targetMinPrice && errors?.targetMinPrice}</Text>}
                                        {<Text style={styles.errorText}>{touched?.targetMaxPrice && errors?.targetMaxPrice && errors?.targetMaxPrice}</Text>}
                                    </View>}

                                    {/* Target Date */}

                                    <Text style={styles?.purchaseText}>
                                        Target Date
                                    </Text>


                                    {/* Date Picker */}

                                    <TouchableOpacity
                                        activeOpacity={1}
                                        style={[styles.datePickerViewStyle,]}
                                        onPress={() => {
                                            setOpen(!open);
                                        }}>
                                        <Text
                                            style={[styles.datePickerStyle,]}>
                                            {values?.targetDate?.format('DD-MM-YYYY')}
                                        </Text>
                                    </TouchableOpacity>
                                    <DatePicker
                                        theme='dark'
                                        modal
                                        open={open}
                                        date={values?.targetDate?.toDate()}
                                        mode={'date'}
                                        onConfirm={val => {
                                            setOpen(false);
                                            setFieldValue('targetDate', moment(val))
                                        }}
                                        minimumDate={moment()?.toDate()}
                                        onCancel={() => {
                                            setOpen(false);
                                        }}
                                    />
                                    <Text style={[styles?.errorText, { width: '100%', fontSize: hp(1.2) }]}>Note: If you are not sure you can leave target date</Text>

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
                                        width: '49%', height: hp(5), paddingVertical: hp(0.4)
                                    }}
                                    textStyle={{ fontSize: hp(1.7) }}
                                />
                                <OutLinedButton
                                    style={{
                                        width: '49%', marginBottom: 0, borderWidth: hp(.1),
                                        height: hp(5), paddingVertical: hp(0.4)
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

export default GiveAdvice

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'flex-start', alignItems: 'center',
        paddingTop:hp(1),
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
    radioContainer: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
    },
    radioBox: {
        gap: wp(1), flexDirection: 'row', justifyContent: 'flex-start',
        alignItems: 'center'
    },
    radioText: {
        color: Color.COLOR.textGrey, fontFamily: Fonts.FONTS.PoppinsMedium,
        fontSize: hp(1.8), textAlignVertical: 'center'
    },
    purchaseText: {
        color: Color.COLOR.textGrey, fontFamily: Fonts.FONTS.PoppinsRegular,
        fontSize: hp(1.6), textAlignVertical: 'center'
    },
    priceBox: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', width: '100%'
    },
    bottomBtn: {
        flexDirection: 'row', justifyContent: 'space-between',
        width: '100%', alignItems: 'center', marginVertical: hp(3)
    },
    errorText: {
        color: Color.COLOR.errorColor,
        fontFamily: Fonts.FONTS.PoppinsRegular,
        fontSize: hp(1.68), lineHeight: hp(2.3), width: '47%'
    },
    input: { borderWidth: hp(.17), fontSize: hp(1.68) },
    datePickerViewStyle: {
        height: hp(6.4),
        borderRadius: hp(1),
        borderWidth: hp(.17),
        borderColor: Color.COLOR.borderGrey, textAlign: 'left',
        alignItems: 'center', flexDirection: 'row',

    },
    datePickerStyle: {
        fontSize: hp(1.68),
        color: Color.COLOR.primaryBlue,
        paddingHorizontal: wp(2.6),
        paddingVertical: hp(1.1),
        letterSpacing: 1,
        fontFamily: Fonts.FONTS.PoppinsMedium, textAlignVertical: 'center'
    },
})