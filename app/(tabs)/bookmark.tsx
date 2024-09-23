import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Bookmark = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bookmark</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16, 
    marginVertical: 24,    
    backgroundColor: '#161622', 
    height: '100%',
  },
  title: {
    fontSize: 24,         
    color: '#ffffff',     
    fontFamily: 'Poppins-SemiBold', 
  },
});

export default Bookmark;
