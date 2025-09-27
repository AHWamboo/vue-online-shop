import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import TextInput from "./TextInput.vue";
import { QInput } from "quasar";
import { nextTick } from "vue";

const rules = [
  (val: unknown) =>
    (typeof val === "string" && val.trim().length > 0) ||
    "Please enter your product name.",
  (val: unknown) =>
    !val || String(val).length <= 50 || "Please use maximum 50 characters.",
];

const mountWithStubs = (props = {}) => {
  const defaultProps = {
    modelValue: "model value",
    label: "label message",
    hint: "hint message",
  };

  return mount(TextInput, {
    props: { ...defaultProps, ...props },
    global: {
      components: { QInput },
    },
  });
};

describe("TextInput - basic behavior tests", () => {
  test("Renders with correct default prop values", () => {
    const wrapper = mountWithStubs();
    const input = wrapper.findComponent(QInput);

    expect(input.exists()).toBe(true);
    expect(input.props("label")).toBe("label message");
    expect(input.props("hint")).toBe("hint message");

    // verify input placeholder value
    const placeholder = wrapper.find(".q-field__label");
    expect(placeholder.exists()).toBe(true);
    expect(placeholder.text()).toBe("label message");

    // verify input hint value
    const hint = wrapper.find(".q-field__messages");
    expect(hint.exists()).toBe(true);
    expect(hint.text()).toBe("hint message");
  });

  test("Renders with different props values", () => {
    const wrapper = mountWithStubs({
      label: "different label message",
      hint: "different hint message",
    });
    const input = wrapper.findComponent(QInput);
    expect(input.props("label")).toBe("different label message");
    expect(input.props("hint")).toBe("different hint message");
  });

  test("Component has correct attributes and classes", () => {
    const wrapper = mountWithStubs();
    const input = wrapper.findComponent(QInput);
    expect(input.attributes()).toBeDefined();
    expect(input.classes()).toBeDefined();
  });

  test("Component has input value", () => {
    const wrapper = mountWithStubs();
    const input = wrapper.findComponent(QInput);
    input.setValue("new input value");

    expect(wrapper.emitted()["update:modelValue"]).toBeTruthy();
    expect(wrapper.emitted()["update:modelValue"]![0]).toEqual([
      "new input value",
    ]);
  });

  test("Component fails when empty (required rule)", async () => {
    const wrapper = mountWithStubs({ modelValue: "", rules });
    const nativeInput = wrapper.find("input");

    await nativeInput.setValue("");
    await nativeInput.trigger("blur");
    await nextTick();

    const qInput = wrapper.findComponent(QInput);
    const rulesOk = await qInput.vm.validate(); // QInput api method (https://quasar.dev/vue-components/input/)
    expect(rulesOk).toBe(false);

    // verify error icon displayed by QInput component
    const errorIcon = wrapper.find("i.text-negative");
    expect(errorIcon.exists()).toBe(true);

    // verify error message displayed by QInput component
    const messages = wrapper.find('.q-field__messages [role="alert"]');
    expect(messages.exists()).toBe(true);
    expect(messages.text()).toContain("Please enter your product name.");

    // check if QInput contains alert class
    expect(wrapper.find(".q-field").classes()).toContain("q-field--error");
  });

  test("Component fails when length > 50", async () => {
    const wrapper = mountWithStubs({ modelValue: "", rules });
    const nativeInput = wrapper.find("input");

    await nativeInput.setValue("a".repeat(54));
    await nativeInput.trigger("blur");
    await nextTick();

    const qInput = wrapper.findComponent(QInput);

    const rulesOk = await qInput.vm.validate();
    expect(rulesOk).toBe(false);

    // verify error icon displayed by QInput component
    const errorIcon = wrapper.find("i.text-negative");
    expect(errorIcon.exists()).toBe(true);

    const messages = wrapper.find('.q-field__messages [role="alert"]');
    expect(messages.text()).toContain("Please use maximum 50 characters.");
  });

  test("Component passes when value is valid", async () => {
    const wrapper = mountWithStubs({ modelValue: "", rules });
    const nativeInput = wrapper.find("input");

    await nativeInput.setValue("Valid name");
    await nativeInput.trigger("blur");
    await nextTick();

    const qInput = wrapper.findComponent(QInput);
    const rulesOk = await qInput.vm.validate();
    expect(rulesOk).toBe(true);

    // verify error icon displayed by QInput component
    const errorIcon = wrapper.find("i.text-negative");
    expect(errorIcon.exists()).toBe(false);

    // no validation error and class applied
    const messages = wrapper.find('.q-field__messages [role="alert"]');
    expect(messages.exists()).toBe(false);
    expect(wrapper.find(".q-field").classes()).not.toContain("q-field--error");
  });
});
