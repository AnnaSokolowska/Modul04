class Cart {
    constructor() {
        this.goods = [];
        this.totalPrice = 0;
        this.count = 0;
    }
    calculateGoodsPrice() {
        let sum = 0;
        for (let i = 0; i < this.goods.length; i++) {
            let productSum = this.goods[i].price;
            sum = sum + productSum;
        }
        this.totalPrice = sum;
    }
    addGoods(object) {
        this.goods.push(object);
        this.calculateGoodsPrice();
        this.increaseCount();
    }
    getTotalPrice() {
        return Number(this.totalPrice);
    }
    increaseCount() {
        this.count = Number(this.count) + 1;
    }
    clear() {
        this.goods = [];
        this.count = 0;
        this.totalPrice = 0;
    }
    print() {
        const itemsStr = JSON.stringify(this.goods);
        return `${itemsStr} \n Общая стоимость корзины: ${this.getTotalPrice()}`;
    }
}

class Goods {
  constructor(item, price, discount) {
    this.item = item;
    this.price = price;
    this.discount = discount;
  }
  }
class FoodGoods extends Goods {
  constructor (item, price, discount, callories) {
  super(item, price, discount)
      this.callories = callories;
    }
};
  class СlothingGoods extends Goods {
  constructor (item, price, discount, material) {
  super(item, price, discount)
    this.material = material;
  }
};
  class TechnicsGoods extends Goods {
  constructor (item, price, discount, technicTypes) {
    super(item, price, discount)
    this.technicTypes = technicTypes;
  }
};

const cart = new Cart();
const tomato = new FoodGoods('tomato', 5, 10, 300);
console.log(tomato);
cart.addGoods(tomato);

const t_shirt = new СlothingGoods('tshirt', 10, 0, 'cotton');
console.log(t_shirt)
cart.addGoods(t_shirt);

const tvSat = new TechnicsGoods('tvSat', 100, 0, 'small_agd');
console.log(tvSat)
cart.addGoods(tvSat);

console.log(cart.print());