import { Image } from "expo-image";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { Alert, StyleSheet, TextInput, TouchableOpacity } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { createStudent } from "../../api";

export default function HomeScreen() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    age: "",
    description: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    // Validate form data
    if (!formData.firstname || !formData.lastname || !formData.email || 
        !formData.phone || !formData.age || !formData.password) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    // Validate age is a number
    const ageNumber = parseInt(formData.age);
    if (isNaN(ageNumber) || ageNumber <= 0) {
      Alert.alert("Error", "Please enter a valid age");
      return;
    }

    setIsLoading(true);
    try {
      // Get the stored token
      const token = await SecureStore.getItemAsync("authToken");
      
      if (!token) {
        Alert.alert("Error", "No authentication token found. Please login again.");
        router.replace("/");
        return;
      }

      // Prepare student data
      const studentData = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        phone: formData.phone,
        age: ageNumber,
        description: formData.description,
        password: formData.password,
      };

      // Submit to API
      const response = await createStudent(studentData, token);
      
      Alert.alert(
        "Success", 
        "Student created successfully!",
        [
          {
            text: "OK",
            onPress: () => {
              // Reset form
              setFormData({
                firstname: "",
                lastname: "",
                email: "",
                phone: "",
                age: "",
                description: "",
                password: "",
              });
            }
          }
        ]
      );
      
    } catch (error: any) {
      console.error("Error creating student:", error);
      
      if (error.response?.status === 401) {
        Alert.alert(
          "Authentication Error", 
          "Your session has expired. Please login again.",
          [
            {
              text: "OK",
              onPress: () => {
                SecureStore.deleteItemAsync("authToken");
                router.replace("/");
              }
            }
          ]
        );
      } else {
        Alert.alert(
          "Error", 
          error.response?.data?.message || "Failed to create student. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      {/* <TouchableOpacity style={styles.button}>
        <Link href="/no_existe">
          <ThemedText style={styles.buttonText}>
            Go to Non-Existent Page
          </ThemedText>
        </Link>
      </TouchableOpacity> */}

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Create Student</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.formContainer}>
        <ThemedView style={styles.inputContainer}>
          <ThemedText style={styles.label}>First Name *</ThemedText>
          <TextInput
            style={styles.input}
            value={formData.firstname}
            onChangeText={(text) =>
              setFormData({ ...formData, firstname: text })
            }
            placeholder="Enter first name"
          />
        </ThemedView>

        <ThemedView style={styles.inputContainer}>
          <ThemedText style={styles.label}>Last Name *</ThemedText>
          <TextInput
            style={styles.input}
            value={formData.lastname}
            onChangeText={(text) =>
              setFormData({ ...formData, lastname: text })
            }
            placeholder="Enter last name"
          />
        </ThemedView>

        <ThemedView style={styles.inputContainer}>
          <ThemedText style={styles.label}>Email *</ThemedText>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            placeholder="example@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </ThemedView>

        <ThemedView style={styles.inputContainer}>
          <ThemedText style={styles.label}>Phone *</ThemedText>
          <TextInput
            style={styles.input}
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            placeholder="+1234567890"
            keyboardType="phone-pad"
          />
        </ThemedView>

        <ThemedView style={styles.inputContainer}>
          <ThemedText style={styles.label}>Age *</ThemedText>
          <TextInput
            style={styles.input}
            value={formData.age}
            onChangeText={(text) => setFormData({ ...formData, age: text })}
            placeholder="20"
            keyboardType="numeric"
          />
        </ThemedView>

        <ThemedView style={styles.inputContainer}>
          <ThemedText style={styles.label}>Description</ThemedText>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.description}
            onChangeText={(text) =>
              setFormData({ ...formData, description: text })
            }
            placeholder="Student description"
            multiline
            numberOfLines={3}
          />
        </ThemedView>

        <ThemedView style={styles.inputContainer}>
          <ThemedText style={styles.label}>Password *</ThemedText>
          <TextInput
            style={styles.input}
            value={formData.password}
            onChangeText={(text) =>
              setFormData({ ...formData, password: text })
            }
            placeholder="Minimum 6 characters"
            secureTextEntry
          />
        </ThemedView>

        <TouchableOpacity 
          style={[styles.button, isLoading && styles.buttonDisabled]} 
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <ThemedText style={styles.buttonText}>
            {isLoading ? "Creating Student..." : "Create Student"}
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={async () => {
            await SecureStore.deleteItemAsync("authToken");
            router.replace("/");
          }}
        >
          <ThemedText style={styles.logoutButtonText}>Logout</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },
  formContainer: {
    gap: 16,
    padding: 16,
  },
  inputContainer: {
    gap: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "white",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: "#94a3b8",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    backgroundColor: "#dc2626",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
