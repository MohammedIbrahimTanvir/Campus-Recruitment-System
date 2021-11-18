import React, { useState, useEffect } from "react";
import { ScrollView, Button } from "react-native";
import { Input } from "react-native-elements";
import { clockRunning } from "react-native-reanimated";
import { useSelector } from "react-redux";
import { SetToken } from "../../libs/setToken";
import axios from "axios";

export const ExperiencesEdit = ({ navigation }) => {
  const authInfo = useSelector((state) => state.AuthReducer);
  // console.log("Read from StudentProfile Screen", authInfo);
  //const [user, setUser] = useState(authInfo);

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [from, setFrom] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    const UserExperience = async () => {
      try {
        SetToken(authInfo.token);
        const response = await axios.get(
          "https://iiuc-campus-recuitement-system.herokuapp.com/profile/me"
        );
        setTitle(response.data.experience[0].title);
        setCompany(response.data.experience[0].company);
        setLocation(response.data.experience[0].location);
        setFrom(response.data.experience[0].from);
        setDescription(response.data.experience[0].description);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    UserExperience();
  }, []);

  const updateExperience = async () => {
    SetToken(authInfo.token);
    try {
      const response = await axios.post(
        "https://iiuc-campus-recuitement-system.herokuapp.com/profile/me/experience",
        {
          title,
          company,
          location,
          from,
          description,
        }
      );
    } catch (error) {
      console.log(error.response.data);
    }
    navigation.navigate("Profile");
  };

  return (
    <ScrollView>
      <Input
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <Input
        placeholder="Company Name"
        value={company}
        onChangeText={(text) => setCompany(text)}
      />
      <Input
        placeholder="Location"
        value={location}
        onChangeText={(text) => setLocation(text)}
      />
      <Input
        placeholder="From"
        value={from}
        keyboardType="number-pad"
        onChangeText={(text) => setFrom(text)}
      />
      {/* <Input
        placeholder="To"
        value={to}
        keyboardType="number-pad"
        onChangeText={(text) => setTo(text)}
      /> */}
      <Input
        placeholder="Description"
        value={description}
        numberOfLines={4}
        multiline={true}
        onChangeText={(text) => setDescription(text)}
      />
      <Button title="Update" onPress={updateExperience} />
    </ScrollView>
  );
};
