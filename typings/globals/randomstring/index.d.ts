// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/80060c94ef549c077a011977c2b5461bd0fd8947/randomstring/index.d.ts
declare namespace Randomstring {
    interface GenerateOptions {
        length?: number;
        readable?: boolean;
        charset?: string;
        capitalization?: string;
    }

    function generate(options?: GenerateOptions): string;
}

declare module "randomstring" {
    export = Randomstring;
}
