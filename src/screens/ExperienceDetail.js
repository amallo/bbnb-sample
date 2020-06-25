import React from "react"

import { View, Text } from 'react-native'


function ExperienceDetail(props) {
    const { route } = props
    return <View style={{ flex: 1 }}><Text>{`Experience detail ${route.params.title}`}</Text></View>
}


export default ExperienceDetail