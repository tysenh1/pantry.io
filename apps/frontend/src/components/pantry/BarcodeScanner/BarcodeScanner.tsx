import { type BarcodeLookupResponse } from '../../../../../shared/types'
import { RenderBarcodeResult } from './BarcodeResponse.tsx'
import { socket } from '../../../lib/socket.ts'

export function BarcodeScanner({ lastResult, setLastResult, isScannerVisible, isLoading, setIsScannerVisible, setIsScanning }: {
  lastResult: BarcodeLookupResponse | null,
  setLastResult: React.Dispatch<React.SetStateAction<BarcodeLookupResponse | null>>,
  isScannerVisible: boolean,
  isLoading: boolean
  setIsScannerVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setIsScanning: React.Dispatch<React.SetStateAction<boolean>>
  // To be implemented when the barcode scanner is triggered off a websocket with a proximity sensor instead of a button
  // socket: Socket
}) {


  return (

    <div className={`relative z-10 bg-black rounded-2xl border-white border t-50% l-50% ${isScannerVisible ? 'block' : 'hidden'}`} >
      <div>
        <button onClick={() => { setIsScannerVisible(false); setIsScanning(false) }} className='border-black p-4'>Close Scanner</button>
        <button onClick={() => { setIsScanning(true); setLastResult(null) }} className='border-black p-4'>Scan Again</button>
      </div>
      <h2>Scanning</h2>
      {/*<div id='reader' className='rounded-bl-2xl rounded-br-2xl'></div> */}
      <input className='border border-white' onKeyDown={(e) => {
        if (e.key == 'Enter') {
          console.log('SUBMITTEINDG', e.currentTarget.value)
          socket.emit('barcode', e.currentTarget.value)
        }
      }} />
      {lastResult && BarcodeResponse({ lastResult, setLastResult, isLoading, setIsScanning, setIsScannerVisible })}
    </div >

  )
}


export function BarcodeResponse({ lastResult, setLastResult, isLoading, setIsScanning, setIsScannerVisible }: {
  lastResult: BarcodeLookupResponse | null,
  setLastResult: React.Dispatch<React.SetStateAction<BarcodeLookupResponse | null>>,
  isLoading: boolean,
  setIsScanning: React.Dispatch<React.SetStateAction<boolean>>,
  setIsScannerVisible: React.Dispatch<React.SetStateAction<boolean>>
}) {
  if (lastResult && !isLoading) {
    return <RenderBarcodeResult lastResult={lastResult} setLastResult={setLastResult} setIsScanning={setIsScanning} setIsScannerVisible={setIsScannerVisible} />
  } else if (isLoading) {
    return <div>LOADINGGGGGGG</div>
  } else {
    return <></>
  }
}


