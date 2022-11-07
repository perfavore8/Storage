export function useData() {
  async function getData() {
    const url = "http://api.gosklad.ru/v1/category/list";
    let response = await fetch(url);
    if (response.ok) {
      let json = await response.json();
      console.log(json);
    } else {
      console.log("Ошибка HTTP: " + response.status);
    }
  }
  return { getData };
}
