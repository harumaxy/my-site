const title = Deno.args.at(0) ?? "title";
const now = new Date();
const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
const filename = `${date}T${time}_${title}.md`;

Deno.writeTextFile(`pages/blog/${filename}`, `# ${title}`);
