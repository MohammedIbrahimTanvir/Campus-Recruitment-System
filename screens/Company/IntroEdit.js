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
  const [established, setEstablished] = useState("");
  const [mission, setMission] = useState("");
  const [vision, setVision] = useState("");
  const [About, setAbout] = useState("");
  const [website, setWebsite] = useState("");
  const [linkedin, setLinkedin] = useState("");

  useEffect(() => {
    const companyData = async () => {
      try {
        SetToken(authInfo.token);
        const response = await axios.get(
          "https://iiuc-campus-recuitement-system.herokuapp.com/profile/company/me"
        );
        // console.log("About Introedit ", response.data.companyProfile.About);
        setAbout(response.data.companyProfile.About);
        setEstablished(response.data.companyProfile.established);
        setMission(response.data.companyProfile.mission);
        setVision(response.data.companyProfile.vision);
        setWebsite(response.data.companyProfile.website);
        setLinkedin(response.data.companyProfile.linkedin);
      } catch (error) {
        console.log("From CompanyProfileScreen", error.response.data);
      }
    };
    companyData();
  }, []);

  const updateCompanyInfo = async () => {
    SetToken(authInfo.token);
    try {
      const response = await axios.post(
        "https://iiuc-campus-recuitement-system.herokuapp.com/profile/company/me",
        {
          established,
          mission,
          vision,
          About,
          website,
          linkedin,
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
          placeholder="Established"
          value={established}
          keyboardType="number-pad"
          onChangeText={(text) => setEstablished(text)}
        />
        <Input
          placeholder="Mission"
          numberOfLines={6}
          multiline={true}
          value={mission}
          onChangeText={(text) => setMission(text)}
        />
        <Input
          placeholder="Vision"
          numberOfLines={6}
          multiline={true}
          value={vision}
          onChangeText={(text) => setVision(text)}
        />
        <Input
          placeholder="About"
          numberOfLines={6}
          multiline={true}
          value={About}
          onChangeText={(text) => setAbout(text)}
        />
        <Input
          placeholder="Website"
          value={website}
          onChangeText={(text) => setWebsite(text)}
        />
        <Input
          placeholder="LinkedIn Username"
          value={linkedin}
          onChangeText={(text) => setLinkedin(text)}
        />
        <Button title="Update" onPress={updateCompanyInfo} />
      </View>
    </ScrollView>
  );
};
