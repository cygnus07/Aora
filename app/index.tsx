import { Text, View, ScrollView, Image, StyleSheet, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';  
import CustomButton from '../components/CustomButton';  
import { Redirect, router } from 'expo-router';
import 'react-native-url-polyfill/auto'


const { height } = Dimensions.get('window');


export default function Index() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
        {/* <View className="w-full justify-center items-center min-h-[85vh] px-4"> */}
          <Image 
            source={images.logo}  
            style={styles.logo}
            resizeMode="contain"
          />
          <Image 
            source={images.cards}  
            style={{ maxWidth: 380, width: '100%', height: 300 }}
            resizeMode="contain"
          />

          <View style={{ position: 'relative', marginTop: 50 }}>
            <Text style={{ fontSize: 24, color: '#FFFFFF', fontWeight: 'bold', textAlign: 'center' }}>
              Discover Endless Possibilities with {' '}
              <Text style={{ color: '#FF8E01' }}> Aora</Text>
            </Text>

            <Image
              source={images.path}  // Ensure the image path is correct
              style={{ width: 136, height: 15, position: 'absolute', bottom: -7, right: 90 }}
              resizeMode="contain"
            />
          </View>

          <Text style={{
              fontSize: 14,
              color: '#f3f4f6',
              marginTop: 28,
              fontFamily: 'Poppins-Regular',
              textAlign: 'center',
          }}>
            Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with Aora
          </Text>

          
          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles={{ width: '100%', marginTop: 28 }}  
            isLoading={false}  
          />
        </View>
      </ScrollView>

        <StatusBar backgroundColor="#161622" style="light" />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#161622',  
    flex: 1,
  },
  scrollContainer: {
    height: '100%',
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: height * 0.85,
    paddingHorizontal: 16,
  },
  logo: {
    width: 130,
    height: 84,
  },
});
