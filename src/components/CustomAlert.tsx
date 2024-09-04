import {useEffect} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {screenHeight, screenWidth} from '../constants/costants';

interface CustomAlertProps {
  title?: string;
  isVisible: boolean;
  onHide: () => void;
  type?: string;
  subType?: 'main' | 'secondary';
}

const CustomAlert = ({
  title = '',
  isVisible,
  onHide,
  type = 'success',
  subType,
}: CustomAlertProps) => {
  useEffect(() => {
    if (!isVisible) return;

    const timeoutId = setTimeout(onHide, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isVisible, onHide]);

  if (!isVisible) return null;

  const getTypeColor = () => {
    switch (type) {
      case 'success':
        return '#5cb85c';
      case 'error':
        return '#F32013';
      default:
        return '#5cb85c';
    }
  };

  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        backgroundColor: getTypeColor(),
        bottom: subType === 'main' ? 5 : 5,
      }}
      onPress={onHide}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomAlert;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '90%',
    height: 60,
    zIndex: 99,
    bottom: 5,
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: screenWidth * 0.01,
    marginBottom: screenHeight * 0.02,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
