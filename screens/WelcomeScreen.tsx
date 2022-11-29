import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import MapView, {MarkerAnimated, PROVIDER_GOOGLE} from 'react-native-maps';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome5';

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Welcome: undefined;
};

let defaultDelta = {
  latitudeDelta: 0.005,
  longitudeDelta: 0.005,
};
const defaultLocation = {
  latitude: 25.394832,
  longitude: 68.331269,
};

const WelcomeScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const [location, setLocation] = useState({
    ...defaultLocation,
    ...defaultDelta,
  });
  const [region, setRegion] = useState({
    ...defaultLocation,
    ...defaultDelta,
  });
  const [mapType, setMapType] = useState('standard');

  const signOut = async () => {
    await auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    navigation.navigate('Login');
  };

  const switchMapType = () => {
    setMapType(mapType === 'satellite' ? 'standard' : 'satellite');
  };

  const mapButtons = () => {
    return (
      <View style={styles.mapFabButtonContainer}>
        <TouchableOpacity
          style={[
            styles.mapFabButton,
            mapType === 'satellite' && styles.activeMapFabButton,
          ]}
          onPress={() => switchMapType()}>
          {/* <Text style={{color: '#fff'}}>A</Text> */}
          <Icon name="location-arrow" style={styles.mapFabButtonIcon} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <TouchableOpacity style={styles.signoutContainer} onPress={signOut}>
        <Text style={styles.signoutText}>Signout</Text>
      </TouchableOpacity>
      <View style={styles.welcomeHeading}>
        <Text style={styles.welcomeTitle}>Welcome onboard</Text>
        <Text style={styles.welcomeSubTitle}>
          Please update your current location
        </Text>
      </View>
      <View style={styles.mapViewContainer}>
        <MapView
          style={styles.map}
          initialRegion={region}
          provider={PROVIDER_GOOGLE}
          mapType={mapType}
          showsMyLocationButton={true}
          zoomEnabled={true}>
          <MarkerAnimated
            draggable
            coordinate={location}
            onDragEnd={e =>
              // TODO: We can get location here & update it to database
              console.log('Marked Location', e.nativeEvent.coordinate)
            }
            title={'Test Marker'}
            description={'This is a descrition'}
          />
        </MapView>
        <View style={styles.bottomSection}>{mapButtons()}</View>
      </View>
      <View style={styles.updateLocation}>
        <Button
          title="Submit Location"
          disabled
          onPress={() =>
            // Todo: no functionality here because we need database here
            console.log('We can set employee location here to Database')
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  mapViewContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    minHeight: 400,
  },
  bottomSection: {
    position: 'absolute',
    bottom: 60,
    right: 10,
    left: 15,
  },
  mapFabButtonContainer: {
    position: 'absolute',
    right: 0,
    top: 60,
  },
  mapFabButton: {
    width: 52,
    height: 52,
    borderRadius: 52 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 0, height: 0},
    backgroundColor: '#5DADE2',
    shadowColor: '#5D6D7E',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 20,
  },
  mapFabButtonIcon: {
    fontSize: 20,
    color: '#fff',
  },
  welcomeHeading: {
    height: 80,
    paddingVertical: 5,
  },
  welcomeTitle: {
    textAlign: 'center',
    fontSize: 20,
  },
  welcomeSubTitle: {
    textAlign: 'center',
    paddingHorizontal: 15,
  },
  updateLocation: {
    position: 'absolute',
    bottom: 0,
    width: '95%',
    marginVertical: 15,
    marginHorizontal: 10,
  },
  signoutContainer: {
    height: 30,
    paddingHorizontal: 15,
  },
  signoutText: {
    textAlign: 'right',
    paddingTop: 10,
  },
  activeMapFabButton: {
    backgroundColor: '#5DADE2',
  },
});

export default WelcomeScreen;
