import { router } from "expo-router";
import { View, Text, Image, StyleSheet } from "react-native";
import * as Font from "expo-font";


import { images } from "../constants";
import CustomButton from "./CustomButton";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View style={styles.container}>
      <Image
        source={images.empty}
        resizeMode="contain"
        style={styles.image}
      />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      <CustomButton
        title="Back to Explore"
        handlePress={() => router.push("/home")}
        containerStyles={styles.buttonContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  image: {
    width: 270,
    height: 216,
  },
  title: {
    fontSize: 14, // equivalent to text-sm
    fontFamily: "Poppins-Medium", // custom font reference
    color: "#F5F5F5", // equivalent to text-gray-100
  },
  subtitle: {
    fontSize: 20, // equivalent to text-xl
    textAlign: "center",
    fontFamily: "Poppins-SemiBold", // custom font reference
    color: "#FFFFFF",
    marginTop: 8, // equivalent to mt-2
  },
  buttonContainer: {
    width: "100%",
    marginVertical: 20, // equivalent to my-5
  },
});

export default EmptyState;
