import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import TextInput from "./TextInput.vue";
import { QInput } from "quasar";

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

  test("Component has validated input", () => {
    const wrapper = mountWithStubs();
    const input = wrapper.findComponent(QInput);
    input.setValue("new input value");

    expect(wrapper.emitted()["update:modelValue"]).toBeTruthy();
    expect(wrapper.emitted()["update:modelValue"]![0]).toEqual([
      "new input value",
    ]);
  });
});
