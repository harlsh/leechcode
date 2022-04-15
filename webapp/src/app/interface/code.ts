export interface Code {
    userId: string;
    problemId: string;
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