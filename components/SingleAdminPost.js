import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Linking } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import { Stack, Text, Image, Button } from "native-base";

const SingleAdminPost = ({ itemData }) => {
  const bs = React.createRef();
  const fall = new Animated.Value(1);
  // const { title, description } = itemData;
  //  console.log("Single Admin Post", itemData);
  return (
    <>
      <Animated.View
        style={{ opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)) }}
      >
        <ScrollView>
          <Stack marginY="8">
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
                    {itemData?.description}
                  </Text>
                </Stack>
                {/* {githubData} */}
              </Stack>
              <Stack marginTop="2">
                {itemData ? (
                  <Text fontSize="md" marginX="4" marginTop="1">
                    • {"First Position:"}
                    {"\n"}
                    {"Student name: "}{" "}
                    {itemData?.first.user.name || "Student name"}
                    {"\n"}
                    {"Codeforces Username: "}
                    {itemData?.first.codeforceusername ||
                      "Codeforces Username"}{" "}
                    {"\n"}
                    {"University: "}{" "}
                    {itemData?.first.education[0].university || "University"}{" "}
                    {"\n\n"}• {"Second Position:"} {"\n"}
                    {"Student name: "}{" "}
                    {itemData?.second.user.name || "Student name"} {"\n"}
                    {"Codeforces Username: "}
                    {itemData?.second.codeforceusername ||
                      "Codeforces Username"}{" "}
                    {"\n"}
                    {"University: "}{" "}
                    {itemData?.second.education[0].university || "University"}{" "}
                    {"\n\n"}• {"Third Position:"} {"\n"}
                    {"Student name: "}{" "}
                    {itemData?.third.user.name || "Student name"} {"\n"}
                    {"Codeforces Username: "}
                    {itemData?.third.codeforceusername ||
                      "Codeforces Username"}{" "}
                    {"\n"}
                    {"University: "}{" "}
                    {itemData?.third.education[0].university || "University"}
                    {"\n"}
                  </Text>
                ) : null}
              </Stack>
            </Stack>

            {/* codeforce section ends here */}
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
};

export default SingleAdminPost;
