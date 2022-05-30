# Bevy ゲームエンジン触ってる

というか、はじめて触ったのは結構前なんだけど、最近また触り始めてる。

Youtube にいっぱいチュートリアルが転がってる

コレやってる👉 https://www.youtube.com/watch?v=WnUzWuaMzuM&t


## ECS

bevy において、ゲーム世界を構成するシステムを`Entity Component System`という

- Entity : ユニークidの整数値を持つ構造体
- Component : Entity に紐付けられたパラメータ (= Rust struct)
- System : 上記２つに何らかの処理をする関数 (= Rust function)

[bevy ECS](https://bevyengine.org/learn/book/getting-started/ecs/)

従来のゲームエンジン(Unity, Unreal Engine, Godot)はオブジェクト指向で、GameObject class 的なものを継承してメソッドをオーバーライドするような感じで挙動を記述していく。

それに対して、ECSはデータ指向であり挙動と(system)とデータ(entity+component)を分けて書く感じ。

### 開発時の感覚

これは...データベース使うのと似た感覚じゃな...

BevyのSystem(関数)で、`Query`を使って条件(特定のComponentを含むEntity及びComponentを取得、みたいな)で絞ったデータを引っ張ってきて、そのデータを参照したり更新したり。

オブジェクト指向と違うんなら関数型プログラミング的なテクニックが使えるのかな？みたいなこと思ってたけど、それはNo。BevyのSystem(関数)は基本的に、`なんかQueryする -> 副作用的な操作(mutableなデータの更新とか)をする`という非純粋関数なので。

だが、Bevy Pluginシステムは良さげ。SystemやResourceをapplicationに登録する部分をグループ化して分割、モジュール化できる。

他人の書いたPluginもrust crateとして配布されてたりする。そういうのを使いこなせるようになれば、自分で書くコードが減って楽に作れそうだ。

### 難しいところ

Rustはborrow checkerを意識して書かないといけないので、mutableな操作が必要な場合、Queryの戻り値への変数バインドとか要所で必要に応じて`mut`, `&mut` を使い分けて書く必要がある。

lint でエラー出たら直せばいいだけなんだけど、普段ガベージコレクタついてる言語で書くのに慣れてると若干ダルい。

### 目標

とりあえずYoutubeのチュートリアル全部終わらせる。

## Rust Game Engines いろいろ

Rust製ゲームエンジンは他にも色々ある。


- [bevy](https://github.com/bevyengine/bevy)
  - [amethyst](https://github.com/amethyst/amethyst) (archived)
- [fyrox](https://github.com/FyroxEngine/Fyrox) (旧rg3d)
- [piston](https://github.com/PistonDevelopers/piston)
- [ggez](https://github.com/ggez/ggez)

amethystの開発は中止されている。amethystとbevyは協業体制にあり、[bevyが実質的にamethyst2.0](https://community.amethyst.rs/t/bevy-engine-addressing-the-elephant-in-the-room/1645)ということらしい

### 比較

piston, ggez はぱっと見た感じ、イベントループでウィンドウを更新するという感じ。従来のGUIアプリケーション作成と似たような感じでシンプルなものなら簡単そう。

大規模なゲームを作るなら、UnityやUnrealのようにアセットやシーンをグラフィカルに操作するエディターがついてたほうがいい。プラグインなど拡張性や、コードの再利用のし易いエンジンの実装になっていることも重要。そのニーズを満たしそうなのはbevyかfyroxだ。

### Bevy vs Fyrox ?

bevy は ECS を採用している。

fyrox は OOP を採用している (ただし、inheritanceよりcompositionを重視する)。

UnityがECSを導入していたり従来のOOPに比べてECSはナウくて上位互換なのかと思っていたけど、実際にECSが威力を発揮するのは`何千何万というゲームオブジェクトを並列に処理するとき`で、小さいゲームだとそんなにメリットが無いらしい。

そのレベルだったら、ECSとOOPのアプローチのどちらが好みかで選んで良さそう。

あと、bevy は UIライブラリはあるもののエディター実装がまだまだなのに対し、fyroxはエディターが既に実装済み？(repoに画像とか乗ってる)らしいので、そういうのを重視するならfyroxかも。

fyroxは触ったこと無いので、そのうち触ってみたい。触らんことには良し悪しわからないしネ。