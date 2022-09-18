function currentPage(path) {
    let page = '';

    if(path.includes('home')) {
        page = 'ForPets';
    }

    if(path.includes('items')) {
        page = 'Detalhes';
    }

    if(path.includes('cart')) {
        page = 'Carrinho';
    }

    if(path.includes('history')) {
        page = 'Histórico';
    }

    if(path.includes('confirmation')) {
        page = 'Confirmação';
    }

    if(path.includes('favorites')) {
        page = 'Favoritos';
    }

    if(path.includes('cathegories')) {
        page = 'Categorias';
    }

    return page;
}

function numberOfItems(list) {
    let n = 0;

    list.forEach(item => {
        n += item.quantify;
    });

    return n;
}

export { 
    currentPage,
    numberOfItems
 }