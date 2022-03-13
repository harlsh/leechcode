import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MonacoEditorComponent,
  MonacoEditorConstructionOptions,
  MonacoEditorLoaderService,
  MonacoStandaloneCodeEditor
} from '@materia-ui/ngx-monaco-editor';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @ViewChild(MonacoEditorComponent, { static: false }) monacoComponent!: MonacoEditorComponent;
  userCode: string = "var a = 2";

  userLanguage: string = "javascript";
  availableLanguages: string[] = [
    "javascript",
    "java",
    "c",
    "go"
  ];
  userTheme: string = "vs-dark";
  editorOptions: MonacoEditorConstructionOptions = {
    theme: this.userTheme,
    language: this.userLanguage,
    roundedSelection: true
  };

  editor!: MonacoStandaloneCodeEditor;
  constructor(private monacoLoaderService: MonacoEditorLoaderService) { }

  ngOnInit(): void {
  }

  editorInit(editor: MonacoStandaloneCodeEditor) {
    this.editor = editor
  }

  changeLanguage($event: any) {
    this.editorOptions = { ...this.editorOptions, language: $event.currentTarget.value }
  }

}
