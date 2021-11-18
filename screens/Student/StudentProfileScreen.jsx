import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Linking } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import { useSelector } from "react-redux";
var Buffer = require("buffer/").Buffer;
import { getData } from "./apicalls/student";
import { SetToken } from "../../libs/setToken";
import { Stack, Text, Image, Button } from "native-base";
import dayjs from "dayjs";
import axios from "axios";

const StudentProfileScreen = ({ navigation }) => {
  const authInfo = useSelector((state) => state.AuthReducer);
  console.log(authInfo);
  const bs = React.createRef();
  const fall = new Animated.Value(1);

  const [userData, setUserData] = useState({});
  const [githubData, setGithubData] = useState([]);
  const [codeforceData, setCodeforceData] = useState([]);
  const [base64Image, setBase64Image] = useState("");
  useEffect(() => {
    getData(authInfo?.token, "/profile/me/codeforceRatings")
      .then((data) => setCodeforceData(data))
      .catch((error) => console.log(error));

    getData(authInfo?.token, "/profile/me/githubRepos")
      .then((data) => setGithubData(data))
      .catch((error) => console.log(error));

    getData(authInfo?.token, "/profile/me")
      .then((data) => setUserData(data))
      .catch((error) => console.log(error));
  }, []);
  // console.log(userData);
  useEffect(() => {
    const userImage = async () => {
      try {
        SetToken(authInfo.token);
        const response = await axios.get(
          "https://iiuc-campus-recuitement-system.herokuapp.com/profile/me/profilePic"
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

  if (base64Image) {
    return (
      <>
        <Animated.View
          style={{ opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)) }}
        >
          <ScrollView>
            <Stack marginY="8">
              <Stack>
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
                </Stack>
                <Stack>
                  <Text textAlign="center" fontSize="2xl" marginTop="4">
                    {userData?.user?.name || "Person name"}
                  </Text>
                  <Text textAlign="center" fontSize="sm">
                    {userData?.status || "Email"}
                  </Text>
                  <Text textAlign="center" fontSize="sm">
                    {userData?.location || "Location"}
                  </Text>
                </Stack>
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
                    Skills
                  </Text>
                  {userData?.skills?.map((skill, index) => (
                    <Text key={index} fontSize="sm" marginX="4" marginTop="1">
                      {skill}
                    </Text>
                  ))}
                </Stack>
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
                  <Text fontSize="sm" marginX="4" marginTop="1">
                    {userData?.user?.email || "Email"}
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
                      Linking.openURL("https://" + userData?.website)
                    }
                  >
                    {userData?.website || "Website"}
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
                    Bio
                  </Text>
                  <Text fontSize="sm" marginX="4" marginTop="1">
                    {userData?.bio || "Person bio"}
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
                    Education
                  </Text>
                  {userData?.education?.map((education, index) => (
                    <Stack key={index}>
                      <Text fontSize="sm" marginX="4" marginTop="1">
                        •{" "}
                        {`${education?.university}\n   ${education?.fieldOfStudy}` ||
                          "University"}
                      </Text>
                      <Text fontSize="sm" marginX="4" marginTop="1">
                        • {education?.college || "Collage"}
                      </Text>
                      <Text fontSize="sm" marginX="4" marginTop="1">
                        • {education?.school || "School"}
                      </Text>
                    </Stack>
                  ))}
                </Stack>
                {userData?.experience?.length > 0 ? (
                  <Stack
                    marginTop="4"
                    background="white"
                    marginX="4"
                    paddingY="2"
                    borderRadius="lg"
                  >
                    <Text fontSize="md" fontWeight="bold" marginX="4">
                      Experiences
                    </Text>
                    {userData?.experience?.map((experience, index) => (
                      <Stack
                        key={index}
                        marginBottom={
                          userData?.experience.length > 1 ? "6" : null
                        }
                      >
                        <Text fontSize="md" marginX="4" marginTop="1">
                          •{" "}
                          {`${experience?.title}\n   at ${experience?.company}` ||
                            "Company"}
                        </Text>
                        <Text
                          fontSize="sm"
                          marginX="4"
                          marginLeft="7"
                          marginTop="1"
                        >
                          {experience?.location || "Location"}
                          {"\n From "}
                          {dayjs(experience?.from).format("DD MMM YYYY") ||
                            "From"}
                        </Text>
                        <Text
                          fontSize="sm"
                          marginX="4"
                          marginLeft="7"
                          marginTop="1"
                        >
                          {experience?.description || "Description"}
                        </Text>
                      </Stack>
                    ))}
                  </Stack>
                ) : null}
                {/* github section starts here */}
                <Stack
                  marginTop="4"
                  background="white"
                  marginX="4"
                  paddingY="2"
                  paddingX="4"
                  borderRadius="lg"
                >
                  <Stack display="flex" flexDirection="row" alignItems="center">
                    <Image
                      source={require("../../assets/github.png")}
                      alt="Alternate Text"
                      size="7"
                      borderRadius="full"
                    />
                    <Stack>
                      <Text fontSize="md" fontWeight="bold" marginX="4">
                        GitHub Activites
                      </Text>
                      <Text fontSize="sm" marginX="4">
                        {userData?.githubusername}
                      </Text>
                    </Stack>
                    {/* {githubData} */}
                  </Stack>
                  <Stack marginTop="2">
                    {githubData.length > 0
                      ? githubData.slice(0, 5).map((repository, index) => (
                          <Text
                            key={index}
                            marginBottom={githubData.length > 1 ? "1" : null}
                            fontSize="sm"
                            marginX="4"
                            marginTop="1"
                            color="blue.600"
                            onClick={() =>
                              Linking.openURL(repository?.html_url)
                            }
                          >
                            • {repository?.name || "Repository name"}
                          </Text>
                        ))
                      : null}
                  </Stack>
                </Stack>
                {/* github section ends here */}

                {/* codeforace section starts here */}

                <Stack
                  marginTop="4"
                  background="white"
                  marginX="4"
                  paddingY="2"
                  paddingX="4"
                  borderRadius="lg"
                >
                  <Stack display="flex" flexDirection="row" alignItems="center">
                    <Stack>
                      <Text fontSize="md" fontWeight="bold" marginX="4">
                        CodeForces
                      </Text>
                      <Text fontSize="sm" marginX="4">
                        {userData?.codeforceusername}
                      </Text>
                    </Stack>
                    {/* {githubData} */}
                  </Stack>
                  <Stack marginTop="2">
                    {codeforceData?.result?.length > 0
                      ? codeforceData?.result
                          ?.slice(0, 5)
                          .map((contest, index) => (
                            <Text
                              key={index}
                              marginBottom={
                                codeforceData?.result?.length > 1 ? "1" : null
                              }
                              fontSize="sm"
                              marginX="4"
                              marginTop="1"
                            >
                              • {contest?.contestName || "Contest name"} -{" "}
                              {contest?.rank || "Rank"} (Rank)
                            </Text>
                          ))
                      : null}
                  </Stack>
                </Stack>

                {/* codeforce section ends here */}
              </Stack>
              <Button
                marginX="5"
                background="blue.400"
                marginTop="6"
                onPress={() => navigation.navigate("Edit Profile")}
              >
                Edit Profile
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

export default StudentProfileScreen;
