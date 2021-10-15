let goods = [
    {id: 1, title: 'BMW X6 M', price: 5730000, img:'https://avatars.mds.yandex.net/get-verba/1030388/2a0000016d910ee0c5d2f38a020db0cd8a01/cattouch'},
    {id: 2, title: 'Mercedes-Benz C-class', price: 1880000, img:'https://www.allcarz.ru/wp-content/uploads/2021/02/foto-c-class-w206_01.jpg'},
    {id: 3, title: 'Toyota Camry', price: 1020000, img:'https://www.carprousa.com/hubfs/car-review-blog/review_236764_1.jpg'},
    {id: 4, title: 'Mercedes-Benz S-class', price: 5600000, img: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Mercedes-Benz_S_Class_W222_%2812570605973%29.jpg'}
];


const toHTML = good => `
    <div class="col">
        <div class="card">
            <img class="card-img-top" style="height:300px;" src="${good.img}" alt="${good.title}">
            <div class="card-body">
                <h5 class="card-title">${good.title}</h5>
                <a href="#" class="btn btn-primary" data-btn="price" data-id="${good.id}">Подробнее</a>
                <a href="#" class="btn btn-danger" data-btn="remove" data-id="${good.id}">Удалить</a>
            </div>
        </div>
    </div>
`;
function render() {
    const html = goods.map(good => toHTML(good)).join(''); //если один параметр, то можно сократить до состояния  goods.map(toHTML);
    document.querySelector('#goods').innerHTML = html;
}
render();

const priceModal = $.modal({
    title: 'Цена на товар',
    closable: true,
    width: '400px',
    footerButtons: [
        {text: 'Закрыть', type: 'primary', handler() {
            priceModal.close();
        }}
    ]
});



document.addEventListener('click', event => {
    event.preventDefault();
    const btnType = event.target.dataset.btn;
    const id = +event.target.dataset.id;
    const good = goods.find(g => g.id === id);

    if (btnType === 'price') {

        priceModal.setContent(`
            <p>Цена на ${good.title}: <strong>${good.price.toLocaleString()} </strong>тугриков</p>
        `);
        priceModal.open();
        console.log(id, good);//15:27
    } else if (btnType === 'remove') {
        $.confirm({
            title: 'Вы уверены?',
            content: `<p>Это действие приведёт к удалению <strong>${good.title}</strong></p>`
        }).then(() => {
            goods = goods.filter(f => f.id !== id);
            render();
        }).catch(() => {
            console.log('cancel');
        });
    } 
});