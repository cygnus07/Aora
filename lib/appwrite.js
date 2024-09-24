import { Account, Client, ID, Avatars, Databases, Storage} from 'react-native-appwrite';
import { Query } from 'react-native-appwrite';

// Configuration for Appwrite
export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: 'com.cygnus.aora',
    projectId: '66f158f6002ccce7e94e',
    databaseId: '66f15a320033d24c29e0',
    userCollectionId: '66f15a6d00118dd8a7d3',
    videoCollectionId: '66f15a9c00163f737d90',
    storageId: '66f15ba4002a67e550ae',
};

// Initialize the Appwrite client
const client = new Client();
client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

    // Register User
    export async function createUser(email, password, username) {
        console.log("Creating user with email:", email, "username:", username);
        try {
            const newAccount = await account.create(ID.unique(), email, password, username);
            console.log("Account created successfully:", newAccount);

            const avatarUrl = avatars.getInitials(username);
            console.log("Avatar URL:", avatarUrl);

            await signIn(email, password);

            const newUser = await databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.userCollectionId,
                ID.unique(),
                {
                    accountId: newAccount.$id,
                    email: email,
                    username: username,
                    avatar: avatarUrl,
                }
            );
            console.log("User document created:", newUser);

            return newUser;
        } catch (error) {
            console.log("Error creating user", error);
            throw new Error(error.message || "User creation failed");
        }
    }

    // Sign In
    export async function signIn(email, password) {
        try {
            console.log("Attempting login for:", email);
            
            // Use the correct method to create a session
            const session = await account.createEmailPasswordSession(email, password);
            
            console.log("User logged in successfully:", session);
            return session;
        } catch (error) {
            console.log("Error during login:", error);
            throw new Error(error.message || "Login failed");
        }
    }

    // Get Account
    export async function getAccount() {
    try {
      const currentAccount = await account.get();
  
      return currentAccount;
    } catch (error) {
      throw new Error(error);
    }
  }

    // Get Current User
    export async function getCurrentUser() {
        try {
        const currentAccount = await getAccount();
        if (!currentAccount) throw Error;
    
        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        );
    
        if (!currentUser) throw Error;
    
        return currentUser.documents[0];
        } catch (error) {
        console.log("Error getting current user int appwrite.js file:", error);
        // console.log(error);
        return null;
        }
    }

    // Get all video Posts
    export async function getAllPosts() {
        try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.orderDesc("$createdAt")]
        );
    
        return posts.documents;
        } catch (error) {
        throw new Error(error);
        }
    }

    // Get latest created video posts
    export async function getLatestPosts() {
        try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.orderDesc("$createdAt"), Query.limit(7)]
        );
    
        return posts.documents;
        } catch (error) {
        throw new Error(error);
        }
    }

    // Sign Out
    export async function signOut() {
        try {
        const session = await account.deleteSession("current");
    
        return session;
        } catch (error) {
        throw new Error(error);
        }
    }

    // Get video posts created by user
    export async function getUserPosts(userId) {
        try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.equal("creator", userId), Query.orderDesc("$createdAt")]

        );
    
        return posts.documents;
        } catch (error) {
        throw new Error(error);
        }
    }

    // Create Video Post
    export async function createVideoPost(form) {
        try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, "image"),
            uploadFile(form.video, "video"),
        ]);
    
        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            ID.unique(),
            {
            title: form.title,
            thumbnail: thumbnailUrl,
            video: videoUrl,
            prompt: form.prompt,
            creator: form.userId,
            }
        );
    
        return newPost;
        } catch (error) {
        throw new Error(error);
        }
    }

    // Get video posts that matches search query
    export async function searchPosts(query) {
        try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.search("title", query)]
        );
    
        if (!posts) throw new Error("Something went wrong");
    
        return posts.documents;
        } catch (error) {
        throw new Error(error);
        }
    }

    // Upload File
    export async function uploadFile(file, type) {
        if (!file) return;
    
        
        const asset = { 
            name: file.fileName,
            type: file.mimeType,
            size: file.fileSize,
            uri: file.uri,
        };
    
        try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            asset
        );
    
        const fileUrl = await getFilePreview(uploadedFile.$id, type);
        return fileUrl;
        } catch (error) {
        throw new Error(error);
        }
    }
  

    // Get File Preview
    export async function getFilePreview(fileId, type) {
        let fileUrl;
    
        try {
        if (type === "video") {
            fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
        } else if (type === "image") {
            fileUrl = storage.getFilePreview(
            appwriteConfig.storageId,
            fileId,
            2000,
            2000,
            "top",
            100
            );
        } else {
            throw new Error("Invalid file type");
        }
    
        if (!fileUrl) throw Error;
    
        return fileUrl;
        } catch (error) {
        throw new Error(error);
        }
    }

    
    // fetch bookmarks
    export const getUserBookmarks = async (userId) => {
        try {
          const response = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.equal("userId", userId)]
          );
      
          return response.documents;
        } catch (error) {
          console.error("Error fetching bookmarks:", error);
          throw error; 
        }
      };

