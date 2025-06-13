import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Ionicons } from "@expo/vector-icons";
import { Pedometer } from "expo-sensors";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TabTwoScreen() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [sessionStartSteps, setSessionStartSteps] = useState(0);

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      // Get past 24 hours step count
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 1);

      const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
      if (pastStepCountResult) {
        setPastStepCount(pastStepCountResult.steps);
      }

      // Get current total steps for today to establish baseline
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const currentTotalResult = await Pedometer.getStepCountAsync(
        today,
        new Date()
      );
      if (currentTotalResult) {
        const baselineSteps = currentTotalResult.steps;
        setSessionStartSteps(baselineSteps);
        setCurrentStepCount(baselineSteps);

        // Watch for step count changes
        return Pedometer.watchStepCount((result) => {
          // Add the new steps since subscription started to our baseline
          setCurrentStepCount(baselineSteps + result.steps);
        });
      } else {
        // If we can't get baseline, just use the watch count
        return Pedometer.watchStepCount((result) => {
          setCurrentStepCount(result.steps);
        });
      }
    }
  };

  useEffect(() => {
    let subscription: Pedometer.Subscription | undefined;
    let refreshInterval: ReturnType<typeof setInterval> | undefined;

    const setupPedometer = async () => {
      try {
        subscription = await subscribe();

        // Set up periodic refresh every 30 seconds to ensure accuracy
        refreshInterval = setInterval(async () => {
          try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const currentTotalResult = await Pedometer.getStepCountAsync(
              today,
              new Date()
            );
            if (currentTotalResult) {
              setCurrentStepCount(currentTotalResult.steps);
            }
          } catch (error) {
            console.error("Error refreshing step count:", error);
          }
        }, 30000); // Refresh every 30 seconds
      } catch (error) {
        console.error("Error setting up pedometer:", error);
        setIsPedometerAvailable("error");
      }
    };

    setupPedometer();

    return () => {
      subscription?.remove();
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons
          size={310}
          color="#808080"
          name="walk"
          style={styles.headerImage}
        />
      }
    >
      <View style={styles.container}>
        <Text style={styles.title}>Step Counter</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Pedometer Available</Text>
            <Text style={styles.statValue}>{isPedometerAvailable}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Steps (Last 24 Hours)</Text>
            <Text style={styles.statValue}>
              {pastStepCount.toLocaleString()}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Steps Today</Text>
            <Text style={styles.statValue}>
              {currentStepCount.toLocaleString()}
            </Text>
          </View>
        </View>
        <Text style={styles.encouragement}>
          Keep walking to see your step count increase! 🚶‍♂️
        </Text>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  headerImage: {
    marginTop: 50,
    alignSelf: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  statsContainer: {
    width: "100%",
    marginBottom: 30,
  },
  statItem: {
    backgroundColor: "#f5f5f5",
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statLabel: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
    textAlign: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
    textAlign: "center",
  },
  encouragement: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
    lineHeight: 24,
  },
});
