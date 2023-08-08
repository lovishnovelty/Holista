import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme, app_theme } from '../../assets/theme';
import normalize from 'react-native-normalize';

const ErrorMessage = ({ errorValue, style }: { errorValue: any, style: any }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.errorText, style]}>{errorValue}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    marginBottom: normalize(6),
    paddingHorizontal: normalize(5),
  },
  errorText: {
    color: app_theme.warning,
    fontSize: theme.size.md,
  }
})

export { ErrorMessage }