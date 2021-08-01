import React from 'react';
import './App.css';
import {Formik, Field, Form, useField, FieldAttributes, FieldArray} from 'formik';
import {TextField, Button, Checkbox, Radio, FormControlLabel, Select, MenuItem} from "@material-ui/core"
import * as yup from 'yup';

type MyRadioProps = { label: string } & FieldAttributes<{}>

// Custom MUI Radio button
const MyRadio : React.FC<MyRadioProps> = ({label, ... props}) => {
    const [field] = useField(props);
    return (
        <FormControlLabel {...field} control={<Radio />} label={label} />
        // Same
        // <FormControlLabel value={field.value} onChange={field.onChange} control={<Radio />} label={label} />
    )
}

const MyTextField :React.FC<FieldAttributes<{}>> = ({placeholder, ...props}) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error: '';
    return (
        <TextField {...field} placeholder={placeholder} helperText={errorText} error={!!errorText}/>
    )
}

const validationSchema = yup.object({
    firstName: yup.string().required().max(10),
    pets: yup.array().of(yup.object({
        name: yup.string().required()
    }))
})

function App() {
  return (
    <div className="App">
        <Formik
            validateOnChange={true}
            initialValues={{
                firstName: '',
                lastName: '',
                isTall: false,
                cookies: [],
                yogurt: '',
                pets: [{ type: "cat", name: "jarvis", id: "" + Math.random() }]
            }}
            validationSchema={validationSchema}
            onSubmit={(data, {setSubmitting, resetForm}) => {
                setSubmitting(true);
                // make async call
                console.log('submit:', data);
                setSubmitting(false);
            }}
        >
          {({ values, isSubmitting, errors }) => (
            <Form className={"container"}>
                <MyTextField name={"firstName"} placeholder={"first name"} />
                <div>
                    <Field name={"lastName"} placeholder={"last name"} type={"input"} as={TextField}/>
                </div>
                <Field name={"isTall"} type={"checkbox"} as={Checkbox}/>
                <div>cookies:</div>
                <div className={"checkbox-wrap"}>
                    <Field name={"cookies"} type={"checkbox"} value={"chocolate chip"} as={Checkbox}/>
                    <Field name={"cookies"} type={"checkbox"} value={"snicker doodle"} as={Checkbox}/>
                    <Field name={"cookies"} type={"checkbox"} value={"sugar"} as={Checkbox}/>
                </div>
                <div>Yogurt</div>
                <div>
                    <MyRadio name={"yogurt"} type={"radio"} label={"peach"}  value={"peach"} />
                    <MyRadio name={"yogurt"} type={"radio"} label={"blueberry"} value={"blueberry"} />
                    <MyRadio name={"yogurt"} type={"radio"} label={"apple"} value={"apple"} />
                </div>
                <FieldArray name={"pets"}>
                    {(arrayHelpers) => (
                        <div>
                            <Button onClick={() => arrayHelpers.push({
                                type: 'frog',
                                name: '',
                                id: '' + Math.random()
                            })}>ADD PET</Button>
                            {values.pets.map((pet, index) => {
                                return (
                                <div key={pet.id}>
                                    <MyTextField name={`pets.${index}.name`} placeholder={"pet name"}/>
                                    <Field name={`pet.${index}.type`} type={"select"} as={Select}>
                                        <MenuItem value={"cat"}>cat</MenuItem>
                                        <MenuItem value={"dog"}>dog</MenuItem>
                                        <MenuItem value={"frog"}>frog</MenuItem>
                                    </Field>
                                    <Button onClick={() => arrayHelpers.remove(index)}>x</Button>
                                </div>
                                )})}
                        </div>
                    )}
                </FieldArray>
                <div>
                    <Button disabled={isSubmitting} type={"submit"}>Submit</Button>
                </div>
                <pre className={"json"}>{JSON.stringify(values, null, 2)}</pre>
                <pre className={"json"}>{JSON.stringify(errors, null, 2)}</pre>
            </Form>
          )}
        </Formik>
    </div>
  );
}

export default App;
