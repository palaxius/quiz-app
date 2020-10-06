import React, {useState} from 'react';

import './QuizCreator.css'

import Button from "../../components/Button/Button";
import {createControl, validate, validateForm} from "../../form/formFramework";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import axios from '../../axios/axios-quiz'

const createOptionControl = (number) => {
  return createControl({
    label: `Option ${number}`,
    errorMessage: 'Option cannot be empty',
    id: number
  }, {required: true})
}

const createFormControls = () => {
  return {
    question: createControl({
      label: 'Enter a question',
      errorMessage: 'The question cannot be empty'
    }, {required: true}),
    option_1: createOptionControl(1),
    option_2: createOptionControl(2),
    option_3: createOptionControl(3),
    option_4: createOptionControl(4)
  }
}

const QuizCreator = () => {
  const [quiz, setQuiz] = useState([])
  const [formControls, setFormControls] = useState(createFormControls())
  const [rightAnswerId, setRightAnswerId] = useState(1)
  const [isFormValid, setIsFormValid] = useState(false)

  const submitHandler = (event) => {
    event.preventDefault()
  }

  const addQuestionHandler = () => {
    const updatedQuiz = quiz.concat()
    const index = quiz.length + 1

    const {question, option_1, option_2, option_3, option_4} = formControls

    const questionItem = {
      question: question.value,
      id: index,
      rightAnswerId: rightAnswerId,
      answers: [
        {text: option_1.value, id: option_1.id},
        {text: option_2.value, id: option_2.id},
        {text: option_3.value, id: option_3.id},
        {text: option_4.value, id: option_4.id},
      ]
    }

    updatedQuiz.push(questionItem)

    setQuiz(updatedQuiz)
    setFormControls(createFormControls())
    setIsFormValid(false)
    setRightAnswerId(1)
  }

  const createQuizHandler = async () => {

    try {
        await axios.post('quizzes.json', quiz)
        setQuiz([])
        setFormControls(createFormControls())
        setIsFormValid(false)
        setRightAnswerId(1)
        window.location.href = 'http://localhost:3000/';
        } catch (e) {
      console.error(e)
    }
  }

  const changeHandler = (value, controlName) => {
    const updatedFormControls = {...formControls}
    const control = {...formControls[controlName]}

    control.value = value
    control.touched = true
    control.valid = validate(control.value, control.validations)

    updatedFormControls[controlName] = control

    setIsFormValid(validateForm(updatedFormControls))
    setFormControls(updatedFormControls)
  }

  const renderControls = () => {
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName]

      return (
        <React.Fragment key={controlName + index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            touched={control.touched}
            errorMessage={control.errorMessage}
            shouldValidate={!!control.validations}
            onChange={event => changeHandler(event.target.value, controlName)}
          />
          { index === 0 && <hr/> }
        </React.Fragment>
    )
    })
  }

  const selectChangeHandler = (event) => {
    setRightAnswerId(+event.target.value)
  }

  return (
    <div className='quizCreator'>
      <div>
        <h1>Quiz Creation</h1>

        <form onSubmit={submitHandler}>

          {renderControls()}

          <Select
            label='Correct answer'
            value={rightAnswerId}
            onChange={selectChangeHandler}
            options={[
              {text: 1, value: 1},
              {text: 2, value: 2},
              {text: 3, value: 3},
              {text: 4, value: 4},
            ]}
          />

          <Button
            type='primary'
            onClick={addQuestionHandler}
            disabled={!isFormValid}
          >
            Add Question
          </Button>

            <Button
              type='success'
              onClick={createQuizHandler}
              disabled={quiz.length === 0}
            >
              Create Quiz
            </Button>

        </form>
      </div>
    </div>
  );
};

export default QuizCreator;
