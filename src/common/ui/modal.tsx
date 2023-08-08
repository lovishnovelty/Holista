import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Modal from 'react-native-modal';
import normalize from 'react-native-normalize';
import withTheme from '../../hoc/withTheme';
import {Button} from './button';
import {color, commonStyle, theme, app_theme} from '../../assets';
interface PopupPropType {
  attribute: any;
  theme: any;
  children: any;
  show: boolean;
  popupVisibility: any;
  headerTitle?: string;
  handleButtonClick: (val: boolean) => void;
  leftButtonTitle?: string;
  rightButtonTitle?: string;
}

const ModalScreen = (props: PopupPropType) => {
  const {children, popupVisibility, handleButtonClick, attribute} = props;

  return (
    <Modal isVisible={props.show} style={styles.buttonModal}>
      <View style={styles.modalContent}>
        {props.headerTitle !== undefined && (
          <View
            style={[
              styles.header,
              {
                backgroundColor: props.theme.dark
                  ? color.darkBlack
                  : color.greyLightest,
              },
            ]}>
            <Text
              style={{
                fontSize: normalize(theme.size.md),
                color: props.theme.dark ? color.white : color.black,
              }}>
              {props.headerTitle}
            </Text>
          </View>
        )}
        {children}
        <View style={[styles.footer]}>
          <Button
            onPress={() => {
              popupVisibility({...attribute, showModal: false});
              handleButtonClick(false);
            }}
            buttonWrapper={styles.cancelBtn}
            buttonTextStyle={{
              fontSize: normalize(theme.size.base),
              color: color.black,
            }}
            title={props.leftButtonTitle ?? 'Cancel'}
            buttonStyle={commonStyle.bggrey}
          />
          <Button
            onPress={() => {
              popupVisibility({...attribute, showModal: false});
              handleButtonClick(true);
            }}
            buttonWrapper={styles.agreeBtn}
            buttonTextStyle={{
              fontSize: normalize(theme.size.base),
              color: app_theme.primary_color,
            }}
            title={props.rightButtonTitle ?? 'Setup'}
            buttonStyle={commonStyle.bggrey}
          />
        </View>
      </View>
    </Modal>
  );
};

const CustumModal = withTheme(ModalScreen);

export {CustumModal};

const styles = StyleSheet.create({
  modalContent: {
    height: '30%',
    justifyContent: 'flex-start',
    borderRadius: 3,
    zIndex: 100,
    width: '100%',
  },
  modalWrapper: {
    flex: 1,
    flexDirection: 'column',
  },
  buttonModal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  header: {
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(20),
    borderTopEndRadius: 3,
    borderTopStartRadius: 3,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: color.greyLightest,
    paddingTop: normalize(5),
  },
  cancelBtn: {
    width: 100,
  },
  agreeBtn: {
    width: 100,
  },
});
