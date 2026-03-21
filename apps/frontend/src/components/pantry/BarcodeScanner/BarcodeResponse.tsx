import { fetchItem } from "@/apis/barcodeService";
import { type ItemInfo } from "../../../../../shared/types"
import { useState, useEffect } from "react"

export function RenderBarcodeResult({ lastResult, setLastResult }: { lastResult: ItemInfo | null, setLastResult: React.Dispatch<React.SetStateAction<ItemInfo | null>> }) {
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setLastResult(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (lastResult) {
        fetchItem(lastResult)
      }
    } catch (err) {
      alert(err)
    }

  }

  useEffect(() => {
    console.log(lastResult)
  }, [lastResult])
  if (lastResult) {
    return (
      <form className="[&>label>input]:border [&>label>input]:border-white" onSubmit={handleSubmit}>
        <label>Generic Name:
          <select>
            {Array.isArray(lastResult.genericName) &&
              lastResult.genericName.map(name => (
                <option key={name.id} value={name.id}>
                  {name.name}
                </option>
              ))
            }
          </select>
        </label>
        <label>Barcode:
          <input value={lastResult.barcode} name="code" onChange={handleTextChange}></input>
        </label>

        <label>Product Name:
          <input value={lastResult.productName} name="productName" onChange={handleTextChange} />
        </label>
        <label>Quantity:
          <input value={lastResult.unitSize} name="quantity" onChange={handleTextChange} />
        </label>
        <label>Unit:
          <input value={lastResult.unitType} name="unit" onChange={handleTextChange} />
        </label>
        <button className="bg-white">Submit</button>
      </form>
    )
  } else {
    return <></>
  }
  // return <div>{Object.entries(lastResult as Item).map((item) => {
  //   return <p>{item}</p>
  // })}</div>
}


