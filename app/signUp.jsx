import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import BackButton from "../components/BackButton";
import { useRouter } from "expo-router";
import { theme } from "../constants/theme";
import { hp, wp } from "../helpers/common";
import Input from "../components/Input";
import Icon from "../assets/icons";
import Button from "../components/Button";
import { supabase } from "../lib/supabase";

const SignUp = () => {
  const router = useRouter();
  const emailRef = useRef("");
  const nameRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);
  const onSubmit = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert(
        "Đăng ký",
        "Vui lòng nhập tất cả các thông tin cần thiết để đăng ký"
      );
      return;
    }

    let name = nameRef.current.trim();
    let email = emailRef.current.trim();
    let password = passwordRef.current.trim();

    setLoading(true);

    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });
    setLoading(false);

    // console.log("session: ", session);
    // console.log("error: ", error);
    if (error) {
      Alert.alert("Sign Up", error.message);
    }
  };
  return (
    <ScreenWrapper bg="white">
      <StatusBar style="dark" />
      <View style={styles.container}>
        <BackButton router={router} />

        {/* welcome text */}
        <View>
          <Text style={styles.welcomeText}>Hãy bắt đầu,</Text>
          <Text style={styles.welcomeText}>
            Với một tài khoản mới ngay nào!
          </Text>
        </View>

        {/* form */}
        <View style={styles.form}>
          <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
            Hãy điền thông tin chi tiết bên dưới để đăng ký tài khoản mới
          </Text>
          <Input
            icon={<Icon name={"mail"} size={26} strokeWidth={1.6} />}
            placeholder="Nhập email của bạn"
            onChangeText={(value) => (emailRef.current = value)}
          />
          <Input
            icon={<Icon name={"user"} size={26} strokeWidth={1.6} />}
            placeholder="Nhập tên của bạn"
            onChangeText={(value) => (nameRef.current = value)}
          />
          <Input
            icon={<Icon name={"lock"} size={26} strokeWidth={1.6} />}
            placeholder="Nhập mật khẩu của bạn"
            secureTextEntry
            onChangeText={(value) => (passwordRef.current = value)}
          />

          <Button title="Đăng ký" loading={loading} onPress={onSubmit} />
        </View>

        {/* footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Bạn đã có tài khoản?</Text>
          <Pressable onPress={() => router.push("login")}>
            <Text
              style={[
                styles.footerText,
                {
                  color: theme.colors.primaryDark,
                  fontWeight: theme.fonts.semiBold,
                },
              ]}
            >
              Đăng nhập
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: wp(5),
  },
  welcomeText: {
    fontSize: hp(4),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
  },
  form: {
    gap: 25,
  },
  forgotPassword: {
    textAlign: "right",
    color: theme.colors.text,
    fontWeight: theme.fonts.semiBold,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    color: theme.colors.text,
    fontSize: hp(1.6),
  },
});
