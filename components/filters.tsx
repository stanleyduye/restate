import { categories } from "@/constants/data";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";

const Filters = () => {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    params.filter || "All"
  );

  const handleCategory = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory("All");
      router.setParams({ filter: "All" });
      return;
    }
    setSelectedCategory(category);
    router.setParams({ filter: category });
  };
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-3 mb-2"
    >
      {categories.map((item, index) => (
        <TouchableOpacity
          className={`flex flex-col items-start mr-4 px-4 py-2 rounded-full ${selectedCategory === item.category ? "bg-primary-300 " : "bg-primary-100 border border-primary-200"}`}
          key={index}
          onPress={() => handleCategory(item.category)}
        >
          <Text
            className={`text-sm ${selectedCategory === item.category ? "text-white font-rubik-bold mt-0.5" : "text-black-300 font-rubik"}`}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Filters;
