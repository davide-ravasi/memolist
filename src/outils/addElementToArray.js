const addElementToArray = (items, editedItem) => {
    const index = items.findIndex(item => item.id === editedItem.id); //finding index of the item
    const newArray = [...items]; //making a new array
    newArray[index] = editedItem //changing value in the new array

    return newArray;
}
export default addElementToArray;