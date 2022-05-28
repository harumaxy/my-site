# Denoで便利なCLI (ブログ記事ファイル生成)

最近はMarkdownで書いてJavascriptでレンダリングするJAMスタックが流行っていますよね。

ブログの記事はMarkdownファイルで書くのですが、ファイルパスベースでslugが作成されたりするのでかぶらないように名前を付けないといけない。

`{datetime}_{title}.md` みたいな感じにすれば、時間を使ってユニークな名前にできるのでDenoでそういうCLIを書いてみた。

## コード

```ts
// gen-blog.ts
const title = Deno.args.at(0) ?? "title";
const now = new Date();
const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
const filename = `${date}T${time}_${title}.md`;

Deno.writeTextFile(`pages/blog/${filename}`, `# ${title}`);
```

`time` の部分は秒数が余分だと思ったので削ってみた(1分以内に技術記事を書き終わって次行く人なんておらんやろ)

`Deno.args` はコマンドラインの位置引数を取るのに便利  
フラグ変数を取りたかったらもっと別のラッパーライブラリを使ったほうがいいかもだが、単純なスクリプトならこれで十分

## Deno task で実行

Deno v1.20 から使える様になった[公式のTask Runner](https://deno.land/manual/tools/task_runner)があります。

このスクリプトはファイル書き込みをするので、`deno run --allow-read` というふうにフラグを付けなければならないですが、毎回打つのはめんどいのでtaskとして名前を付けると楽。

```jsonc
{
  "tasks": {
    "dev": "deno run -A --watch --unstable server.ts",
    "gen": "deno run --allow-write gen-blog.ts"
  }
}
```

```sh
deno task gen my-post
```

こんな感じ
