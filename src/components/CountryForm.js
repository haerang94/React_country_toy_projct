import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import styled from 'styled-components';

const Form = styled.form`
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: no-wrap;
  padding: 20px 0;
  & * {
    margin: 0 10px;
  }
`;

const InputField = styled(Field)`
  border: none;
  border-bottom: 1px solid #98acf8;
  width: 260px;
  padding: 7px;
  color: gray;
`;

const Button = styled.button`
  border-radius: 6px;
  padding: 3px 5px;
  border: 2px solid #b088f9;
  color: #fff;
  background: #98acf8;
`;

const CountryForm = ({ handleSubmit, onSearch }) => {
  const submit = (value, dispatch) => {
    // submit 후 초기화
    onSearch(value);
    dispatch(reset('country'));
  };
  return (
    <Form onSubmit={handleSubmit(submit)}>
      <label htmlFor="search">
        <InputField id="search" name="search" component="input" type="text" />
      </label>
      <Button type="submit">search</Button>
    </Form>
  );
};
const WrappedForm = reduxForm({
  form: 'country',
  enableReinitialize: true,
})(CountryForm);

export default WrappedForm;
