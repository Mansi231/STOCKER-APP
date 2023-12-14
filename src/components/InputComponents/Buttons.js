import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../pixel/index'
import { Color, Fonts } from '../../utils'

const FilledButton = ({ onPress,btnText ,btnStyle,textStyle,disabled}) => {
    return (
        <TouchableOpacity style={[styles?.filledBtn,btnStyle]} onPress={onPress} disabled={disabled}>
            <Text style={[styles?.btnText, styles?.outlinedText,textStyle]}>{btnText}</Text>
        </TouchableOpacity>
    )
}

const OutLinedButton = ({ onPress ,btnText,style,textStyle}) => {
    return (
    <TouchableOpacity style={[styles?.outlinedBtn,style]} onPress={onPress}>
        <Text style={[ styles?.btnText,styles?.filledText,textStyle ]}>{btnText}</Text>
    </TouchableOpacity>
    )
}

export { FilledButton, OutLinedButton };

const styles = StyleSheet.create({
    filledBtn: {
        width: '100%', alignItems: 'center',
        paddingVertical: hp(1.75), backgroundColor: Color.COLOR.primaryBlue, borderRadius: hp(8), paddingHorizontal: wp(2.6),
        justifyContent: 'center', height: hp(7.5), marginTop: hp(2.5)
    },
    btnText: {
        fontFamily: Fonts.FONTS.PoppinsMedium, color: Color.COLOR.white, fontSize: hp(2.3),textAlignVertical:'center'
    },
    outlinedText: { color: Color.COLOR.white },
    filledText: { color: Color.COLOR.primaryBlue },
    outlinedBtn: {
        width: '100%', height: hp(7.5), alignItems: 'center',
        paddingVertical: hp(1.75), borderRadius: hp(8), paddingHorizontal: wp(2.6),
        justifyContent: 'center', marginTop: hp(2), borderColor: Color.COLOR.primaryBlue, borderWidth: hp(.2), marginBottom: hp(3)
    },
})