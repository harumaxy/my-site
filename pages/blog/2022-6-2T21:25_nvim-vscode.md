# VS Code に Neovim 拡張入れた

date: 2022-06-02T12:25:53.729Z


## vim との付き合い

実は、vimは何度か挑戦した事があるが、結局「コレダルくね？」となってVSCodeに戻ってきた。

なので、未だメインエディタにはなりえていない...

が、gitはコマンドライン派なのでコミットメッセージを書くときは使ってる

というくらいの距離感


## VSCode Neovim extension

これな 👇

https://marketplace.visualstudio.com/items?itemName=asvetliakov.vscode-neovim

vim っていうか neovim だけど (なんでも新しいほうがイイね)

vimバインディングだけ真似てるVSCode拡張もあるんだけど、Neovim拡張の方はバックエンドでホンモノのneovimを動かしてVSCodeといろいろ通信して実現しているらしい。(スゴそう)

neovimプラグインがVSCodeでもそのまま動いたりするらしい。

[このZennの投稿](draftbit.com/)を見れば凄さがわかる(かも)


## 良いところだけつまみ食いしたい

vimキーバインディングは、慣れたらキーボードから手を離さずに色々できるのは魅力

カッコいいし。

`gt`とか`ciw`とか`dd`とか`.`とか、シンプルなコマンド使ってるだけでも結構便利。

でも、.vimrcとかプラグイン管理とか難しそうだし、VSCodeの豊富な拡張機能を捨てるわけにもいかない。

(つーかVSCodeの何も拡張入れてない状態にvimを持っていこうとすると相当プラグイン入れなきゃいけないだろうし)

極めるとツヨイvimキーバインディングと、VSCodeのお手軽さ&豊富な拡張機能<br>
のいいとこ取りができるのがこの拡張機能のいいとこだと思う。

## jj で esc を置き換えてみた

insert モードで jj を入れると、normal モードに戻すという設定が流行ってるらしい


VSCode Neovim 拡張のinsertモードは、neovim関係なくすべての操作がVSCodeに以上されてるので VSCode のショートカットで設定しないといけない

`コマンドパレット > Preference: Open Keyboard Shortcuts (JSON)`

```json
  {
    "command": "vscode-neovim.compositeEscape1",
    "key": "j",
    "when": "neovim.mode == insert && editorTextFocus",
    "args": "j"
  },
```

escキーは遠いので、コレ使うと指の移動が少なくて小指に優しい！

が、これ無しで結構vimを触ってたので癖でescに指を伸ばしてしまうのだった...