import Tweet from "../../../../../components/Tweet"
import { useSearchParams } from "expo-router"
import { ActivityIndicator, Text } from 'react-native'
import { useQuery } from "@tanstack/react-query"
import { useTweetsApi } from "../../../../../lib/api/tweets"

// to capture the id passed when the particular tweet is clicked can be done by renaming the file name with sqaure brackets ... square bracket is for dynamic variable pass

export default function TweetScreen() {
    const { getTweet } = useTweetsApi();
    const { id } = useSearchParams(); //by using this we r fetching the id

    const { data, isLoading, error } = useQuery({
        queryKey: ['tweet', id], //to uniquely identify and tweets with different ids are cahced
        queryFn: () => getTweet(id as string)
    })

    if (isLoading) {
        return <ActivityIndicator />
    }

    if (error) {
        return <Text>Tweet {id} not found</Text>
    }

    return <Tweet tweet={data} />
}