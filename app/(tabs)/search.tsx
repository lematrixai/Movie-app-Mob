import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { images } from '@/constants/images'
import MovieCard from '@/components/MovieCard'
import { fetchMovies } from '@/services/api'
import useFetch from '@/services/useFetch'
import { icons } from '@/constants/icons'
import SearchBar from '@/components/SearchBar'
import { updateSearchCount } from '@/services/appwrite'

const search = () => {
const [searchQuery, setSearchQuery] = useState('')

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: fetchMoviesRefetch,
    reset: resetMovies,
  } = useFetch(() => fetchMovies({query: searchQuery}), false);

  useEffect(() => {
    const getMoviesId = setTimeout(async () => {
      if(searchQuery.trim()){
        await fetchMoviesRefetch();
      } else {
        resetMovies();
      }
    }, 500);

   return () => clearTimeout(getMoviesId)

  },[searchQuery])

  useEffect(() => {
    if(movies?.length > 0 && movies?.[0]){
      updateSearchCount(searchQuery, movies[0])
    }
  },[movies])

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className="flex-1 absolute w-full z-0" />
      <FlatList data={movies} renderItem={({ item }) => <MovieCard {...item} />}
      keyExtractor={(item) => item.id.toString()}
      className='px-5'
      numColumns={3}
      columnWrapperStyle={{ justifyContent: 'center', gap: 16, marginVertical: 16 }}
      contentContainerStyle={{ paddingBottom: 100}}
      ListHeaderComponent={
        <>
        <View className='w-full flex-row justify-center mt-20 items-center' >
          <Image source={icons.logo} className='w-20 h-10' />
        </View>
        <View className='my-5'>
          <SearchBar placeholder='Search movies ...' 
          value={searchQuery}
          onChangeText={(text: string) => setSearchQuery(text)}
          />
        </View>
        {moviesLoading && (
          <ActivityIndicator size="large" color="#0000ff" className='my-3'/>
        )}
        {moviesError && (
          <Text className='text-red-500 px-5 my-3'>Error: {moviesError.message}</Text>  // Display error message if API request fails.
        )}

        {
          !moviesLoading && !moviesError && searchQuery.trim() && movies?.length > 0 && (
            <Text className='text-white text-xl font-bold my-5'>Search Results for {' '}
            <Text className='text-darkAccent'>{searchQuery}</Text>
            </Text>
          )
        }
        </>
      }
      ListEmptyComponent={
        !moviesLoading && !moviesError ? (

          <View className='flex justify-center items-center h-[100%]'>
          <Text className='text-center text-gray-500'>
            {searchQuery.trim() ? 'No movies found' : 'Type to start search movie'}
            </Text>
            </View>
        ): null
      }
      />
    </View>
  )
}

export default search