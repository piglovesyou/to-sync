import crossSpawn from 'cross-spawn';

type JSONPrimitive = string | number | boolean | null;
type JSONValue = JSONPrimitive | JSONObject | JSONArray;
type JSONObject = { [member: string]: JSONValue };
type JSONArray = JSONValue[];

export type Value = JSONValue

export type AsyncFn<I extends Value[] = Value[], O extends Value = Value> =
    (...v: I) => Promise<O>

const gen:
    (input: Value[], fn: AsyncFn<any, any>) => string
=
    (input, fn) => `
const main = async () => {
    console.log(JSON.stringify(await (${fn})(...${JSON.stringify(input)})));
}

main().catch(e => console.error(e));
`
;

export const doSync:
    <I extends Value[], O extends Value>(f: AsyncFn<I,O>) =>
        (...ip: I) => O
=
    fn => (...ip) => {
        const proc = crossSpawn.sync('node', ['-'], {
            input: gen(ip, fn)
        });

        if (proc.error) throw Error;
        const stderr = proc.stderr.toString('utf-8').trim();
        if (stderr) console.error(stderr);
        
        return JSON.parse(proc.stdout.toString('utf-8'));
    }
;

export default doSync;