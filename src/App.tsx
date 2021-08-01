import React from 'react';
import { Formik, Field, Form } from 'formik';
import { TextField, Button } from "@material-ui/core"

function App() {
  return (
    <div className="App">
        <Formik
            initialValues={{firstName: '', lastName: ''}}
            onSubmit={(data, {setSubmitting, resetForm}) => {
                setSubmitting(true);
                // make async call
                console.log('submit:', data);
                setSubmitting(false);
            }}
        >
          {({ values, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
            <Form>
                <Field name={"firstName"} placeholder={"first name"} type={"input"} as={TextField}/>
                <div>
                    <Field name={"lastName"} placeholder={"last name"} type={"input"} as={TextField}/>
                </div>
                <div>
                    <Button disabled={isSubmitting} type={"submit"}>Submit</Button>
                </div>
                <pre>{JSON.stringify(values, null, 2)}</pre>
            </Form>
          )}
        </Formik>
    </div>
  );
}

export default App;
