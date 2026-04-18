import { useEffect, useState } from "react"
import { type PantryGenericNameResponse, type Recipe, type RecipeIngredients } from "../../../../shared/types"
import { addRecipe } from "@/apis/recipeService"
import { getAllGenericNames } from "@/apis/pantryService"
import HoverWidget from "../layout/hoverWidget"


export function RecipeForm({ setIsRecipeFormVisible, isRecipeFormVisible }: {
  setIsRecipeFormVisible: React.Dispatch<React.SetStateAction<boolean>>,
  isRecipeFormVisible: boolean
}) {
  const [name, setName] = useState('')
  const [instructions, setInstructions] = useState('')
  const [tags, setTags] = useState('')
  const [ingredientInputList, setIngredientInputList] = useState<RecipeIngredients[]>([{ recipe_id: '', pantry_id: '', quantity_needed: 0, unit: '' }])
  const [genericNames, setGenericNames] = useState<PantryGenericNameResponse[] | null>(null)
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)

  const handleQuantityChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newInputs = [...ingredientInputList]
    newInputs[index].quantity_needed = parseInt(event.target.value);
    setIngredientInputList(newInputs)
  }

  const handleUnitChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newInputs = [...ingredientInputList]
    newInputs[index].unit = event.target.value
    setIngredientInputList(newInputs)
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {

      if (
        name === ''
        && instructions === ''
      ) {
        throw new Error('Name and Instructions fields cannot be empty.')
      }

      for (const ingredient of ingredientInputList) {
        if (
          ingredient.unit === ''
          && ingredient.unit === ''
          && ingredient.quantity_needed === 0
        ) {
          throw new Error('Ingredients must have each input filled.')
        }
      }

      const recipe: Recipe = {
        name: name,
        instructions: instructions,
        tags: tags,
        ingredients: ingredientInputList
      }
      addRecipe(recipe)
      setIsSuccessModalVisible(true)

    } catch (err) {
      alert(err)
    }
  }

  const SuccessModal = () => {
    return (
      <div className="fixed bg-black border border-white w-1/3 h-1/3 flex flex-col rounded-xl items-center justify-center">
        <h2 className="text-3xl font-bold">Success!</h2>
        <p>{name} has been added to the database!</p>
        <button onClick={() => setIsRecipeFormVisible(false)} className="bg-white cursor-pointer rounded-xl p-2 m-2">Continue</button>
      </div>
    )
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const newInputs = [...ingredientInputList]
    const nameIndex = parseInt(e.target.value)
    // @ts-ignore
    newInputs[index].unit = genericNames[nameIndex].primary_unit
    // @ts-ignore
    newInputs[index].id = genericNames[nameIndex].pantryId
    setIngredientInputList(newInputs)
  }

  useEffect(() => {
    const fetchGenericNames = async () => {
      const response = await getAllGenericNames()

      setGenericNames(response.data)
    }

    fetchGenericNames();
  }, [])

  return (
    <HoverWidget isVisible={isRecipeFormVisible}>
      <div className="bg-black border border-white w-2/3 h-2/3 rounded-xl">
        <button onClick={() => setIsRecipeFormVisible(false)} className="bg-white p-2 cursor-pointer rounded-xl m-2">Close Recipe Form</button>
        <form className="flex flex-col items-center">
          <label>Name:
            <input className="border border-white" onChange={(e) => setName(e.target.value)} value={name} />
          </label>
          <label>Instructions:
            <textarea className="border border-white resize-none" onChange={(e) => setInstructions(e.target.value)} value={instructions} />
          </label>
          <label>Tags:
            <input className="border border-white" onChange={(e) => setTags(e.target.value)} value={tags} />
          </label>
          <h2 className="self-center my-4">Ingredients</h2>
          {ingredientInputList.map((input, index) => (
            <label key={index} className="m-4">
              Ingredient {index + 1}:
              <select onChange={(e) => handleNameChange(e, index)} defaultValue={''} className="border border-white mr-4">
                <option value={''} disabled>Pick an ingredient...</option>
                {genericNames?.map((name, nameIndex) => {
                  return (
                    <option key={name.pantryId} value={nameIndex}>{name.name}</option>
                  )
                })}
              </select>
              <input
                className="border border-white mr-4"
                type="number"
                value={input.quantity_needed}
                onChange={(e) => handleQuantityChange(index, e)}
              />
              <input
                className="border border-white ml-4"
                type="text"
                value={input.unit}
                onChange={(e) => handleUnitChange(index, e)}
              />
            </label>
          ))}
          <button className="border border-white" type="button" onClick={() => setIngredientInputList([...ingredientInputList, { recipe_id: '', pantry_id: '', quantity_needed: 0, unit: '' }])}>Add Ingredient</button>
          <button className="border border-white my-4" type="button" onClick={(e) => handleSubmit(e)}>Submit</button>
        </form>

        {isSuccessModalVisible && <SuccessModal />}
      </div>
    </HoverWidget>
  )
}
