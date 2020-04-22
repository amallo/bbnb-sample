import React from 'react'
import { ActivityIndicator } from 'react-native'

/**
 * Sur android il est nécessaire de cacher le ActivityIndicator
 */
export default function Loading(props) {
    const { isLoading } = props
    return isLoading ? <ActivityIndicator size="large" color="#red" animating={true} /> : null
}