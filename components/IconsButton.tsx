import { View, Image, Text, StyleSheet } from "react-native"
import { EvilIcons } from '@expo/vector-icons'
import React from "react"

type IconButtonProps = {
    icon: React.ComponentProps<typeof EvilIcons>['name']
    // icons should be same type of  as name property of evil icon ... it returns all the property but we specifically want one of what "name" has
    text?: string | number;
}

// Reusable icons and buttons
const IconButton = ({ icon, text }: IconButtonProps) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
            {/* icons */}
            <EvilIcons name={icon} size={22} color="gray" />
            {/* number */}
            <Text style={{ fontSize: 12, color: 'gray' }}>{text}</Text>
        </View>
    )
}

export default IconButton;