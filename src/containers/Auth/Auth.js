import React, {useState} from 'react';
import './Auth.css'
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import {validateEmail} from "../../utils/validateEmail";
import {useDispatch} from "react-redux";
import {auth} from "../../redux/actions/auth";

const Auth = () => {
  const dispatch = useDispatch()

  const [formControls, setFormControls] = useState({
    email: {
      value: '',
      type: 'email',
      label: 'Email',
      errorMessage: 'Enter correct email',
      valid: false,
      touched: false,
      validations: {
        required: true,
        email: true
      }
    },
    password: {
      value: '',
      type: 'password',
      label: 'Password',
      errorMessage: 'Enter correct password',
      valid: false,
      touched: false,
      validations: {
        required: true,
        minLength: 6
      }
    },
  })

  const [isFormValid, setIsFormValid] = useState(false)

  const loginHandler = () => {
    dispatch(auth(
      formControls.email.value,
      formControls.password.value,
      true
    ))

  }

  const registerHandler = () => {
    dispatch(auth(
      formControls.email.value,
      formControls.password.value,
      false
    ))
  }

  const submitHandler = (event) => {
    event.preventDefault()
  }

  const validateControl = (value, validations) => {
    if (!validations) return true

    let isValid = true

    if (validations.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validations.email) {
      isValid = validateEmail(value) && isValid
    }

    if (validations.minLength) {
      isValid = value.trim().length >= validations.minLength && isValid
    }

    return isValid
  }

  const onChangeHandler = (event, controlName) => {
    const updatedFormControls = {...formControls}
    const control = {...formControls[controlName]}
    control.value = event.target.value
    control.touched = true
    control.valid = validateControl(control.value, control.validations)
    updatedFormControls[controlName] = control

    let validForm = true
    Object.keys(updatedFormControls).forEach(name => {
      validForm = updatedFormControls[name].valid && validForm
    })

    setIsFormValid(validForm)
    setFormControls(updatedFormControls)
  }

  const renderInputs = () => {
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName]
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.validations}
          onChange={event => onChangeHandler(event, controlName)}
        />
      )
    })
  }

  return (
    <div className='auth'>
      <div>
        <h1>Authorization</h1>

        <form onSubmit={submitHandler} className='auth__form'>

          {renderInputs()}

          <Button
            type='success'
            onClick={loginHandler}
            disabled={!isFormValid}
          >
            Log In
          </Button>
          <Button
            type='primary'
            onClick={registerHandler}
            disabled={!isFormValid}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
