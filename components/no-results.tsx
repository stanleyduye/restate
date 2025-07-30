import images from "@/constants/images";
import React from "react";
import { Image, Text, View } from "react-native";

const NoResults = () => {
  return (
    <View className="flex items-center my-5">
      <Image
        source={images.noResult}
        className="w-1/2 h-80"
        resizeMode="contain"
      />
      <Text className="text-2xl font-rubik-bold text-black-300 mt-5">
        No Results
      </Text>
      <Text className="text-base text-black-100 mt-2">
        There are no properties to display.
      </Text>
    </View>
  );
};

export default NoResults;
