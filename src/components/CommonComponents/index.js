import { Image, Text, TouchableOpacity, View } from "react-native"
import LeftArrow from '../../assets/auth/LeftArrow.png'
import { StyleSheet } from "react-native"
import { Color, Fonts } from "../../utils"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "../../pixel"
import user from '../../assets/drawer/user.png'
import Ionicons from 'react-native-vector-icons/Ionicons'

const BackArrow = ({ onPress, hidden }) => {
    return (
        hidden ? <TouchableOpacity
            style={styles?.backBtn}
            onPress={onPress}>
            <Image source={LeftArrow} style={[styles?.backImage, { tintColor: Color.COLOR.screenBg }]} />
        </TouchableOpacity> : <TouchableOpacity
            style={styles?.backBtn}
            onPress={onPress}>
            <Image source={LeftArrow} style={styles?.backImage} />
        </TouchableOpacity>

    )
}

const UserInfoHeading = ({ text, style }) => {
    return <Text style={[styles?.heading, style]}>{text}</Text>
}
const UserInfoText = ({ text, style }) => {
    return <Text style={[styles?.infoText, style]}>{text}</Text>
}

const UserTypeFilledBtn = ({ image, text, style, onPress }) => {
    return (
        <TouchableOpacity style={[styles?.userTypeFilledBtn, style]} onPress={onPress}>
            <Image source={image} style={[styles?.userTypeImg]} />
            <Text style={styles?.userTypeText}>{text}</Text>
        </TouchableOpacity>
    )
}
const UserTypeOutlinedBtn = ({ image, text, style, onPress }) => {
    return (
        <TouchableOpacity style={[styles?.userTypeOutlinedBtn, style]} onPress={onPress}>
            <Image source={image} style={[styles?.userTypeImg, { tintColor: Color.COLOR.primaryBlue }]} />
            <Text style={[styles?.userTypeText, { color: Color.COLOR.primaryBlue }]}>{text}</Text>
        </TouchableOpacity>
    )
}

const Header = ({ name, image, imagePress }) => {
    return <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TouchableOpacity onPress={imagePress} activeOpacity={1}>
            <Image source={image} style={{ height: hp(5), width: hp(5), borderRadius: hp(8) }} />
        </TouchableOpacity>
        <Text style={{ fontFamily: Fonts.FONTS.InterMedium, color: Color.COLOR.primaryBlue, fontSize: hp(2.1) }}>{name}</Text>
        <Ionicons name="notifications" size={hp(3)} color={Color.COLOR.primaryBlue} />
    </View>
}
export { BackArrow, UserInfoHeading, UserInfoText, UserTypeFilledBtn, UserTypeOutlinedBtn, Header }

const styles = StyleSheet.create({
    backBtn: {
        alignSelf: 'flex-start', marginLeft: -hp(1.5), marginTop: hp(1.5)
    },
    backImage: {
        height: hp(4),
        width: hp(4),
        resizeMode: 'contain',
        tintColor: Color.COLOR.black,
    },
    heading: {
        fontSize: hp(3.06), color: Color.COLOR.primaryBlue, textAlign: 'left', fontFamily: Fonts.FONTS.PoppinsSemiBold,
        alignSelf: 'flex-start', marginTop: hp(4), lineHeight: hp(3.5), textAlignVertical: 'center'
    },

    infoText: {
        color: Color.COLOR.textGrey, fontFamily: Fonts.FONTS.PoppinsRegular, fontSize: hp(1.9), textAlign: 'left', textAlignVertical: 'center',
        marginBottom: hp(3), alignSelf: 'flex-start', marginTop: hp(1.1)
    },
    userTypeFilledBtn: {
        height: hp(13.25), width: hp(13.25), backgroundColor: Color.COLOR.primaryBlue, borderRadius: hp(1),
        justifyContent: 'center', alignItems: 'center'
    },
    userTypeOutlinedBtn: {
        height: hp(13.25), width: hp(13.25), backgroundColor: Color.COLOR.white, borderRadius: hp(1),
        justifyContent: 'center', alignItems: 'center', borderColor: Color.COLOR.primaryBlue, borderWidth: hp(.23)
    },
    userTypeText: {
        lineHeight: hp(3), fontFamily: Fonts.FONTS.PoppinsExtraBold, fontSize: hp(2), color: Color.COLOR.white
    },
    userTypeImg: {
        height: hp(7.15), width: hp(7.15), tintColor: Color.COLOR.white
    },
})

