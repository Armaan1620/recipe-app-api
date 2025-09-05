import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLORS } from '@/constants/colors'
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const SafeScreen = ({ children }: LayoutProps) => {
  const insets = useSafeAreaInsets()
  return (
    <View style={{paddingTop : insets.top , flex : 1 , backgroundColor : COLORS.background }}>
      {children}
    </View>
  )
}

export default SafeScreen

const styles = StyleSheet.create({})