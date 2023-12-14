import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../pixel'
import { Color, Fonts } from '../../utils'
import { BackArrow } from '../../components/CommonComponents'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { FilledButton } from '../../components/InputComponents/Buttons'
import Routes from '../../services/Routes'
import { SafeAreaView } from 'react-native-safe-area-context';

let tags = [
    'Nifty Bank', 'Nifty Bank', 'Nifty Bank', 'Nifty Bank',
    'Nifty Bank', 'Nifty Bank', 'Nifty Bank', 'Nifty Bank',
];

let packageTypes = [
    { name: 'Gold', price: 'Rs. 999', access: 'Monthly Access' },
    { name: 'Plus', price: 'Rs. 4999', access: 'Unlimited access' },
    { name: 'Basic', price: 'Rs. 99', access: 'One day access' },
];

const PlanDetail = ({ navigation, route }) => {

    let { params: { plan } } = route

    const [selectedPackage, setSelectedPackage] = useState(1)
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={styles?.container}>
                <View style={[styles?.headingBox, styles?.paddingX]}>
                    <BackArrow onPress={() => navigation.navigate(Routes.ROUTE.Plans)} />
                    <Text style={styles?.heading}>Plan Detail</Text>
                    <View />
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={true}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(15) }}
                    style={{ width: '100%' }}
                >
                    <Text style={[styles?.planName, styles?.paddingX]}>{plan?.planName}</Text>

                    <View style={styles?.seprator} />

                    <View style={[styles?.paddingX, styles?.marginY]}>
                        <Text style={styles?.desc}>
                            The point of the stock market is to provide a place where anyone can buy and sell fractional ownership in a publicly traded company. It distributes control of some of the world’s largest companies among hundreds of millions of individual investors. And the buying and selling decisions of those investors determine the value of those companies.
                        </Text>
                    </View>

                    <View style={styles?.seprator} />

                    <View style={[styles?.marginY, styles?.paddingX, { width: '100%' }]}>
                        <Text style={styles?.planfeatureText}>Plan Feature :</Text>
                        <View style={styles?.tagBoxContainer}>
                            {tags?.map((tag, index) => {
                                return (
                                    <View style={styles?.tagBox} key={index}>
                                        <Text style={styles?.tagName}>{tag}</Text>
                                    </View>
                                )
                            })}
                        </View>
                        <View style={styles?.planIcons}>
                            <MaterialCommunityIcons name='check-bold' size={hp(2.8)} color={Color.COLOR.blue} />
                            <Text style={[{ color: Color.COLOR.textGrey }, styles?.planText]}>{plan?.trialText}</Text>
                        </View>
                    </View>

                    <View style={styles?.seprator} />

                    <View style={[styles?.marginY, styles?.paddingX, { width: '100%' }]}>
                        <Text style={styles?.planfeatureText}>About The Broker :</Text>
                        <View style={[styles?.planIcons, { marginTop: 0 }]}>
                            <MaterialIcons name='verified' size={hp(2.2)} color={Color.COLOR.primaryGreen} />
                            <Text style={[{ color: Color.COLOR.textGrey }, styles?.planText]}>{plan?.verificationText}</Text>
                        </View>
                    </View>
                    <View style={[styles?.ratingBoxContainer, styles?.paddingX]}>
                        <View style={[styles?.ratingBox]}>
                            {Array.from({ length: 5 }, () => <MaterialIcons name='star' size={hp(3)} color={Color.COLOR.primaryBlue} />)}
                        </View>
                        <Text style={styles?.desc}>5 of 100 reviews</Text>
                    </View>
                    <View style={[styles?.paddingX, styles?.marginY, styles?.aboutBrokerTexts]}>
                        <Text style={[styles?.desc]}>15,000 plans posted</Text>
                        <Text style={[styles?.desc]}>1M plans subscriber</Text>
                        <Text style={[styles?.desc]}>Member Since August 25, 2023</Text>
                    </View>

                    <View style={styles?.seprator} />

                    <View style={[styles?.paddingX, styles?.marginY]}>
                        {
                            packageTypes?.map(({ name, price, access }, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        activeOpacity={.8}
                                        onPress={() => setSelectedPackage(index)}
                                        style={[selectedPackage == index && { borderColor: Color.COLOR.primaryGreen, borderWidth: hp(.12) }, styles?.packagebtn, styles?.ratingBoxContainer]}>
                                        <Text style={styles?.packageType}>{name}</Text>
                                        <View style={styles?.packageTextBox}>
                                            <Text style={[styles?.packageBtnText, styles?.btnText1]}>{price}</Text>
                                            <Text style={[styles?.packageBtnText, styles?.btnText2]}>{access}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </ScrollView>
                <View style={[styles?.bottomBtn, styles?.paddingX, { marginBottom: hp(4), borderTopColor: Color.COLOR.sepratorGrey, borderTopWidth: hp(.12), width: '100%' }]}>
                    <FilledButton btnText={'Buy Plan'}
                        disabled={false}
                        onPress={() => { }}
                        btnStyle={{
                            width: '55%', alignSelf: 'center', height: hp(5.2), paddingVertical: hp(.4)
                        }}
                        textStyle={{ color: Color.COLOR.white }}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default PlanDetail

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'flex-start', alignItems: 'center',
        paddingTop: hp(1),
        backgroundColor: Color.COLOR.screenBg,
        // paddingHorizontal: wp(4)
    },
    paddingX: {
        paddingHorizontal: wp(4)
    },
    marginY: {
        marginVertical: hp(1.7)
    },
    seprator: {
        borderBottomColor: Color.COLOR.sepratorGrey, borderBottomWidth: hp(.12), width: '100%',
    },
    headingBox: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginBottom: hp(1) },
    heading: {
        color: Color.COLOR.primaryBlue, fontFamily: Fonts.FONTS.InterMedium, fontSize: hp(2.1), textAlign: 'center', textAlignVertical: 'center',
        marginTop: hp(1.5)
    },

    planName: {
        color: Color.COLOR.black, fontSize: hp(1.9), width: '100%', textAlign: 'left', marginTop: hp(2.6), marginBottom: hp(1.25),
    },
    desc: { fontSize: hp(1.8), fontFamily: Fonts.FONTS.PoppinsRegular, color: Color.COLOR.textGrey, textAlign: 'left' },

    tagBoxContainer: {
        flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'flex-start', alignItems: 'center', gap: wp(2), marginVertical: hp(1),
        flexWrap: 'wrap'
    },
    tagBox: { backgroundColor: Color.COLOR.borderGrey, borderRadius: hp(4), paddingVertical: hp(.8), paddingHorizontal: wp(2.5) },
    tagName: { color: Color.COLOR.textGrey, fontFamily: Fonts.FONTS.PoppinsRegular },

    planfeatureText: {
        color: Color.COLOR.black, textAlign: 'left', width: '100%', fontFamily: Fonts.FONTS.InterMedium,
        fontSize: hp(1.8), marginBottom: hp(1.7)
    },
    planIcons: {
        flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: wp(.7),
        marginTop: hp(3.15)
    },
    planText: {
        fontFamily: Fonts.FONTS.PoppinsRegular, fontSize: hp(1.9)
    },
    ratingBoxContainer: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'
    },
    ratingBox: {
        flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start',
    },
    aboutBrokerTexts: {
        flexDirection: 'column', width: '100%'
    },
    packagebtn: {
        backgroundColor: Color.COLOR.white,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0, 0, 0, 0.25)',
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowRadius: 3,
                shadowOpacity: 1,
            },
            android: {
                elevation: 3,
            },
        }),
        borderRadius: hp(1.2),
        paddingHorizontal: wp(2.5),
        paddingVertical: hp(1), marginVertical: hp(.7)
    },
    packageType: {
        color: Color.COLOR.primaryBlue, fontFamily: Fonts.FONTS.PoppinsMedium,
        fontSize: hp(1.9)
    },
    packageTextBox: { flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' },
    packageBtnText: { textAlign: 'right', alignSelf: 'flex-end', fontFamily: Fonts.FONTS.PoppinsMedium },
    btnText1: { fontSize: hp(1.65), color: Color.COLOR.primaryGreen },
    btnText2: { fontSize: hp(1.7), color: Color.COLOR.textGrey },

})