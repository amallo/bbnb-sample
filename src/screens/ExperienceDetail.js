import React from "react"

import { View, Text, TouchableOpacity } from 'react-native'
import { localNotification, scheduleLocalNotification } from "../services"
class ExperienceDetail extends React.Component {
    bookNow = (experienceTitle) => {
        localNotification({
            title: "Book confirmed, congratulations!",
            message: `You just booked ${experienceTitle}`
        })
    }
    scheduleBooking = (experienceTitle) => {
        scheduleLocalNotification({
            title: "Book confirmed, congratulations!",
            message: `You booked a time ago ${experienceTitle}`,
            date: new Date(Date.now() + (5 * 60) * 1000),
        })
    }
    render() {
        const { route } = this.props
        return (
            <View style={{ flex: 1 }}>
                <Text style={{ margin: 12, fontSize: 24 }}>{`Experience detail ${route.params.title}`}</Text>
                <TouchableOpacity onPress={() => this.bookNow(route.params.title)} style={{ backgroundColor: 'blue', margin: 12, padding: 12 }} >
                    <Text style={{ color: 'white', textAlign: 'center' }}>Book now !</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.scheduleBooking(route.params.title)} style={{ backgroundColor: 'gray', margin: 12, padding: 12 }} >
                    <Text style={{ color: 'white', textAlign: 'center' }}>Book in 5 minutes</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


export default ExperienceDetail