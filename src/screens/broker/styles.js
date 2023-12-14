import { StyleSheet } from "react-native";
import { Color, Fonts } from "../../utils";
import { heightPercentageToDP as hp , widthPercentageToDP as wp } from "../../pixel";

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'flerx-start', alignItems: 'center', paddingVertical: hp(3), paddingHorizontal: wp(5.2), backgroundColor: Color.COLOR.screenBg
    },
    cameraIcon: {
        height: hp(4.25),
        width: hp(4.2),
        resizeMode: 'contain',
        tintColor: Color.COLOR.borderGrey
    },
    label: {
        color: Color.COLOR.textGrey, fontFamily: Fonts.FONTS.PoppinsRegular, fontSize: hp(1.69)
    },
    editView: {
        position: 'absolute',
        top: hp(0.5),
        right: wp(1.3),
        width: hp(1.95),
        height: hp(1.95),
        backgroundColor: Color.COLOR.screenBg, borderRadius: hp(.4)
    },
    editIcon: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    imageBox: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Color.COLOR.borderGrey,
        backgroundColor: Color.COLOR.white,
        borderRadius: hp(1),
        width: hp(13),
        height: hp(11.71),
        borderStyle: 'dashed', borderWidth: hp(0.2)
    },
    imageStyle: {
        height: '100%',
        width: '100%',
        borderRadius: hp(1),
    },
    bottomBtn: { width: '100%', marginBottom: hp(3.1) },
    errorText:{
        color:Color.COLOR.errorColor,
        fontFamily:Fonts.FONTS.PoppinsRegular,
        fontSize:hp(1.68),lineHeight:hp(2.3)
    }
})

export default styles