import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Formik} from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object({
  name: Yup.string().required('Please write full name'),
  email: Yup.string().email().required('ex: abc@gmail.com'),
  password: Yup.string().required(),
  confirmPassword: Yup.string().required(),
});

const SignUp = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassword, setUserConfirmPassword] = useState('');

  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.mainHeader}>SignUp</Text>
        <Text style={styles.description}>
          Please provide valid required details
        </Text>
      </View>

      <Formik
        initialValues={{
          name: userName,
          email: userEmail,
          password: userPassword,
          confirmPassword: userConfirmPassword,
        }}
        validationSchema={SignupSchema}
        onSubmit={async values => {
          const response = await auth().createUserWithEmailAndPassword(
            values.email,
            values.password,
          );
          navigation.navigate('Login');
          console.log('Response', response);
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
                        <TextInput
                          style={styles.inputField}
                          placeholder="Enter name"
                          value={values.name}
                          onChangeText={handleChange('name')}
                        />
                      </View>
                      <View>
                        <TextInput
                          style={styles.inputField}
                          placeholder="Enter email"
                          value={values.email}
                          onChangeText={handleChange('email')}
                        />
                      </View>
                      <View>
                        <TextInput
                          style={styles.inputField}
                          placeholder="Enter password"
                          secureTextEntry={true}
                          value={values.password}
                          onChangeText={handleChange('password')}
                        />
                      </View>
                      <View>
                        <TextInput
                          style={styles.inputField}
                          placeholder="Confirm password"
                          secureTextEntry={true}
                          value={values.confirmPassword}
                          onChangeText={handleChange('confirmPassword')}
                        />
                      </View>
                    </View>
                  );
                }}
              />
              <View style={styles.loginContainer}>
                <Button title="Sign Up" onPress={() => handleSubmit()} />
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
    marginVertical: 15,
  },
  loginContainer: {
    height: 60,
    marginBottom: 30,
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

export default SignUp;
