import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { FORM_DATA } from "../constants/form";

type FormData = {
  id: string;
  label: string;
  type: string;
  children: any[];
};

export type FormField = {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  min?: number;
  max?: number;
  children?: FormField[];
};

type FormContextType = {
  formFields: Record<string, unknown>[];
  formData: FormData[];
  setData: (data: FormData[]) => void;
  addField: (parentId: string | null, field: FormField) => void;
  deleteField: (parentId: string | null, id: string) => void;
  moveFieldUp: (id: string) => void;
  moveFieldDown: (id: string) => void;
};

const FormContext = createContext<FormContextType | null>(null);

export function FormProvider({ children }: { children: ReactNode }) {
  const [formFields, setFormFields] = useState<FormField[]>(FORM_DATA);
  const [formData, setFormData] = useState<FormData[]>([]);

  const recursive = (field: FormField) => ({
    id: Math.random().toString(36).slice(2),
    type: field.type,
    label: field.type === "group" ? "Group" : field.type,
    required: field.required,
    min: field.min,
    max: field.max,
    ...(field.type === "group" ? { children: [] } : {}),
  });

  const mapTree = (list: any, id: string, fn: (item: FormData) => FormData) =>
    list.map((f: any) =>
      f.id === id
        ? fn(f)
        : f.children
          ? { ...f, children: mapTree(f.children, id, fn) }
          : f,
    );

  const addTo = (
    list: FormData[],
    parentId: string | null,
    field: FormField,
  ) => {
    return parentId === null
      ? [...list, recursive(field)]
      : mapTree(list, parentId, (item) => ({
          ...item,
          children: [...(item.children || []), recursive(field)],
        }));
  };

  const addField = useCallback(
    (parentId: string | null, field: FormField) => {
      setFormData((prev) => addTo(prev, parentId, field));
    },
    [formData],
  );

  const setData = useCallback(
    (data: FormData[]) => {
      setFormData(data);
    },
    [formData],
  );

  const deleteField = (parentId: string | null, id: string) => {
    if (parentId === null) {
      setFormData((prev) => prev.filter((f) => f.id !== id));
    } else {
      setFormData((prev) =>
        mapTree(prev, parentId, (item) => ({
          ...item,
          children: item.children?.filter((f) => f.id !== id),
        })),
      );
    }
  };

  const moveFieldUp = (id: string) => {
    const moveUp = (list: FormData[]): FormData[] => {
      const index = list.findIndex((f) => f.id === id);
      if (index > 0) {
        const next = [...list];
        [next[index - 1], next[index]] = [next[index], next[index - 1]];
        return next;
      }
      return list.map((f) => ({
        ...f,
        children: f.children ? moveUp(f.children) : f.children,
      }));
    };
    setFormData((prev) => moveUp(prev));
  };

  const moveFieldDown = (id: string) => {
    const moveDown = (list: FormData[]): FormData[] => {
      const index = list.findIndex((f) => f.id === id);
      if (index !== -1 && index < list.length - 1) {
        const next = [...list];
        [next[index], next[index + 1]] = [next[index + 1], next[index]];
        return next;
      }
      return list.map((f) => ({
        ...f,
        children: f.children ? moveDown(f.children) : f.children,
      }));
    };
    setFormData((prev) => moveDown(prev));
  };

  const value = useMemo(
    () => ({
      formFields,
      formData,
      setData,
      addField,
      deleteField,
      moveFieldUp,
      moveFieldDown,
    }),
    [
      formFields,
      formData,
      setData,
      addField,
      deleteField,
      moveFieldUp,
      moveFieldDown,
    ],
  );

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (context === null) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}
