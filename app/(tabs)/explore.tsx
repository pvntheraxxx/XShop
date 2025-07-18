import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { CategoryType } from "@/types/type";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Stack } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import { Colors } from "@/constants/Colors";
import Animated, { FadeInDown } from "react-native-reanimated";

type Props = {};

const ExploreScreen = (props: Props) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const headerHeight = useHeaderHeight();

  useEffect(() => {
    getCategories();
  });

  const getCategories = async () => {
    const response = await axios.get("http://10.0.2.2:8000/categories");

    setCategories(response.data);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "Explore",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "600",
            color: Colors.black,
          },
        }}
      />
      <View style={[styles.container, { marginTop: headerHeight }]}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator
          renderItem={({ item, index }) => (
            <Animated.View
              style={styles.itemWrapper}
              entering={FadeInDown.delay(300 + index * 100).duration(500)}>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <Image
                source={{ uri: item.image }}
                style={{ width: 100, height: 100, borderRadius: 10 }}
              />
            </Animated.View>
          )}
        />
      </View>
    </>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  itemWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.extraLigthGray,
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.black,
  },
});
