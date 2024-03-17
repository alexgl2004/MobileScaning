import { Stack } from "expo-router";
import {
  useFonts,
  NotoSansDisplay_400Regular,
  NotoSansDisplay_700Bold,
} from "@expo-google-fonts/noto-sans-display";
import { UserProvider } from "../context/UserContext";
import { OrderProvider } from "../context/OrderContext";

export default function MainStack() {
  const [fontsLoaded, fontError] = useFonts({
    NotoSansDisplay_400Regular,
    NotoSansDisplay_700Bold,
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <OrderProvider>
      <UserProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="login"
            options={{
              //presentation: "modal",
            }}
          />
        </Stack>
      </UserProvider>
    </OrderProvider>
  );
}
