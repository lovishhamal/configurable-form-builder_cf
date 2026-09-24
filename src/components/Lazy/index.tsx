import {
  lazy,
  Suspense,
  type ComponentType,
  type LazyExoticComponent,
} from "react";
import type { FormField } from "../../context/FormContext";

export type FieldProps = {
  field: FormField;
  [key: string]: any;
};

type FieldType = FormField;

const fieldComponents: Record<
  FormField["type"],
  LazyExoticComponent<ComponentType<FieldProps>>
> = {
  text: lazy(() => import("../FormFields/Text/TextField")),
  number: lazy(() => import("../FormFields/Number/NumericField")),
  group: lazy(() => import("../FormFields/Group/GroupField")),
};

type Props = FieldProps & {
  field: FieldType | any;
};

function LazyComponent({ field, ...props }: Props) {
  const Component = fieldComponents[field.type];

  return (
    <Suspense fallback={<div></div>}>
      <Component field={field} {...props} />
    </Suspense>
  );
}

export default LazyComponent;
