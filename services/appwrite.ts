import { Client, Account, ID, Databases, Query } from 'react-native-appwrite';

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!
const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_KEY!)

const database = new Databases(client)

export const updateSearchCount = async (query: string, movie: Movie) => {
   
    try {
        
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal('searchTerm',query)
    ])

    if(result.documents.length > 0) {
        const existingMovie = result.documents[0]

        await database.updateDocument(
            DATABASE_ID,
            COLLECTION_ID,
            existingMovie.$id,
            {
                count: existingMovie.count + 1,
            }
        )
    }else {
        await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
            searchTerm: query,
            movie_id: movie.id,
            title: movie.title,
            count: 1,
            poster_url: `http://image.tmdb.org/t/p/w500${movie.poster_path}`
            })
        }
     } catch (error) {
        console.log(error)
        throw new Error('Failed to update search count')
    }

}

export const getTrendingMovie = async (): Promise<TrendingMovie[] | undefined> => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc('count')
        ])
    
        return result.documents as unknown as TrendingMovie[];
        
    } catch (error) {
        console.error(error);
        return undefined;
    }
}
