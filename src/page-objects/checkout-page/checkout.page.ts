import { BasePage } from "../base.page";
import { Page } from "playwright";

export class CheckoutPage extends BasePage {
    // Checkout-specific selectors
    public readonly firstNameInput = '[data-test="firstName"]';
    public readonly lastNameInput = '[data-test="lastName"]';
    public readonly postalCodeInput = '[data-test="postalCode"]';
    public readonly continueButton = '[data-test="continue"]';
    public readonly finishButton = '[data-test="finish"]';
    public readonly cancelButton = '[data-test="cancel"]';
    public readonly checkoutSummary = '.summary_info';
    public readonly paymentInfo = '.summary_info_label:has-text("Payment Information")';
    public readonly shippingInfo = '.summary_info_label:has-text("Shipping Information")';
    public readonly itemTotal = '.summary_subtotal_label';
    public readonly tax = '.summary_tax_label';
    public readonly total = '.summary_total_label';
    public readonly completeHeader = '.complete-header';
    public readonly completeText = '.complete-text';
    public readonly backToProductsButton = '[data-test="back-to-products"]';

    fieldMapping = {
        'First name field': this.firstNameInput,
        'Last name field': this.lastNameInput,
        'Postal code field': this.postalCodeInput,
        'Continue button': this.continueButton,
        'Finish button': this.finishButton,
        'Cancel button': this.cancelButton,
        'Checkout summary': this.checkoutSummary,
        'Payment information': this.paymentInfo,
        'Shipping information': this.shippingInfo,
        'Item total': this.itemTotal,
        'Tax': this.tax,
        'Total': this.total,
        'Complete header': this.completeHeader,
        'Complete text': this.completeText,
        'Back to products button': this.backToProductsButton,
        'Checkout form': '.checkout_info',
        'Checkout title': '[data-test="title"]'
    };

    constructor(page: Page, baseUrl: string) {
        super(page, baseUrl);
    }

    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.actions.fillInput(this.firstNameInput, firstName);
        await this.actions.fillInput(this.lastNameInput, lastName);
        await this.actions.fillInput(this.postalCodeInput, postalCode);
    }

    async continueCheckout(): Promise<void> {
        await this.actions.clickElement(this.continueButton);
    }

    async finishCheckout(): Promise<void> {
        await this.actions.clickElement(this.finishButton);
    }

    async cancelCheckout(): Promise<void> {
        await this.actions.clickElement(this.cancelButton);
    }

    async getCheckoutSummary(): Promise<string> {
        return await this.actions.getText(this.checkoutSummary);
    }

    async getItemTotal(): Promise<string> {
        return await this.actions.getText(this.itemTotal);
    }

    async getTax(): Promise<string> {
        return await this.actions.getText(this.tax);
    }

    async getTotal(): Promise<string> {
        return await this.actions.getText(this.total);
    }

    async getCompleteHeaderText(): Promise<string> {
        return await this.actions.getText(this.completeHeader);
    }

    async getCompleteMessage(): Promise<string> {
        return await this.actions.getText(this.completeText);
    }

    async backToProducts(): Promise<void> {
        await this.actions.clickElement(this.backToProductsButton);
    }

    async isCheckoutComplete(): Promise<boolean> {
        return await this.actions.isVisible(this.completeHeader);
    }

    async isCheckoutFormVisible(): Promise<boolean> {
        return await this.actions.isVisible(this.firstNameInput);
    }
}
