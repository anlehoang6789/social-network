import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "../constants/theme";
import { hp } from "../helpers/common";

const Input = (props) => {
  return (
    <View
      style={[styles.container, props.containerStyles && props.containerStyles]}
    >
      {props.icon && props.icon}
      <TextInput
        style={{ flex: 1 }}
        placeholderTextColor={theme.colors.textLight}
        ref={props.inputRef && props.inputRef}
        {...props}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: hp(7.2),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.radius.xxl,
    borderColor: theme.colors.text,
    borderWidth: 0.4,
    paddingHorizontal: 18,
    gap: 12,
    borderCurve: "continuous",
  },
});