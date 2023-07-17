export function createComponent(componentElement) {
    const inputTemplate = componentElement.querySelector("template.app-tmp-input");
    if (inputTemplate === null) {
        throw new Error(`Cannot find tmp`);
    }
    const inputsList = inputTemplate.parentElement;
    if (inputsList === null) {
        throw new Error(`Cannot find list`);
    }
    const updateResult = () => {
        const children = [...inputsList.children].filter((child) => child !== inputTemplate);
        const result = children.reduce((carry, child) => carry +
            (child.querySelector('input[type="number"].app-cmp-input')?.valueAsNumber ?? 0), 0);
        [
            ...componentElement.querySelectorAll("output.app-cmp-result"),
        ].forEach((element) => (element.value = `${result.toLocaleString()}`));
    };
    const updateList = () => {
        updateResult();
        const children = [...inputsList.children].filter((child) => child !== inputTemplate);
        children.forEach((child, i) => {
            child
                .querySelectorAll(".app-cmp-input-no")
                .forEach((element) => (element.textContent = `${i + 1}`));
        });
        inputsList
            .querySelectorAll(".app-cmd-remove-input")
            .forEach((element) => (element.disabled = children.length === 1));
    };
    const createElement = () => {
        const fragments = inputTemplate.content.cloneNode(true);
        const container = fragments.firstElementChild;
        inputsList.append(container);
        if (container === null) {
            throw new Error(`cannot find container`);
        }
        container.addEventListener("click", (ev) => {
            if (ev.target?.matches?.(".app-cmd-remove-input")) {
                container.remove();
                updateList();
            }
        });
        updateList();
        // ถ้าไม่ใส่ตรงนี้อีกที มันก็จะอัพเดท Number ... เมื่อกดปุ่มลบเท่านั้น จปตส.
    };
    componentElement.addEventListener("click", (ev) => {
        if (ev.target?.matches?.(".app-cmd-add-input")) {
            createElement();
        }
    });
    inputsList.addEventListener("change", (ev) => {
        if (ev.target?.matches?.('input[type="number"].app-cmp-input')) {
            updateResult();
        }
    });
    createElement();
}
