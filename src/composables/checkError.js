export function useCheckError(item, tryAccept) {
  const fieldsForValidation = ["name"];

  const checkError = (field) => {
    const needValidation = fieldsForValidation.includes(field.code);
    const global = tryAccept.value && Boolean(field.is_system);
    const short =
      field.code === "name"
        ? item.value.fields?.[field.code]?.length < 3
        : false;
    const empty = !item.value.fields?.[field.code];
    return {
      value: global && (short || empty) && needValidation,
      empty: empty && needValidation,
      short: short && needValidation,
    };
  };

  return { checkError };
}
