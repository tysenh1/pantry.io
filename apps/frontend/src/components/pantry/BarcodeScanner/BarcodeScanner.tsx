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

    (isScannerVisible && <div className={`fixed inset-0 flex items-center justify-center z-50 backdrop-blur-xs`} >
      <div className='bg-black border border-white w-2/3 h-2/3 flex flex-col rounded-xl'>
        <div>
          <button onClick={() => { setIsScannerVisible(false); setIsScanning(false) }} className='bg-white p-2 cursor-pointer rounded-xl m-2'>Close Scanner</button>
          <button onClick={() => { setIsScanning(true); setLastResult(null) }} className='bg-white p-2 cursor-pointer rounded-xl m-2'>Scan Again</button>
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
      </div>
    </div >
    )
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


