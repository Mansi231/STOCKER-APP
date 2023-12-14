import { Dimensions, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Header } from '../../components/CommonComponents/index'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../pixel'
import { Color, Fonts } from '../../utils'
import user from '../../assets/drawer/person.jpeg'
import Routes from '../../services/Routes'
import TextInput from '../../components/InputComponents/TextInput'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { getUserType, userTypes } from '../../services/Storage'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { ValContext } from '../../context/ContextProvider'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = ({ navigation }) => {

  const [searchValue, setSearchValue] = useState('');

  const { type, userDetail, setUserDetail, setType } = useContext(ValContext)

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles?.container}>
        <Header name={Routes.ROUTE.Home} image={user} imagePress={() => navigation.openDrawer()} />

        {/* Search box */}
        <Text style={styles?.userName}>Hi {userDetail?.name}</Text>
        <Text style={styles?.welcomeText}>Welcome to Stocker</Text>

        {
          type == userTypes?.Broker ?
            <>
              {/* Bezier Line Chart */}

              <View style={{}}>
                <LineChart
                  data={{
                    labels: [],
                    datasets: [
                      {
                        data: [10, 50, 10, 45, 60, 40, 37, 80, 70, 50, 55, 78, 65, 10, 80, 40, 45, 55, 40],
                        // color: (opacity = 1) => `rgba(21, 115, 254, 0.60)`,
                      },
                    ]
                  }}
                  width={Dimensions.get("window").width - wp(7)} // from react-native
                  height={hp(25)}
                  // yAxisLabel="$"
                  yAxisSuffix="k"
                  yAxisLabel={''} // Hide vertical labels
                  xAxisLabel={''}
                  yAxisInterval={1} // optional, defaults to 1
                  withVerticalLabels={false}
                  withHorizontalLabels={false}
                  withInnerLines={false}
                  fromZero={true}

                  chartConfig={{
                    barPercentage: 0.5,
                    backgroundColor: "rgba(21, 115, 254, 0.30)",
                    backgroundGradientFrom: "#E3EEFF",
                    backgroundGradientTo: "#E3EEFF",
                    fillShadowGradientFrom: 'rgba(21, 115, 254, 0.30)',
                    fillShadowGradientFromOpacity: .6,
                    fillShadowGradientTo: 'rgba(21, 115, 254, 0)',
                    fillShadowGradientToOpacity: .1,
                    decimalPlaces: 1, // optional, defaults to 2dp
                    color: (opacity = 1) => `#E3EEFF`,
                    labelColor: (opacity = 1) => `#E3EEFF`,
                    style: {
                      borderRadius: hp(2),
                    },
                    propsForDots: {
                      r: "",
                      strokeWidth: "2",
                      stroke: "#ffa726"
                    },
                  }}
                  withDots={false}
                  bezier
                  style={{
                    marginVertical: hp(.8),
                    borderRadius: hp(1.5),
                    paddingRight: 0,
                  }}
                  decorator={(values, data, index) => {
                    return (

                      <View style={{
                        flexDirection: 'column', alignItems: 'center',
                        justifyContent: 'flex-start', width: '100%', alignSelf: 'flex-start',
                        marginLeft: wp(4), marginTop: hp(2)
                      }}>
                        <Text
                          style={{ width: '100%', color: Color.COLOR.textGrey, fontFamily: Fonts.FONTS.PoppinsRegular, fontSize: hp(1.9) }}
                        >
                          Subscribers
                        </Text>
                        <Text
                          style={{ width: '100%', color: Color.COLOR.black, fontFamily: Fonts.FONTS.PoppinsSemiBold, fontSize: hp(2.8) }}
                        >
                          12,800
                        </Text>
                      </View>
                    )

                  }}
                />
              </View>

              {/* PortFolio texts */}
              <View style={[styles?.textBoxContainer, { marginVertical: hp(2) }]}>
                <Text style={styles?.portfolioText}>Porfolio</Text>
                <Text style={styles?.viewAllText}>View all</Text>
              </View>

              {/* Business Plan buttons */}
              <View style={[styles?.textBoxContainer, { gap: wp(.5) }]}>
                <TouchableOpacity style={[styles?.planBtn, { backgroundColor: Color.COLOR.lightBlue10 }]}>
                  <Text style={styles?.planHeading}>Business Plan</Text>
                  <Text style={styles?.postedText}>Posted 90 days ago</Text>
                  <Text style={styles?.viewersCount}>
                    <FontAwesome name='users' size={hp(2)} color={Color.COLOR.black} />
                    {'  '}8,999
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles?.planBtn}>
                  <Text style={styles?.planHeading}>Business Plan</Text>
                  <Text style={styles?.postedText}>Posted 90 days ago</Text>
                  <Text style={styles?.viewersCount}>
                    <FontAwesome name='users' size={hp(2)} color={Color.COLOR.black} />
                    {'  '}8,999
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Analysis heading*/}
              <Text style={[styles?.welcomeText, { marginVertical: hp(2) }]}>Analysis</Text>

              {/* Analysis buttons */}
              <View style={[styles?.textBoxContainer, { gap: wp(.5) }]}>
                <TouchableOpacity style={[styles?.planBtn, { backgroundColor: Color.COLOR.white }]}>
                  <Text style={styles?.planHeading}>
                    <FontAwesome name='users' size={hp(2)} color={Color.COLOR.black} />
                    {'  '}Business Plan
                  </Text>
                  <Text style={styles?.viewersCount}>8,999</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles?.planBtn, { backgroundColor: Color.COLOR.white }]}>
                  <Text style={styles?.planHeading}>
                    <FontAwesome name='users' size={hp(2)} color={Color.COLOR.black} />
                    {'  '}Business Plan
                  </Text>
                  <Text style={styles?.viewersCount}>500</Text>
                </TouchableOpacity>
              </View>
            </>
            : null
        }

      </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'flex-start', alignItems: 'center',
   
    backgroundColor: Color.COLOR.screenBg,
    paddingHorizontal: wp(4),paddingTop:hp(1)
  },
  userName: {
    color: Color.COLOR.black, textAlign: 'left', alignSelf: 'flex-start', marginTop: hp(2), fontFamily: Fonts.FONTS.PoppinsRegular,
    letterSpacing: hp(.03), fontSize: hp(1.6)
  },
  welcomeText: {
    color: Color.COLOR.black, fontFamily: Fonts.FONTS.PoppinsSemiBold, alignSelf: 'flex-start', fontSize: hp(2.1), letterSpacing: hp(.06),
  },
  textBoxContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' },
  portfolioText: { color: Color.COLOR.black, fontSize: hp(2.1), fontFamily: Fonts.FONTS.PoppinsSemiBold, letterSpacing: hp(.07) },
  viewAllText: { color: Color.COLOR.black, fontSize: hp(1.9), fontFamily: Fonts.FONTS.PoppinsSemiBold },
  planBtn: {
    paddingHorizontal: wp(2), paddingVertical: hp(2),
    backgroundColor: Color.COLOR.lightGreen20, borderRadius: hp(1), width: '49%'
  },
  planHeading: { fontFamily: Fonts.FONTS.PoppinsRegular, fontSize: hp(2), color: Color.COLOR.black },
  postedText: {
    color: Color.COLOR.lightGrey70, fontSize: hp(1.6), fontFamily:
      Fonts.FONTS.PoppinsRegular
  },
  viewersCount: {
    marginTop: hp(.8), color: Color.COLOR.black, fontSize: hp(2),
    fontFamily: Fonts.FONTS.PoppinsRegular
  },
})