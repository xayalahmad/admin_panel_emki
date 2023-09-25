import * as React from 'react';
import dayjs from 'dayjs';
import { useFormik, Formik, Form, Field } from "formik";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function TimePickerValue() {
    const { setFieldValue } = useFormik({})

  const [value, setValue] = React.useState(dayjs('2022-04-17T15:30'));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker', 'TimePicker']}>
        <TimePicker
          label="Controlled picker"
          value={value}
          ampm={false}
        //   onChange={(newValue) => setValue(newValue)}
          onChange={time => setFieldValue('time', time)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}