import React, { useState } from "react";
import {
  Text,
  View,
  Alert,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { SAVE_CREATE_JOB_API } from "../../../helper/helper";

export default function CreateJobPost() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const authToken = useSelector((state) => state.AuthReducer.token);
  const onSubmit = (data) => {
    setLoading(true);
    console.log("Data CreateJoB ", data);
    const datareq = {
      title: data.title,
      description: data.description,
    };
    SAVE_CREATE_JOB_API(datareq, authToken)
      .then((res) => {
        if (typeof res.createdAt === "string") {
          setLoading(false);
          Alert.alert("Succes", "Job is posted", [
            { text: "Close", onPress: () => console.log("OK Pressed") },
          ]);
        }
      })
      .catch((err) => console.log("Create Job ", err));
  };

  const [loading, setLoading] = useState(false);

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
            {/* Title */}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.inputBox1}
                  underlineColorAndroid="rgba(0,0,0,0)"
                  placeholder="Title"
                  placeholderTextColor="#ffffff"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  numberOfLines={10}
                  multiline={true}
                />
              )}
              name="title"
              defaultValue=""
            />
            {errors.description && (
              <Text style={styles.Text}>This is required.</Text>
            )}
            {/* Description */}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.inputBox2}
                  underlineColorAndroid="rgba(0,0,0,0)"
                  placeholder="Description"
                  placeholderTextColor="#ffffff"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  numberOfLines={100}
                  multiline={true}
                />
              )}
              name="description"
              defaultValue=""
            />
            {errors.description && (
              <Text style={styles.Text}>This is required.</Text>
            )}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.buttonText}>Post</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

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
