import { cac } from "../../node_modules/cac/dist/index";
const cli = cac('rawfox');
export function setCommands(config) {
    const c = cli.command(`${config.name} [${config.valueName}]`, config.description);
    if (config.options)
        for (const i of config.options) {
            c.option(`${i.name ? "-" + i.name + ", " : ""}--${i.otherName} ${i.type === 'valued' ? "<" + i.valueName + ">" : ""}`, i.description ?? "");
        }
    c.action(async (p, o) => {
        await config.action(p, o);
    });
}
export function build() {
    cli.help();
    cli.parse();
}
