/**
 * Minimal panel controller for fixture flyout menus (see ../PARTNER.md).
 *
 * Copy into your plugin (e.g. `src/controllers/PanelController.jsx`) or merge the
 * `menuItems` / `invokeMenu` handling into your existing panel controller.
 *
 * `fixtureMenuItems` includes `"-"` strings for category separators. UXP requires
 * separators to stay as the string `"-"` — do not map them to `{ label: "-" }`
 * (that omits `id` and fails at plugin load).
 */
import ReactDOM from "react-dom";

const _menuItems = Symbol("_menuItems");

export class PanelController {
  constructor(Component, { menuItems } = {}) {
    this._Component = Component;
    this[_menuItems] = menuItems || [];
    this.menuItems = this[_menuItems].map((menuItem) => {
      if (menuItem === "-") {
        return "-";
      }

      const normalizedItem = {
        id: menuItem.id,
        label: menuItem.label,
        enabled: menuItem.enabled !== false,
      };

      if (typeof menuItem.checked !== "undefined") {
        normalizedItem.checked = menuItem.checked;
      }

      return normalizedItem;
    });

    ["create", "show", "hide", "destroy", "invokeMenu"].forEach((fn) => {
      this[fn] = this[fn].bind(this);
    });
  }

  create() {
    this._root = document.createElement("div");
    ReactDOM.render(this._Component(), this._root);
    return this._root;
  }

  show(event) {
    if (!this._root) this.create();
    event.appendChild(this._root);
  }

  hide() {
    if (this._root?.parentNode) {
      this._root.parentNode.removeChild(this._root);
    }
  }

  destroy() {}

  invokeMenu(id) {
    const menuItem = this[_menuItems].find((c) => c !== "-" && c.id === id);
    menuItem?.oninvoke?.();
  }
}
