import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { Image, Text, View, StyleSheet } from "react-native";

import { icons } from "../../constants";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View style={styles.iconContainer}>
      <Image
        source={icon}
        resizeMode="contain"
        style={[styles.iconImage, { tintColor: color }]}
      />
      <Text
        style={[
          focused ? styles.fontPsemibold : styles.fontPregular,
          styles.iconText,
          { color: color },
        ]}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  //   const { loading, isLogged } = useGlobalContext();

  //   if (!loading && !isLogged) return <Redirect href="/sign-in" />;

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 64,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        {/* <Tabs.Screen
          name="bookmark"
          options={{
            title: "Bookmark",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name="Bookmark"
                focused={focused}
              />
            ),
          }}
        /> */}

        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                name="Create"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>

      {/* <Loader isLoading={loading} />
      <StatusBar backgroundColor="#161622" style="light" /> */}
    </>
  );
};

// StyleSheet Definition
const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 4, 
  },
  iconImage: {
    width: 18, 
    height: 18,
  },
  iconText: {
    fontSize: 10, 
  },
  fontPsemibold: {
    fontFamily: "Poppins-Bold", 
  },
  fontPregular: {
    fontFamily: "Poppins-Regular", 
  },
});

export default TabLayout;
