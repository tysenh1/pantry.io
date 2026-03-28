import { useEffect, useState, useRef } from 'react';
import { type Socket } from 'socket.io-client';
import { type BarcodeLookupResponse } from '../../../shared/types';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';

export function useScanner(socket: Socket) {
  const [isScanning, setIsScanning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastResult, setLastResult] = useState<BarcodeLookupResponse | null>(null)
  const [isScannerVisible, setIsScannerVisible] = useState<boolean>(false)
  const scannerRef = useRef<Html5Qrcode | null>(null);


  useEffect(() => {
    socket.on('barcode_stream', (content: BarcodeLookupResponse) => {
      setLastResult(content)
      console.log(content)
      setIsLoading(false)
      setIsScannerVisible(true)
    })


    return () => {
      socket.off('barcode_stream')
    }
  }, [])

  useEffect(() => {
    let scanner: Html5Qrcode | null = null;

    const startCamera = async () => {
      if (isScanning && document.getElementById("reader")) {
        scanner = new Html5Qrcode("reader", {
          verbose: false,
          formatsToSupport: [
            // Html5QrcodeSupportedFormats.CODE_128,
            // Html5QrcodeSupportedFormats.EAN_13,
            Html5QrcodeSupportedFormats.UPC_A
          ]
        })
        try {
          await scanner.start(
            { facingMode: "environment" },
            // { fps: 20, qrbox: { width: 300, height: 250 } },
            {
              fps: 20,
              aspectRatio: 1.7777778,

            },
            (text) => {
              socket.emit('barcode', text.padStart(13, "0"))
              setIsScanning(false);
              setIsLoading(false);
              setLastResult(null);
            },
            // (err) => { console.error(err) }
            () => { }
          )
        } catch (err) {
          console.error("Scanner failed to start", err)
        }
      }
    }

    // startCamera();

    return () => {
      if (scanner?.isScanning) {
        scanner.stop().then(() => scanner?.clear())
      }
    }
  }, [isScanning])

  // useEffect(() => {
  //   scannerRef.current = new Html5Qrcode("reader");
  //
  // })

  return { isScanning, setIsScanning, lastResult, setLastResult, isLoading, isScannerVisible, setIsScannerVisible };
}

// function barcodeResponseHandler(item: Item, setItem: React.Dispatch<React.SetStateAction<Item | null>>) {
//   const newItem: Item = {
//     barcode: '',
//     allergens: [],
//     genericName: '',
//     productName: '',
//     unitSize: 0,
//     unitType: ''
//   }
//   for (const [key, value] of Object.entries(item)) {
//     if (value) {
//       // setItem(prev => ({
//       //   ...prev,
//       //   [key]: value
//       // }))
//       newItem[key] = value
//     }
//   }
//   setItem(newItem)
// }
