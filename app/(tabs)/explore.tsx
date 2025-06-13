import { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { DeviceMotion } from "expo-sensors";

interface MotionData {
  acceleration: {
    x: number;
    y: number;
    z: number;
  } | null;
  accelerationIncludingGravity: {
    x: number;
    y: number;
    z: number;
  } | null;
  rotation: {
    alpha: number;
    beta: number;
    gamma: number;
  } | null;
  orientation: number;
}

export default function TabTwoScreen() {
  const [motionData, setMotionData] = useState<MotionData | null>(null);
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [subscription, setSubscription] = useState<any>(null);

  useEffect(() => {
    checkAvailability();
    return () => {
      unsubscribe();
    };
  }, []);

  const checkAvailability = async () => {
    const available = await DeviceMotion.isAvailableAsync();
    setIsAvailable(available);
    
    if (!available) {
      Alert.alert(
        "Sensor no disponible",
        "El sensor DeviceMotion no está disponible en este dispositivo."
      );
    } else {
      subscribe();
    }
  };

  const subscribe = () => {
    DeviceMotion.setUpdateInterval(100); // Update every 100ms
    
    const sub = DeviceMotion.addListener((motionData) => {
      setMotionData(motionData);
    });
    
    setSubscription(sub);
  };

  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const formatValue = (value: number | null | undefined): string => {
    if (value === null || value === undefined) return "N/A";
    return value.toFixed(3);
  };

  const getOrientationText = (orientation: number): string => {
    switch (orientation) {
      case 0: return "Portrait";
      case 90: return "Landscape Left";
      case 180: return "Portrait Upside Down";
      case 270: return "Landscape Right";
      default: return `${orientation}°`;
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="gyroscope"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Device Motion Sensor</ThemedText>
      </ThemedView>
      
      <ThemedText style={styles.description}>
        Datos en tiempo real del sensor de movimiento del dispositivo
      </ThemedText>

      {!isAvailable ? (
        <ThemedView style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>
            ❌ Sensor DeviceMotion no disponible
          </ThemedText>
          <ThemedText style={styles.errorSubtext}>
            Este sensor requiere un dispositivo físico para funcionar correctamente.
          </ThemedText>
        </ThemedView>
      ) : (
        <ThemedView style={styles.dataContainer}>
          {/* Acceleration */}
          <ThemedView style={styles.sensorSection}>
            <ThemedText type="subtitle">🚀 Aceleración (sin gravedad)</ThemedText>
            <ThemedView style={styles.dataGrid}>
              <ThemedView style={styles.dataItem}>
                <ThemedText style={styles.axisLabel}>X:</ThemedText>
                <ThemedText style={styles.axisValue}>
                  {(motionData?.acceleration?.x ?? 0).toFixed(2)} m/s²
                </ThemedText>
              </ThemedView>
              <ThemedView style={styles.dataItem}>
                <ThemedText style={styles.axisLabel}>Y:</ThemedText>
                <ThemedText style={styles.axisValue}>
                  {(motionData?.acceleration?.y ?? 0).toFixed(2)} m/s²
                </ThemedText>
              </ThemedView>
              <ThemedView style={styles.dataItem}>
                <ThemedText style={styles.axisLabel}>Z:</ThemedText>
                <ThemedText style={styles.axisValue}>
                  {(motionData?.acceleration?.z ?? 0).toFixed(2)} m/s²
                </ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>

                     {/* Acceleration Including Gravity */}
           <ThemedView style={styles.sensorSection}>
             <ThemedText type="subtitle">🌍 Aceleración (con gravedad)</ThemedText>
             <ThemedView style={styles.dataGrid}>
               <ThemedView style={styles.dataItem}>
                 <ThemedText style={styles.axisLabel}>X:</ThemedText>
                 <ThemedText style={styles.axisValue}>
                   {(motionData?.accelerationIncludingGravity?.x ?? 0).toFixed(2)} m/s²
                 </ThemedText>
               </ThemedView>
               <ThemedView style={styles.dataItem}>
                 <ThemedText style={styles.axisLabel}>Y:</ThemedText>
                 <ThemedText style={styles.axisValue}>
                   {(motionData?.accelerationIncludingGravity?.y ?? 0).toFixed(2)} m/s²
                 </ThemedText>
               </ThemedView>
               <ThemedView style={styles.dataItem}>
                 <ThemedText style={styles.axisLabel}>Z:</ThemedText>
                 <ThemedText style={styles.axisValue}>
                   {(motionData?.accelerationIncludingGravity?.z ?? 0).toFixed(2)} m/s²
                 </ThemedText>
               </ThemedView>
             </ThemedView>
           </ThemedView>

                     {/* Rotation */}
           <ThemedView style={styles.sensorSection}>
             <ThemedText type="subtitle">🔄 Rotación</ThemedText>
             <ThemedView style={styles.dataGrid}>
               <ThemedView style={styles.dataItem}>
                 <ThemedText style={styles.axisLabel}>Alpha:</ThemedText>
                 <ThemedText style={styles.axisValue}>
                   {(motionData?.rotation?.alpha ?? 0).toFixed(2)}°
                 </ThemedText>
               </ThemedView>
               <ThemedView style={styles.dataItem}>
                 <ThemedText style={styles.axisLabel}>Beta:</ThemedText>
                 <ThemedText style={styles.axisValue}>
                   {(motionData?.rotation?.beta ?? 0).toFixed(2)}°
                 </ThemedText>
               </ThemedView>
               <ThemedView style={styles.dataItem}>
                 <ThemedText style={styles.axisLabel}>Gamma:</ThemedText>
                 <ThemedText style={styles.axisValue}>
                   {(motionData?.rotation?.gamma ?? 0).toFixed(2)}°
                 </ThemedText>
               </ThemedView>
             </ThemedView>
           </ThemedView>

          {/* Orientation */}
          <ThemedView style={styles.sensorSection}>
            <ThemedText type="subtitle">📱 Orientación</ThemedText>
            <ThemedView style={styles.orientationContainer}>
              <ThemedText style={styles.orientationValue}>
                {getOrientationText(motionData?.orientation || 0)}
              </ThemedText>
              <ThemedText style={styles.orientationDegrees}>
                {motionData?.orientation || 0}°
              </ThemedText>
            </ThemedView>
          </ThemedView>

          {/* Info */}
          <ThemedView style={styles.infoSection}>
            <ThemedText style={styles.infoTitle}>ℹ️ Información</ThemedText>
            <ThemedText style={styles.infoText}>
              • Los datos se actualizan cada 100ms
            </ThemedText>
            <ThemedText style={styles.infoText}>
              • Mueve tu dispositivo para ver los cambios
            </ThemedText>
            <ThemedText style={styles.infoText}>
              • La aceleración se mide en metros por segundo cuadrado (m/s²)
            </ThemedText>
            <ThemedText style={styles.infoText}>
              • La rotación se mide en grados (°)
            </ThemedText>
          </ThemedView>
        </ThemedView>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: "center",
    opacity: 0.8,
  },
  errorContainer: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: "rgba(255, 0, 0, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 0, 0, 0.3)",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ff4444",
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: "center",
  },
  dataContainer: {
    gap: 20,
  },
  sensorSection: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  dataGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  dataItem: {
    flex: 1,
    alignItems: "center",
    padding: 8,
  },
  axisLabel: {
    fontSize: 14,
    fontWeight: "600",
    opacity: 0.7,
    marginBottom: 4,
  },
  axisValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#4CAF50",
  },
  orientationContainer: {
    alignItems: "center",
    marginTop: 12,
  },
  orientationValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2196F3",
    marginBottom: 4,
  },
  orientationDegrees: {
    fontSize: 14,
    opacity: 0.7,
  },
  infoSection: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "rgba(33, 150, 243, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(33, 150, 243, 0.3)",
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 4,
  },
});
