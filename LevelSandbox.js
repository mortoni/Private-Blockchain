/* ===== Persist data with LevelDB ==================
|  Learn more: level: https://github.com/Level/level |
/===================================================*/

const level = require('level');
const chainDB = './chaindata';

class LevelSandbox {

    constructor() {
        this.db = level(chainDB);
    }

    getLevelDBData(key){
        let self = this;
        return new Promise((resolve, reject) => {
            self.db.get(key, (err, value) => {
                if (err) reject(err);
                resolve(value);
            })
        });
    }

    addLevelDBData(key, value) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.db.put(key, value, (err) => {
                if (err) reject(err);
                resolve(value);
            })
        });
    }

    getBlocksCount() {
        let self = this;
        let count = 0;
        return new Promise((resolve, reject) => {
            self.db.createReadStream()
                .on('data', (data) => count++)
                .on('error', (err) => reject(err))
                .on('close', () => resolve(count));
        });
    }
}

module.exports.LevelSandbox = LevelSandbox;
