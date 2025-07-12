'use client';

import { useMutation } from '@tanstack/react-query';
import { createNote } from '@/lib/api/clientApi';
import { NewNoteContent, Tag } from '@/types/note';
import { useRouter } from 'next/navigation';
import { useNoteDraftStore } from '@/lib/store/noteStore';

import css from './NoteForm.module.css';

export default function NoteForm() {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      router.back();
    },
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (formData: FormData) => {
    const data: NewNoteContent = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: formData.get('tag') as Tag,
    };

    mutate(data);
  };

  const handleClose = () => router.back();

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          defaultValue={draft?.title}
          onChange={handleChange}
          className={css.input}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          rows={8}
          name="content"
          defaultValue={draft?.content}
          onChange={handleChange}
          className={css.textarea}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          defaultValue={draft?.tag || 'Todo'}
          onChange={handleChange}
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={handleClose}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          Create note
        </button>
      </div>
    </form>
  );
}

/*

Assignment not accepted

Well-executed aspects:
- The component uses TanStack Query's `useMutation` and `useQueryClient` correctly for note creation and cache invalidation.
- The global draft state is accessed and updated in real time via the custom store.
- All form fields are present and properly typed.
- Navigation is handled using `useRouter`.
- No usage of `any` or implicit `any` types.

Critical issues:
- The form uses `onSubmit` with a handler instead of the Form Actions API (`action` prop with a function), which is required for React 19 form handling. This approach does not leverage the built-in form reset and simplified submission flow provided by the Form Actions API.
- The form fields use `defaultValue` instead of `value`, making them uncontrolled. However, the draft state is updated on every change, which can lead to inconsistencies if the draft is updated externally or reset. Controlled components should use the `value` prop to ensure synchronization with the global draft state.

Final decision:  
Assignment has not been accepted

*/

// "use client";

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { createNote } from "@/lib/api";
// import css from "./NoteForm.module.css";
// import { useRouter } from "next/navigation";
// import { useNoteStore } from "@/lib/store/noteStore";
// import { FormEvent } from "react";

// export default function NoteForm() {
//   const queryClient = useQueryClient();
//   const router = useRouter();
//   const { draft, resetDraft, updateDraft } = useNoteStore();

//   const mutation = useMutation({
//     mutationFn: createNote,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["notes"] });
//       resetDraft();
//       router.back();
//     },
//   });

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     mutation.mutate(draft);
//     e.currentTarget.reset();
//   };

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     updateDraft({
//       ...draft,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <form className={css.form} onSubmit={handleSubmit}>
//       <div className={css.formGroup}>
//         <label htmlFor="title">Title</label>
//         <input
//           id="title"
//           type="text"
//           name="title"
//           className={css.input}
//           onChange={handleChange}
//           defaultValue={draft.title}
//           required
//         />
//       </div>

//       <div className={css.formGroup}>
//         <label htmlFor="content">Content</label>
//         <textarea
//           id="content"
//           name="content"
//           rows={8}
//           className={css.textarea}
//           onChange={handleChange}
//           defaultValue={draft.content}
//           required
//         />
//       </div>

//       <div className={css.formGroup}>
//         <label htmlFor="tag">Tag</label>
//         <select
//           id="tag"
//           name="tag"
//           className={css.select}
//           onChange={handleChange}
//           defaultValue={draft.tag}
//           required
//         >
//           <option value="Todo">Todo</option>
//           <option value="Work">Work</option>
//           <option value="Personal">Personal</option>
//           <option value="Meeting">Meeting</option>
//           <option value="Shopping">Shopping</option>
//         </select>
//       </div>

//       <div className={css.actions}>
//         <button
//           type="button"
//           className={css.cancelButton}
//           onClick={() => router.back()}
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className={css.submitButton}
//           disabled={mutation.isPending}
//         >
//           Create note
//         </button>
//       </div>
//     </form>
//   );
// }
