import { Account, Client, ID, Avatars, Databases } from 'react-native-appwrite';


export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: 'com.cygnus.aora',
    projectId: '66f158f6002ccce7e94e',
    databaseId: '66f15a320033d24c29e0',
    userCollectionId: '66f15a6d00118dd8a7d3',
    videoCollectionId: '66f15a9c00163f737d90',
    storageId: '66f15ba4002a67e550ae',
    };

    // Init your React Native SDK
    const client = new Client();
    
    client
        .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
        .setProject(appwriteConfig.projectId) // Your project ID
        .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
    ;


    const account = new Account(client);
    // const storage = new Storage(client);
    const avatars = new Avatars(client);
    const databases = new Databases(client);


    // Register User
    export async function createUser(email, password, username) {
        console.log("Creating user with email:", email, "username:", username);
        try {
          const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
          );

          console.log("Account created successfully:", newAccount);
      
          if (!newAccount) throw Error;
      
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
          throw new Error(error);
        }
      }


        // Sign In
        export async function signIn(email, password) {
            try {
              console.log("Attempting login for:", email);
              
              // Use the correct method and pass email and password
              const session = await account.createEmailSession(email, password); // Correct method
              
              console.log("User logged in successfully:", session);
              return session;
            } catch (error) {
              console.log("Error during login:", error);
              throw new Error(error.message || "Login failed");
            }
          }
          
    
   

    
