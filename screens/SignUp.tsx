import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object({
  name: Yup.string().required('Please write full name'),
  email: Yup.string().email().required('ex: abc@gmail.com'),
  password: Yup.string().required(),
  confirmPassword: Yup.string().required(),
});

const SignUp = () => {
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
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={values => console.log(values)}>
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
                        {/* <Text style={styles.labels}>Enter name</Text> */}
                        <TextInput
                          style={styles.inputField}
                          placeholder="Enter name"
                          value={values.name}
                          onChangeText={handleChange('name')}
                        />
                      </View>
                      <View>
                        {/* <Text style={styles.labels}>Enter email</Text> */}
                        <TextInput
                          style={styles.inputField}
                          placeholder="Enter email"
                          value={values.email}
                          onChangeText={handleChange('email')}
                        />
                      </View>
                      <View>
                        {/* <Text style={styles.labels}>Enter password</Text> */}
                        <TextInput
                          style={styles.inputField}
                          placeholder="Enter password"
                          secureTextEntry={true}
                          value={values.password}
                          onChangeText={handleChange('password')}
                        />
                      </View>
                      <View>
                        {/* <Text style={styles.labels}>Confirm password</Text> */}
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
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={() => handleSubmit}>
                  <Text style={styles.loginText}>Sign Up</Text>
                </TouchableOpacity>
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
  loginButton: {
    backgroundColor: '#5DADE2',
    height: 60,
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
