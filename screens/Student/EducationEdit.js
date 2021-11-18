import React, { useState, useEffect } from "react";
import { ScrollView, Button } from "react-native";
import { Input } from "react-native-elements";
import { clockRunning } from "react-native-reanimated";
import { useSelector } from "react-redux";
import { SetToken } from "../../libs/setToken";
import axios from "axios";

export const EducationEdit = ({ navigation }) => {
  const authInfo = useSelector((state) => state.AuthReducer);

  const [school, setSchool] = useState("");
  const [college, setCollege] = useState("");
  const [university, setUniversity] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [BscPassingYear, setBscPassingYear] = useState("");

  useEffect(() => {
    const UserEducation = async () => {
      try {
        SetToken(authInfo.token);
        const response = await axios.get(
          "https://iiuc-campus-recuitement-system.herokuapp.com/profile/me"
        );
        setSchool(response.data.education[0].school);
        setCollege(response.data.education[0].college);
        setUniversity(response.data.education[0].university);
        setFieldOfStudy(response.data.education[0].fieldOfStudy);
        setBscPassingYear(response.data.education[0].BscPassingYear);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    UserEducation();
  }, []);

  const updateUserEducation = async () => {
    SetToken(authInfo.token);
    try {
      const response = await axios.post(
        "https://iiuc-campus-recuitement-system.herokuapp.com/profile/me/education",
        {
          school,
          college,
          university,
          fieldOfStudy,
          BscPassingYear,
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
        placeholder="School"
        value={school}
        onChangeText={(text) => setSchool(text)}
      />
      <Input
        placeholder="College"
        value={college}
        onChangeText={(text) => setCollege(text)}
      />
      <Input
        placeholder="University"
        value={university}
        onChangeText={(text) => setUniversity(text)}
      />
      <Input
        placeholder="Field of study"
        value={fieldOfStudy}
        onChangeText={(text) => setFieldOfStudy(text)}
      />
      <Input
        placeholder="BSc Passing Year"
        value={BscPassingYear}
        keyboardType="number-pad"
        onChangeText={(text) => setBscPassingYear(text)}
      />
      <Button title="Update" onPress={updateUserEducation} />
    </ScrollView>
  );
};
