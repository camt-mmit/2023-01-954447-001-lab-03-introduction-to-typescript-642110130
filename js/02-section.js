import { createComponent as createInutComponent } from "./input-component.js";
export function createComponent(componentElement) {
    const sectionTemplate = componentElement.querySelector("template.app-tmp-section");
    //
    if (sectionTemplate === null) {
        throw new Error(`Cannot find tmp`);
    }
    const sectionsList = sectionTemplate.parentElement;
    //
    if (sectionsList === null) {
        throw new Error(`Cannot find tmp`);
    }
    const updateList = () => {
        const children = [...sectionsList.children].filter((child) => child !== sectionTemplate);
        console.debug(children);
        children.forEach((child, i) => {
            [...child.querySelectorAll(".app-cmp-section-no")].forEach((element) => (element.textContent = `${i + 1}`));
        });
        //
        [
            ...sectionsList.querySelectorAll(".app-cmd-remove-section"),
        ].forEach((element) => (element.disabled = children.length === 1));
    };
    const createElement = () => {
        const fragments = sectionTemplate.content.cloneNode(true);
        const container = fragments.firstElementChild;
        //
        if (container === null) {
            throw new Error(`cannot find container`);
        }
        sectionsList.append(container);
        //
        container.addEventListener("click", (ev) => {
            if (ev.target?.matches?.(".app-cmd-remove-section")) {
                container.remove();
                updateList();
            }
        });
        updateList();
        createInutComponent(container);
    };
    componentElement.addEventListener("click", (ev) => {
        if (ev.target?.matches?.(".app-cmd-add-section")) {
            createElement();
        }
    });
    createElement();
}
