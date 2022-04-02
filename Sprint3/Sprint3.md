# Front End Updates: 
1. Implemented Firebase Authentication
2. Created Login,Register, Forgot Password Pages
3. Completely Refactored all previously created pages to improve site's responsiveness
4. Added Google Sign In Authentication
5. Added more cypress tests and front end tests

# Backend Updates 

#### Execute Endpoint

`POST /api/v2/execute`
This endpoint requests execution of some arbitrary code.

-   `language` (**required**) The language to use for execution, must be a string and must be installed.
-   `version` (**required**) The version of the language to use for execution, must be a string containing a SemVer selector for the version or the specific version number to use.
-   `files` (**required**) An array of files containing code or other data that should be used for execution. The first file in this array is considered the main file.
-   `files[].name` (_optional_) The name of the file to upload, must be a string containing no path or left out.
-   `files[].content` (**required**) The content of the files to upload, must be a string containing text to write.
-   `files[].encoding` (_optional_) The encoding scheme used for the file content. One of `base64`, `hex` or `utf8`. Defaults to `utf8`.
-   `stdin` (_optional_) The text to pass as stdin to the program. Must be a string or left out. Defaults to blank string.
-   `args` (_optional_) The arguments to pass to the program. Must be an array or left out. Defaults to `[]`.
-   `compile_timeout` (_optional_) The maximum time allowed for the compile stage to finish before bailing out in milliseconds. Must be a number or left out. Defaults to `10000` (10 seconds).
-   `run_timeout` (_optional_) The maximum time allowed for the run stage to finish before bailing out in milliseconds. Must be a number or left out. Defaults to `3000` (3 seconds).
-   `compile_memory_limit` (_optional_) The maximum amount of memory the compile stage is allowed to use in bytes. Must be a number or left out. Defaults to `-1` (no limit)
-   `run_memory_limit` (_optional_) The maximum amount of memory the run stage is allowed to use in bytes. Must be a number or left out. Defaults to `-1` (no limit)

```json
{
    "language": "js",
    "version": "15.10.0",
    "files": [
        {
            "name": "my_cool_code.js",
            "content": "console.log(process.argv)"
        }
    ],
    "stdin": "",
    "args": ["1", "2", "3"],
    "compile_timeout": 10000,
    "run_timeout": 3000,
    "compile_memory_limit": -1,
    "run_memory_limit": -1
}
```

A typical response upon successful execution will contain 1 or 2 keys `run` and `compile`.
`compile` will only be present if the language requested requires a compile stage.

Each of these keys has an identical structure, containing both a `stdout` and `stderr` key, which is a string containing the text outputted during the stage into each buffer.
It also contains the `code` and `signal` which was returned from each process.

```json
HTTP/1.1 200 OK
Content-Type: application/json
{
    "language": "js",
    "version": "15.10.0",
    "run": {
        "stdout": "[\n  '/piston/packages/node/15.10.0/bin/node',\n  '/piston/jobs/9501b09d-0105-496b-b61a-e5148cf66384/my_cool_code.js',\n  '1',\n  '2',\n  '3'\n]\n",
        "stderr": "",
        "output": "[\n  '/piston/packages/node/15.10.0/bin/node',\n  '/piston/jobs/9501b09d-0105-496b-b61a-e5148cf66384/my_cool_code.js',\n  '1',\n  '2',\n  '3'\n]\n",
        "code": 0,
        "signal": null
    }
}
```

If a problem exists with the request, a `400` status code is returned and the reason in the `message` key.

```json
HTTP/1.1 400 Bad Request
Content-Type: application/json
{
    "message": "html-5.0.0 runtime is unknown"
}
```

<br>

# Supported Languages

`awk`,
`bash`,
`befunge93`,
`brachylog`,
`brainfuck`,
`c`,
`c++`,
`cjam`,
`clojure`,
`cobol`,
`coffeescript`,
`cow`,
`crystal`,
`csharp`,
`csharp.net`,
`d`,
`dart`,
`dash`,
`dragon`,
`elixir`,
`emacs`,
`emojicode`,
`erlang`,
`file`,
`forte`,
`fortran`,
`freebasic`,
`fsharp.net`,
`fsi`,
`go`,
`golfscript`,
`groovy`,
`haskell`,
`husk`,
`iverilog`,
`japt`,
`java`,
`javascript`,
`jelly`,
`julia`,
`kotlin`,
`lisp`,
`llvm_ir`,
`lolcode`,
`lua`,
`matl`,
`nasm`,
`nasm64`,
`nim`,
`ocaml`,
`octave`,
`osabie`,
`paradoc`,
`pascal`,
`perl`,
`php`,
`ponylang`,
`powershell`,
`prolog`,
`pure`,
`pyth`,
`python`,
`python2`,
`racket`,
`raku`,
`retina`,
`rockstar`,
`rscript`,
`ruby`,
`rust`,
`scala`,
`sqlite3`,
`swift`,
`typescript`,
`basic`,
`basic.net`,
`vlang`,
`vyxal`,
`yeethon`,
`zig`,

<br>
