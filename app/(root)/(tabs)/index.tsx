import { Card, EstateItem, FeaturedCard } from "@/components/cards";
import Filters from "@/components/filters";
import NoResults from "@/components/no-results";
import Search from "@/components/search";
import icons from "@/constants/icons";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { useAppwrite } from "@/lib/useAppWrite";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useGlobalContext();

  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const { data: latestProperties, loading: loadingLatestProperties } =
    useAppwrite({ fn: getLatestProperties });

  const {
    data: properties,
    loading,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.filter, params.query]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={properties || []}
        renderItem={({ item }) => {
          const estateItem: EstateItem = {
            $id: item.$id,
            $sequence: item.$sequence,
            $collectionId: item.$collectionId,
            $databaseId: item.$databaseId,
            $createdAt: item.$createdAt,
            $updatedAt: item.$updatedAt,
            $permissions: item.$permissions,
            image: item.image,
            name: item.name,
            address: item.address,
            price: item.price,
          };
          return (
            <Card item={estateItem} onPress={() => handleCardPress(item.$id)} />
          );
        }}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="small" className="text-primary-300 mt-5" />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row items-center">
                <Image
                  source={{ uri: user?.avatar }}
                  className="size-12 rounded-full border border-primary-200 bg-primary-200"
                />
                <View className="flex flex-col items-start ml-2 justify-center">
                  <Text className="text-sm font-rubik text-black-100">
                    {getGreeting()}
                  </Text>
                  <Text className="text-lg font-rubik-medium text-black-300">
                    {user?.name}
                  </Text>
                </View>
              </View>
              <Image source={icons.bell} className="size-6" />
            </View>
            <Search />
            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-100">
                  Featured
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
              {loadingLatestProperties ? (
                <ActivityIndicator size="small" className="text-primary-300" />
              ) : !latestProperties || latestProperties.length === 0 ? (
                <NoResults />
              ) : (
                <FlatList
                  data={latestProperties || []}
                  renderItem={({ item }) => {
                    const estateItem: EstateItem = {
                      $id: item.$id,
                      $sequence: item.$sequence,
                      $collectionId: item.$collectionId,
                      $databaseId: item.$databaseId,
                      $createdAt: item.$createdAt,
                      $updatedAt: item.$updatedAt,
                      $permissions: item.$permissions,
                      image: item.image,
                      name: item.name,
                      address: item.address,
                      price: item.price,
                    };
                    return (
                      <FeaturedCard
                        item={estateItem}
                        onPress={() => handleCardPress(item.$id)}
                      />
                    );
                  }}
                  keyExtractor={(item) => item.$id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  bounces={false}
                  contentContainerClassName="flex gap-5 mt-5"
                />
              )}
            </View>
            <View className="flex flex-row items-center justify-between">
              <Text className="text-xl font-rubik-bold text-black-100">
                Our Recommendation
              </Text>
              <TouchableOpacity>
                <Text className="text-base font-rubik-bold text-primary-300">
                  See All
                </Text>
              </TouchableOpacity>
            </View>
            <Filters />
          </View>
        }
      />
    </SafeAreaView>
  );
}
