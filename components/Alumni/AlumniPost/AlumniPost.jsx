import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Avatar } from "react-native-elements";
import { CustomButton } from "../../ui/CustomButton";

export const AlumniPost = ({ alumniPost = {} }) => {
  const {
    name = "Elon Musk",
    image = "data:image/jpeg;base64,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",
    date = "20 Aug 2021",
    description = "Hello world, this is our programming world I've enterd this world to grow myself and improve my world make an impact in the world, Now I'm gonna make a great technology that's gonna impact in the world. So let's just jump right into it.",
    title = "Web developer",
    like = [],
    comment = [],
  } = alumniPost;

  const [showMoreButton, setShowMoreButton] = useState(false);
  const [textShown, setTextShown] = useState(false);
  const [numLines, setNumLines] = useState(undefined);

  const toggleTextShown = () => {
    setTextShown(!textShown);
  };

  useEffect(() => {
    setNumLines(textShown ? undefined : 3);
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
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
      <Card.Image style={styles.image} source={{ uri: image }} />
      <View style={styles.descriptionContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text
          onTextLayout={onTextLayout}
          numberOfLines={numLines}
          style={styles.descriptionContainer}
        >
          {description}
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
