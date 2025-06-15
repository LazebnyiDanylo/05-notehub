import css from "./NoteForm.module.css";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NoteFormSchema } from "../../schemes/NoteFormSchema";
import { createNote } from "../../services/noteService";

interface NoteFormProps {
  onClose: () => void;
}

interface FormValues {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

const initialValues: FormValues = {
  title: "",
  content: "",
  tag: "Todo",
};

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({
        queryKey: ["allNotes"],
      });
    },
  });

  function handleSubmit(values: FormValues, actions: FormikHelpers<FormValues>) {
    mutate(values);
    actions.resetForm();
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={NoteFormSchema}>
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>
        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field id="content" name="content" rows={8} className={css.textarea} as="textarea" />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>
        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>
        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={isPending}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
