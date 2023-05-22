export function useCheckError(item, tryAccept) {
  const checkError = (field) => {
    const global = tryAccept.value && field.is_system;
    const short =
      field.code === "name" ? item.fields?.[field.code]?.length < 3 : false;
    const empty = !item.fields?.[field.code];
    return { value: global && (short || empty), empty: empty, short: short };
  };

  return { checkError };
}
