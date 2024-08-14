export class Random {
    static random() {
        return Math.random();
    }
    static withinRange(a, b) {
        let d = b-a;
        return a+Random.random()*d;
    }
    static IntegerWithinRange(a, b) {
        return Math.round(Random.withinRange(a, b));
    }
    static chooseFromArray(arr) {
        return arr[Math.floor(Random.random()*arr.length)];
    }
    static stringID(length=4) {
        // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }
}