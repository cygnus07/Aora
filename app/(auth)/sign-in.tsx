import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image, StyleSheet } from "react-native";

import { images } from "../../constants";
import CustomButton from '../../components/CustomButton';  
import FormField from '../../components/FormField';
import { signIn, getCurrentUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider';

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View
          style={[
            styles.container,
            { minHeight: Dimensions.get("window").height - 83 },
          ]}
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            style={styles.logo}
          />

          <Text style={styles.title}>
            Log in to Aora
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles={styles.formField}
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={styles.formField}
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles={styles.button}
            isLoading={isSubmitting}
          />

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>
              Don't have an account?
            </Text>
            <Link href="/sign-up" style={styles.signupLink}>
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#1F2937', // bg-primary
    flex: 1,
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginVertical: 24,
  },
  logo: {
    width: 115,
    height: 34,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 40,
    fontFamily: 'Poppins-SemiBold', // Assuming custom font is loaded
  },
  formField: {
    marginTop: 28, // Equivalent to 'mt-7' in Tailwind
  },
  button: {
    marginTop: 28, // Equivalent to 'mt-7' in Tailwind
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
    gap: 8, // Equivalent to 'gap-2' in Tailwind
  },
  signupText: {
    fontSize: 18,
    color: '#D1D5DB', // Equivalent to text-gray-100
    fontFamily: 'Poppins-Regular', // Assuming custom font is loaded
  },
  signupLink: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F43F5E', // Equivalent to text-secondary
    fontFamily: 'Poppins-SemiBold', // Assuming custom font is loaded
  },
});

export default SignIn;
