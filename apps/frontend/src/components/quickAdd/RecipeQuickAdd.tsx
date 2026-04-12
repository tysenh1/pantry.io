import { useEffect, useState } from "react"
import { getAllGenericNames, quickAdd } from "@/apis/pantryService"
import type { ItemInfo, PantryGenericNameResponse } from "../../../../shared/types"
import HoverWidget from "../layout/hoverWidget"

export function IngredientQuickAdd({ setIsIngredientQuickAddVisible, isIngredientQuickAddVisible }: {
  setIsIngredientQuickAddVisible: React.Dispatch<React.SetStateAction<boolean>>,
  isIngredientQuickAddVisible: boolean
}) {

  const [genericNameList, setGenericNameList] = useState<PantryGenericNameResponse[]>([])
  const [genericNameIndex, setGenericNameIndex] = useState<string>('')
  const [quantity, setQuantity] = useState<string>('')
  const [unit, setUnit] = useState<string>('')
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)

  const handleNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGenericNameIndex(e.target.value)
    const nameIndex = parseInt(e.target.value)
    const genericName = genericNameList[nameIndex]

    setUnit(genericName.primaryUnit)
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      if (
        genericNameIndex === ''
        && quantity === ''
        && unit === ''
      ) {
        throw new Error('All fields must have values.')
      }

      const genericName = genericNameList[parseInt(genericNameIndex)]

      const item: Partial<ItemInfo> = {
        genericName: {
          id: genericName.genericNameId,
          name: genericName.name
        },
        unitSize: parseInt(quantity),
        unitType: unit
      }

      await quickAdd(item)
      setIsSuccessModalVisible(true)
    } catch (err) {
      alert(err)
    }
  }

  useEffect(() => {
    const fetchGenericNames = async () => {
      const response = await getAllGenericNames()

      setGenericNameList(response.data)
    }

    fetchGenericNames();
  }, [])

  const SuccessModal = () => {
    return (
      <div className="fixed bg-black border border-white w-1/3 h-1/3 flex flex-col rounded-xl items-center justify-center">
        <h2 className="text-3xl font-bold">Success!</h2>
        <p>{genericNameList[parseInt(genericNameIndex)].name} has been added to the database!</p>
        <button onClick={() => setIsIngredientQuickAddVisible(false)} className="bg-white cursor-pointer rounded-xl p-2 m-2">Continue</button>
      </div>
    )
  }

  return (
    <HoverWidget isVisible={isIngredientQuickAddVisible}>
      <div className="bg-black border border-white w-2/3 h-2/3 rounded-xl">
        <button onClick={() => setIsIngredientQuickAddVisible(false)} className="bg-white p-2 cursor-pointer rounded-xl m-2">Close Quick Add Form</button>
        <form className="flex flex-col items-center">
          <label className="m-4">
            Item:
            <select onChange={(e) => handleNameChange(e)} value={genericNameIndex} className="border border-white mr-4">
              <option value={''} disabled>Pick an item...</option>
              {genericNameList?.map((name, nameIndex) => {
                return (
                  <option key={name.genericNameId} value={nameIndex}>{name.name}</option>
                )
              })}
            </select>
          </label>
          <label>
            Quantity:
            <input
              className="border border-white mr-4"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </label>
          <label>
            Unit:
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
