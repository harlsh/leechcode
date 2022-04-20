import { Component, OnInit, ViewChild, Inject, Input } from '@angular/core';
import {
  MonacoEditorComponent,
  MonacoEditorConstructionOptions,
  MonacoEditorLoaderService,
  MonacoStandaloneCodeEditor
} from '@materia-ui/ngx-monaco-editor';
import { Compiler } from '../../models/compiler';
import { CompilerService } from '../../services/compiler.service'

import { ExecuteService } from '../../services/execute.service';
import { Code, Output } from '../../models/code';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  @ViewChild(MonacoEditorComponent, { static: false }) monacoComponent!: MonacoEditorComponent;
  @Input() problemSlug: string = "";
  @Input() originalCode: string = "/*The output will be shown right in this editor. Please remove it before you submit again.*/";
  @Input() language: string = "javascript";

  userCode: string = "/*The output will be shown right in this editor. Please remove it before you submit again.*/";
  compilers: Compiler[] = []
  output: Output = <Output>{};
  userLanguage: string = "javascript";
  userTheme: string = "vs-dark";
  editorOptions: MonacoEditorConstructionOptions = {
    theme: this.userTheme,
    language: this.language,
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
        //console.log(this.compilers)
      })
      this.userCode = this.originalCode;
      this.editorOptions = { ...this.editorOptions, language: this.language }
      console.log(this.language)
      console.log(this.originalCode);

      
  }

  editorInit(editor: MonacoStandaloneCodeEditor) {
    this.editor = editor
  }

  changeLanguage($event: any) {
    this.editorOptions = { ...this.editorOptions, language: $event.currentTarget.value }
  }
  runCode(){
    let user = localStorage.getItem('user');
    let uid = "error";
    if(user){
      let userJSON = JSON.parse(user);
      uid = userJSON.uid;
    }
    console.log(uid);
    let code: Code = {
      userId: uid,
      problemSlug: this.problemSlug,
      code: this.userCode,
      language: this.userLanguage
    }
    console.log(localStorage.getItem('user')) // user is a string, need to parse uid and put it in line 58
    this.executeService.submitCode(code).subscribe( output => {
      let line = "\n-------------------------------------------\n"
      this.userCode += line +"output\n"+output.data.run.output
      this.userCode += line+"testcases\n"+output.testcases
      console.log(output)
    })
  }


}
