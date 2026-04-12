import { useEffect, useState } from "react"
import { getAllGenericNames } from "@/apis/pantryService"
import type { PantryGenericNameResponse } from "../../../../shared/types"
import HoverWidget from "../layout/hoverWidget"

export function IngredientQuickAdd({ setIsIngredientQuickAddVisible, isIngredientQuickAddVisible }: {
  setIsIngredientQuickAddVisible: React.Dispatch<React.SetStateAction<boolean>>,
  isIngredientQuickAddVisible: boolean
}) {

  const [genericNameList, setGenericNameList] = useState<PantryGenericNameResponse[] | null>(null)
  const [genericName, setGenericName] = useState()
  const [quantity, setQuantity] = useState<string>('')
  const [unit, setUnit] = useState<string>('')

  const handleNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nameIndex = parseInt(e.target.value)
    setGenericName(genericNameList[nameIndex]?.genericNameId)
  }

  useEffect(() => {
    const fetchGenericNames = async () => {
      const response = await getAllGenericNames()

      setGenericNameList(response.data)
    }

    fetchGenericNames();
  }, [])

  return (
    <HoverWidget isVisible={isIngredientQuickAddVisible}>
      <div className="bg-black border border-white w-2/3 h-2/3 rounded-xl">
        <button onClick={() => setIsIngredientQuickAddVisible(false)} className="bg-white p-2 cursor-pointer rounded-xl m-2">Close Quick Add Form</button>
        <form className="flex flex-col items-center">
          <label className="m-4">
            Item:
            <select onChange={(e) => handleNameChange(e)} defaultValue={''} className="border border-white mr-4">
              <option value={''} disabled>Pick an item...</option>
              {genericNameList?.map((name, nameIndex) => {
                return (
                  <option key={name.id} value={nameIndex}>{name.name}</option>
                )
              })}
            </select>
          </label>
          <label>
            Quantity
            <input
              className="border border-white mr-4"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </label>
          <label>
            <input
              className="border border-white ml-4"
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            />

          </label>
          <button className="border border-white my-4" type="button" onClick={(e) => handleSubmit(e)}>Submit</button>
        </form>

        {isSuccessModalVisible && <SuccessModal />}
      </div>
    </HoverWidget>
  )
}
