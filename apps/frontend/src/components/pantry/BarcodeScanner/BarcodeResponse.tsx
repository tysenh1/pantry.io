import { fetchItem } from "@/apis/barcodeService";
import { type BarcodeLookupResponse, type GenericNameInfo, type ItemInfo } from "../../../../../shared/types"
import { useState, useEffect } from "react"

export function RenderBarcodeResult({ lastResult, setLastResult, setIsScanning, setIsScannerVisible }: {
  lastResult: BarcodeLookupResponse,
  setLastResult: React.Dispatch<React.SetStateAction<BarcodeLookupResponse | null>>,
  setIsScanning: React.Dispatch<React.SetStateAction<boolean>>,
  setIsScannerVisible: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [selectValue, setSelectValue] = useState(lastResult.genericNames[0].id)

  useEffect(() => {
    console.log("SELECT VALUE", selectValue)
    console.log("LAST RESULT", lastResult)
  }, [selectValue, lastResult])

  const genericNameInput = () => {
    if (lastResult.genericNames.length > 1) {
      return (
        <select onChange={handleSelectChange}>
          {lastResult.genericNames.map(name => (
            <option key={name.id} value={name.id}>
              {name.name}
            </option>
          ))
          }
        </select>
      )
    } else {
      const genericName = lastResult.genericNames[0]
      return (
        // Disabling this for now until I find a way to query the backend for all generic names efficiently
        // Also assuming there is something in the array but I'll deal with that later
        <select onChange={handleSelectChange} disabled={true}>

          <option key={genericName.id} value={genericName.id}>
            {genericName.name}
          </option>
        </select>
      )
    }
  }

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    // @ts-expect-error This page only renders if lastResult isn't null so this can be ignored. Throws more errors if the type isn't marked as possibly null
    setLastResult(prev => ({
      doesItemExist: prev?.doesItemExist,
      item: {
        ...prev?.item,
        [name]: value
      },
      genericNames: prev?.genericNames
      // ...prev,
      // [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (lastResult) {
        // Technically this can be undefined but its sorting through the ids in the genericName array so I don't think it can actually be undefined
        const genericName = lastResult.genericNames.find(item => item.id == selectValue) as GenericNameInfo
        // @ts-expect-error Same reason as above
        setLastResult(prev => ({
          doesItemExist: prev?.doesItemExist,
          item: {
            ...prev?.item,
          },
          genericNames: [genericName]
        }))
        fetchItem({
          ...lastResult.item,
          genericName: genericName
        })
      }
    } catch (err) {
      alert(err)
    }

  }

  const handleSelectChange = (e) => {
    const { value } = e.target

    setSelectValue(value)
  }

  useEffect(() => {
    console.log(lastResult)
  }, [lastResult])
  if (lastResult && lastResult.doesItemExist === false) {
    return (
      <form className="[&>label>input]:border [&>label>input]:border-white" onSubmit={handleSubmit}>
        <label>Generic Name:
          {genericNameInput()}
        </label>
        <label>Barcode:
          <input value={lastResult.item.barcode} name="barcode" onChange={handleTextChange}></input>
        </label>

        <label>Product Name:
          <input value={lastResult.item.productName} name="productName" onChange={handleTextChange} />
        </label>
        <label>Quantity:
          <input value={lastResult.item.unitSize} name="unitSize" onChange={handleTextChange} />
        </label>
        <label>Unit:
          <input value={lastResult.item.unitType} name="unitType" onChange={handleTextChange} />
        </label>
        <button className="bg-white">Submit</button>
      </form>
    )
  } else if (lastResult && lastResult.doesItemExist === true) {
    setIsScanning(false)
    return (
      <div className="absolute w-[400px] h-[400px] top-1/2 left-1/2 border-white border-2 bg-black">

        <p>You now have {lastResult.item.unitSize} {lastResult.item.unitType} of {lastResult.genericNames[0].name} in your pantry!</p>
        <button onClick={() => { setLastResult(null); setIsScannerVisible(false) }} className="cursor-pointer border border-white">Sounds Good</button>
      </div >
    )
  } else {
    return <></>
  }
  // return <div>{Object.entries(lastResult as Item).map((item) => {
  //   return <p>{item}</p>
  // })}</div>
}


