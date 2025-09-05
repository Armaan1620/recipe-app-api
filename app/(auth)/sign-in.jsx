import { useSignIn } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import {Image} from "expo-image"
import { View,Text,Alert, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { Ionicons } from "@expo/vector-icons"
import {authStyles} from "../../assets/styles/auth.styles"
import { COLORS } from '../../constants/colors'

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword , setShowPassword] = useState(false)
  const [loading , setLoading] = useState(false);

  const handleSignIn = async () => {
    if(!email || !password){
      Alert.alert("Error" , "Please fill in all the fields")
      return 
    }
  
    if (!isLoaded) return

    setLoading(true)
    try {
      const signInAttempt = await signIn.create({
        identifier: email,  
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        
      } else {
        Alert.alert("Error" , "Sign in failed. Please try again")
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      Alert.alert("Error" , err.errors?.[0]?.message || "Sign in failed")
      console.error(JSON.stringify(err, null, 2))
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <View style={authStyles.container}>
      <KeyboardAvoidingView
      style = {authStyles.keyboardView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >

        <ScrollView
        contentContainerStyle={authStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        >

          <View style = {authStyles.imageContainer}>
            <Image
            source={require("../../assets/images/i1.png")}
            style={authStyles.image}
            contentFit="contain"
            />
            
          </View>

          <Text style ={authStyles.title}>Welcome Back</Text>

          <View style={authStyles.formContainer}>
            <View style={authStyles.inputContainer}>
              <TextInput
              style={authStyles.textInput}
              placeholder="Enter email"
              placeholderTextColor={COLORS.textLight}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              />
            </View>

            <View style={authStyles.inputContainer}>
              <TextInput
              style={authStyles.textInput}
              placeholder="Enter password"
              placeholderTextColor={COLORS.textLight}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              />
              <TouchableOpacity
              style={authStyles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color={COLORS.textLight}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
            style={[authStyles.authButton , loading && authStyles.buttonDisabled]}
            onPress={handleSignIn}
            disabled={loading}
            activeOpacity={0.8}
            >
              <Text style={authStyles.buttonText}>{loading ? "Signing In..." : "Sign In"}</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={authStyles.linkContainer}
            onPress={() => router.push("/(auth)/sign-up")}
            >
              <Text style = {authStyles.linkText}>
                Dont have an account ? <Text style ={authStyles.link}>Sign up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

      </KeyboardAvoidingView>
    </View>
  )
}