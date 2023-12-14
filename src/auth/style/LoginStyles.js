import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../pixel';
import { Fonts, Color } from '../../utils';

const styles = StyleSheet.create({

  filledBtn: {
    width: '100%', alignItems: 'center',
    paddingVertical: hp(1.75), backgroundColor: Color.COLOR.primaryBlue, borderRadius: hp(8), paddingHorizontal: wp(2.6),
    justifyContent: 'center', height: hp(7.5)
  },
  btnText: {
    fontFamily: Fonts.FONTS.PoppinsMedium, color: Color.COLOR.white, fontSize: hp(2.56)
  },
  outlinedText: { color: Color.COLOR.white },
  PhoneNumberText: {
    paddingVertical: hp(0.7),
    width: '100%',
    height: hp(6),
    borderRadius: hp(.7),
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: wp(2),
    borderColor: Color.COLOR.textGrey,
    textAlignVertical: 'center'
  },
  numberText: {
    fontSize: hp(2),
    color: Color.COLOR.primaryBlue,
    paddingHorizontal: wp(2.6),
    letterSpacing: 1.5,
    paddingVertical:hp(1.1),
    fontFamily: Fonts.FONTS.PoppinsMedium, textAlignVertical: 'center', textAlign: 'center'
  },
  phoneNumber: {
    height: '100%',
    borderRadius: hp(1),
    borderWidth: hp(.12),
    borderColor: Color.COLOR.primaryBlue,
    justifyContent: 'center', alignItems: 'center', flexDirection: 'row'
  },
  otpValidtion: {
    color: Color.COLOR.textGrey,
    fontFamily: Fonts.FONTS.PoppinsRegular,
    fontSize: hp(1.9),
    marginLeft: wp(0.5),
    paddingTop: wp(2.5),
    marginTop: hp(2),
    width: 'auto',
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resend: {
    color: Color.COLOR.primaryBlue,
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    fontSize: hp(1.9), textDecorationLine: 'underline'
  },
  bottomBtn: {
    position: 'absolute',
    bottom: hp(6), width: '100%', flex: 1
  },
  container: {
    flex: 1, justifyContent: 'flerx-start', alignItems: 'center', paddingVertical: hp(3), paddingHorizontal: wp(5.2), backgroundColor: Color.COLOR.screenBg
  },
  inputCell: {
    textAlign: 'center',
    height: hp(5.7),
    width: wp(13),
    borderBottomWidth: hp(.12),
    borderRadius: hp(.7),
    borderWidth: hp(.12), color: Color.COLOR.primaryBlue,
    borderColor: Color.COLOR.primaryBlue, fontSize: hp(2.1), fontFamily: Fonts.FONTS.PoppinsMedium,
    textAlignVertical:'center'
  },
});
export default styles;
