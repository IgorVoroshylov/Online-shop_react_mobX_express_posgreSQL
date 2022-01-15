import React from 'react'

export const InputFormName = ({field, form, ...props}) => {
   const errorText = form.touched.name && form.errors.name
   return (
      <div>
         <input {...props} {...field} className={!!errorText ? 'input_form error' : 'input_form'}/>
         {!!errorText && <div className='formik_error_field'>{errorText}</div>}
      </div>
   )
}

export const InputFormSurname = ({field, form, ...props}) => {
   const errorText = form.touched.surname && form.errors.surname
   return (
      <div>
         <input {...props} {...field} className={!!errorText ? 'input_form error' : 'input_form'}/>
         {!!errorText && <div className='formik_error_field'>{errorText}</div>}
      </div>
   )
}

// export const InputFormWidth = ({field, form, ...props}) => {
//    const errorText = form.touched.width && form.errors.width
//    return (
//       <div>
//          <input {...props} {...field} className={!!errorText ? 'input_form error' : 'input_form'}/>
//          {!!errorText && <div className='formik_error_field'>{errorText}</div>}
//       </div>
//    )
// }

// export const InputFormHeight = ({field, form, ...props}) => {
//    const errorText = form.touched.height && form.errors.height
//    return (
//       <div>
//          <input {...props} {...field} className={!!errorText ? 'input_form error' : 'input_form'}/>
//          {!!errorText && <div className='formik_error_field'>{errorText}</div>}
//       </div>
//    )
// }

// export const InputFormWeight = ({field, form, ...props}) => {
//    const errorText = form.touched.weight && form.errors.weight
//    return (
//       <div>
//          <input {...props} {...field} className={!!errorText ? 'input_form error' : 'input_form'}/>
//          {!!errorText && <div className='formik_error_field'>{errorText}</div>}
//       </div>
//    )
// }