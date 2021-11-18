import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Alert,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";
import { SAVE_COMPANY_PROFILE_PIC_API } from "../../helper/helper";

export const AddProfilePic = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const authToken = useSelector((state) => state.AuthReducer.token);
  const onSubmit = (data) => {
    setLoading(true);
    const datareq = {
      profilePic: image,
    };
    // console.log("DataRequest ", datareq);
    SAVE_COMPANY_PROFILE_PIC_API(datareq, authToken)
      .then((res) => {
        if (res) {
          setLoading(false);
          Alert.alert("Succes", "Image is posted", [
            { text: "Close", onPress: () => console.log("OK Pressed") },
          ]);
          navigation.navigate("Profile");
        }
      })
      .catch((err) => console.log(err));
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [15, 14],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  return (
    <View style={styles.mainContainer}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        {loading === true ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        ) : (
          <View style={styles.container}>
            {/* Upload photo */}
            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <Text style={styles.buttonText}>Pick Image</Text>
            </TouchableOpacity>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 300, height: 200 }}
              />
            )}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.buttonText}>Update Photo</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    backgroundColor: "#455a64",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputBox1: {
    textAlignVertical: "top",
    width: 300,
    height: 100,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#ffffff",
    marginVertical: 10,
  },
  inputBox2: {
    textAlignVertical: "top",
    width: 300,
    height: 300,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#ffffff",
    marginVertical: 10,
  },
  button: {
    width: 300,
    backgroundColor: "#1c313a",
    borderRadius: 5,
    marginVertical: 12,
    paddingVertical: 14,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center",
  },

  Text: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 16,
    paddingHorizontal: 8,
  },
});
