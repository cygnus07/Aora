import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View, StyleSheet } from "react-native";

import { images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import VideoCard from "../../components/VideoCard";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);
  
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
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
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <View style={styles.welcomeContainer}>
              <View>
                <Text style={styles.welcomeText}>Welcome Back</Text>
                <Text style={styles.title}>{user?.username}</Text>
              </View>
              <View style={styles.logoContainer}>
                <Image
                  source={images.logoSmall}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput />
            <View style={styles.latestVideosContainer}>
              <Text style={styles.latestVideosTitle}>Latest Videos</Text>
              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos created yet"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#161622',
    flex: 1,
  },
  header: {
    marginVertical: 24,
    paddingHorizontal: 16,
    spaceY: 24,
  },
  welcomeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 14,
    color: '#CDCDE0',
    fontFamily: 'Poppins-Medium',
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
  },
  logoContainer: {
    marginTop: 6,
  },
  logo: {
    width: 36,
    height: 40,
  },
  latestVideosContainer: {
    width: '100%',
    paddingTop: 20,
    paddingBottom: 32,
  },
  latestVideosTitle: {
    fontSize: 18,
    color: '#CDCDE0',
    marginBottom: 12,
    fontFamily: 'Poppins-Regular',
  },
});

export default Home;
