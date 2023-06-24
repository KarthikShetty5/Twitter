import Tweet from "../../components/Tweet"
import tweets from "../../assets/data/tweets"
import { useSearchParams } from "expo-router"
import { Text } from 'react-native'

// to capture the id passed when the particular tweet is clicked can be done by renaming the file name with sqaure brackets ... square bracket is for dynamic variable pass

export default function TweetScreen() {
    const { id } = useSearchParams(); //by using this we r fetching the id
    const tweet = tweets.find((t) => t.id === id)
    if (!tweet) {
        return <Text>Tweet {id} not found!</Text>
    }
    return <Tweet tweet={tweet} />
}