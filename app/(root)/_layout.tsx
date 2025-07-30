import { useGlobalContext } from "@/lib/global-provider";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Dimensions } from "react-native";
import { Redirect, Slot } from "expo-router";
import React, { useState, useEffect } from "react";

export default function AppLayout() {
    const { loading, isLoggedIn } = useGlobalContext();
    const [screenDimensions, setScreenDimensions] = useState(Dimensions.get('window'));

    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window }) => {
            setScreenDimensions(window);
        });

        return () => subscription?.remove();
    }, []);

    if (loading) {
        return (
            <SafeAreaView className="bg-white flex-1 justify-center items-center">
                <ActivityIndicator className="text-primary-300" />
            </SafeAreaView>
        );
    }

    if (!isLoggedIn) return <Redirect href="/sign-in" />;

    return <Slot />;
}
