import { Text, View, ScrollView, Button, Pressable, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from 'expo-camera/next';
//import { Link, router } from "expo-router";
import { globalStyles } from "../../styles/global";
import { Typography } from "../../components/Typography";
import { LoginText } from "../../components/LoginText";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";

export default function HomePage() {

  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [promo, setPromo] = useState('none');
  const [boolOutForPromo, setOutForPromo] = useState(false);

  const { user, setUserPromo, delUserPromo } = useContext(UserContext);
  const header_var = (<Typography variant="heading">Book Order</Typography>);

  useEffect(() => {
    if(user!=null){
      if(user.promoactive==true){
        setOutForPromo(true)
      }else{
        setOutForPromo(false)
      }
      setPromo('none')
    }else{
      setOutForPromo(false)
      setPromo('none')
    }
  },[user]);

  if (!permission){
    //alert('Permisson problem');
    return <></>;
  }

  if ( (permission && !permission.granted) || !permission){
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

  function sendPromo(promo){
    //alert(promo)
    setUserPromo(promo)
  }

  if(user==null){
    return (
      <ScrollView style={globalStyles.container}>
          {header_var}
          <LoginText />
      </ScrollView>
    )

  }else if(promo=='none'){

    return (
      <View style={globalStyles.container}>
          {
            boolOutForPromo===true?(
            <Text>
                You have applied Promo Code now. If You want have another Promo You can:
            </Text>):''
          }
          <Pressable
            onPress={()=>setPromo('')}
            style={globalStyles.button20}
          >
              <Text>
                Scan new Promo code
              </Text>
          </Pressable>
          {boolOutForPromo===true?(
            <>
              <Text>
                Or:
              </Text>
              <Pressable
                  onPress={()=>delUserPromo()}
                  style={globalStyles.button20}
                >
                  <Text>
                    Remove Promo code
                  </Text>
              </Pressable>
            </>):''
          }

      </View>    
    )
  }else if(promo!=''){

//    console.log(promo+100)
    
    return (
        <View style={globalStyles.container}>
              
          <Pressable
            onPress={()=>setPromo('')}
            style={globalStyles.NewScan}
          >
            <Text>
              Rescan
            </Text>
          </Pressable>

          <Text style={globalStyles.PromoText}>{promo}</Text>

          <Pressable
            onPress={()=>sendPromo(promo)}
            style={globalStyles.SendButton}
          >
            <Text>
              Accept Promo code
            </Text>
          </Pressable>

        </View>
      )
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
