import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "./constants";

export const globalStyles = StyleSheet.create({
  camera: {
    height:'50%',
    width:'50%'
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.dark,
  },
  p: {
    fontSize: 18,
    color: "#ddd",
    marginBottom: 8,
    fontFamily: FONTS.sansSerif,
  },
  p2: {
    fontSize: 16,
    color: COLORS.grey,
    marginBottom: 8,
    fontFamily: FONTS.sansSerif,
  },
  h1: {
    fontSize: 26,
    color: COLORS.accent,
    marginBottom: 12,
    fontFamily: FONTS.sansSerifBold,
  },
  h2: {
    fontSize: 20,
    color: COLORS.light,
    marginBottom: 8,
    fontFamily: FONTS.sansSerif,
  },
  link: {
    fontSize: 18,
    color: COLORS.accent,
    fontFamily: FONTS.sansSerif,
  },
  linkOrdered: {
    fontSize: 18,
    color: COLORS.primary,
    fontFamily: FONTS.sansSerif,
  },
  linkOrdered80: {
    fontSize: 18,
    color: COLORS.primary,
    fontFamily: FONTS.sansSerif,
    width:"80%",
  },
  button20: {
    color: COLORS.accent,
    fontFamily: FONTS.sansSerif,
    borderWidth: 2,
    borderColor: COLORS.accent,
    borderRadius: 10,
    fontSize: 16,
    padding:5,
//    backgroundColor: COLORS.primary,    
//    backgroundColorRadius: 10,
  },
  button25: {
    width: 80,
    textAlign: 'center',
    color: COLORS.accent,
    fontFamily: FONTS.sansSerif,
    borderWidth: 2,
    borderColor: COLORS.accent,
    borderRadius: 10,
    fontSize: 16,
    padding:5,
//    backgroundColor: COLORS.primary,    
//    backgroundColorRadius: 10,
  },
  viewFlex: {
    flex:1,
    flexDirection: 'row',
    fontSize: 18,
    color: COLORS.grey,
    fontFamily: FONTS.sansSerif,
    borderBottomWidth: 2,
    borderBottomColor: "#444",
    paddingBottom:10,
  },
  input: {
    backgroundColor: COLORS.light,
    color: COLORS.dark,
    padding: 12,
    borderRadius: 6,
    fontFamily: FONTS.sansSerif,
    fontSize: 18,
  },
  buttonNotOrder: {
    height:50, 
    width:'50%',
    alignSelf:"center",
    backgroundColor: "#F17A41",
    color: COLORS.dark,
    padding: 0,
    paddingTop: 14,
    borderRadius: 6,
    fontFamily: FONTS.sansSerif,
    fontSize: 18,
    marginTop: 20
  },
  buttonOrdered: {
    height:50, 
    width:'50%',
    alignSelf:"center",
    backgroundColor: "transparent",
    color: COLORS.dark,
    padding: 0,
    paddingTop: 14,
    borderRadius: 6,
    borderWidth:2,
    borderColor:"#F17A41",
    fontFamily: FONTS.sansSerif,
    fontSize: 18,
    marginTop: 20
  }, 
  buttonOrderText:{
    alignSelf:"center",
    fontSize: 18,
  },
  buttonNotOrderText:{
    alignSelf:"center",
    color: '#333',
    fontSize: 18,
  },
  buttonOrderedText:{
    alignSelf:"center",
    color: "#F17A41",
    fontSize: 18,
  }
});
