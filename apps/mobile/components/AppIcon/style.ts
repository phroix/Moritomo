import {StyleSheet, Platform, StatusBar} from 'react-native';
import {horizontalScale, verticalScale} from '../../assets/styles/scaling';
// import { colors } from '@repo/ui/colors';

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: horizontalScale(5),
  },
  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: horizontalScale(49),
    height: horizontalScale(49),
    // height: verticalScale(60),
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    // color: colors.primary,
  },
});

export default style;
