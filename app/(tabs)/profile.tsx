import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { Dimensions } from "react-native"; // For screen height
import { images } from "@/constants/images";

const screenHeight = Dimensions.get("window").height;

const Profile = () => {

  const user = {
    name: "John Doe",
    bio: "Movie enthusiast | Lover of sci-fi and thrillers",
    favoriteMoviesCount: 42,
    avatar: images.profile, 
  };

  return (
    <View className="bg-primary flex-1">
      <ScrollView className="">
   

        {/* Profile Content */}
        <View className="flex-1 justify-center px-10 mt-16"
        style={{ height: screenHeight/2 }}
        > 
          {/* Avatar */}
          <View className="flex items-center">
            <Image
              source={user.avatar}
              className="size-56 rounded-full border-4 border-primary bg-gray-800"
              tintColor="#FFF"
              resizeMode="contain"
            />
          </View>

          {/* User Info */}
          <View className="flex items-center mt-4">
            <Text className="text-white text-2xl font-bold">{user.name}</Text>
            <Text className="text-gray-400 text-base mt-1 text-center">
              {user.bio}
            </Text>
          </View>

          {/* Stats */}
          <View className="flex-row justify-around mt-6">
            <View className="flex items-center">
              <Text className="text-white text-lg font-semibold">
                {user.favoriteMoviesCount}
              </Text>
              <Text className="text-gray-500 text-sm">Favorites</Text>
            </View>
            <View className="flex items-center">
              <Text className="text-white text-lg font-semibold">15</Text>
              <Text className="text-gray-500 text-sm">Reviews</Text>
            </View>
            <View className="flex items-center">
              <Text className="text-white text-lg font-semibold">8</Text>
              <Text className="text-gray-500 text-sm">Watchlist</Text>
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            className="mt-10 bg-red-600 py-3 px-6 rounded-lg"
          >
            <Text className="text-white text-center text-base font-semibold">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;