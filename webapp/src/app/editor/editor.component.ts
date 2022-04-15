import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {
  MonacoEditorComponent,
  MonacoEditorConstructionOptions,
  MonacoEditorLoaderService,
  MonacoStandaloneCodeEditor
} from '@materia-ui/ngx-monaco-editor';
import { Compiler } from '../interface/compiler';
import { CompilerService } from '../service/compiler.service';

import { ExecuteService } from '../service/execute.service';
import { Code, Output } from '../interface/code';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @ViewChild(MonacoEditorComponent, { static: false }) monacoComponent!: MonacoEditorComponent;
  userCode: string = "var a = 2";
  compilers: Compiler[] = []
  output: Output = <Output>{};
  userLanguage: string = "javascript";
  userTheme: string = "vs-dark";
  editorOptions: MonacoEditorConstructionOptions = {
    theme: this.userTheme,
    language: this.userLanguage,
    roundedSelection: true
  };

  editor!: MonacoStandaloneCodeEditor;
  constructor(private monacoLoaderService: MonacoEditorLoaderService, 
    private compilerService: CompilerService, 
    private executeService: ExecuteService) { }

  ngOnInit(): void {
    this.compilerService.getCompilers()
      .subscribe(compilers => {
        this.compilers = compilers
        console.log(this.compilers)
      })
  }

  editorInit(editor: MonacoStandaloneCodeEditor) {
    this.editor = editor
  }

  changeLanguage($event: any) {
    this.editorOptions = { ...this.editorOptions, language: $event.currentTarget.value }
  }
  runCode(){
    let code: Code = {
      userId: "1",
      problemId: "1",
      code: this.userCode,
      language: this.userLanguage
    }
    this.executeService.submitCode(code).subscribe( output => {
      this.userCode = output.run.output
      console.log(output)
    })
  }


}
