import { useState } from "react";
import { SafeAreaView, StyleSheet, FlatList, Image, RefreshControl, Text, View } from "react-native";
import { images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import VideoCard from "../../components/VideoCard";
// import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";

const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
          <View style={styles.headerContainer}>
            <View style={styles.header}>
              <View>
                <Text style={styles.welcomeText}>Welcome Back</Text>
                <Text style={styles.username}>JSMastery</Text>
              </View>
              <View style={styles.logoContainer}>
                <Image
                  source={images.logoSmall}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
            </View>

            {/* <SearchInput /> */}

            <View style={styles.latestVideosContainer}>
              <Text style={styles.latestVideosText}>Latest Videos</Text>
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
  safeArea: {
    backgroundColor: "#1F2937", // Equivalent to "bg-primary" from NativeWind
    flex: 1,
  },
  headerContainer: {
    marginVertical: 24, // "my-6"
    paddingHorizontal: 16, // "px-4"
    spaceVertical: 24, // "space-y-6"
  },
  header: {
    flexDirection: "row", // "flex-row"
    justifyContent: "space-between", // "justify-between"
    alignItems: "flex-start", // "items-start"
    marginBottom: 24, // "mb-6"
  },
  welcomeText: {
    fontFamily: "Poppins-Medium", // "font-pmedium"
    fontSize: 14, // "text-sm"
    color: "#D1D5DB", // "text-gray-100"
  },
  username: {
    fontFamily: "Poppins-SemiBold", // "font-psemibold"
    fontSize: 24, // "text-2xl"
    color: "#FFFFFF", // "text-white"
  },
  logoContainer: {
    marginTop: 6, // "mt-1.5"
  },
  logo: {
    width: 36, // "w-9"
    height: 40, // "h-10"
  },
  latestVideosContainer: {
    width: "100%", // "w-full"
    flex: 1,
    paddingTop: 20, // "pt-5"
    paddingBottom: 32, // "pb-8"
  },
  latestVideosText: {
    fontFamily: "Poppins-Regular", // "font-pregular"
    fontSize: 18, // "text-lg"
    color: "#D1D5DB", // "text-gray-100"
    marginBottom: 12, // "mb-3"
  },
});

export default Home;
