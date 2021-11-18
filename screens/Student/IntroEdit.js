import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { Button } from "react-native";
import { View } from "react-native";
import { Input } from "react-native-elements";
import axios from "axios";
import { useSelector } from "react-redux";
import { SetToken } from "../../libs/setToken";

export const IntroEdit = ({ navigation }) => {
  const authInfo = useSelector((state) => state.AuthReducer);
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [status, setStatus] = useState("");
  const [website, setWebsite] = useState("");
  const [githubusername, setGithubusername] = useState("");
  const [codeforceusername, setCodeforceusername] = useState("");

  useEffect(() => {
    const userData = async () => {
      try {
        SetToken(authInfo.token);
        const response = await axios.get(
          "https://iiuc-campus-recuitement-system.herokuapp.com/profile/me"
        );
        let skill = "";

        response.data.skills.map((s, index) => {
          if (index === 0) {
            skill = skill + s;
          } else {
            skill = skill + ", " + s;
          }
        });
        setLocation(response.data.location);
        setBio(response.data.bio);
        setStatus(response.data.status);
        setWebsite(response.data.website);
        setGithubusername(response.data.githubusername);
        setCodeforceusername(response.data.codeforceusername);
        setSkills(skill);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    userData();
  }, []);

  const updateUserInfo = async () => {
    SetToken(authInfo.token);
    try {
      const response = await axios.post(
        "https://iiuc-campus-recuitement-system.herokuapp.com/profile/me",
        {
          skills,
          location,
          bio,
          status,
          website,
          githubusername,
          codeforceusername,
        }
      );
    } catch (error) {
      console.log(error.response.data);
    }
    navigation.navigate("Profile");
  };

  return (
    <ScrollView>
      <View>
        <Input
          placeholder="Skills"
          numberOfLines={3}
          multiline={true}
          value={skills}
          onChangeText={(text) => setSkills(text)}
        />
        <Input
          placeholder="Location"
          value={location}
          onChangeText={(text) => setLocation(text)}
        />
        <Input
          placeholder="Write your Bio here .."
          numberOfLines={4}
          multiline={true}
          value={bio}
          onChangeText={(text) => setBio(text)}
        />
        <Input
          placeholder="Status"
          value={status}
          onChangeText={(text) => setStatus(text)}
        />
        <Input
          placeholder="Website"
          value={website}
          onChangeText={(text) => setWebsite(text)}
        />
        <Input
          placeholder="GitHub Username"
          value={githubusername}
          onChangeText={(text) => setGithubusername(text)}
        />
        <Input
          placeholder="Codeforces Username"
          value={codeforceusername}
          onChangeText={(text) => setCodeforceusername(text)}
        />
        <Button title="Update" onPress={updateUserInfo} />
      </View>
    </ScrollView>
  );
};
