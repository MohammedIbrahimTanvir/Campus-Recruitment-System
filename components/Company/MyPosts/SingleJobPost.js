/* eslint-disable react/prop-types */
import React from "react";
// import { Ionicons, Foundation } from "@expo/vector-icons";
import { Stack, Text, Button } from "native-base";
import { useNavigation } from "@react-navigation/core";

const SingleJobPost = ({ itemData }) => {
  // console.log(itemData);

  const navigation = useNavigation();

  // const { title, description } = itemData;
  // const d = new Date(itemData.createdAt);
  return (
    <Stack marginTop="4">
      {itemData?.map((post) => (
        <Stack
          marginTop="4"
          background="white"
          marginX="4"
          paddingY="2"
          paddingX="2"
          borderRadius="lg"
          key={post?._id}
        >
          <Text fontSize="lg" fontWeight="bold">
            {post?.title}
          </Text>
          <Text fontSize="md" fontWeight="light">
            {post?.description}
          </Text>
          <Stack display="flex" flexDirection="row" justifyContent="flex-end">
            <Button
              background="green.400"
              borderRadius="md"
              size="md"
              color="white"
              onPress={() =>
                navigation.navigate("AppliedUsers", { postid: post._id })
              }
            >
              {post?.appliedUsers?.length === 0
                ? "No Applications"
                : post?.appliedUsers?.length + " Applications"}
            </Button>
          </Stack>
        </Stack>
      ))}

      {/* <Text style={styles.date}>
        {d.toLocaleDateString()} {d.toLocaleTimeString()}
      </Text>
      <Text style={styles.author}>{itemData?.Author.name}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.des}>{description}</Text>
      <View style={styles.containerrow}>
        <View>
          <Button
            style={styles.applyButton}
            title="Applied Students"
            onPress={() => console.log("Button Pressed")}
          />
        </View>
      </View> */}
    </Stack>
  );
};

export default SingleJobPost;
