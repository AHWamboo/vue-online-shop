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

  test("Component has input", () => {
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

    const q = wrapper.findComponent(QInput);
    const ok = await q.vm.validate(); // QInput api method
    expect(ok).toBe(false);

    console.log(q.html());

    // verify error message displayed by QInput component
    const messages = wrapper.find('.q-field__messages [role="alert"]');
    expect(messages.exists()).toBe(true);
    expect(messages.text()).toContain("Please enter your product name.");

    // check if QInput contains alert class
    expect(wrapper.find(".q-field").classes()).toContain("q-field--error");
  });
});
