export const createControl = (config, validations) => {
  return {
    ...config,
    validations,
    valid: !validations,
    touched: false,
    value: ''
  }
}

export const validate = (value, validations = null) => {
  if (!validations) return true

  let isValid = true

  if (validations.required) {
    isValid = value.trim() !== '' && isValid
  }

  return isValid
}

export const validateForm = (updatedFormControls) => {
  let isFormValid = true
  Object.keys(updatedFormControls).forEach(name => {
    isFormValid = updatedFormControls[name].valid && isFormValid
  })

  return isFormValid
}