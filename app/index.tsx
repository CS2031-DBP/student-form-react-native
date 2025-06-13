import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function MainScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "#333",
        }}
      >
        Hola
      </Text>

      <TouchableOpacity>
        <Link href="/(tabs)" asChild>
          <Text style={{ color: "#0066cc", fontSize: 18, marginTop: 20 }}>
            Go to Tabs
          </Text>
        </Link>
      </TouchableOpacity>
    </View>
  );
}
