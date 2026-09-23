import {
  lazy,
  Suspense,
  type ComponentType,
  type LazyExoticComponent,
} from "react";

export type FieldProps = {
  field: string;
  [key: string]: any;
};

type FieldType = string;

const fieldComponents: Record<
  FieldType,
  LazyExoticComponent<ComponentType<FieldProps>>
> = {
  textField: lazy(() => import("../FormFields/TextField")),
  numericField: lazy(() => import("../FormFields/NumericField")),
};

type Props = FieldProps & {
  field: FieldType;
};

function LazyComponent({ field, ...props }: Props) {
  const Component = fieldComponents[field];
  console.log("field", field);
  console.log("Component", Component);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component field={field} {...props} />
    </Suspense>
  );
}

export default LazyComponent;
