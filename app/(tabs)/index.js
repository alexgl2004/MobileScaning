import { Text, View, ScrollView, Button, Pressable, TouchableOpacity } from "react-native";
import { Link, router } from "expo-router";
import { globalStyles } from "../../styles/global";
import { COLORS } from "../../styles/constants";
import { Typography } from "../../components/Typography";
import { LoginText } from "../../components/LoginText";
import { StyledButton } from "../../components/StyledButton";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { CameraView, useCameraPermissions } from 'expo-camera/next';

export default function HomePage() {

  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [promo, setPromo] = useState('');
  

  if (!permission){
    alert('Permisson problem');
    return <></>;
  }

  if (!permission.granted){
    return (
      <View style={globalStyles.container}>
        <Text>Camera permission is required</Text>
        <Pressable
          title="Request permission"
          onPress={requestPermission}
          style={{
            backgroundColor: "#fff",
            height: 60,
            width: 200,
            borderRadius: 7,
            color: "#000",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  function handlePromoCode(data){
    //console.log(data.data);
    if(data.data){
      setPromo(data.data);
    }    
  }

  const { user } = useContext(UserContext);
 // console.log("user", user);
  const header_var = (<Typography variant="heading">Book Order</Typography>);

  if(user==null){
    return (
      <ScrollView style={globalStyles.container}>
          {header_var}
          <LoginText />
      </ScrollView>
    )
  }else if(promo!=''){

    console.log(promo+100)
    
    return <><Text>{promo}</Text>
            <Pressable
                onPress={()=>setPromo('')}
                style={globalStyles.button20}
              >
                <Text>
                  Rescan
                </Text>
              </Pressable>
            </>
  }else{
//    console.log("user", user);
    return (
      <View style={globalStyles.container}>
        <CameraView style={globalStyles.camera} facing={facing} barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }} onBarcodeScanned={handlePromoCode}>
          <View style={globalStyles.buttonContainer}>
            <TouchableOpacity style={globalStyles.button} onPress={toggleCameraFacing}>
              <Text style={globalStyles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    );
  }
}
/*
            <Link asChild style={globalStyles.link} href="actors">
                <Button color={COLORS.accent} title="Select Author" />
            </Link>
*/            
