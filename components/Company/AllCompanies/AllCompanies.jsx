import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Card, Avatar } from "react-native-elements";

export const AllCompanies = ({ allCompanies = {} }) => {
  const {
    name = "Enosis Solutions",
    place = "Dhaka, Bangladesh",
    description = "Enosis helps you create diverse and complex software solutions for your business needs. Listening to your ideas, we implement and create custom software solutions from scratch, designed especially for your business. With Enosis, you get quality software and perfect service every time.",
  } = allCompanies;

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
          <Text style={styles.place}>{place}</Text>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
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
        <Button
          style={styles.applyButton}
          title="View full Profile"
          onPress={() => console.log("Button Pressed")}
        />
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
  place: {
    color: "gray",
    fontSize: 12,
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
    marginTop: 10,
  },
  applyButton: {
    borderStyle: "solid",
    borderWidth: 1,
    flex: 1,
    alignItems: "center",
    borderColor: "lightgray",
    justifyContent: "center",
    padding: 5,
    borderRadius: 4,
  },
});
