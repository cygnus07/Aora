import { ActivityIndicator, Text, TouchableOpacity, StyleSheet } from "react-native";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[
        styles.button,
        isLoading ? styles.loadingButton : {},
        containerStyles,
      ]}
      disabled={isLoading}
    >
      <Text style={[styles.buttonText, textStyles]}>{title}</Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          style={styles.loader}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF8E01',  
    borderRadius: 12, 
    minHeight: 62,  
    flexDirection: 'row',  
    justifyContent: 'center',  
    alignItems: 'center',  
  },
  loadingButton: {
    opacity: 0.5, 
  },
  buttonText: {
    color: '#161622',  
    fontFamily: 'Poppins-SemiBold',  
    fontSize: 18,  
  },
  loader: {
    marginLeft: 8,  
  },
});

export default CustomButton;
