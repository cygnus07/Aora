import { useState } from "react";
import { router } from "expo-router";
import { ResizeMode, Video } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

import { icons } from "../../constants";
import { createVideoPost } from "../../lib/appwrite";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { useGlobalContext } from "../../context/GlobalProvider";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openPicker = async (selectType) => {
    // const result = await DocumentPicker.getDocumentAsync({
    //   type:
    //     selectType === "image"
    //       ? ["image/png", "image/jpg", "image/jpeg"]
    //       : ["video/mp4", "video/gif"],
    // });

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === "image" ?
        ImagePicker.MediaTypeOptions.Images :
        ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          thumbnail: result.assets[0],
        });
      }

      if (selectType === "video") {
        setForm({
          ...form,
          video: result.assets[0],
        });
      }
    }
  };

  const submit = async () => {
    if (
      (form.prompt === "") |
      (form.title === "") |
      !form.thumbnail |
      !form.video
    ) {
      return Alert.alert("Please provide all fields");
    }

    setUploading(true);
    try {
      await createVideoPost({
        ...form,
        userId: user.$id,
      });

      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });

      setUploading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Upload Video</Text>

        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catchy title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles={styles.formField}
        />

        <View style={styles.uploadSection}>
          <Text style={styles.uploadText}>Upload Video</Text>

          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                style={styles.videoPreview}
                // useNativeControls
                resizeMode={ResizeMode.COVER}
                // isLooping
              />
            ) : (
              <View style={styles.videoPlaceholder}>
                <View style={styles.uploadIconContainer}>
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    alt="upload"
                    style={styles.uploadIcon}
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.uploadSection}>
          <Text style={styles.uploadText}>Thumbnail Image</Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                style={styles.thumbnailImage}
              />
            ) : (
              <View style={styles.chooseFileContainer}>
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  alt="upload"
                  style={styles.chooseFileIcon}
                />
                <Text style={styles.chooseFileText}>
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The AI prompt of your video...."
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles={styles.promptField}
        />

        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles={styles.submitButton}
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#161622',
    height: '100%',
  },
  scrollView: {
    paddingHorizontal: 16,
    marginVertical: 24,
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
  },
  formField: {
    marginTop: 40,
  },
  uploadSection: {
    marginTop: 28,
    spaceY: 8,
  },
  uploadText: {
    fontSize: 16,
    color: '#CDCDE0',
    fontFamily: 'Poppins-Medium',
  },
  videoPreview: {
    width: '100%',
    height: 256,
    borderRadius: 16,
  },
  videoPlaceholder: {
    width: '100%',
    height: 160,
    backgroundColor: '#1E1E2D',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#232533',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIconContainer: {
    width: 56,
    height: 56,
    borderWidth: 2,
    borderColor: '#FF9001',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailImage: {
    width: '100%',
    height: 256,
    borderRadius: 16,
  },
  chooseFileContainer: {
    width: '100%',
    height: 64,
    backgroundColor: '#1E1E2D',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#232533',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  chooseFileText: {
    fontSize: 14,
    color: '#CDCDE0',
    fontFamily: 'Poppins-Medium',
  },
  submitButton: {
    marginTop: 28,
  },
  chooseFileIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  uploadIcon: {
    width: 24,
    height: 24,
  },
});

export default Create;
