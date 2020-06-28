export default interface CommandInterface {
    name: String;
    description: String;
    args: Number;
    usage: String;
    execute: Function;
}
