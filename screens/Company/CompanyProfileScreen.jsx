import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Linking } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import { useSelector } from "react-redux";
var Buffer = require("buffer/").Buffer;
import { getData } from "./apicalls/company";
import { SetToken } from "../../libs/setToken";
import { Stack, Text, Image, Button } from "native-base";
import dayjs from "dayjs";
import axios from "axios";

const CompanyProfileScreen = ({ navigation }) => {
  const authInfo = useSelector((state) => state.AuthReducer);
  console.log(authInfo);
  const bs = React.createRef();
  const fall = new Animated.Value(1);

  const [companyData, setCompanyData] = useState({});
  const [base64Image, setBase64Image] = useState("");
  useEffect(() => {
    getData(authInfo?.token, "/profile/company/me")
      .then((data) => setCompanyData(data.companyProfile))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const userImage = async () => {
      try {
        SetToken(authInfo.token);
        const response = await axios.get(
          "https://iiuc-campus-recuitement-system.herokuapp.com/profile/company/me/profilePic"
        );
        let imageUrl = new Buffer.from(response.data.pic.data).toString(
          "base64"
        );
        setBase64Image(imageUrl);
      } catch (error) {
        console.log("Error in showing profile pic", error.response.data);
      }
    };
    userImage();
  }, []);
  //console.log("companyData 123 ", companyData);
  if (base64Image) {
    return (
      <>
        <Animated.View
          style={{ opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)) }}
        >
          <ScrollView>
            <Stack marginY="8">
              <Stack>
                <Image
                  source={{
                    uri: `data:image/jpg;base64,${base64Image}`,
                  }}
                  alt="Loading Image"
                  size="xl"
                  borderRadius="full"
                  marginX="auto"
                />
                <Text textAlign="center" fontSize="2xl" marginTop="4">
                  {authInfo?.userInfo?.name || "Company name"}
                </Text>
              </Stack>
              <Stack>
                <Stack
                  marginTop="4"
                  background="white"
                  marginX="4"
                  paddingY="2"
                  borderRadius="lg"
                >
                  <Text fontSize="md" fontWeight="bold" marginX="4">
                    Email
                  </Text>
                  <Text
                    fontSize="sm"
                    marginX="4"
                    color="blue.600"
                    marginTop="1"
                    onClick={() =>
                      Linking.openURL("https://" + authInfo?.userInfo?.email)
                    }
                  >
                    {authInfo?.userInfo?.email || "Email"}
                  </Text>
                </Stack>
                <Stack
                  marginTop="4"
                  background="white"
                  marginX="4"
                  paddingY="2"
                  borderRadius="lg"
                >
                  <Text fontSize="md" fontWeight="bold" marginX="4">
                    Website
                  </Text>
                  <Text
                    fontSize="sm"
                    marginX="4"
                    color="blue.600"
                    marginTop="1"
                    onClick={() =>
                      Linking.openURL("https://" + companyData?.website)
                    }
                  >
                    {companyData?.website || "Website"}
                  </Text>
                </Stack>
                <Stack
                  marginTop="4"
                  background="white"
                  marginX="4"
                  paddingY="2"
                  borderRadius="lg"
                >
                  <Text fontSize="md" fontWeight="bold" marginX="4">
                    About
                  </Text>
                  <Text fontSize="sm" marginX="4" marginTop="1">
                    {companyData?.About || "About Company"}
                  </Text>
                </Stack>

                <Stack
                  marginTop="4"
                  background="white"
                  marginX="4"
                  paddingY="2"
                  borderRadius="lg"
                >
                  <Text fontSize="md" fontWeight="bold" marginX="4">
                    Mission
                  </Text>
                  <Text fontSize="sm" marginX="4" marginTop="1">
                    {companyData?.mission || "Mission of Company"}
                  </Text>
                </Stack>

                <Stack
                  marginTop="4"
                  background="white"
                  marginX="4"
                  paddingY="2"
                  borderRadius="lg"
                >
                  <Text fontSize="md" fontWeight="bold" marginX="4">
                    Vision
                  </Text>
                  <Text fontSize="sm" marginX="4" marginTop="1">
                    {companyData?.vision || "Vision of Company"}
                  </Text>
                </Stack>
                <Stack
                  marginTop="4"
                  background="white"
                  marginX="4"
                  paddingY="2"
                  borderRadius="lg"
                >
                  <Text fontSize="md" fontWeight="bold" marginX="4">
                    LinkedIn
                  </Text>
                  <Text
                    fontSize="sm"
                    marginX="4"
                    color="blue.600"
                    marginTop="1"
                    onClick={() =>
                      Linking.openURL(
                        "https://" + companyData?.social?.linkedin
                      )
                    }
                  >
                    {companyData?.social?.linkedin || "LinkedIn"}
                  </Text>
                </Stack>
              </Stack>
              <Button
                marginX="5"
                background="blue.400"
                marginTop="6"
                onPress={() => navigation.navigate("Edit Profile")}
              >
                Update Profile
              </Button>
            </Stack>
          </ScrollView>
        </Animated.View>
        <BottomSheet
          ref={bs}
          snapPoints={[300, 0]}
          initialSnap={1}
          borderRadius={10}
          callbackNode={fall}
          enabledGestureInteraction={true}
        />
      </>
    );
  } else {
    return (
      <>
        <Text fontSize="md" marginX="4">
          Wait for Fetching Profile from Backend.
        </Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text fontSize="md" marginX="4">
          By the way, didn't create your full profile?
        </Text>
        <Text fontSize="md" marginX="4">
          Create Now!
        </Text>
        <Button
          marginX="5"
          background="blue.400"
          marginTop="6"
          onPress={() => navigation.navigate("Edit Profile")}
        >
          Create Full Profile
        </Button>
      </>
    );
  }
};

export default CompanyProfileScreen;
