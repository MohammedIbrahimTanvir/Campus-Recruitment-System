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
  const [passingYear, setPassingYear] = useState("");
  const [currentJob, setCurrentJob] = useState("");
  const [about, setAbout] = useState("");
  const [status, setStatus] = useState("");
  const [website, setWebsite] = useState("");
  const [githubusername, setGithubusername] = useState("");
  const [codeforceusername, setCodeforceusername] = useState("");

  useEffect(() => {
    const alumniData = async () => {
      try {
        SetToken(authInfo.token);
        const response = await axios.get(
          "https://iiuc-campus-recuitement-system.herokuapp.com/profile/alumni/me"
        );
        console.log("From IntroEdit ", response.data);
        // setLocation(response.data.location);
        // setBio(response.data.bio);
        // setStatus(response.data.status);
        // setWebsite(response.data.website);
        // setGithubusername(response.data.githubusername);
        // setCodeforceusername(response.data.codeforceusername);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    alumniData();
  }, []);

  const updateAlumniInfo = async () => {
    SetToken(authInfo.token);
    try {
      const response = await axios.post(
        "https://iiuc-campus-recuitement-system.herokuapp.com/profile/alumni/me",
        {
          status,
          passingYear,
          currentJob,
          about,
          githubusername,
          codeforceusername,
          website,
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
          placeholder="Status"
          numberOfLines={2}
          multiline={true}
          value={status}
          onChangeText={(text) => setStatus(text)}
        />
        <Input
          placeholder="Passing Year"
          value={passingYear}
          keyboardType="number-pad"
          onChangeText={(text) => setPassingYear(text)}
        />
        <Input
          placeholder="Current Job"
          value={currentJob}
          onChangeText={(text) => setCurrentJob(text)}
        />
        <Input
          placeholder="Write your Bio here .."
          numberOfLines={4}
          multiline={true}
          value={about}
          onChangeText={(text) => setAbout(text)}
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
        <Input
          placeholder="Website"
          value={website}
          onChangeText={(text) => setWebsite(text)}
        />
        <Button title="Update" onPress={updateAlumniInfo} />
      </View>
    </ScrollView>
  );
};
