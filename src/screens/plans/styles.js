import { Platform, StatusBar, StyleSheet } from "react-native";
import { Color, Fonts } from "../../utils";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "../../pixel";

const planstyles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'flex-start', alignItems: 'center',
        backgroundColor: Color.COLOR.screenBg,
        paddingHorizontal: wp(4),paddingTop:hp(1)
    },

    serachBox: {
        flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: hp(4.5), alignItems: 'center',
        marginTop: hp(2.2)
    },
    searchInput: {
        width: wp(74.8),
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0, borderRightWidth: hp(0)
    },
    searchBtn: {
        alignItems: 'center', backgroundColor: Color.COLOR.primaryBlue14, borderColor: Color.COLOR.borderGrey, borderWidth: hp(.1),
        height: hp(6.4), borderTopRightRadius: hp(.9), borderBottomRightRadius: hp(.9), justifyContent: 'center', width: '20%'
    },

    listTypeBtn: { height: '100%', paddingHorizontal: wp(1), },
    listTypeBtnText: { fontSize: hp(1.9), lineHeight: hp(3) },

    card: {
        flexDirection: 'column', gap: hp(.75), justifyContent: 'center', alignItems: 'center',
        backgroundColor: Color.COLOR.white, borderRadius: hp(1),
       paddingVertical: hp(1.5), marginVertical: hp(.8),
    },

    topPlanContainer: {
        flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: wp(.4), width: '100%'
    },
    diamondIconBox: {
        backgroundColor: Color.COLOR.primaryGreen, height: Platform?.OS == 'android' ? hp(3.3) : hp(3.65),
        alignItems: 'center', flexDirection: 'row', justifyContent: 'center',
        paddingHorizontal: wp(1)
    },
    topPlanText: { color: Color.COLOR.white, position: 'absolute', top: Platform?.OS == 'android' ? hp(1.3) : hp(1), left: Platform?.OS == 'android' ? wp(3.5) : wp(2.7), fontFamily: Fonts.FONTS.PoppinsRegular },
    planContainer: {
        paddingHorizontal: wp(4), flexDirection: 'column', gap: hp(.75),
        justifyContent: 'center', alignItems: 'center', width: '100%',
    },
    planNameBox: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', alignSelf: 'flex-start', flex: 1
    },
    planName: {
        color: Color.COLOR.primaryBlue, fontFamily: Fonts.FONTS.InterMedium,
        lineHeight: hp(2.3), fontSize: hp(1.9), flex: 1
    },
    likeBtn: {
        alignSelf: 'flex-end',
        backgroundColor: 'white',
        borderRadius: Platform.OS === 'android' ? 999 : 9999, // Adjust the borderRadius value for Android
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0, 0, 0, 0.25)',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 1,
                shadowRadius: 2,
            },
            android: {
                elevation: 2, // Add elevation for Android shadow
                borderWidth: 0.5,
                borderColor: 'rgba(217, 217, 217, 0.2)',
            },
        }),
        padding: hp(.3)
    },
    planDesc: {
        color: Color.COLOR.textGrey, textAlign: 'justify', alignSelf: 'flex-start', fontFamily: Fonts.FONTS.PoppinsRegular,
        fontSize: hp(1.8),
    },

    tagBoxContainer: {
        flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'flex-start', alignItems: 'center', gap: wp(2), marginVertical: hp(1),
        flexWrap: 'wrap'
    },
    tagBox: { backgroundColor: Color.COLOR.borderGrey, borderRadius: hp(4), paddingVertical: hp(.8), paddingHorizontal: wp(2.5) },
    tagName: { color: Color.COLOR.textGrey, fontFamily: Fonts.FONTS.PoppinsRegular, fontSize: hp(1.45) },
    planIconBox: { flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'space-between', alignItems: 'center', gap: wp(2.2) },
    planIcons: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: wp(.7) },
    planText: {
        fontFamily: Fonts.FONTS.PoppinsRegular, fontSize: hp(1.9), textAlignVertical: 'center'
    },


    // ------------------------------------Broker------------------------------------

})
export default planstyles;