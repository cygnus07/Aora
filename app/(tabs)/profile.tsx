import React from 'react';
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native";

import { icons } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getUserPosts, signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";
import InfoBox from "../../components/InfoBox";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this profile"
          />
        )}
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={logout} style={styles.logoutButton}>
              <Image
                source={icons.logout}
                resizeMode="contain"
                style={styles.logoutIcon}
              />
            </TouchableOpacity>

            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: user?.avatar }}
                style={styles.avatar}
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles={styles.infoBoxContainer}
              titleStyles={styles.infoBoxTitle}
            />

            <View style={styles.statsContainer}>
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                titleStyles={styles.statsTitle}
                containerStyles={styles.statsBox}
              />
              <InfoBox
                title="120k"
                subtitle="Followers"
                titleStyles={styles.statsTitle}
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#161622', 
    height: '100%',
  },
  headerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24, 
    marginBottom: 48, 
    paddingHorizontal: 16, 
  },
  logoutButton: {
    flex: 1,
    alignItems: 'flex-end',
    marginBottom: 10, 
  },
  logoutIcon: {
    width: 24, 
    height: 24, 
  },
  avatarContainer: {
    width: 64, 
    height: 64, 
    borderColor: '#FF9C01', 
    borderWidth: 1,
    borderRadius: 8, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: '90%', 
    height: '90%', 
    borderRadius: 8, 
  },
  infoBoxContainer: {
    marginTop: 20, 
  },
  infoBoxTitle: {
    fontSize: 18, 
    color: '#FFFFFF', 
  },
  statsContainer: {
    marginTop: 20, 
    flexDirection: 'row',
  },
  statsTitle: {
    fontSize: 20, 
    color: '#FFFFFF', 
  },
  statsBox: {
    marginRight: 40, 
  },
});

export default Profile;
