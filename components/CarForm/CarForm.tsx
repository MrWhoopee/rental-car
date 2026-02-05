"use client";

import {
  Formik,
  Form,
  Field,
  useField,
  useFormikContext,
  FormikHelpers,
  ErrorMessage,
} from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import css from "./CarForm.module.css";

interface OrderFormValues {
  username: string;
  email: string;
  bookingDate: Date | null;
  comment: string;
}

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Too short!")
    .max(20, "Too long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  bookingDate: Yup.date().nullable().required("Date is required"),
  comment: Yup.string().max(300, "Max 300 characters"),
});

const initialValues: OrderFormValues = {
  username: "",
  email: "",
  bookingDate: null,
  comment: "",
};

// 2. Оптимізований DatePicker
const DatePickerField = ({
  name,
  placeholder,
}: {
  name: string;
  placeholder: string;
}) => {
  const { setFieldValue } = useFormikContext<OrderFormValues>();
  const [field, meta] = useField(name);

  return (
    <div className={css.inputContainer}>
      <DatePicker
        {...field}
        placeholderText={placeholder}
        selected={field.value || null}
        onChange={(val: Date | null) => setFieldValue(name, val)}
        minDate={new Date()}
        isClearable
        className={`${css.input} ${meta.touched && meta.error ? css.inputError : ""}`}
        dateFormat="dd.MM.yyyy"
        autoComplete="off"
      />
      <ErrorMessage name={name} component="span" className={css.errorMessage} />
    </div>
  );
};

export default function CarForm() {
  const handleSubmit = async (
    values: OrderFormValues,
    { resetForm, setSubmitting }: FormikHelpers<OrderFormValues>,
  ) => {
    try {
      console.log("🚀 Form Data:", values);

      // Типу Робимо запит
      await new Promise((resolve, reject) => {
        // рандомайзим помилку
        setTimeout(
          () => (Math.random() > 0.5 ? resolve(true) : reject()),
          1000,
        );
      });

      toast.success("Thank you! Our manager will contact you.");
      resetForm();
    } catch (error) {
      toast.error("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={css.formWrapper}>
      <div className={css.titleWrapper}>
        <h3 className={css.title}>Book your car now</h3>
        <p className={css.text}>
          Stay connected! We are always ready to help you.
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className={css.form} noValidate>
            <div className={css.inputContainer}>
              <Field
                className={`${css.input} ${touched.username && errors.username ? css.inputError : ""}`}
                name="username"
                placeholder="Name*"
              />
              <ErrorMessage
                name="username"
                component="span"
                className={css.errorMessage}
              />
            </div>

            <div className={css.inputContainer}>
              <Field
                className={`${css.input} ${touched.email && errors.email ? css.inputError : ""}`}
                type="email"
                name="email"
                placeholder="Email*"
              />
              <ErrorMessage
                name="email"
                component="span"
                className={css.errorMessage}
              />
            </div>

            <DatePickerField name="bookingDate" placeholder="Booking  date*" />

            <div className={css.inputContainer}>
              <Field
                as="textarea"
                className={`${css.input} ${css.textarea}`}
                name="comment"
                placeholder="Comment"
              />
              <ErrorMessage
                name="comment"
                component="span"
                className={css.errorMessage}
              />
            </div>

            <button
              className={css.submitBtn}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
