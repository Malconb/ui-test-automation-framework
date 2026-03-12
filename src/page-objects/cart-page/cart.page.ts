import { BasePage } from "../base.page";
import { Page } from "playwright";

export class Cart extends BasePage {
    fieldMapping = {
        'Cart title': (text: string) => '[data-test="title"]',

    }
}