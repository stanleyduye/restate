import { categories } from "@/constants/data";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { ArrowLeft, Minus, Plus } from "lucide-react-native";
import React, { useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface FilterOptionsProps {
  show: boolean;
  onClose: () => void;
}
const FilterOptions = ({ show, onClose }: FilterOptionsProps) => {
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [priceRange, setPriceRange] = useState<number[]>([1000, 2000]);
  const [buildingRange, setBuildingRange] = useState<number[]>([1300, 3000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategory = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((cat) => cat !== category);
      }
      return [...prev, category];
    });
  };

  const handleCounter = (
    type: "bedrooms" | "bathrooms",
    action: "increment" | "decrement"
  ) => {
    if (type === "bedrooms") {
      setBedrooms((prev) => {
        if (action === "decrement" && prev > 1) return prev - 1;
        if (action === "increment") return prev + 1;
        return prev;
      });
    } else {
      setBathrooms((prev) => {
        if (action === "decrement" && prev > 1) return prev - 1;
        if (action === "increment") return prev + 1;
        return prev;
      });
    }
  };
  const screenWidth = Dimensions.get("window").width;

  const sliderLength = screenWidth - 100;

  return (
    <Modal visible={show} transparent={true} animationType="fade">
      <View className="flex-1 justify-center items-center bg-[#0000004D]">
        <View className="h-4/5 w-full bg-white absolute bottom-0 rounded-tr-3xl rounded-tl-3xl px-3 py-5 flex flex-col gap-10">
          <View className="flex flex-row justify-between items-center">
            <TouchableOpacity
              onPress={onClose}
              className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
            >
              <ArrowLeft size={16} />
            </TouchableOpacity>
            <Text className="text-xl font-rubik-medium">Filter</Text>
            <TouchableOpacity onPress={onClose}>
              <Text className="text-base text-primary-300 font-rubik-medium">
                Reset
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text className="text-xl font-rubik-semibold">Price Range</Text>
            <View className="flex justify-center items-center">
              <MultiSlider
                values={priceRange}
                min={0}
                max={5000}
                step={1}
                onValuesChange={setPriceRange}
                sliderLength={sliderLength}
                selectedStyle={{
                  backgroundColor: "#0061FF",
                  borderWidth: 1,
                  borderColor: "#0061FF",
                }}
                unselectedStyle={{
                  backgroundColor: "#0061FF1A",
                  borderWidth: 1,
                  borderColor: "#0061FF1A",
                }}
                customMarker={({ currentValue }) => (
                  <View className="relative">
                    <View className="absolute bg-white border-primary-300 border-[3px] w-6 h-6 rounded-full -top-3" />
                    <Text className="text-sm font-rubik-semibold text-primary-300 absolute top-5 -left-2">
                      ${currentValue}
                    </Text>
                  </View>
                )}
              />
            </View>
          </View>
          <View className="flex flex-col gap-4">
            <Text className="text-xl font-rubik-semibold">Property Type</Text>
            <View className="flex flex-row flex-wrap justify-start items-center gap-3">
              {categories.map((item, index) => (
                <TouchableOpacity
                  className={`flex flex-col items-start mr-4 px-4 py-2 rounded-full ${
                    selectedCategories.includes(item.category)
                      ? "bg-primary-300"
                      : "bg-primary-100 border border-primary-200"
                  }`}
                  key={index}
                  onPress={() => handleCategory(item.category)}
                >
                  <Text
                    className={`text-sm ${
                      selectedCategories.includes(item.category)
                        ? "text-white font-rubik-bold mt-0.5"
                        : "text-black-300 font-rubik"
                    }`}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View className="flex flex-col gap-2">
            <Text className="text-xl font-rubik-semibold mb-3">
              Home Details
            </Text>
            <View className="flex flex-row justify-between items-center">
              <Text className="font-rubik-medium text-lg text-black-200">
                Bedrooms
              </Text>
              <View className="flex flex-row items-center gap-3">
                <Pressable
                  className="flex flex-row bg-[#0061FF0A] rounded-full size-8 items-center justify-center"
                  onPress={() => handleCounter("bedrooms", "decrement")}
                >
                  <Minus color="#0061FF" size={16} strokeWidth={3} />
                </Pressable>
                <Text className="font-rubik-bold text-lg">{bedrooms}</Text>
                <Pressable
                  className="flex flex-row bg-[#0061FF0A] rounded-full size-8 items-center justify-center"
                  onPress={() => handleCounter("bedrooms", "increment")}
                >
                  <Plus color="#0061FF" size={16} strokeWidth={3} />
                </Pressable>
              </View>
            </View>
            <View className="flex flex-row justify-between items-center">
              <Text className="font-rubik-medium text-lg text-black-200">
                Bathrooms
              </Text>
              <View className="flex flex-row items-center gap-3">
                <Pressable
                  className="flex flex-row bg-[#0061FF0A] rounded-full size-8 items-center justify-center"
                  onPress={() => handleCounter("bathrooms", "decrement")}
                >
                  <Minus color="#0061FF" size={16} strokeWidth={3} />
                </Pressable>
                <Text className="font-rubik-bold text-lg">{bathrooms}</Text>
                <Pressable
                  className="flex flex-row bg-[#0061FF0A] rounded-full size-8 items-center justify-center"
                  onPress={() => handleCounter("bathrooms", "increment")}
                >
                  <Plus color="#0061FF" size={16} strokeWidth={3} />
                </Pressable>
              </View>
            </View>
          </View>
          <View>
            <Text className="text-xl font-rubik-semibold">Building Size</Text>
            <View className="flex justify-center items-center">
              <MultiSlider
                values={buildingRange}
                min={0}
                max={5000}
                step={1}
                onValuesChange={setBuildingRange}
                sliderLength={sliderLength}
                selectedStyle={{
                  backgroundColor: "#0061FF",
                  borderWidth: 1,
                  borderColor: "#0061FF",
                }}
                unselectedStyle={{
                  backgroundColor: "#0061FF1A",
                  borderWidth: 1,
                  borderColor: "#0061FF1A",
                }}
                customMarker={({ currentValue }) => (
                  <View className="relative ">
                    <View className="absolute bg-white border-primary-300 border-[3px] w-6 h-6 rounded-full -top-3" />
                    <Text className="text-sm font-rubik-semibold text-primary-300 absolute top-5 -left-2">
                      {currentValue}
                    </Text>
                  </View>
                )}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={onClose}
            className="bg-primary-300 shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5 flex flex-row justify-center"
          >
            <Text className="text-lg font-rubik-semibold text-white">
              Set Filter
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FilterOptions;
