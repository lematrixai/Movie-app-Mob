import { View, Text, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import useFetch from '@/services/useFetch'
import { fetchMoviesDetails } from '@/services/api'
import { icons } from '@/constants/icons'

const screenHeight = Dimensions.get("window").height; 
const screenWidth = Dimensions.get("window").width; 


interface MovieInfoProps{
  label: string
  value?: string | number | null;
}
const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className='flex-col items-start justify-center mt-5'>
    <Text className='text-white/75 font-normal text-sm'>{label}</Text>
    <Text className='text-white/75 font-bold text-sm mt-2'>{value || 'N/A'}</Text>
  </View>
)
const SinglePost = () => {
   const { id } = useLocalSearchParams()
   const { data: movie, loading,  } = useFetch(() =>fetchMoviesDetails(id as string))
  return (
    <View className='bg-primary flex-1'>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`}} 
          style={{ width: "100%", height: screenHeight / 2 }} 
          resizeMode='stretch'/>
        </View>
        <View className='flex-col items-start justify-center mt-5 px-5'>
          <Text className='text-xl font-bold text-white'>{movie?.title}</Text>
          <View className='flex-row items-center gap-x-1 mt-2 '>
          <Text className='text-sm text-white/75'>{movie?.release_date?.split('-')[0]}</Text>
          <Text className='text-white/75 text-sm'>{movie?.runtime}m</Text>
          </View>
          <View className='flex-row items-center bg-indigo-950 px-2 py-1 rounded-md gap-x-1 mt-2'>
            <Text className='text-white font-bold text-sm'>
            <Text className='text-yellow-500'>★</Text> {Math.round(movie?.vote_average ?? 0)}/10 </Text>
            <Text className='text-white/75 text-sm'>({movie?.vote_count} votes)</Text>
          </View>
          <MovieInfo label="overview" value={movie?.overview} />
          <MovieInfo label="Genres" value={movie?.genres?.map((g) => g.name).join('-') || 'N/A'} />
          <View className='flex flex-row justify-between w-1/2' style={{ width: screenWidth/2}}>
          <MovieInfo label='Budget' value={`$${Math.round(movie?.budget ?? 0) / 1_000_000} million`} />
          <MovieInfo label='Production' value={`$${Math.round(movie?.revenue ?? 0) / 1_000_000}`} />


          </View>
          <MovieInfo label='Production Companies' value={`$${(movie?.production_companies.map((c) => c.name).join('-') || 'N/A')}`} />
        </View>
    </ScrollView>   
    <TouchableOpacity className='absolute bottom-5 left-0 right-0 mx-5 bg-darkAccent rounded-xl py-3.5 flex flex-row items-center justify-center z-50' onPress={router.back}>
      <Image source={icons.arrow} className='size-5 mr-1 mt-0.5 rotate-180 ' tintColor={"#fff"}/>
      <Text className='text-white font-semibold text-base'>Go Back</Text>
    </TouchableOpacity> 
    </View>
  )
}

export default SinglePost