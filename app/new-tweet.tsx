import { Link, useRouter } from 'expo-router'
import { useState } from 'react'
import { View, StyleSheet, Text, Image, TextInput, Pressable, SafeAreaView, ActivityIndicator } from 'react-native'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTweetsApi } from '../lib/api/tweets'

const user = {
    id: 'u1',
    username: 'VadimNotJustDev',
    name: 'Vadim',
    image:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.png',
}

export default function newTweet() {
    const [text, setText] = useState("");
    const router = useRouter();
    const { createTweet } = useTweetsApi();
    const queryClient = useQueryClient();

    const { mutateAsync, isLoading, isError, error } = useMutation({
        mutationFn: createTweet,
        onSuccess: (data) => {
            // queryClient.invalidateQueries({ queryKey: ['tweets'] }) //to add the new tweet and display it as fast as possible
            queryClient.setQueriesData(['tweets'], (existingTweets) => [data, ...existingTweets])
        }
    });

    const onTweetPress = async () => {
        try {
            mutateAsync({ content: text });
            setText("");
            router.back();
        } catch (e) {
            console.log("Error:", e.message)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 18 }}>
            <View style={styles.container}>

                <View style={styles.buttonContainer}>
                    {/* buttons */}
                    <Link href="../" style={{ fontSize: 18 }}>Cancel</Link>
                    {isLoading && < ActivityIndicator />}
                    <Pressable onPress={onTweetPress} style={styles.button}>
                        <Text style={styles.buttonText}>Tweet</Text>
                    </Pressable>
                </View>

                <View style={styles.inputContainer}>
                    <Image src={user.image} style={styles.image} />
                    <TextInput
                        value={text}
                        onChangeText={setText}
                        placeholder="Whats happening"
                        multiline
                        numberOfLines={1}
                        style={{ flex: 1 }} />
                </View>
                {isError && <Text>Error:{error.message}</Text>}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#1C9BF0',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 50
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
    },
    image: {
        width: 50,
        aspectRatio: 1,
        borderRadius: 50,
        marginRight: 10,
    }
})