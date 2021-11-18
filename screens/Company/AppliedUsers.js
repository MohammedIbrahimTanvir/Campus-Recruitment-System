/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Stack, Text, Button, View } from "native-base";
import { useSelector } from "react-redux";
import { appliedUsers } from "../../helper/helper";
import { useNavigation } from "@react-navigation/core";

export const AppliedUsers = ({ route }) => {
  const authInfo = useSelector((state) => state.AuthReducer);
  const [users, setUsers] = useState([]);

  const navigation = useNavigation();
  const { postid } = route.params;

  useEffect(() => {
    appliedUsers(authInfo?.token, `/job/${postid}/appliedUser`).then(
      (response) => {
        console.log("user list", response[0].appliedUsers);
        setUsers(response[0].appliedUsers);
      }
    );
  }, [postid]);

  //console.log("user list", users);

  return (
    <>
      <Stack marginX="4">
        <Text marginTop="4" marginBottom="2" fontWeight="500" fontSize="md">
          User list
        </Text>
        {users?.map((res, index) => (
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
                {res.user.name}
              </Text>
              <Text fontWeight="400">{res.user.email}</Text>
              <Text
                fontSize="xs"
                color="blue.400"
                fontWeight="300"
                onPress={() =>
                  navigation.navigate("StudentProfileById", {
                    student_id: res.user?._id,
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
