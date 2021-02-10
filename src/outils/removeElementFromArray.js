const removeElementFromArray = (items, editedItem) => {
    const index = items.findIndex(item => item.id === editedItem.id); //finding index of the item
    const newArray = [...items]; //making a new array
    newArray.splice(index, 1);

    return newArray;
}

export default removeElementFromArray;