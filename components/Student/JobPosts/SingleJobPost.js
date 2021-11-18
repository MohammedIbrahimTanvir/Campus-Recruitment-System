import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { applyToJob } from "../../../helper/helper";

const SingleJobPost = ({ itemData, authToken }) => {
  const [applied, setApplied] = useState(false);
  const { title, description } = itemData;
  const d = new Date(itemData.createdAt);

  const handleApply = (job_id) => {
    console.log(job_id);

    applyToJob(authToken?.token, job_id)
      .then((response) => {
        console.log(response);
        setApplied(true);
      })
      .catch((error) => console.log(error));
  };

  const handleAlreadyApplied = (appliedList) => {
    // console.log(appliedList)
    // console.log(authToken?.userInfo?._id)

    let applied;
    appliedList?.map((jobapply) => {
      if (jobapply?.user === authToken?.userInfo?._id) {
        // console.log(authToken?.userInfo?._id)
        applied = true;
      }
    });

    return applied;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.date}>
        {d.toLocaleDateString()} {d.toLocaleTimeString()}
      </Text>
      <Text style={styles.author}>{itemData?.Author.name}</Text>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.des}>{description}</Text>
      <View>
        <Button
          style={styles.applyButton}
          title={
            handleAlreadyApplied(itemData?.appliedUsers) || applied
              ? "Applied"
              : "Apply"
          }
          onPress={() =>
            handleAlreadyApplied(itemData?.appliedUsers) === undefined &&
            applied === false
              ? handleApply(itemData?._id)
              : null
          }
        />
      </View>
    </View>
  );
};

export default SingleJobPost;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 10,
    margin: 10,
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 10,
  },
  date: {
    color: "grey",
    paddingTop: 10,
    paddingLeft: 10,
    opacity: 0.7,
    fontSize: 10,
  },
  author: {
    color: "#000",
    paddingTop: 5,
    paddingLeft: 10,
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  title: {
    color: "#000",
    paddingTop: 10,
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  des: {
    color: "grey",
    padding: 10,
    fontSize: 16,
    fontWeight: "300",
  },

  applyButton: {
    borderStyle: "solid",
    borderWidth: 1,
    flex: 1,
    alignItems: "center",
    borderColor: "lightgray",
    justifyContent: "center",
    padding: 5,
    elevation: 3,
    borderRadius: 4,
  },
});
