import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {secondaryColor} from '../constants/costants';

export default function CustomButton({
  title,
  onPress,
  loading,
  btnStyle,
}: {
  title?: string;
  onPress?: () => void;
  loading?: boolean;
  btnStyle?: StyleProp<ViewStyle>;
}) {
  return (
    <TouchableOpacity style={[styles.button, btnStyle]} onPress={onPress}>
      {loading ? (
        <ActivityIndicator size={22} />
      ) : (
        <Text style={styles.title}>{title || 'submit'}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: secondaryColor,
    marginTop: 30,
    paddingHorizontal: 40,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});
