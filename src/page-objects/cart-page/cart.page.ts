import { BasePage } from "../base.page";
import { Page } from "playwright";

export class CartPage extends BasePage {
    // Cart-specific selectors
    public readonly addToCartButton = '.btn_inventory';
    public readonly cartButton = '.shopping_cart_link';
    public readonly removeFromCartButton = '[data-test*="remove"]';
    public readonly checkoutButton = '[data-test="checkout"]';
    public readonly continueShoppingButton = '[data-test="continue-shopping"]';

    fieldMapping = {
        'Cart title': '[data-test="title"]',
        'Cart list': '[data-test=\"cart-list\"]',
        'Item name': (text: string) => `[data-test="test-Item name - ${text}"]`,
        'Remove item button': (text: string) => `[data-test="test-Remove - ${text}"]`,
        'Continue shopping button':'[data-test="continue-shopping"]',
        'Checkout button': '[data-test="checkout"]'
    };

    constructor(page: Page, baseUrl: string) {
        super(page, baseUrl);
    }

    async addToCart(): Promise<void> {
        await this.actions.clickElement(this.addToCartButton);
    }

    async goToCart(): Promise<void> {
        await this.actions.clickElement(this.cartButton);
    }

    async removeFromCart(itemName: string): Promise<void> {
        await this.actions.clickElement(this.removeFromCartButton);
    }

    async proceedToCheckout(): Promise<void> {
        await this.actions.clickElement(this.checkoutButton);
    }

    async continueShopping(): Promise<void> {
        await this.actions.clickElement(this.continueShoppingButton);
    }
}