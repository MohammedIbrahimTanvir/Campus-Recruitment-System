import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Avatar } from "react-native-elements";
import { CustomButton } from "../../ui/CustomButton";

export const StudentPost = ({ itemData }) => {


  const [showMoreButton, setShowMoreButton] = useState(false);
  const [textShown, setTextShown] = useState(false);
  const [numLines, setNumLines] = useState(undefined);

  const toggleTextShown = () => {
    setTextShown(!textShown);
  };

  useEffect(() => {
    setNumLines(textShown ? undefined : 3);
    console.log(post);
  }, [textShown]);

  const onTextLayout = useCallback((e) => {
    if (e.nativeEvent.lines.length > 3 && !textShown) {
      setShowMoreButton(true);
      setNumLines(3);
    }
  });

  return (
    <Card containerStyle={styles.container}>
      <View style={styles.avatarContainer}>
        <View>
          <Text style={styles.name}>{post?.Author?.name}</Text>
          <Text style={styles.date}>{post?.createdAt}</Text>
        </View>
      </View>
      <Card.Image style={styles.image} source={{ uri: image }} />
      <View style={styles.descriptionContainer}>
        <Text style={styles.title}>{post?.title}</Text>
        <Text
          onTextLayout={onTextLayout}
          numberOfLines={numLines}
          style={styles.descriptionContainer}
        >
          {post?.description}
        </Text>
        {showMoreButton ? (
          <Text
            onPress={toggleTextShown}
            style={{ fontWeight: "bold", textDecorationLine: "underline" }}
          >
            {textShown ? "Read Less" : "Read More"}
          </Text>
        ) : null}
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton icon="heart" quantity={8} />
        <CustomButton icon="commet" quantity={2} />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1.0,
  },
  avatarContainer: {
    marginBottom: 10,
    flexDirection: "row",
  },
  avatar: {
    marginRight: 10,
  },
  image: {
    borderRadius: 4,
  },
  name: {
    fontWeight: "bold",
    fontSize: 15,
  },
  date: {
    color: "gray",
    fontSize: 12,
  },
  descriptionContainer: {
    marginTop: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
});
