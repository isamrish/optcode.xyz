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

  const disposable = vscode.commands.registerCommand(
    "optcode.helloWorld",
    () => {
      vscode.window.showInformationMessage("Hello World from optcode!");
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
