import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_TYPE_KEY = 'userType';
const USER_DEATAIL = 'userDetail';
const STEP = 'step';
const BROKER_ACCOUNT_TYPE = 'brokerAccountType';

// --------------------------------------------------------UserType---------------------------------------------------------------

export const setUserType = (value) =>
  AsyncStorage.setItem(USER_TYPE_KEY, JSON.stringify(value))
    .then(() => {
      // console.log("User type set successfully");
    })
    .catch((error) => {
      console.error("Error setting user type:", error);
    });

export const getUserType = () =>
  AsyncStorage.getItem(USER_TYPE_KEY).then((userType) => JSON.parse(userType) || null)
    .catch((error) => {
      console.error("Error getting user type:", error);
      return null; // Return a default value in case of an error
    });

// --------------------------------------------------------BrokerAccountType---------------------------------------------------------------

export const setBrokerAccountType = (value) =>
  AsyncStorage.setItem(BROKER_ACCOUNT_TYPE, JSON.stringify(value))
    .then(() => {
      console.log("User type set successfully",value);
    })
    .catch((error) => {
      console.error("Error setting user type:", error);
    });

export const getBrokerAccountType = () =>
  AsyncStorage.getItem(BROKER_ACCOUNT_TYPE).then((brokerAccountType) => JSON.parse(brokerAccountType) || null)
    .catch((error) => {
      console.error("Error getting user type:", error);
      return null; // Return a default value in case of an error
    });

export const userTypes = { Trader: 'Trader', Broker: 'Broker' };

// --------------------------------------------------------UserDetail - Auth ---------------------------------------------------------------

export const setUserDetail = (value) =>
  AsyncStorage.setItem(USER_DEATAIL, JSON.stringify(value))
    .then(() => {
      console.log("User detail set successfully",value);
    })
    .catch((error) => {
      console.error("Error setting user type:", error);
    });

export const getUserDetail = () =>
  AsyncStorage.getItem(USER_DEATAIL).then((userDetail) => JSON.parse(userDetail) || null)
    .catch((error) => {
      console.error("Error getting user type:", error);
      return null; // Return a default value in case of an error
    });


// --------------------------------------------------------Steps---------------------------------------------------------------

export const setSteps = (value) =>
  AsyncStorage.setItem(STEP, JSON.stringify(value))
    .then(() => {
      // console.log("User type set successfully");
    })
    .catch((error) => {
      console.error("Error setting user type:", error);
    });

export const getSteps = () =>
  AsyncStorage.getItem(STEP).then((step) => JSON.parse(step) || null)
    .catch((error) => {
      console.error("Error getting user type:", error);
      return null; // Return a default value in case of an error
    });

