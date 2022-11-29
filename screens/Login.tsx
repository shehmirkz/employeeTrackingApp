import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

const loginSchema = Yup.object({
  email: Yup.string().email().required('ex: abc@gmail.com'),
  password: Yup.string().required('must be 8 characters'),
});

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Welcome: undefined;
};

const Login = ({navigation}: NativeStackScreenProps<RootStackParamList>) => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');

  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.mainHeader}>Login Form</Text>
        <Text style={styles.description}>
          Please enter valid email & password
        </Text>
      </View>

      <Formik
        initialValues={{email: userEmail, password: userPassword}}
        validationSchema={loginSchema}
        onSubmit={async values => {
          const response = await auth()
            .signInWithEmailAndPassword(values.email, values.password)
            .then(resp => {
              setUserEmail(''), setUserPassword('');
              if (resp) {
                Alert.alert('Welcome, you are logged in');
                navigation.navigate('Welcome');
              }
            })
            .catch(err => {
              if (err) {
                Alert.alert(
                  'email or passsword is invalid! Please register & go to Signup',
                );
              }
            });
        }}>
        {({values, handleChange, handleSubmit}) => {
          return (
            <>
              <FlatList
                overScrollMode={'never'}
                scrollEventThrottle={16}
                data={[1]}
                renderItem={() => {
                  return (
                    <View>
                      <View>
                        <Text style={styles.labels}>Enter your name</Text>
                        <TextInput
                          style={styles.inputField}
                          placeholder="Enter email"
                          value={values.email}
                          onChangeText={handleChange('email')}
                        />
                      </View>
                      <View>
                        <Text style={styles.labels}>Enter password</Text>
                        <TextInput
                          style={styles.inputField}
                          placeholder="Enter password"
                          secureTextEntry={true}
                          value={values.password}
                          onChangeText={handleChange('password')}
                        />
                      </View>
                    </View>
                  );
                }}
              />
              <View style={styles.loginButtonContainer}>
                <Button title="Sign In" onPress={() => handleSubmit()} />
              </View>
              <View style={styles.loginButtonContainer}>
                <Button
                  title="Sign Up"
                  onPress={() => navigation.navigate('Signup')}
                />
              </View>
            </>
          );
        }}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    paddingHorizontal: 30,
    paddingTop: 0,
    backgroundColor: '#fff',
  },
  mainHeader: {
    fontSize: 25,
    textAlign: 'center',
    color: '#344055',
    fontWeight: '500',
    paddingTop: 10,
    paddingBottom: 15,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '7d7d7d',
    paddingBottom: 20,
    lineHeight: 20,
  },
  labels: {
    fontSize: 18,
    color: '#7d7d7d',
    marginTop: 20,
    marginBottom: 5,
    lineHeight: 25,
  },
  inputContainer: {
    marginTop: 20,
  },
  inputField: {
    backgroundColor: '#e5e5e7',
    height: 50,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    borderRadius: 4,
  },
  loginButtonContainer: {
    height: 50,
    marginBottom: 10,
  },
  loginText: {
    color: '#fff',
    fontSize: 20,
  },
  signUpTextContainer: {
    marginVertical: 30,
  },
  signUpText: {
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Login;
