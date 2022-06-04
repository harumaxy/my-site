# Youtube の Bevy Tutorial 完了した

date: 2022-06-04T11:04:51.303Z

1週間前に始めたやつ今日終わった。典型的なコマンドバトルRPGを作るチュートリアル。

コレ👉 https://www.youtube.com/watch?v=WnUzWuaMzuM&t

コーディングする系のyoutube動画は、githubのリンク乗ってたらそこに飛んでソースを直接写経したあとに動画見たほうが頭に入るな...

# 学んだこと

## Resource と State

Resource と State はどちらも任意のRust Structを登録ということで認識がごっちゃだったんだけど、理解した。

### State<T>

ECS の System で取得するときは、`Res<State<T>>`で取得するので実質的にはResourceの一種

画面切り替えとか、ポーズ・再開とかそういうのの実装に使える系のやつ。要するにStack State Machine。

```md
- ゲームにおける状態を管理できる
- Stack ベースな State Machine 実装
  - State は Rust の enum で定義する
- 4種の操作ができる
  - push : 新しいstateに移行
  - pop : 1つ前のstateに戻る
  - set : 現在のstateを新しいstateで置き換え
  - replace : Stack すべてを入れ替え
- 状態遷移に応じて、SystemSet(処理のまとまり)を登録して実行できる
```
※あとでbevy_cheet_bookの[このページ](https://bevy-cheatbook.github.io/programming/states.html)を見たら、[iyes_loopless](https://github.com/IyesGames/iyes_loopless)っていう実装を使ったほうが良いよって言ってた

### Resource

任意のRust structのインスタンスを登録し、ゲーム内のグローバルなデータとして使える機能。1つしか同じ型のインスタンスを登録できない。

`Res<T>`, `ResMut<T>` でリソースにアクセスする。Dependencies Injection的なことは出来なさそう。基本的にゲーム内に1つしか必要ないデータはコレでOK(別に1つしかないとしてもEntity&Componentにして管理しても良い)

グローバル変数とか、※Singletonっぽい感じ。だがネームスペースは汚さない。

デフォルトプラグインで追加されてるリソースが結構ある

- `AssetServer`
- `Assets<T>`
  - Texture
  - TextureAtlas
  - Audio
  - ...


※(Singleton は Design Patternとか言って良い子ちゃんヅラしてるが、OOPにおけるグローバル変数の別名だと思ってるのでオレは嫌い)

## SystemSet

Systemを複数組み合わせてセットにして、まとめて登録したりできる。Stateと組み合わせて使う強力な機能。

```rs
// main.rs
pub enum GameState {
    Startmenu,
    Overworld,
    Combat,
}
```

```rs
// player.rs
impl Plugin for PlayerPlugin {
    fn build(&self, app: &mut App) {
        app.add_system_set(SystemSet::on_enter(GameState::Overworld).with_system(spawn_player)) 
            .add_system_set(SystemSet::on_resume(GameState::Overworld).with_system(show_player))
            .add_system_set(SystemSet::on_pause(GameState::Overworld).with_system(hide_player))
            .add_system_set(
                SystemSet::on_update(GameState::Overworld)
                    .with_system(player_movement)
                    .with_system(camera_follow.after(player_movement))
                    .with_system(player_encounter_checking),
            );
    }
}
```

チュートリアルのRPGには3つのGameStateがある。

- Startmenu
- Overworld(フィールド画面)
- Combat(エンカウント戦闘画面)

で、PlayerPluginの実装を見ると、`app.add_system_set()`でゲーム状態の遷移にあったSystemSetを実行するように設定している。

- `on_enter(GameState::Overworld)`
  - Player Entity (+ Spriteとか) のスポーン
- `on_pause(GameState::Overworld)`
  - Player を隠す
- `on_resume(GameState::Overworld)`
  - Player の再表示
- `on_update(GameState::Overworld)`
  - Player の移動
  - カメラ追従
  - エンカウントチェック

みたいな。

UnityのMonobehaviourライフサイクルメソッドみたいな名前だよね。

## bevy-inspector-egui

https://github.com/jakobhellermann/bevy-inspector-egui

これはサードパーティcrate

このプラグインを使うと、ゲームのデバッグ実行中に`#[derive(Inspectable, Reflect)]`でtraitを実装したComponentのデータを見たり、変更したりできる。

パラメータ調整とかに役立ちそう。

# まとめ

やっぱコードの写経は最強の勉強法ですな。

ダルいからあんまやんないけど...

Bevyはまだ、UnityやUnreal的なシーンエディターがないのでほとんどをコードで実装する必要があるのがめんどくさいが、慣れると洗練されたエンジンシステムだと感じてきた。

今後のアップデートに期待しつつ、他にもいろんなチュートリアルを写経して自分のプログラマとしての性能もアップグレードせねば...

終わり
