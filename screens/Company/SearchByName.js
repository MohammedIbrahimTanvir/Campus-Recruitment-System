/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Stack, Input, Icon, Image, Text, Button } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { getStudentsByName } from "../../helper/helper";
import { useSelector } from "react-redux";
import { Alert, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/core";

export const SearchByName = () => {
  const authInfo = useSelector((state) => state.AuthReducer);
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const watchAll = watch();

  useEffect(() => {
    console.log(watchAll);
  }, [watchAll]);

  const handleSearchOnKeyPress = (data) => {
    console.log(data.name);
    console.log(data.name === "");
    if (data.name === "") {
      Alert.alert("Wrong", "Type something to search", [
        { text: "Got it", onPress: () => console.log("OK Pressed") },
      ]);
    } else if (data.name !== "") {
      getStudentsByName(
        authInfo?.token,
        "/company/search/user",
        data.name
      ).then((users) => setUsers(users));
    }
  };
  console.log("Users List ", users);
  return (
    <>
      <Stack
        display="flex"
        flexDirection="row"
        alignItems="center"
        marginTop="5"
        borderColor="gray.300"
        borderWidth="1"
        borderStyle="solid"
        marginX="2"
        borderRadius="md"
        paddingY="1"
        paddingX="2"
      >
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.searchInput}
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholder="Search by name"
              placeholderTextColor="black"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="name"
          defaultValue=""
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSubmit(handleSearchOnKeyPress)}
        >
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </Stack>

      <Stack marginX="4">
        <Text marginTop="4" marginBottom="2" fontWeight="500" fontSize="md">
          Search list
        </Text>
        {users?.user?.map((user, index) => (
          <Stack
            display="flex"
            flexDirection="row"
            alignItems="center"
            background="white"
            borderRadius="lg"
            padding="4"
            marginBottom="2"
            key={index}
          >
            <Stack>
              <Text fontWeight="600" fontSize="md">
                {user.name}
              </Text>
              <Text fontWeight="400">{user.email}</Text>
              <Text
                fontSize="xs"
                color="blue.400"
                fontWeight="300"
                onPress={() =>
                  navigation.navigate("StudentProfileById", {
                    student_id: user?._id,
                  })
                }
              >
                See Profile
              </Text>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    marginHorizontal: 6,
    marginVertical: 6,
    borderColor: "#d1d1d1",
    borderWidth: 1,
    borderStyle: "solid",
  },
  searchInput: {
    display: "flex",
    flex: 1,
    // width: 300,
    borderRadius: 5,
    color: "black",
  },
  searchButton: {
    backgroundColor: "dodgerblue",
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  searchButtonText: {
    color: "#ffffff",
  },
});
