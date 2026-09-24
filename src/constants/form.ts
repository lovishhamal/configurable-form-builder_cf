import type { FormField } from "../context/FormContext";

export const FORM_DATA: FormField[] = [
  {
    id: "1",
    type: "text",
    label: "TextField",
    required: true,
    min: 5,
    max: 10,
  },
  {
    id: "2",
    type: "number",
    label: "NumberField",
    required: false,
    min: 0,
    max: 120,
  },
  {
    id: "3",
    type: "group",
    label: "Group",
    required: false,
  },
];

// export const FORM_DATA = [
//   {
//     id: "1",
//     type: "text",
//     label: "TextField",
//     required: true,
//   },
//   {
//     id: "2",
//     type: "number",
//     label: "NumberField",
//     required: false,
//     min: 0,
//     max: 120,
//   },
//   {
//     id: "3",
//     type: "group",
//     label: "Group",
//     required: false,
//     children: [
//       {
//         id: "4",
//         type: "text",
//         label: "TextField",
//         required: true,
//       },
//       {
//         id: "5",
//         type: "number",
//         label: "NumberField",
//         required: false,
//       },
//       {
//         id: "6",
//         type: "group",
//         label: "Geo",
//         required: false,
//         children: [
//           { id: "7", type: "number", label: "TextField", required: false },
//           { id: "8", type: "number", label: "TextField", required: false },
//         ],
//       },
//     ],
//   },
// ];
