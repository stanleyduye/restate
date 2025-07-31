import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { useDebouncedCallback } from "use-debounce";

import icons from "@/constants/icons";
import { SlidersHorizontal } from "lucide-react-native";
import FilterOptions from "./filter-options";

const Search = () => {
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = React.useState<string>(params.query || "");
  const [openFilterModal, setOpenFilterModal] = React.useState<boolean>(false);

  const debouncedSearch = useDebouncedCallback(
    (text: string) => router.setParams({ query: text }),
    500
  );

  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  const onModalClose = () => {
    setOpenFilterModal(false);
  };

  return (
    <View className="flex flex-row items-center justify-between w-full px-5 rounded-lg bg-accent-100 border border-primary-100 mt-5 py-2">
      <View className="flex-1 flex flex-row items-center justify-start z-50">
        <Image source={icons.search} className="size-5" />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search for anything"
          placeholderTextColor="#8C8E98"
          className="text-sm font-rubik text-black ml-2 flex-1 "
        />
      </View>

      <TouchableOpacity onPress={() => setOpenFilterModal(true)}>
        <SlidersHorizontal size={16} color="#8c8e98" />
      </TouchableOpacity>
      <FilterOptions show={openFilterModal} onClose={onModalClose} />
    </View>
  );
};

export default Search;
