import { StyleSheet, View, TextInput, Image, Animated, Text, Platform } from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../pixel/index';
import { Color, Fonts } from '../../utils';
import { useEffect, useRef, useState } from 'react';

const TextInputCommon = ({
  value,
  onChangeText,
  placeholder,
  onFocus,
  onBlur,
  placeholderTextColor,
  keyboardType,
  borderColor,
  icon,
  source,
  style,
  autoCapitalize,textContentType,
  editable, require,multiline,numberOfLines,placeholderContainerStyle
}) => {

  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => { startFloating(); setIsFocused(true) };

  const handleBlur = () => {

    setIsFocused(false)
  };


  return (

    <View style={styles.container}>
      <TextInput style={[styles?.phoneNumber, styles?.numberText, {textAlign: "left"},style]}
        editable={true}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => { }}
        onBlur={() => { }}
        keyboardType={keyboardType}
        // keyboardType={'number-pad'}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical='center'
      />
      {!value && <View style={[styles.customPlaceholderContainer,placeholderContainerStyle]}>
        <Text style={styles.customPlaceholderText}>{placeholder}
          {require && <Text style={{ color: Color.COLOR.errorColor }}>{' '}*</Text>}
        </Text>
      </View>}
    </View>
  );
};

export default TextInputCommon;

const styles = StyleSheet.create({
  phoneNumber: {
    height: hp(6.4),
    borderRadius: hp(1),
    borderWidth: hp(.12),
    borderColor: Color.COLOR.borderGrey,textAlign:'left',
    justifyContent: 'center', alignItems: 'center', flexDirection: 'row'
  },
  numberText: {
    fontSize: hp(2),
    color: Color.COLOR.primaryBlue,
    paddingHorizontal: wp(2.6),
    paddingVertical: hp(1.1),
    letterSpacing: 1,
    fontFamily: Fonts.FONTS.PoppinsMedium, textAlignVertical: 'center', textAlign: 'center'
  },

  container: {
    position: 'relative',
  },
  customPlaceholderContainer: {
    position: 'absolute',
    top: hp(2.1),
    left: Platform?.OS == 'ios' ? wp(3) : wp(2.7),
    zIndex: -1,
  },
  customPlaceholderText: {
    color: Color.COLOR.textGrey,
    fontSize:hp(1.68)
  },
});


