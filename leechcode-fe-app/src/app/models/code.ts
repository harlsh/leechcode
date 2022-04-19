export interface Code {
    userId: string| null;
    problemSlug: string;
    code: string;
    language: string;
}

export interface Output {
    language: string;
    version: string;
    run: Run;

}

export interface Run{
    stdout: string;
    output: string;
}