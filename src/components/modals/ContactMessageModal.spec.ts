import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import ContactMessageModal from "./ContactMessageModal.vue";

const mountWithStubs = (props = {}) => {
  const defaultProps = {
    modelValue: true,
    icon: "move_to_inbox",
    color: "black",
    label: "Are you sure you want to move message to inbox?",
    submitButtonLabel: "Move",
    submitButtonColor: "red",
  };

  return mount(ContactMessageModal, {
    props: { ...defaultProps, ...props },
    global: {
      // Stub all Quasar components as simple div-s with slots
      stubs: {
        // q-dialog - modal container
        "q-dialog": {
          template:
            '<div class="q-dialog-stub" v-if="modelValue"><slot /></div>',
          props: ["modelValue", "persistent"],
        },
        // q-card - main card container
        "q-card": {
          template: '<div class="q-card-stub"><slot /></div>',
        },
        // q-card-section - card section with content
        "q-card-section": {
          template: '<div class="q-card-section-stub"><slot /></div>',
          props: ["class"],
        },
        // q-avatar - avatar icon
        "q-avatar": {
          template:
            '<div class="q-avatar-stub" :data-icon="icon" :data-color="color" :data-text-color="textColor"></div>',
          props: ["icon", "color", "textColor"],
        },
        // q-card-actions - buttons section
        "q-card-actions": {
          template: '<div class="q-card-actions-stub"><slot /></div>',
          props: ["align"],
        },
        // q-btn - buttons
        "q-btn": {
          template:
            '<button class="q-btn-stub" :data-label="label" :data-color="color" :data-flat="flat" @click="$emit(\'click\')"><slot>{{ label }}</slot></button>',
          props: ["label", "color", "flat"],
          emits: ["click"],
        },
      },
      // Mock Quasar directives
      directives: {
        "close-popup": {
          // v-close-popup directive - simulate its behavior
          mounted(el: HTMLElement) {
            el.setAttribute("data-close-popup", "true");
          },
        },
      },
    },
  });
};

describe("ContactMessageModal - basic behavior tests", () => {
  test("Should render modal with correct props", async () => {
    const wrapper = mountWithStubs({
      icon: "email",
      color: "primary",
      label: "Test message",
      submitButtonLabel: "Confirm",
      submitButtonColor: "green",
    });

    // Check if the modal is rendered
    const dialog = wrapper.find(".q-dialog-stub");
    expect(dialog.exists()).toBe(true);

    // Check if the avatar has correct props
    const avatar = wrapper.find(".q-avatar-stub");
    expect(avatar.attributes("data-icon")).toBe("email");
    expect(avatar.attributes("data-color")).toBe("primary");

    // Check if the text is displayed
    const label = wrapper.find("span");
    expect(label.text()).toBe("Test message");

    // Check if the buttons are displayed
    const buttons = wrapper.findAll(".q-btn-stub");
    expect(buttons).toHaveLength(2);

    // First button - cancel
    expect(buttons[0]?.attributes("data-label")).toBe("Cancel");
    expect(buttons[0]?.attributes("data-color")).toBe("primary");

    // Second button - submit
    expect(buttons[1]?.attributes("data-label")).toBe("Confirm");
    expect(buttons[1]?.attributes("data-color")).toBe("green");
  });

  test("Should emit submit event when submit button is clicked", async () => {
    const wrapper = mountWithStubs();

    // Find submit button
    const buttons = wrapper.findAll(".q-btn-stub");
    const submitButton = buttons[1];

    expect(submitButton).toBeDefined();

    // Click submit button (second button)
    await submitButton!.trigger("click");

    // Check if the event is emitted
    expect(wrapper.emitted("submit")).toBeTruthy();
    expect(wrapper.emitted("submit")).toHaveLength(1);
  });

  test("Should show/hide modal based on modelValue", async () => {
    const wrapper = mountWithStubs({ modelValue: false });

    // Modal should be hidden
    let dialog = wrapper.find(".q-dialog-stub");
    expect(dialog.exists()).toBe(false);

    await wrapper.setProps({ modelValue: true });

    // Modal should be displayed
    dialog = wrapper.find(".q-dialog-stub");
    expect(dialog.exists()).toBe(true);
  });

  test("Should render with default props", () => {
    const wrapper = mountWithStubs();

    const avatar = wrapper.find(".q-avatar-stub");
    expect(avatar.attributes("data-icon")).toBe("move_to_inbox");
    expect(avatar.attributes("data-color")).toBe("black");

    const label = wrapper.find("span");
    expect(label.text()).toBe(
      "Are you sure you want to move message to inbox?"
    );
  });
});
