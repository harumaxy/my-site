# このブログの使用技術

- Deno
- diplodocus
- Deno deploy
  - SSR

## Good な点

### zero-config

ほぼ設定ファイルを書いてない。

Denoを使ってるし、SSRのためブラウザコードへのトランスパイルを考えないので `package.json`, `webpack.config` とか `vite.config` とか難しいことは何もいらない。

Deno Deployでホスティングしてるので、ホスティングのための設定ファイルも必要なくgitにpushしたら `server.ts` を実行するだけ。

## 他の技術スタックとの比較

ブログ作成のため使用したSSG(Static Site Generator)の遍歴

```sh
- Wordpress
- Hugo (Golang)
- Gatsby.js
- Next.js
- Docusaulus
- Sapper.js
- Aleph.js
```

フロントエンドの勉強も兼ねて色々と触ってきたけど、プロジェクト内にファイルが散らかるの面倒臭い...

JAMスタックだと自分で好みのページレイアウトに書き換えたりもできるのだけど、趣味の個人ブログだとあんまり必要ないなって気づいた。  
（仕事の商用サイトは気合い入れて作ったほうがいいので、Reactやその他のライブラリを使ったほうがいいのだろうけど）

結局の所はファイルベースのルーティング&SSGと `Prism.js` のコードハイライトがあれば何でもいいな...という感じなので`Diplodocus` はかなりハマってる

- Prism.js によるコードハイライト
- File System based なページ生成
- スタンダードなページレイアウト
  (自分で作らなくてもいい感じなブログになる)
- ほぼ zero-config
  (サイト名やナビゲーターをYAMLで設定するだけ)

## 懸念だった点 : パフォーマンス

このサイトは Deno Deploy でホスティングしている。  
Serverless Function (Edge computing) による SSR ということ。

一般的な Object Storage + CDN という一般的なサイト配信に対して、SSRの計算コスト分レスポンスが遅くなるのではないかと思ったが、

![Image from Gyazo](https://i.gyazo.com/1ffb303391149c701c885cd37e52539d.png)

Light House はかなり良い  
(まだページコンテンツが少ないからかもしれないけど)

Qiita とか Zenn みたいな記事投稿サービスは動的なコンテンツをPOSTして永続化するためバックエンドにDBとかが必要だが、個人ブログ程度なら更新頻度も少ないので更新のたび git に push > deploy する SSG がベストだと言う認識だった...

のだが、ムーアの法則でCPUなどもどんどん高速化してるので、ボトルネックは計算リソースよりネットワークの速度とか物理的な距離とかに移ってきているのかもしれない。Deno Deploy はエッジでTypeScriptを実行するので、クライアントとネットワーク距離が近いので早いってこと。

今の所いい感じだが、アクセスが増えるとキャッシュの影響とかでSSGに劣るかも知れないし、同じエッジでのSSRでも Remix.js のほうが効率的になったりするのかもしれないが、アクセスが増えてきたら考えればいい。

(今の所、Deno Deploy は無料で使えてるし)
