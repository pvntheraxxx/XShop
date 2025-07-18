import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import axios from "axios";
import { NotificationType } from "@/types/type";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";

type Props = {};

const NotificationsScreen = (props: Props) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    const URL = `http://10.0.2.2:8000/notifications`;
    const response = await axios.get(URL);

    setNotifications(response.data);
  };

  const headerHeight = useHeaderHeight();
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "Notifications",
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
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <Animated.View
              style={styles.notificationWrapper}
              entering={FadeInDown.delay(300 + index * 100).duration(500)}>
              <View style={styles.notificationIcon}>
                <Ionicons
                  name="notifications-outline"
                  size={22}
                  color={Colors.black}
                />
              </View>
              <View style={styles.notificationInfo}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                  <Text style={styles.notificationTitle}>{item.title}</Text>
                  <Text>{item.timestamp}</Text>
                </View>
                <Text style={styles.notificationMessage}>{item.message}</Text>
              </View>
            </Animated.View>
          )}
        />
      </View>
    </>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  notificationWrapper: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.lightGray,
    backgroundColor: Colors.extraLigthGray,
    borderRadius: 5,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationInfo: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.black,
  },
  notificationMessage: {
    fontSize: 14,
    color: Colors.black,
    marginTop: 5,
    lineHeight: 20,
  },
});
