import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [Qr, setQr] = useState('');
  const [iScanned, setIscanned] = useState(false);
  
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned =({ type, data }) => {
    setIscanned(true);
    setQr(data);
  };

  const Copy = () => {
    Clipboard.setStringAsync(Qr);
  };

  const ScanAgain = () => {
    setIscanned(false);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="data-matrix-scan" size={50} color="#7b68ee" />
        <Text style={styles.headerText}>Scan your QR code</Text>
      </View>
      {!iScanned && (
        <>
        <MaterialCommunityIcons style={styles.scannerIcon} name="scan-helper" size={200} color="black" />
          <BarCodeScanner
            onBarCodeScanned={iScanned ? undefined : handleBarCodeScanned}
            style={styles.barcodeScanner}
          />
        </>
      )}
      {iScanned && (
        <View style={styles.resultContainer}>
           <Text style={{color:"#7b68ee",fontWeight:"bold",marginBottom:50,fontSize:30}}>Copy Your Code</Text>
          <SafeAreaView style={styles.qrResult}>
            <Text style={styles.qrText}>{Qr}</Text>
            <TouchableOpacity onPress={Copy}>
              <Feather name="copy" size={24} color="#7b68ee" />
            </TouchableOpacity>
          </SafeAreaView>
          <TouchableOpacity style={styles.scanAgainButton} onPress={ScanAgain}>
            <MaterialIcons name="qr-code-scanner" size={50} color="#00fa9a" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fffa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    marginLeft: 15,
    color: '#663399',
    fontWeight: 'bold',
    fontSize: 30,
  },
  scannerIcon: {
    position: 'absolute',
    top: '42%',
    zIndex: 1,
    color:"#7b68ee"
  },
  barcodeScanner: {
    height: '80%',
    width: '80%',
  },
  resultContainer: {
    width: '90%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 30,
    height: '50%',
    backgroundColor: '#f0ffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  qrResult: {
    height:'auto',
    width: '100%',
    flexWrap:"wrap",
    flexDirection: 'row',
    backgroundColor: '#e6e6fa',
    padding: 15,
    borderRadius: 20,
    marginBottom: 30,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  qrText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#778899',
  },
  scanAgainButton: {
    marginTop: 30,
  },
});
