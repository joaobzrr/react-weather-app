import make from "@bzrr/useclasses";
const { useClasses, serializeClasses } = make([
    {
        name: "TextInput",
        group: "default"
    },
    {
        name: "TextInput__focused",
        group: null
    }
]);

export { useClasses, serializeClasses };
