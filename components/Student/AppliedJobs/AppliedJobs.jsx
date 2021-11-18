import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { Card, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

export const AppliedJobs = ({ appliedJobs = {} }) => {
  const {
    name = "Enosis Solutions",
    date = "20 Aug 2021",
    description = "Hello Students, Do you want to be part of our world class retail solutions team? Fiftytwo Digital Ltd is owned by Mohammadi Group and Fiftytwo A/S of Danish Bording Group. At Fiftytwo, we deliver consulting services and innovative software solutions that increase customer loyalty and boost sales figures. We have great products and we are looking for the best C/C++ developers to expand our development capacity in Bangladesh.",
    title = "Junior Software Engineer",
    like = [],
  } = appliedJobs;

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
  let quantity = 8;
  return (
    <Card containerStyle={styles.container}>
      <View style={styles.avatarContainer}>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
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

      <TouchableOpacity style={styles.loveReacts}>
        <AntDesign
          style={{ marginRight: 10 }}
          name="heart"
          size={16}
          color="black"
        />
        <Text>{quantity}</Text>
      </TouchableOpacity>
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
  loveReacts: {
    flexDirection: "row",
    borderWidth: 1,
    borderStyle: "solid",
    flex: 1,
    alignItems: "center",
    borderColor: "lightgray",
    justifyContent: "center",
    padding: 5,
    borderRadius: 4,
  },
});
