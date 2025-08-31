"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { notesApi } from '@/lib/api/notes';
import { useNoteStore } from '@/lib/store/noteStore';
import { NewNoteData } from '@/types/note';
import css from './NoteForm.module.css';

const NoteForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();
  
  const [formData, setFormData] = useState({
    title: draft.title,
    content: draft.content,
    tag: draft.tag,
  });

  const [errors, setErrors] = useState({
    title: '',
    content: '',
    tag: '',
  });

  useEffect(() => {
    setFormData({
      title: draft.title,
      content: draft.content,
      tag: draft.tag,
    });
  }, [draft]);

  const mutation = useMutation({
    mutationFn: notesApi.createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note created successfully!');
      clearDraft();
      router.back();
    },
    onError: () => {
      toast.error('Failed to create note');
    },
  });

  const validateForm = () => {
    const newErrors = {
      title: '',
      content: '',
      tag: '',
    };

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    } else if (formData.title.length > 50) {
      newErrors.title = 'Title must be less than 50 characters';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.length < 10) {
      newErrors.content = 'Content must be at least 10 characters';
    }

    if (!formData.tag.trim()) {
      newErrors.tag = 'Tag is required';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    setDraft(newFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const noteData: NewNoteData = {
      title: formData.title.trim(),
      content: formData.content.trim(),
      categoryId: formData.tag.trim(),
    };

    mutation.mutate(noteData);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className={css.form}>
      <form onSubmit={handleSubmit}>
        <div className={css.field}>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Note title"
            className={css.input}
          />
          {errors.title && <div className={css.error}>{errors.title}</div>}
        </div>

        <div className={css.field}>
          <textarea
            value={formData.content}
            onChange={(e) => handleInputChange('content', e.target.value)}
            placeholder="Note content"
            className={css.textarea}
            rows={5}
          />
          {errors.content && <div className={css.error}>{errors.content}</div>}
        </div>

        <div className={css.field}>
          <select
            value={formData.tag}
            onChange={(e) => handleInputChange('tag', e.target.value)}
            className={css.input}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Ideas">Ideas</option>
          </select>
          {errors.tag && <div className={css.error}>{errors.tag}</div>}
        </div>

        <div className={css.buttons}>
          <button
            type="submit"
            disabled={mutation.isPending}
            className={css.submitButton}
          >
            {mutation.isPending ? 'Creating...' : 'Create Note'}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className={css.cancelButton}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;

