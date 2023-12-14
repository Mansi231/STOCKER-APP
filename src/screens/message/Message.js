import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../pixel'
import { Color } from '../../utils'
import { SafeAreaView } from 'react-native-safe-area-context';

const Message = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles?.container}>
        <Text style={{ color: Color.COLOR.black }}>Message</Text>
      </View>
    </SafeAreaView>
  )
}

export default Message

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    paddingTop:hp(1),
    backgroundColor: Color.COLOR.screenBg,
    paddingHorizontal: wp(3.2)
  }
})