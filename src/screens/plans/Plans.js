import { FlatList, Image, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../pixel'
import { Color, Fonts } from '../../utils'
import { Header } from '../../components/CommonComponents'
import user from '../../assets/drawer/person.jpeg'
import Routes from '../../services/Routes'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import TextInput from '../../components/InputComponents/TextInput'
import ribbon from '../../assets/plans/ribbon.png'
import { OutLinedButton } from '../../components/InputComponents/Buttons'
import { getUserType, userTypes } from '../../services/Storage'
import planstyles from './styles'
import MostPopular from '../../assets/plans/mostpopular.png'
import TopPlan from '../../assets/plans/topPlan.png'
import { ValContext } from '../../context/ContextProvider'
import { SafeAreaView } from 'react-native-safe-area-context';

const Plans = ({ navigation }) => {

  // listType::
  // 1 for My Plans and 2 for Watch list

  // const [type, setType] = useState(null);
  const { type, userDetail, setUserDetail, setType } = useContext(ValContext)

  const [searchValue, setSearchValue] = useState('')
  const [listType, setListType] = useState(1);
  const [MyPlans, setMyPlans] = useState([
    {
      planName: 'Bank Nifty 50 Plan', planDes: 'Monthly: Rs. 999 - Posted 10 days ago', des: `The process of locating shares that can be borrowed and returning them at the end of the trade is handled behind the scenes by the broker. Opening and closing the trade can be made through the`, tags: ['Nifty Bank', 'Nifty Bank', 'Nifty Bank',], verificationText: 'Verified Broker', trialText: `Free Trail for 7 days`, topPlan: 0
    },
    {
      planName: 'Bank Nifty 50 Plan',
      planDes: 'Monthly: Rs. 999 - Posted 10 days ago', des: `The process of locating shares that can be borrowed and returning them at the end of the trade is handled behind the scenes by the broker. Opening and closing the trade can be made through the`,
      tags: ['Nifty Bank', 'Nifty Bank', 'Nifty Bank',], verificationText: 'Verified Broker', trialText: `Free Trail for 7 days`, topPlan: 1
    },
    {
      planName: 'Bank Nifty 50 Plan', planDes: 'Monthly: Rs. 999 - Posted 10 days ago', des: `The process of locating shares that can be borrowed and returning them at the end of the trade is handled behind the scenes by the broker. Opening and closing the trade can be made through the`, tags: ['Nifty Bank', 'Nifty Bank', 'Nifty Bank',], verificationText: 'Verified Broker', trialText: `Free Trail for 7 days`, topPlan: 0
    },
    {
      planName: 'Bank Nifty 50 Plan', planDes: 'Monthly: Rs. 999 - Posted 10 days ago', des: `The process of locating shares that can be borrowed and returning them at the end of the trade is handled behind the scenes by the broker. Opening and closing the trade can be made through the`, tags: ['Nifty Bank', 'Nifty Bank', 'Nifty Bank',], verificationText: 'Verified Broker', trialText: `Free Trail for 7 days`, topPlan: 0
    },
    {
      planName: 'Bank Nifty 50 Plan', planDes: 'Monthly: Rs. 999 - Posted 10 days ago', des: `The process of locating shares that can be borrowed and returning them at the end of the trade is handled behind the scenes by the broker. Opening and closing the trade can be made through the`, tags: ['Nifty Bank', 'Nifty Bank', 'Nifty Bank',], verificationText: 'Verified Broker', trialText: `Free Trail for 7 days`, topPlan: 1
    },

  ])

  const [WatchList, setWatchList] = useState([
    {
      planName: 'Bank Nifty 50 Plan', planDes: 'Monthly: Rs. 999 - Posted 10 days ago',
      des: `The process of locating shares that can be borrowed and returning them at the end of the trade is handled behind the scenes by the broker. Opening and closing the trade can be made through the`,
      tags: ['Nifty Bank', 'Equity Share'],
      verificationText: 'Verified Broker', topPlan: 0
    },
    {
      planName: 'Bank Nifty 50 Plan', planDes: 'Monthly: Rs. 999 - Posted 10 days ago',
      des: `The process of locating shares that can be borrowed and returning them at the end of the trade is handled behind the scenes by the broker. Opening and closing the trade can be made through the`,
      tags: ['Nifty Bank', 'Equity Share'],
      verificationText: 'Verified Broker', topPlan: 1
    },
    {
      planName: 'Bank Nifty 50 Plan', planDes: 'Monthly: Rs. 999 - Posted 10 days ago',
      des: `The process of locating shares that can be borrowed and returning them at the end of the trade is handled behind the scenes by the broker. Opening and closing the trade can be made through the`,
      tags: ['Nifty Bank', 'Equity Share'],
      verificationText: 'Verified Broker', topPlan: 0
    },
  ]);
  const [showMoreId, setShowMoreId] = useState(null);

  const [brokerPlans, setBrokerPlans] = useState([
    {
      planName: 'Bank Nifty 50 Plan ', planDes: 'Posted 10 days ago',
      des: `The process of locating shares that can be borrowed and returning them at the end of the trade is handled behind the scenes by the broker. Opening and closing the trade can be made through the`,
      tags: ['Nifty Bank', 'Equity Share'],
      verificationText: 'Verified Broker', mostPopular: 0, messages: '15 messages'
    },
    {
      planName: 'Bank Nifty 50 Plan ', planDes: 'Posted 10 days ago',
      des: `The process of locating shares that can be borrowed and returning them at the end of the trade is handled behind the scenes by the broker. Opening and closing the trade can be made through the`,
      tags: ['Nifty Bank', 'Equity Share'],
      verificationText: 'Verified Broker', mostPopular: 1, messages: '15 messages'
    },
  ])

  let maxLines = 3;


  const PlansForTraders = () => {
    return (
      <>
        {/* List type */}
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginVertical: hp(2), gap: wp(3) }}>
          <TouchableOpacity
            onPress={() => setListType(1)}
            activeOpacity={1}
            style={[planstyles?.listTypeBtn, listType == 1 && { borderBottomColor: Color.COLOR.primaryBlue, borderBottomWidth: hp(.15) }]}>
            <Text style={[{ color: listType == 1 ? Color.COLOR.primaryBlue : Color.COLOR.lightGrey70 }, planstyles?.listTypeBtnText]}>My Plan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setListType(2)}
            activeOpacity={1}
            style={[planstyles?.listTypeBtn, listType == 2 && { borderBottomColor: Color.COLOR.primaryBlue, borderBottomWidth: hp(.15) }]}>
            <Text style={[{ color: listType == 2 ? Color.COLOR.primaryBlue : Color.COLOR.lightGrey70 }, planstyles?.listTypeBtnText]}>Watch list</Text>
          </TouchableOpacity>
        </View>

        {/* ListType == 1 */}
        <FlatList
          data={listType == 1 ? MyPlans : WatchList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <>
                <TouchableOpacity
                  activeOpacity={.9}
                  onPress={() => { navigation.navigate(Routes.ROUTE.PlanDetail, { plan: item }) }}
                  style={planstyles?.card}>
                  {item?.topPlan == 1 && <View style={planstyles?.topPlanContainer}>
                    <Image source={TopPlan} style={{ height: hp(3), width: Platform?.OS == 'ios' ? wp(35) : wp(27) }} />
                  </View>}
                  <View style={planstyles?.planContainer}>
                    <View style={planstyles?.planNameBox}>
                      <Text style={planstyles?.planName} numberOfLines={1}>{item?.planName}</Text>
                      <TouchableOpacity
                        activeOpacity={1}
                        style={planstyles?.likeBtn}>
                        <Ionicons name={listType == 1 ? 'heart-outline' : 'heart'} size={hp(2.5)} color={Color.COLOR.primaryBlue} />
                      </TouchableOpacity>
                    </View>
                    <Text style={planstyles?.planDesc}>{item?.planDes}</Text>
                    
                    <Text style={planstyles?.planDesc}
                      numberOfLines={showMoreId == index ? undefined : maxLines}
                      ellipsizeMode="tail"
                    >{item?.des}</Text>
                    {item?.des?.length > maxLines && (
                      <TouchableOpacity
                        style={{ alignSelf: 'flex-start' }}
                        onPress={() => {
                          if (showMoreId == index) setShowMoreId(null)
                          else setShowMoreId(index)
                        }}>
                        <Text style={[{
                          color: Color.COLOR.primaryBlue, textAlign: 'left', width: '100%', textAlignVertical: 'center',
                          fontFamily: Fonts.FONTS.PoppinsMedium, fontSize: hp(1.8),
                        }]}>
                          {showMoreId == index ? 'less' : 'more'}
                        </Text>
                      </TouchableOpacity>
                    )}

                    <View style={planstyles?.tagBoxContainer}>
                      {item?.tags?.map((tag, index) => {
                        return (
                          <View style={planstyles?.tagBox} key={index}>
                            <Text style={planstyles?.tagName}>{tag}</Text>
                          </View>
                        )
                      })}
                    </View>
                    <View style={planstyles?.planIconBox}>
                      <View style={planstyles?.planIcons}>
                        <MaterialIcons name='verified' size={hp(2.2)} color={Color.COLOR.primaryGreen} />
                        <Text style={[{ color: Color.COLOR.textGrey }, planstyles?.planText]}>{item?.verificationText}</Text>
                      </View>
                      {listType == 1 && <View style={planstyles?.planIcons}>
                        <MaterialCommunityIcons name='check-bold' size={hp(2.8)} color={Color.COLOR.blue} />
                        <Text style={[{ color: Color.COLOR.textGrey }, planstyles?.planText]}>{item?.trialText}</Text>
                      </View>}
                    </View>
                  </View>
                </TouchableOpacity>
                {
                  index == MyPlans?.length - 1 &&
                  <View style={{ width: '50%', alignSelf: 'center' }}>
                    <OutLinedButton style={{ height: hp(5), paddingVertical: hp(.2) }} btnText={'Load More Plans'} textStyle={{ fontSize: hp(1.9) }} />
                  </View>
                }
              </>
            )
          }}
        />
      </>
    )
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={planstyles?.container}>
        <Header name={Routes.ROUTE.Plans} image={user} imagePress={() => navigation.openDrawer()} />

        {/* Search box */}
        <View style={planstyles?.serachBox}>
          <TextInput
            style={planstyles?.searchInput}
            placeholder={'Search'}
            editable={true}
            value={searchValue}
            onChangeText={(value) => setSearchValue(value)}
            onFocus={() => { }}
            onBlur={() => { }}
            keyboardType={'default'}
            multiline={false}
            numberOfLines={2}
            textAlignVertical='center'
          />
          <TouchableOpacity style={planstyles?.searchBtn}>
            <Ionicons name='search' size={hp(2.5)} color={Color.COLOR.primaryBlue} />
          </TouchableOpacity>
        </View>

        {
          type == userTypes?.Trader ?
            <PlansForTraders /> :
            <>
              <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: hp(2), gap: wp(3) }}>
                <TouchableOpacity
                  onPress={() => setListType(1)}
                  activeOpacity={1}
                  style={[planstyles?.listTypeBtn, { borderBottomColor: Color.COLOR.primaryBlue, borderBottomWidth: hp(.1) }]}>
                  <Text style={[{ color: Color.COLOR.primaryBlue }, planstyles?.listTypeBtnText]}>My Plan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={planstyles?.plusBtn} onPress={() => navigation.navigate(Routes.ROUTE.CreatePlan)}>
                  <MaterialCommunityIcons name='plus-circle' size={hp(2.8)} color={Color.COLOR.primaryBlue} />
                </TouchableOpacity>
              </View>

              <FlatList
                style={{ flex: 1, width: '100%' }}
                data={brokerPlans}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                  return (
                    <>
                      <TouchableOpacity
                        activeOpacity={.9}
                        style={[planstyles?.card, { width: '100%', }]}>
                        {item?.mostPopular == 1 && <View style={planstyles?.topPlanContainer}>
                          <Image source={MostPopular} style={{ height: hp(3), width: wp(39) }} />
                        </View>}
                        <View style={[planstyles?.planContainer]}>
                          <View style={planstyles?.planNameBox}>
                            <Text style={planstyles?.planName} numberOfLines={1}>{item?.planName}</Text>
                            <TouchableOpacity
                              activeOpacity={1}
                              style={{}}>
                              <MaterialCommunityIcons name={'dots-vertical'} size={hp(2.1)} color={Color.COLOR.primaryBlue} />
                            </TouchableOpacity>
                          </View>
                          <Text style={planstyles?.planDesc}>{item?.planDes}</Text>

                          <View style={planstyles?.planIconBox}>
                            <View style={planstyles?.planIcons}>
                              <FontAwesome name='users' size={hp(1.8)} color={Color.COLOR.textGrey} />
                              <Text style={[{ color: Color.COLOR.textGrey }, planstyles?.planText]}>{item?.verificationText}</Text>
                            </View>
                            {listType == 1 && <View style={planstyles?.planIcons}>
                              <MaterialCommunityIcons name='message-text' size={hp(2)} color={Color.COLOR.textGrey} />
                              <Text style={[{ color: Color.COLOR.textGrey }, planstyles?.planText]}>{item?.messages}</Text>
                            </View>}
                          </View>

                          <OutLinedButton
                            onPress={() => navigation.navigate(Routes.ROUTE.GiveAdvice)}
                            textStyle={{ fontSize: hp(1.7) }}
                            btnText={'+ Give Advice'}
                            style={{ borderWidth: hp(.1), marginBottom: 0, alignSelf: 'flex-end', width: 'auto', height: hp(5), paddingVertical: hp(.1) }} />
                        </View>
                      </TouchableOpacity>
                      {
                        index == brokerPlans?.length - 1 &&
                        <OutLinedButton btnText={'Load More Plans'} textStyle={{ fontSize: hp(1.9) }} style={{ borderWidth: hp(.1), alignSelf: 'center', height: hp(5), paddingVertical: hp(.1), width: '50%' }} />
                      }
                    </>
                  )
                }}
              />
            </>
        }

      </View>
    </SafeAreaView>
  )
}

export default Plans
