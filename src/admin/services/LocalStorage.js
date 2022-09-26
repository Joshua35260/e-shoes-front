const removeItem = itemToRemove => {
  localStorage.removeItem(itemToRemove)
}

const getItem = item => {
  return localStorage.getItem(item)
}

const addItem = (itemName, newItem) => {
  localStorage.setItem(itemName, newItem)
}

module.exports = { removeItem, getItem, addItem }
