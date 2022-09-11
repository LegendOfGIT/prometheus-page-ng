
export abstract class FactoryBase {

    static buildBase<T>(source: any): T {
        const target: T = {
            ...source
        };

        return target;
    }
}

export abstract class BaseModel {

    protected static addDateTime?: boolean;
    protected static dateFields: string[];
    protected static dateDBFields: string[];
    protected static children: string[];
    protected static bindChild(fieldName: string, data: any): any {
        throw Error('ERR! You have to override bindChild().');
    }
    // you have to override this static
    static fromModel(data: any): any {
        throw Error('ERR! You have to override fromModel().');
    }

    protected static bindFrom<T, S extends BaseModel>(type: new () => S, data: T): S | null {
        if (!!data) {
            const e = new type();
            const keys = Object.keys(data);
            keys.forEach(key => {
                let val = (data as any)[key];

                // binding date fields
                if (!!this.children && this.children.length > 0) {
                    const childKey = this.children.find(entry => entry === key);
                    if (!!childKey) {
                        if (Array.isArray((data as any)[key])) {
                            val = (data as any)[key].map((entry: any) => this.bindChild(childKey, entry));
                        } else {
                            val = this.bindChild(childKey, (data as any)[key]);
                        }

                    }
                }

                if (typeof val === 'string') {
                    if (val === 'true') {
                        val = true;
                    } else if (val === 'false') {
                        val = false;
                    }
                }

                (e as any)[key] = val;
            });

            return e;
        }
        return null;
    }

    static deserialize(data: string): any {
        return JSON.parse(data);
    }

    simplify() {
        return this.simplifyWithChildren(undefined);
    }

    protected simplifyChild(fieldName: string, data: any) {
        throw Error('ERR! You have to override simplifyChild.');
    }

    protected simplifyWithChildren(simplifyChildList: string[] | undefined) {
        const keys = Object.keys(this);
        const simple = {};
        keys.forEach(key => {
            if (!!simplifyChildList && simplifyChildList.length > 0) {
                // binding child objects
                if (simplifyChildList.includes(key)) {
                    if (Array.isArray((this as any)[key])) {
                        (simple as any)[key] = (this as any)[key].map((entry: any) => this.simplifyChild(key, entry));
                    } else {
                        (simple as any)[key] = this.simplifyChild(key, (this as any)[key]);
                    }
                }
            } else {
                (simple as any)[key] = this.simplifyIt((this as any)[key]);
            }
        });

        return simple;
    }

    private simplifyIt(data: any) {
        let val: any;
        if (Array.isArray(data)) {
            val = data.map((d, i) => {
                return this.simplifyIt(d);
            });
        } else if (!!data && !!data.toString && typeof data.toString === 'function') {
            val = data.toString();
        } else {
            val = data;
        }

        return val;
    }

    serialize() {
        return JSON.stringify(this.simplify());
    }
}
