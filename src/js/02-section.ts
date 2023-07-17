import { createComponent as createInutComponent } from './input-component.js';

export function createComponent(componentElement: HTMLElement) {
  const sectionTemplate = componentElement.querySelector<HTMLTemplateElement>(
    'template.app-tmp-section',
  );
//
  if(sectionTemplate === null){
    throw new Error(`Cannot find tmp`);
  }
  const sectionsList = sectionTemplate.parentElement;
//
  if(sectionsList === null){
    throw new Error(`Cannot find tmp`);
  }
  const updateList = () => {
    const children = [...sectionsList.children].filter(
      (child) => child !== sectionTemplate,
    );
console.debug(children);
    children.forEach((child, i) => {
      [...child.querySelectorAll('.app-cmp-section-no')].forEach(
        (element) => (element.textContent = `${i + 1}`),
      );
    });
//
    [...sectionsList.querySelectorAll<HTMLElement & { disabled: boolean}>('.app-cmd-remove-section')].forEach(
      (element) => (element.disabled = children.length === 1),
    );
  };

  const createElement = () => {
    const fragments = sectionTemplate.content.cloneNode(true) as DocumentFragment;
    const container = fragments.firstElementChild as HTMLElement;
//
    if(container === null ){
      throw new Error(`cannot find container`);
    }
    sectionsList.append(container);
//   
    container.addEventListener('click', (ev) => {
      if ((ev.target as Element | null)?.matches?.('.app-cmd-remove-section')) {
        container.remove();

        updateList();
      }
    });

    updateList();

    createInutComponent(container);
  };

  componentElement.addEventListener('click', (ev) => {
    if ((ev.target as Element | null)?.matches?.('.app-cmd-add-section')) {
      createElement();
    }
  });

  createElement();
}