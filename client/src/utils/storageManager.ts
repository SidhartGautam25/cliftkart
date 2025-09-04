export class StorageManager{
    private static readonly KEYS={
        USER:'user',
        IS_AUTHENTICATED:'isAuthenticated',
        CART_ITEMS:'cartItems',
        SHIPPING_INFO:'shippingInfo',
        REFRESH_TOKEN:'refreshToken'
    } as const;


  static setUser(user: any): void {
    try {
      localStorage.setItem(this.KEYS.USER, JSON.stringify(user));
      localStorage.setItem(this.KEYS.IS_AUTHENTICATED, 'true');
    } catch (error) {
      console.error('Failed to save user to storage:', error);
    }
  }

    static getUser(): any {
    try {
      console.log("getting user detail from local storage")
      const user = localStorage.getItem(this.KEYS.USER);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Failed to get user from storage:', error);
      return null;
    }
  }

   static setCartItems(items: any[]): void {
    try {
      localStorage.setItem(this.KEYS.CART_ITEMS, JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save cart items:', error);
    }
  }

  static getCartItems(): any[] {
    try {
      const items = localStorage.getItem(this.KEYS.CART_ITEMS);
      return items ? JSON.parse(items) : [];
    } catch (error) {
      console.error('Failed to get cart items:', error);
      return [];
    }
  }

   static setShippingInfo(info: any): void {
    try {
      localStorage.setItem(this.KEYS.SHIPPING_INFO, JSON.stringify(info));
    } catch (error) {
      console.error('Failed to save shipping info:', error);
    }
  }

  static getShippingInfo(): any {
    try {
      const info = localStorage.getItem(this.KEYS.SHIPPING_INFO);
      return info ? JSON.parse(info) : {};
    } catch (error) {
      console.error('Failed to get shipping info:', error);
      return {};
    }
  }

  static isAuthenticated(): boolean {
    return localStorage.getItem(this.KEYS.IS_AUTHENTICATED) === 'true' && this.getUser() !== null;
  }

   static clearAuthData(): void {
    localStorage.removeItem(this.KEYS.USER);
    localStorage.removeItem(this.KEYS.IS_AUTHENTICATED);
    localStorage.removeItem(this.KEYS.REFRESH_TOKEN);
  }

  static clearCartData(): void {
    console.log("you are trying to delete the local cart items");
    console.log("before deleting the details ",localStorage.getItem(this.KEYS.CART_ITEMS))
    localStorage.removeItem(this.KEYS.CART_ITEMS);
    console.log("after deleting the details ", localStorage.getItem(this.KEYS.CART_ITEMS));
    localStorage.removeItem(this.KEYS.SHIPPING_INFO);
  }

  static clearAllData(): void {
    this.clearAuthData();
    this.clearCartData();
  }
}
