import React from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/core";

const SignInHome = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1c313a" barStyle="light-content" />
      <Text
        style={{
          color: "#ffffff",
          fontSize: 18,
          marginBottom: 20,
          fontStyle: "italic",
        }}
      >
        Hi there, Welcome!
      </Text>
      <Text
        style={{
          color: "#ffffff",
          fontSize: 20,
          marginBottom: 20,
          fontStyle: "italic",
        }}
      >
        Who are you?
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Student Sign In")}
      >
        <Text style={styles.buttonText}>Student</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Alumni Sign In")}
      >
        <Text style={styles.buttonText}>Alumni</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Company Sign In")}
      >
        <Text style={styles.buttonText}>Company</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#455a64",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 200,
    backgroundColor: "#1c313a",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center",
  },
});

export default SignInHome;
