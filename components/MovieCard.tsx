import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';


const MovieCard = ({ id, poster_path, title, vote_average, release_date }: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : 'https://via.placeholder.com/600x400/1a1a1a/ffffff.png',
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <View>
          <Text className="text-sm font-bold text-white mt-2" numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
          {/* Optional: Add more movie info */}
          <Text className="text-xs text-gray-400">
            {release_date ? release_date.slice(0, 4) : 'N/A'} • ★ {vote_average.toFixed(1)}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;