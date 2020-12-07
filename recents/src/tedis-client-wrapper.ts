const { Tedis  } = require("tedis");

class TedisClientWrapper {
    private _client?: typeof Tedis;

    get client() {
        if (!this._client) {
            throw new Error('Cannot access NATS client before connecting');
        }

        return this._client;
    }

    connect(port: number,host: string) {
        this._client = new Tedis({
            port,host
        })
        return new Promise((resolve, reject) => {
            this.client.on('connect', () => {
                console.log('Connected to Redis Server');
                resolve({});
            });
            this.client.on('error', (err: any) => {
                reject(err);
            });
        });
    }
}

export const tedisClientWrapper: typeof Tedis= new TedisClientWrapper();
