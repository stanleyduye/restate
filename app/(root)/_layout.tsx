import { useGlobalContext } from "@/lib/global-provider";
import { Redirect, Slot } from "expo-router";
import React from "react";
import { ActivityIndicator, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppLayout() {
  const { loading, isLoggedIn } = useGlobalContext();

  if (loading) {
    return (
      <>
        <SafeAreaView className="flex-1 justify-center items-center">
          <StatusBar
            hidden={false}
            barStyle="dark-content"
            networkActivityIndicatorVisible={true}
            translucent={false}
            animated={true}
          />
          <ActivityIndicator className="text-primary-300" />
        </SafeAreaView>
      </>
    );
  }

  if (!isLoggedIn) return <Redirect href="/sign-in" />;

  return <Slot />;
}
