export class User {
    constructor(
        public email: string, 
        public id: string, 
        private _tokken: string, 
        private _tokkenExpireDate: Date) {}

    get token() {
        if (!this._tokkenExpireDate || new Date() > this._tokkenExpireDate ) {
            return null;
        }
        return this._tokken;
    }
}