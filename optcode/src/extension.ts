import * as vscode from "vscode";
import OptCodeViewProvider from "./optcode-view-provider";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "optcode" is now active!');

  const provider = new OptCodeViewProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      OptCodeViewProvider.viewType,
      provider
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "optcode.addSelectedCode",
      (selection: string) => {
        provider.addSelectedCode(selection);
      }
    )
  );

  const disposable = vscode.commands.registerCommand(
    "optcode.helloWorld",
    () => {
      vscode.window.showInformationMessage("Hello World from optcode!");
    }
  );

  context.subscriptions.push(disposable);

  const selectDisposable = vscode.commands.registerCommand(
    "optcode.select",
    function () {
      // Get the active text editor
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        const document = editor.document;
        const selection = editor.selection;
        const word = document.getText(selection);
        vscode.commands.executeCommand("optcode.addSelectedCode", word);
      }
    }
  );

  context.subscriptions.push(selectDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
