import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link } from 'expo-router'

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-black-100">
      <Text className="text-3xl font-pblack text-white"> This is Aora</Text>
      <StatusBar style="auto" />
      <Link href="/home" style={{ color: 'white' }}>Go to Home</Link>
    </View>
  );
}
