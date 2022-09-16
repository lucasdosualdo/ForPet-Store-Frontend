export default function CurrentPage(path) {
  let page = "";

  if (path.includes("home")) {
    page = "ForPets";
  }

  if (path.includes("items")) {
    page = "Detalhes";
  }

  if (path.includes("cart")) {
    page = "Carrinho";
  }

  if (path.includes("history")) {
    page = "Histórico";
  }

  if (path.includes("confirmation")) {
    page = "Confirmação";
  }

  if (path.includes("favorites")) {
    page = "Favoritos";
  }

  return page;
}
