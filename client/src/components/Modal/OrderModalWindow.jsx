import React from 'react';
import {Formik, Form, Field} from 'formik';
import { InputFormSurname, InputFormHeight, InputFormName, InputFormWeight, InputFormWidth } from '../CustomFields/customField';

//! В процессе!

const OrderModalWindow = ({toggleOrder}) => {

   const sendOrder = (values, {setSubmitting, resetForm}) => {
      console.log(values)
      resetForm();
   };

   return (
      <div className='order' onClick={toggleOrder}>
         <div className='order_content' onClick={e => e.stopPropagation()}>
            <h2>Оформление заказа</h2>
            <Formik
               initialValues={{
                  name: '',
                  surname: '',
                  phoneNumber: '',
                  email: '',
                  city: '',
                  postPoint: ''
               }}
               validate={values => {
                  const errors = {};
                  if (!values.name) errors.name = 'Поле не должно быть пустым';
                  if (!values.surname) errors.surname = 'Поле не должно быть пустым';
                  // if (!values.phoneNumber) errors.phoneNumber = 'Поле не должно быть пустым';
                  // if (!values.email) errors.email = 'Поле не должно быть пустым';
                  // if (!values.city) errors.city = 'Поле не должно быть пустым';
                  // if (!values.postPoint) errors.postPoint = 'Поле не должно быть пустым';
                  return errors;
               }}
               onSubmit={sendOrder}>

               {({isSubmitting}) => (
                  <Form className='form form-login'>
                     <div className='input-field col s12'>
                        <Field
                           component={InputFormName}
                           type="text"
                           name="name"
                           placeholder='имя...'
                           className='validate'
                        />
                     </div>

                     <div className='input-field col s12'>
                        <Field
                           component={InputFormSurname}
                           type="text"
                           name="surname"
                           placeholder='фамилия...'
                           className='validate'
                        />
                     </div>

                     {/* <div className='input-field col s12'>
                        <Field
                           component={InputFormWidth}
                           type="tel"
                           name="phoneNumber"
                           placeholder='телефон...'
                           className='validate'
                        />
                     </div>

                     <div className='input-field col s12'>
                        <Field
                           component={InputFormHeight}
                           type="email"
                           name="email"
                           placeholder='почта...'
                           className='validate'
                        />
                     </div>

                     <div className='input-field col s12'>
                        <Field
                           component={InputFormWeight}
                           type="text"
                           name="city"
                           placeholder='город...'
                           className='validate'
                        />
                     </div>

                     <div className='input-field col s12'>
                        <Field
                           component={InputFormWeight}
                           type="text"
                           name="city"
                           placeholder='город...'
                           className='validate'
                        />
                     </div> */}

                     <div className='button_block'>
                        <button
                           type="submit"
                           className='add'
                           disabled={isSubmitting}>Добавить</button>
                        <button
                           type='button'
                           className='close'
                           onClick={toggleOrder}>Отменить</button>
                     </div>
                  </Form>
               )}
            </Formik>
         </div>
      </div>
   );
};

export default OrderModalWindow;
