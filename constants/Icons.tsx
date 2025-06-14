import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import { StyleSheet } from "react-native";

export const icon = {
  index: ({ color }: { color: string }) => (
    <Ionicons name="home-outline" size={22} color={color} />
  ),
  explore: ({ color }: { color: string }) => (
    <Ionicons name="search-outline" size={22} color={color} />
  ),
  notifications: ({ color }: { color: string }) => (
    <Ionicons name="notifications-outline" size={22} color={color} />
  ),
  cart: ({ color }: { color: string }) => (
    <Ionicons name="cart-outline" size={22} color={color} />
  ),
  profile: ({ color }: { color: string }) => (
    <Image
      style={styles.userImg}
      source={{ uri: "https://xsgames.co/randomusers/avatar.php?g=male" }}
    />
  ),
};

const styles = StyleSheet.create({
  userImg: {
    height: 24,
    width: 24,
    borderRadius: 20,
  },
});
