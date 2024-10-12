import * as vscode from "vscode";
import { getNonce } from "./utils";

class OptCodeViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "optcode.sectionView";

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    token: vscode.CancellationToken
  ) {
    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,

      localResourceRoots: [this._extensionUri],
    };

    webviewView.title = "Optcode section";
    webviewView.webview.html = this._getSectionWebView(webviewView.webview);
  }

  private _getSectionWebView(webview: vscode.Webview) {
    const mainJs = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "index.js")
    );

    const resetCss = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "reset.css")
    );

    const mainCss = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "index.css")
    );

    const nonce = getNonce();

    return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">

				<!--
					Use a content security policy to only allow loading styles from our extension directory,
					and only allow scripts that have a specific nonce.
				-->
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link href="${resetCss}" rel="stylesheet">
                <link href="${mainCss}" rel="stylesheet">
				<title>Opt Code: Optimize your code using Optcode AI</title>
			</head>
			<body>
               <div class="code-card">
                    <div class="code-head">
                        <p>Hello world!</p>
                        <div>X</div>
                    </div>
                    <div class="code-body"></div>
               </div>
				<script nonce="${nonce}" src="${mainJs}"></script>
			</body>
			</html>`;
  }
}

export default OptCodeViewProvider;
