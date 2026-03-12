import { BasePage } from "../base.page";
import { Page } from "playwright";

export class Cart extends BasePage {
    fieldMapping = {
        'Cart title': (text: string) => '[data-test="title"]',
        'Item name': (text: string) => `[data-test="test-Item name - ${text}"]`,
        'Remove item button': (text: string) => `[data-test="test-Remove - ${text}"]`,
        'Continue shopping button': (text: string) => '[data-test="continue-shopping"]',
        'Checkout button': (text: string) => '[data-test="checkout"]'
    }
}